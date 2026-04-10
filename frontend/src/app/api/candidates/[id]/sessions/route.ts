import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryAll, queryOne, execute } from '@/lib/db';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export interface SessionRow {
  id: number;
  candidate_id: number;
  kit_id: number | null;
  interviewer_name: string;
  stage: string;
  scheduled_at: string | null;
  completed_at: string | null;
  raw_notes: string | null;
  score_id: number | null;
  status: string;
  created_at: string;
}

/**
 * GET /api/candidates/[id]/sessions
 *
 * Returns all interview sessions for a candidate.
 * IMPORTANT: Other interviewers' raw_notes are HIDDEN from sessions the current user
 * has not yet submitted their own scorecard for (isolation rule).
 * The current user always sees their own sessions fully.
 */
export async function GET(_request: Request, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    // Find sessions where current user is the interviewer
    const ownSessions = await queryAll<SessionRow>(
      `SELECT * FROM candidate_interview_sessions
       WHERE candidate_id = ? AND (interviewer_name = ? OR score_id IS NULL)
       ORDER BY created_at DESC`,
      [candidateId, user.username]
    );

    // Find if current user has submitted a scorecard for this candidate
    const ownSubmitted = await queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM candidate_scores
       WHERE candidate_id = ? AND interviewer_name = ?`,
      [candidateId, user.username]
    );
    const currentUserHasSubmitted = (ownSubmitted?.count || 0) > 0;

    // All sessions with isolation applied
    const allSessions = await queryAll<SessionRow>(
      `SELECT * FROM candidate_interview_sessions
       WHERE candidate_id = ?
       ORDER BY scheduled_at DESC, created_at DESC`,
      [candidateId]
    );

    const isolated = allSessions.map((session) => {
      const isOwnSession = session.interviewer_name === user.username;
      // Hide raw_notes from other interviewers' sessions unless current user has also submitted
      if (!isOwnSession && !currentUserHasSubmitted) {
        return { ...session, raw_notes: null, _hidden: true };
      }
      return session;
    });

    return NextResponse.json({
      success: true,
      data: isolated,
      meta: {
        current_user_submitted: currentUserHasSubmitted,
        isolation_rule:
          'Other interviewers raw notes are hidden until you submit your own scorecard for this candidate.',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates/[id]/sessions
 * Create a new interview session (schedule interview).
 * Body: { kit_id?, interviewer_name, stage, scheduled_at }
 */
export async function POST(request: Request, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const candidateId = parseInt(id, 10);
    const body = await request.json();

    if (!body.interviewer_name || !body.stage) {
      return NextResponse.json(
        { success: false, error: 'interviewer_name and stage are required' },
        { status: 400 }
      );
    }

    const result = await execute(
      `INSERT INTO candidate_interview_sessions (
        candidate_id, kit_id, interviewer_name, stage, scheduled_at, status,
        location, meet_link, duration_minutes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        body.kit_id || null,
        body.interviewer_name,
        body.stage,
        body.scheduled_at || null,
        body.status || 'scheduled',
        body.location || null,
        body.meet_link || null,
        body.duration_minutes || null,
      ]
    );

    const newId = result.lastInsertRowid as number;

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'session_created',
      entityType: 'interview_session',
      entityId: newId,
      details: {
        candidate_id: candidateId,
        interviewer: body.interviewer_name,
        stage: body.stage,
        scheduled_at: body.scheduled_at,
        location: body.location,
        meet_link: body.meet_link,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    const session = await queryOne<SessionRow>(
      'SELECT * FROM candidate_interview_sessions WHERE id = ?',
      [newId]
    );

    return NextResponse.json({ success: true, data: session }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
