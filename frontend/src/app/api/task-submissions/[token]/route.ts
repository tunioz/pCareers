import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import path from 'node:path';
import fs from 'node:fs';
import type { CandidateTaskSubmission, TechnicalTask } from '@/types';

interface RouteContext {
  params: Promise<{ token: string }>;
}

/**
 * GET /api/task-submissions/[token] — Get task details by submission token (public)
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const submission = queryOne<CandidateTaskSubmission & { task_title: string; task_description: string; task_instructions: string }>(
      `SELECT s.*, t.title as task_title, t.description as task_description, t.instructions as task_instructions
       FROM candidate_task_submissions s
       JOIN technical_tasks t ON s.task_id = t.id
       WHERE s.submission_token = ?`,
      [token]
    );

    if (!submission) {
      return NextResponse.json(
        { success: false, error: 'Task submission not found or link has expired' },
        { status: 404 }
      );
    }

    if (submission.status === 'submitted' || submission.status === 'reviewed') {
      return NextResponse.json(
        { success: false, error: 'This task has already been submitted' },
        { status: 400 }
      );
    }

    // Check deadline
    if (submission.deadline && new Date(submission.deadline) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'The deadline for this task has passed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        task_title: submission.task_title,
        task_description: submission.task_description,
        task_instructions: submission.task_instructions,
        deadline: submission.deadline,
        status: submission.status,
      },
    });
  } catch (error) {
    console.error('Get task submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/task-submissions/[token] — Submit task solution by token (public, accepts FormData)
 */
export async function POST(request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const submission = queryOne<CandidateTaskSubmission>(
      'SELECT * FROM candidate_task_submissions WHERE submission_token = ?',
      [token]
    );

    if (!submission) {
      return NextResponse.json(
        { success: false, error: 'Task submission not found or link has expired' },
        { status: 404 }
      );
    }

    if (submission.status !== 'pending') {
      return NextResponse.json(
        { success: false, error: 'This task has already been submitted' },
        { status: 400 }
      );
    }

    if (submission.deadline && new Date(submission.deadline) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'The deadline for this task has passed' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const notes = formData.get('notes') as string | null;

    let filePath: string | null = null;

    if (file && file.size > 0) {
      const maxSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { success: false, error: 'File size exceeds 20MB limit' },
          { status: 400 }
        );
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'tasks', String(year), month);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(file.name) || '.zip';
      const uniqueName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
      const fullPath = path.join(uploadDir, uniqueName);

      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(fullPath, buffer);

      filePath = `/uploads/tasks/${year}/${month}/${uniqueName}`;
    }

    execute(
      `UPDATE candidate_task_submissions SET
        file_path = ?,
        notes = ?,
        status = 'submitted',
        submitted_at = datetime('now')
      WHERE submission_token = ?`,
      [filePath, notes || null, token]
    );

    // Add history entry
    execute(
      `INSERT INTO candidate_history (candidate_id, action, performed_by, notes)
       VALUES (?, ?, ?, ?)`,
      [submission.candidate_id, 'task_submitted', 'candidate', 'Technical task solution submitted']
    );

    return NextResponse.json({
      success: true,
      data: { message: 'Task submitted successfully' },
    });
  } catch (error) {
    console.error('Submit task error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
