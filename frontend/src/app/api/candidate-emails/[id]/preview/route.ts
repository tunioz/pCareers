import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/permissions';
import { buildEmailHtml } from '@/lib/email-templates';
import type { Candidate, Job } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface EmailRow {
  id: number;
  candidate_id: number;
  email_type: string;
  subject: string | null;
  body: string | null;
  session_id: number | null;
}

interface SessionRow {
  id: number;
  stage: string;
  scheduled_at: string | null;
  location: string | null;
  meet_link: string | null;
  duration_minutes: number | null;
  interviewer_name: string;
}

interface InterviewerRow {
  username: string;
  full_name: string | null;
}

/**
 * GET /api/candidate-emails/[id]/preview
 *
 * Returns the branded HTML preview of an email draft.
 * Used by the admin panel to show a "Preview" before sending.
 */
export async function GET(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const emailId = parseInt(id, 10);

    const email = await queryOne<EmailRow>(
      'SELECT id, candidate_id, email_type, subject, body, session_id FROM candidate_emails WHERE id = ?',
      [emailId]
    );
    if (!email || !email.body) {
      return NextResponse.json({ success: false, error: 'Email not found' }, { status: 404 });
    }

    const candidate = await queryOne<Candidate>(
      'SELECT id, full_name, job_id FROM candidates WHERE id = ?',
      [email.candidate_id]
    );

    // Build session details for interview invites
    let sessionDetails: {
      stage: string;
      dateTime: string;
      duration: string;
      interviewer: string;
      location?: string;
      meetLink?: string;
    } | undefined;

    if (email.session_id) {
      const session = await queryOne<SessionRow>(
        'SELECT id, stage, scheduled_at, location, meet_link, duration_minutes, interviewer_name FROM candidate_interview_sessions WHERE id = ?',
        [email.session_id]
      );

      if (session?.scheduled_at) {
        const interviewer = await queryOne<InterviewerRow>(
          'SELECT username, full_name FROM admin_users WHERE username = ?',
          [session.interviewer_name]
        );
        const stageDurations: Record<string, number> = {
          screening: 30, technical: 90, systems: 60, culture: 45, final: 45,
        };
        const duration = session.duration_minutes || stageDurations[session.stage] || 60;

        sessionDetails = {
          stage: session.stage.charAt(0).toUpperCase() + session.stage.slice(1),
          dateTime: new Date(session.scheduled_at).toLocaleString('en-GB', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
          }),
          duration: `${duration} minutes`,
          interviewer: interviewer?.full_name || interviewer?.username || session.interviewer_name,
          location: session.location || undefined,
          meetLink: session.meet_link || undefined,
        };
      }
    }

    const html = buildEmailHtml({
      emailType: email.email_type,
      subject: email.subject || '',
      body: email.body,
      candidateName: candidate?.full_name,
      sessionDetails,
    });

    // Return raw HTML for iframe preview
    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
