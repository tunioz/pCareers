import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/permissions';
import { callAiJson } from '@/lib/ai/client';
import {
  ANALYZE_TASK_SYSTEM,
  buildAnalyzeTaskPrompt,
  type TaskAnalysis,
} from '@/lib/ai/prompts/analyze-task';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';

interface TechnicalTaskRow {
  id: number;
  title: string;
  description: string;
  role_type: string | null;
}

interface TaskSubmissionRow {
  id: number;
  candidate_id: number;
  task_id: number | null;
  notes: string | null;
  file_path: string | null;
  status: string;
}

/**
 * POST /api/ai/analyze-task
 * Body: { task_id: number, submission_id?: number }
 *
 * Analyzes a technical task (and optionally a candidate's submission).
 * Returns structured breakdown of skills, evaluation criteria, and if
 * submission provided, quality assessment.
 */
export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const taskId = parseInt(body.task_id, 10);
    const submissionId = body.submission_id ? parseInt(body.submission_id, 10) : null;

    if (!taskId) {
      return NextResponse.json(
        { success: false, error: 'task_id is required' },
        { status: 400 }
      );
    }

    const task = queryOne<TechnicalTaskRow>(
      'SELECT id, title, description, role_type FROM technical_tasks WHERE id = ?',
      [taskId]
    );
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    let submission: TaskSubmissionRow | null = null;
    if (submissionId) {
      submission =
        queryOne<TaskSubmissionRow>(
          'SELECT id, candidate_id, task_id, notes, file_path, status FROM candidate_task_submissions WHERE id = ?',
          [submissionId]
        ) || null;
    }

    const result = await callAiJson<TaskAnalysis>({
      model: 'sonnet',
      maxTokens: 3000,
      temperature: 0.3,
      systemPrompt: ANALYZE_TASK_SYSTEM,
      userPrompt: buildAnalyzeTaskPrompt({
        taskTitle: task.title,
        taskDescription: task.description,
        roleContext: task.role_type || undefined,
        submissionNotes: submission?.notes || undefined,
        hasSubmission: !!submission,
      }),
      skill: 'analyze-task',
      userUsername: user.username,
      candidateId: submission?.candidate_id,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI analysis failed' },
        { status: 502 }
      );
    }

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'ai_call',
      entityType: submission ? 'candidate' : 'task_submission',
      entityId: submission?.candidate_id || taskId,
      details: {
        skill: 'analyze-task',
        task_id: taskId,
        submission_id: submissionId,
        cost_usd: result.costUsd,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        analysis: result.data,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
        },
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
