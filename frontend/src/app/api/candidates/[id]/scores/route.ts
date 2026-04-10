import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateCandidateScore } from '@/lib/validations';
import type { Candidate, CandidateScore } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Recalculate and update the composite score for a candidate.
 * Weighted average: Technical 25%, Problem Solving 20%, Ownership 20%,
 * Communication 15%, Cultural Add 10%, Growth Potential 10%
 */
async function recalculateCompositeScore(candidateId: number): Promise<void> {
  const scores = await queryAll<CandidateScore>(
    'SELECT * FROM candidate_scores WHERE candidate_id = ?',
    [candidateId]
  );

  if (scores.length === 0) {
    await execute('UPDATE candidates SET composite_score = NULL WHERE id = ?', [candidateId]);
    return;
  }

  const weights = {
    technical_depth: 0.25,
    problem_solving: 0.20,
    ownership: 0.20,
    communication: 0.15,
    cultural_add: 0.10,
    growth_potential: 0.10,
  };

  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const score of scores) {
    for (const [dim, weight] of Object.entries(weights)) {
      const value = score[dim as keyof typeof weights];
      if (value !== null && value !== undefined) {
        totalWeightedScore += value * weight;
        totalWeight += weight;
      }
    }
  }

  const composite = totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 100) / 100 : null;

  await execute(
    "UPDATE candidates SET composite_score = ?, updated_at = datetime('now') WHERE id = ?",
    [composite, candidateId]
  );
}

/**
 * GET /api/candidates/[id]/scores — List all scorecards for a candidate (auth required)
 */
export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    const candidate = await queryOne<Candidate>(
      'SELECT id, composite_score FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const scores = await queryAll<CandidateScore>(
      'SELECT * FROM candidate_scores WHERE candidate_id = ? ORDER BY created_at DESC',
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: {
        composite_score: candidate.composite_score,
        scorecards: scores,
      },
    });
  } catch (error) {
    console.error('Get candidate scores error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates/[id]/scores — Submit a scorecard (auth required)
 */
export async function POST(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    const candidate = await queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validation = validateCandidateScore(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    const result = await execute(
      `INSERT INTO candidate_scores (
        candidate_id, interviewer_name, interview_stage,
        technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential,
        technical_depth_notes, problem_solving_notes, ownership_notes,
        communication_notes, cultural_add_notes, growth_potential_notes,
        recommendation, general_notes, key_quotes, red_flags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        v.interviewer_name,
        v.interview_stage,
        v.technical_depth ?? null,
        v.problem_solving ?? null,
        v.ownership ?? null,
        v.communication ?? null,
        v.cultural_add ?? null,
        v.growth_potential ?? null,
        v.technical_depth_notes ?? null,
        v.problem_solving_notes ?? null,
        v.ownership_notes ?? null,
        v.communication_notes ?? null,
        v.cultural_add_notes ?? null,
        v.growth_potential_notes ?? null,
        v.recommendation ?? null,
        v.general_notes ?? null,
        v.key_quotes ?? null,
        v.red_flags ?? null,
      ]
    );

    // Recalculate composite score
    await recalculateCompositeScore(candidateId);

    const score = await queryOne<CandidateScore>(
      'SELECT * FROM candidate_scores WHERE id = ?',
      [result.lastInsertRowid]
    );

    // Get updated composite
    const updated = await queryOne<{ composite_score: number | null }>(
      'SELECT composite_score FROM candidates WHERE id = ?',
      [candidateId]
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          scorecard: score,
          composite_score: updated?.composite_score ?? null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create candidate score error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
