import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';

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
  ai_generated: number;
  sent_at: string | null;
  sent_by: string | null;
  sent_to_email: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await context.params;
  const emailId = parseInt(id, 10);

  const email = queryOne<EmailRow>('SELECT * FROM candidate_emails WHERE id = ?', [emailId]);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Email not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: email });
}

export async function PUT(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const emailId = parseInt(id, 10);
    const body = await request.json();

    const existing = queryOne<EmailRow>('SELECT * FROM candidate_emails WHERE id = ?', [emailId]);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Email not found' }, { status: 404 });
    }
    if (existing.status === 'sent') {
      return NextResponse.json(
        { success: false, error: 'Cannot edit a sent email' },
        { status: 400 }
      );
    }

    execute(
      `UPDATE candidate_emails SET
        subject = COALESCE(?, subject),
        body = COALESCE(?, body),
        updated_at = datetime('now')
       WHERE id = ?`,
      [body.subject ?? null, body.body ?? null, emailId]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'update',
      entityType: 'candidate',
      entityId: existing.candidate_id,
      details: { sub_entity: 'email', email_id: emailId },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    const updated = queryOne<EmailRow>('SELECT * FROM candidate_emails WHERE id = ?', [emailId]);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }
  if (!hasPermission(user.role, 'candidates:edit')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await context.params;
  const emailId = parseInt(id, 10);
  const existing = queryOne<EmailRow>('SELECT candidate_id FROM candidate_emails WHERE id = ?', [emailId]);

  execute('DELETE FROM candidate_emails WHERE id = ?', [emailId]);

  logAudit({
    userId: user.userId,
    userUsername: user.username,
    userRole: user.role,
    action: 'delete',
    entityType: 'candidate',
    entityId: existing?.candidate_id ?? null,
    details: { sub_entity: 'email', email_id: emailId },
    ipAddress: getClientIp(request),
    userAgent: getUserAgent(request),
  });

  return NextResponse.json({ success: true });
}
