import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { PositionCriterion } from '@/types';

/**
 * GET /api/jobs/[id]/criteria — List position-specific scoring criteria
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);
    if (isNaN(jobId)) {
      return NextResponse.json({ success: false, error: 'Invalid job ID' }, { status: 400 });
    }

    const criteria = await queryAll<PositionCriterion>(
      'SELECT * FROM position_criteria WHERE job_id = ? ORDER BY sort_order ASC, id ASC',
      [jobId]
    );

    return NextResponse.json({ success: true, data: criteria });
  } catch (error) {
    console.error('Get position criteria error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/jobs/[id]/criteria — Create a new position-specific criterion
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const jobId = parseInt(id, 10);
    if (isNaN(jobId)) {
      return NextResponse.json({ success: false, error: 'Invalid job ID' }, { status: 400 });
    }

    const job = await queryOne<{ id: number }>('SELECT id FROM jobs WHERE id = ?', [jobId]);
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, weight, sort_order } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Criterion name is required' }, { status: 400 });
    }

    const result = await execute(
      `INSERT INTO position_criteria (job_id, name, description, weight, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [
        jobId,
        name.trim(),
        description ? String(description).trim() : null,
        typeof weight === 'number' ? weight : 10,
        typeof sort_order === 'number' ? sort_order : 0,
      ]
    );

    const created = await queryOne<PositionCriterion>(
      'SELECT * FROM position_criteria WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Create position criterion error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
