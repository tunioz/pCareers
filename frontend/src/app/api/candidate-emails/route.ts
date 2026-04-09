import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/permissions';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';

/**
 * GET /api/candidate-emails?candidate_id=N
 * List emails for a candidate (drafts + sent).
 *
 * POST /api/candidate-emails
 * Create a manual (non-AI) email draft.
 */

export interface CandidateEmailRow {
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

export async function GET(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const candidateIdParam = searchParams.get('candidate_id');
  if (!candidateIdParam) {
    return NextResponse.json({ success: false, error: 'candidate_id is required' }, { status: 400 });
  }

  const candidateId = parseInt(candidateIdParam, 10);
  const rows = queryAll<CandidateEmailRow>(
    `SELECT * FROM candidate_emails WHERE candidate_id = ? ORDER BY created_at DESC`,
    [candidateId]
  );

  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.candidate_id || !body.email_type) {
      return NextResponse.json(
        { success: false, error: 'candidate_id and email_type are required' },
        { status: 400 }
      );
    }

    const result = execute(
      `INSERT INTO candidate_emails (
        candidate_id, email_type, subject, body, status, ai_generated, created_by
      ) VALUES (?, ?, ?, ?, 'draft', 0, ?)`,
      [
        body.candidate_id,
        body.email_type,
        body.subject || null,
        body.body || null,
        user.username,
      ]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'create',
      entityType: 'candidate',
      entityId: body.candidate_id,
      details: { sub_entity: 'email', email_type: body.email_type, id: result.lastInsertRowid },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    const created = queryOne<CandidateEmailRow>(
      'SELECT * FROM candidate_emails WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
