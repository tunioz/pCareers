import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/permissions';
import { generateIcs } from '@/lib/ics';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Candidate, Job } from '@/types';

interface RouteContext {
  params: Promise<{ id: string; sessionId: string }>;
}

interface SessionRow {
  id: number;
  candidate_id: number;
  interviewer_name: string;
  stage: string;
  scheduled_at: string | null;
  kit_id: number | null;
}

interface AdminUserRow {
  username: string;
  email: string | null;
  full_name: string | null;
}

/**
 * GET /api/candidates/[id]/sessions/[sessionId]/ics
 *
 * Downloads an .ics calendar file for the interview session.
 * Works with Google Calendar, Outlook, Apple Calendar, and every other client.
 * No OAuth required.
 */
export async function GET(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id, sessionId } = await context.params;
    const candidateId = parseInt(id, 10);
    const sessionIdNum = parseInt(sessionId, 10);

    const session = await queryOne<SessionRow>(
      'SELECT * FROM candidate_interview_sessions WHERE id = ? AND candidate_id = ?',
      [sessionIdNum, candidateId]
    );
    if (!session) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
    }

    if (!session.scheduled_at) {
      return NextResponse.json(
        { success: false, error: 'Session has no scheduled date/time' },
        { status: 400 }
      );
    }

    const candidate = await queryOne<Candidate>(
      'SELECT full_name, email FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    let jobTitle = 'Interview';
    const candidateWithJob = await queryOne<Candidate>(
      'SELECT job_id FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (candidateWithJob?.job_id) {
      const job = await queryOne<Job>('SELECT title FROM jobs WHERE id = ?', [candidateWithJob.job_id]);
      if (job) jobTitle = job.title;
    }

    // Get interviewer's email from admin_users
    const interviewer = await queryOne<AdminUserRow>(
      'SELECT username, email, full_name FROM admin_users WHERE username = ?',
      [session.interviewer_name]
    );

    // Build kit context if present
    let kitInfo = '';
    if (session.kit_id) {
      const kit = await queryOne<{ name: string; description: string | null; duration_minutes: number }>(
        'SELECT name, description, duration_minutes FROM interview_kits WHERE id = ?',
        [session.kit_id]
      );
      if (kit) {
        kitInfo = `\nInterview kit: ${kit.name}${kit.description ? '\n' + kit.description : ''}`;
      }
    }

    // Duration based on stage defaults
    const stageDurations: Record<string, number> = {
      screening: 30,
      technical: 90,
      systems: 60,
      culture: 45,
      final: 45,
    };
    const duration = stageDurations[session.stage] || 60;

    const stageLabel = session.stage.charAt(0).toUpperCase() + session.stage.slice(1);
    const attendees: Array<{ name: string; email: string }> = [];
    if (candidate.email) {
      attendees.push({ name: candidate.full_name, email: candidate.email });
    }
    if (interviewer?.email) {
      attendees.push({
        name: interviewer.full_name || interviewer.username,
        email: interviewer.email,
      });
    }

    const icsContent = generateIcs({
      uid: `interview-session-${sessionIdNum}@pcloud.careers`,
      summary: `${stageLabel} Interview: ${candidate.full_name} — ${jobTitle}`,
      description: `${stageLabel} interview with ${candidate.full_name} for the ${jobTitle} position.${kitInfo}\n\nCandidate link: /admin/candidates/${candidateId}`,
      location: 'To be confirmed',
      startIso: session.scheduled_at,
      durationMinutes: duration,
      organizerEmail: interviewer?.email || undefined,
      organizerName: interviewer?.full_name || interviewer?.username || 'pCloud Recruiting',
      attendees,
      url: `/admin/candidates/${candidateId}`,
    });

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'export',
      entityType: 'interview_session',
      entityId: sessionIdNum,
      details: { format: 'ics', candidate_id: candidateId },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    const filename = `interview-${stageLabel.toLowerCase()}-${candidate.full_name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
