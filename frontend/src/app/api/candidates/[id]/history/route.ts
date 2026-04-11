import { NextResponse } from 'next/server';
import { queryOne, queryAll } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Candidate, CandidateHistory } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidates/[id]/history — Get full timeline of actions (auth required)
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
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const history = await queryAll<CandidateHistory>(
      'SELECT * FROM candidate_history WHERE candidate_id = ? ORDER BY created_at DESC',
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error('Get candidate history error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
