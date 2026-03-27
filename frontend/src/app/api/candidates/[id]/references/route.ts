import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { queryOne, queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateCandidateReference } from '@/lib/validations';
import type { Candidate, CandidateReference } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidates/[id]/references — List all references for a candidate (auth required)
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

    const candidate = queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const references = queryAll<CandidateReference>(
      'SELECT * FROM candidate_references WHERE candidate_id = ? ORDER BY requested_at DESC',
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: references,
    });
  } catch (error) {
    console.error('Get candidate references error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates/[id]/references — Add a reference request (auth required)
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

    const candidate = queryOne<Candidate>(
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
    const validation = validateCandidateReference(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    const token = crypto.randomUUID();

    const result = execute(
      `INSERT INTO candidate_references (
        candidate_id, referee_name, referee_email, referee_relationship, referee_company, token, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        v.referee_name,
        v.referee_email,
        v.referee_relationship || null,
        v.referee_company || null,
        token,
        'pending',
      ]
    );

    const reference = queryOne<CandidateReference>(
      'SELECT * FROM candidate_references WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: reference },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create candidate reference error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
