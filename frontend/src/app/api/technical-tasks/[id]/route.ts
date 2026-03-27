import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { TechnicalTask } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/technical-tasks/[id] — Get single technical task (auth required)
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const taskId = parseInt(id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const task = queryOne<TechnicalTask>(
      `SELECT t.*, j.title as job_title
       FROM technical_tasks t
       LEFT JOIN jobs j ON t.job_id = j.id
       WHERE t.id = ?`,
      [taskId]
    );

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error('Get technical task error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/technical-tasks/[id] — Update technical task (auth required)
 */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const taskId = parseInt(id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<TechnicalTask>(
      'SELECT * FROM technical_tasks WHERE id = ?',
      [taskId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: string[] = [];
    const values: unknown[] = [];

    if (body.title !== undefined) { updates.push('title = ?'); values.push(body.title); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description); }
    if (body.instructions !== undefined) { updates.push('instructions = ?'); values.push(body.instructions); }
    if (body.job_id !== undefined) { updates.push('job_id = ?'); values.push(body.job_id); }
    if (body.deadline_days !== undefined) { updates.push('deadline_days = ?'); values.push(body.deadline_days); }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); values.push(body.is_active ? 1 : 0); }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(taskId);

    execute(
      `UPDATE technical_tasks SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const updated = queryOne<TechnicalTask>(
      'SELECT * FROM technical_tasks WHERE id = ?',
      [taskId]
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update technical task error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/technical-tasks/[id] — Delete technical task (auth required)
 */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const taskId = parseInt(id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const result = execute('DELETE FROM technical_tasks WHERE id = ?', [taskId]);

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Delete technical task error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
