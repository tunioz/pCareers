import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryAll, queryOne, execute } from '@/lib/db';
import { callAiJson } from '@/lib/ai/client';
import {
  ANALYZE_CANDIDATE_SYSTEM,
  buildAnalyzeCandidatePrompt,
  type CandidateAnalysis,
  type AnalyzeInputs,
} from '@/lib/ai/prompts/analyze-candidate';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { fetchProfileUrls } from '@/lib/url-fetcher';
import type { Candidate, Job } from '@/types';

/**
 * POST /api/ai/analyze-candidate
 * Body: { candidate_id: number }
 *
 * Comprehensive AI analysis of a candidate using ALL available data:
 *  - parsed CV (skills, experience, education)
 *  - LinkedIn profile text (if pasted)
 *  - admin notes
 *  - interview scorecards (from all interviewers)
 *  - reference checks
 *
 * Result is cached in candidate_analysis table. Always re-runnable.
 */
export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const candidateId = parseInt(body.candidate_id, 10);
    if (!candidateId) {
      return NextResponse.json(
        { success: false, error: 'candidate_id is required' },
        { status: 400 }
      );
    }

    const candidate = await queryOne<Candidate & { linkedin_profile_text?: string | null }>(
      'SELECT * FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    let job: Job | null = null;
    if (candidate.job_id) {
      job = await queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [candidate.job_id]) || null;
    }

    // Gather all data sources
    const adminNotes = await queryAll<{
      author: string;
      content: string;
      note_type: string;
      created_at: string;
    }>(
      'SELECT author, content, note_type, created_at FROM candidate_notes WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );

    const scorecards = await queryAll<AnalyzeInputs['scorecards'][number]>(
      `SELECT interviewer_name, interview_stage as stage,
              technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential,
              recommendation, general_notes, raw_notes, key_quotes, red_flags
       FROM candidate_scores WHERE candidate_id = ? ORDER BY created_at`,
      [candidateId]
    );

    const references = await queryAll<AnalyzeInputs['references'][number]>(
      `SELECT referee_name, referee_relationship,
              technical_competence, reliability, communication, teamwork, initiative,
              strengths, improvements, would_rehire, additional_comments
       FROM candidate_references WHERE candidate_id = ? AND status = 'completed'
       ORDER BY completed_at`,
      [candidateId]
    );

    // Fetch online profiles (LinkedIn, GitHub, portfolio, website) in parallel
    const profileUrls: { label: string; url: string }[] = [];
    if (candidate.linkedin_url) profileUrls.push({ label: 'LinkedIn', url: candidate.linkedin_url });
    if (candidate.github_url) profileUrls.push({ label: 'GitHub', url: candidate.github_url });
    if (candidate.portfolio_url) profileUrls.push({ label: 'Portfolio', url: candidate.portfolio_url });
    if (candidate.website_url) profileUrls.push({ label: 'Website', url: candidate.website_url });

    const fetchedProfiles = await fetchProfileUrls(profileUrls);
    const onlineProfiles = fetchedProfiles.filter(p => p.text);

    // Task submissions
    const taskSubmissions = await queryAll<{ task_title: string; notes: string | null; score: number | null; reviewer_notes: string | null; status: string }>(
      `SELECT t.title as task_title, s.notes, s.score, s.reviewer_notes, s.status
       FROM candidate_task_submissions s
       JOIN technical_tasks t ON t.id = s.task_id
       WHERE s.candidate_id = ?`,
      [candidateId]
    );

    const sourcesAnalyzed = {
      has_parsed_cv: !!candidate.parsed_skills,
      has_linkedin: !!candidate.linkedin_profile_text,
      online_profiles_fetched: onlineProfiles.length,
      online_profiles_failed: fetchedProfiles.filter(p => !p.text).map(p => `${p.label}: ${p.error || 'no content'}`),
      admin_notes: adminNotes.length,
      scorecards: scorecards.length,
      references: references.length,
      task_submissions: taskSubmissions.length,
    };

    // Require at least some data
    const totalDataPoints =
      (sourcesAnalyzed.has_parsed_cv ? 1 : 0) +
      (sourcesAnalyzed.has_linkedin ? 1 : 0) +
      onlineProfiles.length +
      sourcesAnalyzed.admin_notes +
      sourcesAnalyzed.scorecards +
      sourcesAnalyzed.references +
      taskSubmissions.length;

    if (totalDataPoints === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No data to analyze. Parse the CV, add notes/links, complete interviews, or request references first.',
        },
        { status: 400 }
      );
    }

    const firstName = candidate.full_name.split(' ')[0];

    const prompt = buildAnalyzeCandidatePrompt({
      candidateFirstName: firstName,
      jobTitle: job?.title || 'Unknown role',
      jobDescription: job?.description || undefined,
      jobRequirements: job?.requirements || undefined,
      parsedSkills: candidate.parsed_skills,
      parsedExperience: candidate.parsed_experience,
      parsedEducation: candidate.parsed_education,
      professionalSummary: candidate.professional_summary,
      linkedinProfile: candidate.linkedin_profile_text,
      onlineProfiles,
      taskSubmissions,
      adminNotes,
      scorecards,
      references,
    });

    const result = await callAiJson<CandidateAnalysis>({
      model: 'sonnet',
      maxTokens: 4096,
      temperature: 0.2,
      systemPrompt: ANALYZE_CANDIDATE_SYSTEM,
      userPrompt: prompt,
      skill: 'analyze-candidate',
      userUsername: user.username,
      candidateId,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI analysis failed' },
        { status: 502 }
      );
    }

    const analysis = result.data;

    // Cache in candidate_analysis
    const savedRow = await execute(
      `INSERT INTO candidate_analysis (
        candidate_id, generated_by, overall_summary, strengths, concerns,
        red_flags, recommendation, confidence, sources_analyzed, model, cost_usd
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        user.username,
        analysis.overall_summary,
        JSON.stringify(analysis.strengths),
        JSON.stringify(analysis.concerns),
        JSON.stringify(analysis.red_flags),
        analysis.recommendation,
        analysis.confidence,
        JSON.stringify(sourcesAnalyzed),
        'claude-sonnet-4-6',
        result.costUsd || 0,
      ]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'ai_call',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        skill: 'analyze-candidate',
        recommendation: analysis.recommendation,
        confidence: analysis.confidence,
        sources: sourcesAnalyzed,
        cost_usd: result.costUsd,
        analysis_id: savedRow.lastInsertRowid,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        sources_analyzed: sourcesAnalyzed,
        analysis_id: savedRow.lastInsertRowid,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
        },
      },
    });
  } catch (error) {
    console.error('Analyze candidate error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/analyze-candidate?candidate_id=N
 * Returns the most recent cached analysis for a candidate.
 */
export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const candidateId = parseInt(searchParams.get('candidate_id') || '0', 10);

  if (!candidateId) {
    return NextResponse.json(
      { success: false, error: 'candidate_id is required' },
      { status: 400 }
    );
  }

  const latest = await queryOne<{
    id: number;
    candidate_id: number;
    generated_by: string;
    overall_summary: string;
    strengths: string;
    concerns: string;
    red_flags: string;
    recommendation: string;
    confidence: string;
    sources_analyzed: string;
    created_at: string;
  }>(
    `SELECT * FROM candidate_analysis WHERE candidate_id = ? ORDER BY created_at DESC LIMIT 1`,
    [candidateId]
  );

  if (!latest) {
    return NextResponse.json({ success: true, data: null });
  }

  return NextResponse.json({
    success: true,
    data: {
      ...latest,
      strengths: JSON.parse(latest.strengths || '[]'),
      concerns: JSON.parse(latest.concerns || '[]'),
      red_flags: JSON.parse(latest.red_flags || '[]'),
      sources_analyzed: JSON.parse(latest.sources_analyzed || '{}'),
    },
  });
}
