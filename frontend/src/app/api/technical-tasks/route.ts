import { NextResponse } from 'next/server';
import { queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateTechnicalTask } from '@/lib/validations';
import type { TechnicalTaskWithJob } from '@/types';

/**
 * GET /api/technical-tasks — List all technical tasks (auth required)
 */
export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const tasks = await queryAll<TechnicalTaskWithJob>(
      `SELECT t.*, j.title as job_title
       FROM technical_tasks t
       LEFT JOIN jobs j ON t.job_id = j.id
       ORDER BY t.created_at DESC`
    );

    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Get technical tasks error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/technical-tasks — Create a new technical task (auth required)
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
    const validation = validateTechnicalTask(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    const result = await execute(
      `INSERT INTO technical_tasks (job_id, title, description, instructions, deadline_days, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [v.job_id || null, v.title, v.description, v.instructions, v.deadline_days ?? 7, v.is_active ?? 1]
    );

    const task = (await queryAll<TechnicalTaskWithJob>(
      `SELECT t.*, j.title as job_title
       FROM technical_tasks t
       LEFT JOIN jobs j ON t.job_id = j.id
       WHERE t.id = ?`,
      [result.lastInsertRowid]
    ))[0];

    return NextResponse.json(
      { success: true, data: task },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create technical task error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
