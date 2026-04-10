import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute, transaction } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { checkRateLimit, getClientIp as getRateLimitIp } from '@/lib/rate-limit';
import { deleteUploadedFile } from '@/lib/upload';
import type { Candidate } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/candidates/[id]/gdpr-delete
 *
 * GDPR "right to erasure" implementation. Permanently deletes:
 *   - candidate profile record
 *   - all notes, scorecards, references, history (via CASCADE)
 *   - all uploaded files (CV, attachments, task submissions) from disk
 *   - all AI analyses and AI audit log entries
 *   - all emails (draft and sent records, but keeps audit trail of deletion)
 *
 * The final audit log entry (this deletion) is KEPT to prove compliance.
 * All other data about the candidate is wiped.
 *
 * Only admin can perform GDPR deletion.
 */
export async function POST(request: Request, context: RouteContext) {
  // Rate limit: max 5 GDPR deletions per hour per IP (destructive operation)
  const ip = getRateLimitIp(request);
  const rl = checkRateLimit(`gdpr-delete:${ip}`, 5, 60 * 60 * 1000);
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
  if (!hasPermission(user.role, 'candidates:delete')) {
    return NextResponse.json(
      { success: false, error: 'Only admins can perform GDPR deletion' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    const candidate = queryOne<Candidate>(
      'SELECT id, full_name, email, cv_path FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    // Collect file paths to delete from disk
    const filesToDelete: string[] = [];
    if (candidate.cv_path) filesToDelete.push(candidate.cv_path);

    // Get attachment file paths
    const attachmentRows = queryAll<{ file_path: string }>(
      'SELECT file_path FROM candidate_attachments WHERE candidate_id = ?',
      [candidateId]
    );
    attachmentRows.forEach((a) => a.file_path && filesToDelete.push(a.file_path));

    const taskRows = queryAll<{ file_path: string | null }>(
      'SELECT file_path FROM candidate_task_submissions WHERE candidate_id = ?',
      [candidateId]
    );
    taskRows.forEach((t) => t.file_path && filesToDelete.push(t.file_path));

    // Delete everything in a transaction
    transaction(() => {
      // These CASCADE automatically: notes, scorecards, references, history,
      // attachments, sessions, analyses, emails, task_submissions
      execute('DELETE FROM candidates WHERE id = ?', [candidateId]);

      // Also wipe ai_audit_log entries for this candidate
      execute('DELETE FROM ai_audit_log WHERE candidate_id = ?', [candidateId]);
    });

    // Delete files from disk (after DB commit)
    const deletedFiles: string[] = [];
    const failedFiles: string[] = [];
    for (const filePath of filesToDelete) {
      try {
        const ok = deleteUploadedFile(filePath);
        if (ok) deletedFiles.push(filePath);
        else failedFiles.push(filePath);
      } catch {
        failedFiles.push(filePath);
      }
    }

    // Audit log entry is PERMANENTLY KEPT to prove GDPR compliance
    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'delete',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        gdpr: true,
        deleted_name: candidate.full_name,
        deleted_email: candidate.email,
        files_deleted: deletedFiles.length,
        files_failed: failedFiles.length,
        reason: 'GDPR right to erasure',
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        candidate_id: candidateId,
        files_deleted: deletedFiles.length,
        files_failed: failedFiles.length,
        message: 'All candidate data permanently deleted. Audit log retained for compliance proof.',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
