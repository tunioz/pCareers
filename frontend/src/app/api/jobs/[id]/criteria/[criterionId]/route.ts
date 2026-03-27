import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { PositionCriterion } from '@/types';

/**
 * PUT /api/jobs/[id]/criteria/[criterionId] — Update a position criterion
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; criterionId: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { id, criterionId } = await params;
    const jobId = parseInt(id, 10);
    const critId = parseInt(criterionId, 10);

    if (isNaN(jobId) || isNaN(critId)) {
      return NextResponse.json({ success: false, error: 'Invalid IDs' }, { status: 400 });
    }

    const existing = queryOne<PositionCriterion>(
      'SELECT * FROM position_criteria WHERE id = ? AND job_id = ?',
      [critId, jobId]
    );
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Criterion not found' }, { status: 404 });
    }

    const body = await request.json();
    const fields: string[] = [];
    const values: unknown[] = [];

    if (body.name !== undefined) {
      if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
        return NextResponse.json({ success: false, error: 'Criterion name cannot be empty' }, { status: 400 });
      }
      fields.push('name = ?');
      values.push(body.name.trim());
    }
    if (body.description !== undefined) {
      fields.push('description = ?');
      values.push(body.description ? String(body.description).trim() : null);
    }
    if (body.weight !== undefined && typeof body.weight === 'number') {
      fields.push('weight = ?');
      values.push(body.weight);
    }
    if (body.sort_order !== undefined && typeof body.sort_order === 'number') {
      fields.push('sort_order = ?');
      values.push(body.sort_order);
    }

    if (fields.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
    }

    values.push(critId);
    execute(`UPDATE position_criteria SET ${fields.join(', ')} WHERE id = ?`, values);

    const updated = queryOne<PositionCriterion>(
      'SELECT * FROM position_criteria WHERE id = ?',
      [critId]
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update position criterion error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/jobs/[id]/criteria/[criterionId] — Delete a position criterion
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; criterionId: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { id, criterionId } = await params;
    const jobId = parseInt(id, 10);
    const critId = parseInt(criterionId, 10);

    if (isNaN(jobId) || isNaN(critId)) {
      return NextResponse.json({ success: false, error: 'Invalid IDs' }, { status: 400 });
    }

    const existing = queryOne<{ id: number }>(
      'SELECT id FROM position_criteria WHERE id = ? AND job_id = ?',
      [critId, jobId]
    );
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Criterion not found' }, { status: 404 });
    }

    execute('DELETE FROM position_criteria WHERE id = ?', [critId]);

    return NextResponse.json({ success: true, data: { deleted: critId } });
  } catch (error) {
    console.error('Delete position criterion error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
