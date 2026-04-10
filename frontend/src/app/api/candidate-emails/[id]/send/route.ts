import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { checkRateLimit, getClientIp as getRateLimitIp } from '@/lib/rate-limit';
import { sendEmail, isEmailConfigured, type EmailAttachment } from '@/lib/email';
import { generateIcs } from '@/lib/ics';
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
  status: string;
  session_id: number | null;
}

interface SessionRow {
  id: number;
  candidate_id: number;
  interviewer_name: string;
  stage: string;
  scheduled_at: string | null;
  location: string | null;
  meet_link: string | null;
  duration_minutes: number | null;
  kit_id: number | null;
}

interface InterviewerRow {
  username: string;
  email: string | null;
  full_name: string | null;
}

/**
 * POST /api/candidate-emails/[id]/send
 *
 * Marks an email as sent and records audit trail. Actual SMTP delivery is
 * handled by an external service (not configured in this environment yet —
 * this endpoint records the "sent" intent and status).
 *
 * When an SMTP provider (SendGrid, Resend, Postmark) is configured, this
 * endpoint should call the provider and only flip status to 'sent' on success.
 */
export async function POST(request: Request, context: RouteContext) {
  // Rate limit: max 20 emails per hour per user
  const ip = getRateLimitIp(request);
  const rl = checkRateLimit(`email-send:${ip}`, 20, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: `Rate limit exceeded. Retry after ${rl.retryAfter}s` },
      { status: 429 }
    );
  }

  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const emailId = parseInt(id, 10);

    const email = queryOne<EmailRow>('SELECT * FROM candidate_emails WHERE id = ?', [emailId]);
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email not found' }, { status: 404 });
    }
    if (email.status === 'sent') {
      return NextResponse.json(
        { success: false, error: 'Email already sent' },
        { status: 400 }
      );
    }

    // Permission check based on email type
    const permMap: Record<string, 'pipeline:send_offer' | 'pipeline:send_rejection' | 'interviews:schedule'> = {
      offer: 'pipeline:send_offer',
      rejection_post_interview: 'pipeline:send_rejection',
      rejection_after_screen: 'pipeline:send_rejection',
      rejection_polite: 'pipeline:send_rejection',
      interview_invite: 'interviews:schedule',
      reference_request: 'interviews:schedule',
      follow_up: 'pipeline:send_offer',
      status_update: 'pipeline:send_offer',
    };
    const requiredPerm = permMap[email.email_type];
    if (requiredPerm && !hasPermission(user.role, requiredPerm)) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    if (!email.subject || !email.body) {
      return NextResponse.json(
        { success: false, error: 'Email is missing subject or body' },
        { status: 400 }
      );
    }

    const candidate = queryOne<Candidate>(
      'SELECT id, full_name, email, job_id FROM candidates WHERE id = ?',
      [email.candidate_id]
    );
    if (!candidate || !candidate.email) {
      return NextResponse.json(
        { success: false, error: 'Candidate has no email address' },
        { status: 400 }
      );
    }

    // ─── Real email delivery via Resend ───
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Email provider is not configured. Set RESEND_API_KEY env var and verify your sending domain at resend.com.',
        },
        { status: 503 }
      );
    }

    // Build ICS attachment if this email is linked to an interview session.
    // Recipient gets a calendar invite they can import into Google/Outlook/Apple.
    const attachments: EmailAttachment[] = [];
    let templateSessionDetails: {
      stage: string;
      dateTime: string;
      duration: string;
      interviewer: string;
      location?: string;
      meetLink?: string;
    } | undefined;

    if (email.session_id) {
      const session = queryOne<SessionRow>(
        'SELECT * FROM candidate_interview_sessions WHERE id = ? AND candidate_id = ?',
        [email.session_id, email.candidate_id]
      );

      if (session && session.scheduled_at) {
        let jobTitle = 'Interview';
        if (candidate.job_id) {
          const job = queryOne<Job>('SELECT title FROM jobs WHERE id = ?', [candidate.job_id]);
          if (job) jobTitle = job.title;
        }

        const interviewer = queryOne<InterviewerRow>(
          'SELECT username, email, full_name FROM admin_users WHERE username = ?',
          [session.interviewer_name]
        );

        const stageDurations: Record<string, number> = {
          screening: 30,
          technical: 90,
          systems: 60,
          culture: 45,
          final: 45,
        };
        const duration = session.duration_minutes || stageDurations[session.stage] || 60;
        const stageLabel = session.stage.charAt(0).toUpperCase() + session.stage.slice(1);

        // Capture for HTML template
        templateSessionDetails = {
          stage: stageLabel,
          dateTime: new Date(session.scheduled_at).toLocaleString('en-GB', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
          }),
          duration: `${duration} minutes`,
          interviewer: interviewer?.full_name || interviewer?.username || session.interviewer_name,
          location: session.location || undefined,
          meetLink: session.meet_link || undefined,
        };

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
          uid: `interview-session-${session.id}@pcloud.careers`,
          summary: `${stageLabel} Interview: ${candidate.full_name} — ${jobTitle}`,
          description: `${stageLabel} interview with ${candidate.full_name} for the ${jobTitle} position.${
            session.meet_link ? '\n\nMeet link: ' + session.meet_link : ''
          }`,
          location: session.location || (session.meet_link ? 'Online' : 'To be confirmed'),
          startIso: session.scheduled_at,
          durationMinutes: duration,
          organizerEmail: interviewer?.email || undefined,
          organizerName: interviewer?.full_name || interviewer?.username || 'pCloud Recruiting',
          attendees,
        });

        attachments.push({
          filename: `interview-${stageLabel.toLowerCase()}.ics`,
          content: icsContent,
          contentType: 'text/calendar; charset=utf-8; method=REQUEST',
        });
      }
    }

    // Render branded HTML template
    const emailHtml = buildEmailHtml({
      emailType: email.email_type,
      subject: email.subject,
      body: email.body,
      candidateName: candidate.full_name,
      sessionDetails: templateSessionDetails,
    });

    const deliveryResult = await sendEmail({
      to: candidate.email,
      subject: email.subject,
      text: email.body,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (!deliveryResult.ok) {
      execute(
        `UPDATE candidate_emails SET status = 'failed', updated_at = datetime('now') WHERE id = ?`,
        [emailId]
      );

      logAudit({
        userId: user.userId,
        userUsername: user.username,
        userRole: user.role,
        action: 'email_sent',
        entityType: 'candidate',
        entityId: email.candidate_id,
        details: {
          email_id: emailId,
          email_type: email.email_type,
          to: candidate.email,
          status: 'failed',
          error: deliveryResult.error,
        },
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
      });

      return NextResponse.json(
        { success: false, error: `Email delivery failed: ${deliveryResult.error}` },
        { status: 502 }
      );
    }

    execute(
      `UPDATE candidate_emails SET
        status = 'sent',
        sent_at = datetime('now'),
        sent_by = ?,
        sent_to_email = ?
       WHERE id = ?`,
      [user.username, candidate.email, emailId]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'email_sent',
      entityType: 'candidate',
      entityId: email.candidate_id,
      details: {
        email_id: emailId,
        email_type: email.email_type,
        to: candidate.email,
        subject: email.subject,
        message_id: deliveryResult.messageId,
        ics_attached: attachments.length > 0,
        session_id: email.session_id,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        email_id: emailId,
        status: 'sent',
        sent_to: candidate.email,
        message_id: deliveryResult.messageId,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
