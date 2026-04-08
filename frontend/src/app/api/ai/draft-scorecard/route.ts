import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryOne } from '@/lib/db';
import { callAiJson } from '@/lib/ai/client';
import {
  DRAFT_SCORECARD_SYSTEM,
  buildDraftScorecardPrompt,
  type DraftedScorecard,
} from '@/lib/ai/prompts/draft-scorecard';
import type { Candidate, Job } from '@/types';

/**
 * POST /api/ai/draft-scorecard
 * Body: {
 *   candidate_id: number,
 *   stage: string,
 *   raw_notes: string
 * }
 *
 * Takes an interviewer's freeform notes and returns a structured scorecard draft.
 * The draft is NOT saved. The interviewer reviews it in the UI and clicks "Save"
 * to persist to candidate_scores table via the existing endpoint.
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
    const stage = typeof body.stage === 'string' ? body.stage : 'interview';
    const rawNotes = typeof body.raw_notes === 'string' ? body.raw_notes.trim() : '';

    if (!candidateId) {
      return NextResponse.json(
        { success: false, error: 'candidate_id is required' },
        { status: 400 }
      );
    }

    if (rawNotes.length < 30) {
      return NextResponse.json(
        {
          success: false,
          error: 'Notes are too short (need at least 30 characters)',
        },
        { status: 400 }
      );
    }

    if (rawNotes.length > 20000) {
      return NextResponse.json(
        { success: false, error: 'Notes are too long (max 20000 characters)' },
        { status: 400 }
      );
    }

    const candidate = queryOne<Candidate>(
      'SELECT * FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    // Get job context if candidate has one
    let job: Job | null = null;
    if (candidate.job_id) {
      job = queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [candidate.job_id]) || null;
    }

    // Bias protection: intentionally do NOT send candidate name beyond first name
    const firstName = candidate.full_name.split(' ')[0];

    const result = await callAiJson<DraftedScorecard>({
      model: 'sonnet',
      maxTokens: 3000,
      temperature: 0.2,
      systemPrompt: DRAFT_SCORECARD_SYSTEM,
      userPrompt: buildDraftScorecardPrompt({
        candidateName: firstName,
        jobTitle: job?.title || 'Unknown role',
        stage,
        rawNotes,
        jobDescription: job?.description || undefined,
      }),
      skill: 'draft-scorecard',
      userUsername: user.username,
      candidateId,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI draft failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        draft: result.data,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
          note: 'This is an AI-generated draft. Review and edit before saving.',
        },
      },
    });
  } catch (error) {
    console.error('Draft scorecard error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
