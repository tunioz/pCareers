import { NextResponse } from 'next/server';
import { queryOne, queryAll } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { checkRateLimit, getClientIp as getRateLimitIp } from '@/lib/rate-limit';
import type { Candidate } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidates/[id]/gdpr-export
 *
 * Returns a complete JSON export of ALL data related to a candidate.
 * Required for GDPR "right to access" requests.
 *
 * Includes: profile, notes, scorecards, references, history, attachments,
 *           interview sessions, AI analyses, emails, audit log entries.
 *
 * Only admin and recruiter can generate GDPR exports.
 */
export async function GET(request: Request, context: RouteContext) {
  // Rate limit: max 10 GDPR exports per hour per IP
  const ip = getRateLimitIp(request);
  const rl = checkRateLimit(`gdpr-export:${ip}`, 10, 60 * 60 * 1000);
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
  if (!hasPermission(user.role, 'candidates:export_gdpr')) {
    return NextResponse.json(
      { success: false, error: 'Only admin and recruiter can export GDPR data' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    const candidate = queryOne<Candidate>(
      'SELECT * FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    const notes = queryAll(
      'SELECT * FROM candidate_notes WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const scores = queryAll(
      'SELECT * FROM candidate_scores WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const references = queryAll(
      'SELECT * FROM candidate_references WHERE candidate_id = ? ORDER BY requested_at',
      [candidateId]
    );
    const history = queryAll(
      'SELECT * FROM candidate_history WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const attachments = queryAll(
      'SELECT * FROM candidate_attachments WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const sessions = queryAll(
      'SELECT * FROM candidate_interview_sessions WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const analyses = queryAll(
      'SELECT * FROM candidate_analysis WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const emails = queryAll(
      'SELECT * FROM candidate_emails WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const taskSubmissions = queryAll(
      'SELECT * FROM candidate_task_submissions WHERE candidate_id = ? ORDER BY created_at',
      [candidateId]
    );
    const auditLogEntries = queryAll(
      `SELECT * FROM audit_log
       WHERE entity_type = 'candidate' AND entity_id = ?
       ORDER BY created_at`,
      [candidateId]
    );
    const aiAuditEntries = queryAll(
      `SELECT id, skill, user_username, model, tokens_in, tokens_out, cost_usd,
              success, created_at
       FROM ai_audit_log
       WHERE candidate_id = ?
       ORDER BY created_at`,
      [candidateId]
    );

    const exportData = {
      export_metadata: {
        generated_at: new Date().toISOString(),
        generated_by: user.username,
        purpose: 'GDPR data access request',
        candidate_id: candidateId,
        schema_version: '1.0',
      },
      candidate_profile: candidate,
      notes,
      scorecards: scores,
      references,
      status_history: history,
      attachments,
      interview_sessions: sessions,
      ai_analyses: analyses,
      emails,
      task_submissions: taskSubmissions,
      admin_audit_log: auditLogEntries,
      ai_audit_log: aiAuditEntries,
    };

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'export',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        gdpr: true,
        counts: {
          notes: notes.length,
          scorecards: scores.length,
          references: references.length,
          history: history.length,
          attachments: attachments.length,
          sessions: sessions.length,
          analyses: analyses.length,
          emails: emails.length,
          task_submissions: taskSubmissions.length,
        },
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    // Return as downloadable JSON file
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="gdpr-export-candidate-${candidateId}-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
