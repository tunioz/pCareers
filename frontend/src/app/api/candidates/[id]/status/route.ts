import { NextResponse } from 'next/server';
import { queryOne, execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Candidate, CandidateWithJob, CandidateStatus } from '@/types';
import { CANDIDATE_STATUSES } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/candidates/[id]/status — Change candidate pipeline status (auth required)
 * Body: { status, rejection_reason?, rejection_notes?, keep_in_talent_pool?, notes? }
 */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Candidate>(
      'SELECT * FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const newStatus = body.status as CandidateStatus;

    if (!newStatus || !CANDIDATE_STATUSES.includes(newStatus)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${CANDIDATE_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    if (newStatus === existing.status) {
      return NextResponse.json(
        { success: false, error: 'Candidate is already in this status' },
        { status: 400 }
      );
    }

    // If rejecting, validate rejection fields
    if (newStatus === 'rejected') {
      if (!body.rejection_reason || typeof body.rejection_reason !== 'string' || body.rejection_reason.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: 'Rejection reason is required when rejecting a candidate' },
          { status: 400 }
        );
      }
    }

    await transaction(async () => {
      // Update candidate status
      const updateFields: string[] = [
        'status = ?',
        'previous_status = ?',
        "status_changed_at = datetime('now')",
        "updated_at = datetime('now')",
      ];
      const updateParams: unknown[] = [newStatus, existing.status];

      // Handle rejection-specific fields
      if (newStatus === 'rejected') {
        updateFields.push('rejection_reason = ?');
        updateParams.push(body.rejection_reason?.trim() || null);
        updateFields.push('rejection_notes = ?');
        updateParams.push(body.rejection_notes?.trim() || null);
        updateFields.push('keep_in_talent_pool = ?');
        updateParams.push(body.keep_in_talent_pool ? 1 : 0);
      }

      // If moving away from rejected, clear rejection fields
      if (existing.status === 'rejected' && newStatus !== 'rejected') {
        updateFields.push('rejection_reason = NULL');
        updateFields.push('rejection_notes = NULL');
        updateFields.push('keep_in_talent_pool = 0');
      }

      updateParams.push(candidateId);

      await execute(
        `UPDATE candidates SET ${updateFields.join(', ')} WHERE id = ?`,
        updateParams
      );

      // Create history log entry
      await execute(
        `INSERT INTO candidate_history (candidate_id, action, from_status, to_status, performed_by, notes)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          candidateId,
          'status_changed',
          existing.status,
          newStatus,
          user.username,
          body.notes?.trim() || `Status changed from ${existing.status} to ${newStatus}`,
        ]
      );
    });

    const updated = await queryOne<CandidateWithJob>(
      `SELECT c.*, j.title as job_title, j.slug as job_slug, j.department as job_department
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE c.id = ?`,
      [candidateId]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'status_change',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        from: existing.status,
        to: newStatus,
        rejection_reason: newStatus === 'rejected' ? body.rejection_reason : null,
        notes: body.notes,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update candidate status error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
