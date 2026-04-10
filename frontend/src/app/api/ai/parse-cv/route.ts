import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryOne, execute } from '@/lib/db';
import { callAiJson } from '@/lib/ai/client';
import { PARSE_CV_SYSTEM, buildParseCvPrompt, type ParsedCv } from '@/lib/ai/prompts/parse-cv';
import { extractCvText } from '@/lib/ai/cv-extract';
import type { Candidate } from '@/types';

/**
 * POST /api/ai/parse-cv
 * Body: { candidate_id: number }
 *
 * Reads the candidate's CV file, extracts text, calls Claude to parse it,
 * and upserts the parsed_* fields on the candidate record.
 */
export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const candidateId = parseInt(body.candidate_id, 10);
    if (!candidateId) {
      return NextResponse.json(
        { success: false, error: 'candidate_id is required' },
        { status: 400 }
      );
    }

    const candidate = await queryOne<Candidate>(
      'SELECT * FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    if (!candidate.cv_path) {
      return NextResponse.json(
        { success: false, error: 'Candidate has no CV on file' },
        { status: 400 }
      );
    }

    // 1. Extract CV text
    const { text, error: extractError } = await extractCvText(candidate.cv_path);
    if (extractError || !text || text.length < 50) {
      return NextResponse.json(
        {
          success: false,
          error: extractError || 'CV text is empty or too short to parse',
        },
        { status: 400 }
      );
    }

    // 2. Call Claude
    const result = await callAiJson<ParsedCv>({
      model: 'sonnet',
      maxTokens: 4096,
      temperature: 0.1,
      systemPrompt: PARSE_CV_SYSTEM,
      userPrompt: buildParseCvPrompt(text),
      skill: 'parse-cv',
      userUsername: user.username,
      candidateId,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI parse failed' },
        { status: 502 }
      );
    }

    const parsed = result.data;

    // 3. Upsert parsed fields on candidate
    await execute(
      `UPDATE candidates SET
        parsed_skills = ?,
        parsed_experience = ?,
        parsed_education = ?,
        parsed_certifications = ?,
        parsed_languages = ?,
        parsed_projects = ?,
        professional_summary = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        JSON.stringify(parsed.skills),
        JSON.stringify(parsed.experience),
        JSON.stringify(parsed.education),
        JSON.stringify(parsed.certifications),
        JSON.stringify(parsed.languages),
        JSON.stringify(parsed.projects),
        parsed.professional_summary,
        candidateId,
      ]
    );

    return NextResponse.json({
      success: true,
      data: {
        parsed,
        meta: {
          model: 'sonnet',
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
        },
      },
    });
  } catch (error) {
    console.error('Parse CV error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
