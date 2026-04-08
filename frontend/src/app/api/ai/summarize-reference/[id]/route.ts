import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryOne } from '@/lib/db';
import { callAiJson } from '@/lib/ai/client';
import {
  SUMMARIZE_REFERENCE_SYSTEM,
  buildSummarizeReferencePrompt,
  type ReferenceSummary,
} from '@/lib/ai/prompts/summarize-reference';
import type { Candidate, Job } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface ReferenceRow {
  id: number;
  candidate_id: number;
  referee_name: string;
  referee_relationship: string | null;
  duration_worked: string | null;
  technical_competence: number | null;
  reliability: number | null;
  communication: number | null;
  teamwork: number | null;
  initiative: number | null;
  strengths: string | null;
  improvements: string | null;
  would_rehire: string | null;
  additional_comments: string | null;
  status: string;
}

/**
 * POST /api/ai/summarize-reference/[id]
 * Analyzes a completed reference and returns a structured summary.
 */
export async function POST(_request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const referenceId = parseInt(id, 10);
    if (!referenceId) {
      return NextResponse.json(
        { success: false, error: 'Invalid reference ID' },
        { status: 400 }
      );
    }

    const reference = queryOne<ReferenceRow>(
      'SELECT * FROM candidate_references WHERE id = ?',
      [referenceId]
    );
    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Reference not found' },
        { status: 404 }
      );
    }

    if (reference.status !== 'completed') {
      return NextResponse.json(
        {
          success: false,
          error: 'Reference is not completed yet. Cannot summarize an incomplete reference.',
        },
        { status: 400 }
      );
    }

    // Check there's actually content to analyze
    const hasContent =
      (reference.strengths && reference.strengths.length > 10) ||
      (reference.improvements && reference.improvements.length > 10) ||
      (reference.additional_comments && reference.additional_comments.length > 10);

    if (!hasContent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reference has no substantive written feedback to analyze',
        },
        { status: 400 }
      );
    }

    const candidate = queryOne<Candidate>(
      'SELECT * FROM candidates WHERE id = ?',
      [reference.candidate_id]
    );
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    let job: Job | null = null;
    if (candidate.job_id) {
      job = queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [candidate.job_id]) || null;
    }

    const firstName = candidate.full_name.split(' ')[0];

    const result = await callAiJson<ReferenceSummary>({
      model: 'haiku', // Fast and cheap — reference analysis is a short task
      maxTokens: 2048,
      temperature: 0.2,
      systemPrompt: SUMMARIZE_REFERENCE_SYSTEM,
      userPrompt: buildSummarizeReferencePrompt({
        candidateFirstName: firstName,
        jobTitle: job?.title || 'Unknown role',
        refereeRelationship: reference.referee_relationship,
        durationWorked: reference.duration_worked,
        ratings: {
          technical_competence: reference.technical_competence,
          reliability: reference.reliability,
          communication: reference.communication,
          teamwork: reference.teamwork,
          initiative: reference.initiative,
        },
        strengths: reference.strengths,
        improvements: reference.improvements,
        wouldRehire: reference.would_rehire,
        additionalComments: reference.additional_comments,
      }),
      skill: 'summarize-reference',
      userUsername: user.username,
      candidateId: reference.candidate_id,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI summary failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        summary: result.data,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
        },
      },
    });
  } catch (error) {
    console.error('Summarize reference error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
