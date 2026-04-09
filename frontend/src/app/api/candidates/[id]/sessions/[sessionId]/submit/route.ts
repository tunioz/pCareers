import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryOne, execute, transaction } from '@/lib/db';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';

interface RouteContext {
  params: Promise<{ id: string; sessionId: string }>;
}

/**
 * POST /api/candidates/[id]/sessions/[sessionId]/submit
 *
 * Submit a scorecard for an interview session.
 * Body: {
 *   raw_notes: string,
 *   technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential: number | null,
 *   technical_depth_notes, ..., general_notes, key_quotes, red_flags: string,
 *   recommendation: string
 * }
 *
 * Creates a candidate_scores record and marks the session as completed.
 * Enforces isolation: only the session's interviewer can submit.
 */
export async function POST(request: Request, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id, sessionId } = await context.params;
    const candidateId = parseInt(id, 10);
    const sessionIdNum = parseInt(sessionId, 10);
    const body = await request.json();

    const session = queryOne<{
      id: number;
      candidate_id: number;
      interviewer_name: string;
      stage: string;
      status: string;
    }>('SELECT * FROM candidate_interview_sessions WHERE id = ? AND candidate_id = ?',
      [sessionIdNum, candidateId]
    );

    if (!session) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
    }

    // Isolation: only the assigned interviewer can submit
    if (session.interviewer_name !== user.username) {
      return NextResponse.json(
        {
          success: false,
          error: 'Only the assigned interviewer can submit this scorecard',
        },
        { status: 403 }
      );
    }

    if (session.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'This session is already submitted' },
        { status: 400 }
      );
    }

    let scoreId: number | bigint = 0;

    transaction(() => {
      const scoreResult = execute(
        `INSERT INTO candidate_scores (
          candidate_id, session_id, interviewer_user_id, interviewer_name, interview_stage,
          technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential,
          technical_depth_notes, problem_solving_notes, ownership_notes,
          communication_notes, cultural_add_notes, growth_potential_notes,
          recommendation, general_notes, key_quotes, red_flags,
          raw_notes, submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
        [
          candidateId,
          sessionIdNum,
          user.userId,
          user.username,
          session.stage,
          body.technical_depth ?? null,
          body.problem_solving ?? null,
          body.ownership ?? null,
          body.communication ?? null,
          body.cultural_add ?? null,
          body.growth_potential ?? null,
          body.technical_depth_notes || null,
          body.problem_solving_notes || null,
          body.ownership_notes || null,
          body.communication_notes || null,
          body.cultural_add_notes || null,
          body.growth_potential_notes || null,
          body.recommendation || null,
          body.general_notes || null,
          body.key_quotes || null,
          body.red_flags || null,
          body.raw_notes || null,
        ]
      );
      scoreId = scoreResult.lastInsertRowid;

      execute(
        `UPDATE candidate_interview_sessions SET
          status = 'completed',
          completed_at = datetime('now'),
          raw_notes = ?,
          score_id = ?
         WHERE id = ?`,
        [body.raw_notes || null, scoreId, sessionIdNum]
      );
    });

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'score_submitted',
      entityType: 'interview_session',
      entityId: sessionIdNum,
      details: {
        candidate_id: candidateId,
        stage: session.stage,
        recommendation: body.recommendation,
        score_id: scoreId,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: { session_id: sessionIdNum, score_id: scoreId },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
