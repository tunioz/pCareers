import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Candidate } from '@/types';

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
      'SELECT email FROM candidates WHERE id = ?',
      [email.candidate_id]
    );
    if (!candidate || !candidate.email) {
      return NextResponse.json(
        { success: false, error: 'Candidate has no email address' },
        { status: 400 }
      );
    }

    // ─── SMTP delivery hook ───
    // TODO: Integrate with SendGrid/Resend/Postmark. For now, we just record
    // that the email was "sent" by this user. The actual delivery will be a
    // separate configuration step once an SMTP provider is chosen.
    //
    // Example integration (commented):
    //   await sendViaResend({
    //     to: candidate.email,
    //     subject: email.subject,
    //     text: email.body,
    //     from: 'careers@pcloud.com',
    //   });

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
        note: 'Email marked as sent. SMTP provider integration is pending (configure SendGrid/Resend/Postmark).',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
