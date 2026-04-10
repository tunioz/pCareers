import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateCandidateUpdate } from '@/lib/validations';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { getAuthenticatedUser, stripSensitiveFields, hasPermission } from '@/lib/permissions';
import type { Candidate, CandidateWithJob, CandidateNote, CandidateScore, CandidateHistory } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidates/[id] — Get full candidate details (auth required)
 */
export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser();
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

    const candidate = await queryOne<CandidateWithJob>(
      `SELECT c.*, j.title as job_title, j.slug as job_slug, j.department as job_department
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE c.id = ?`,
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    // Strip salary and sensitive fields from interviewers
    const filteredCandidate = stripSensitiveFields(
      candidate as unknown as Record<string, unknown>,
      user.role
    ) as unknown as CandidateWithJob;

    // Get recent notes count
    const notesCount = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM candidate_notes WHERE candidate_id = ?',
      [candidateId]
    );

    // Get scores count
    const scoresCount = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM candidate_scores WHERE candidate_id = ?',
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...filteredCandidate,
        _counts: {
          notes: notesCount?.count || 0,
          scores: scoresCount?.count || 0,
        },
        _viewer_role: user.role,
        _can_see_salary: hasPermission(user.role, 'candidates:view_salary'),
      },
    });
  } catch (error) {
    console.error('Get candidate error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/candidates/[id] — Update candidate (auth required)
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
    const validation = validateCandidateUpdate(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const updates = validation.data;

    // Build dynamic UPDATE query
    const setClauses: string[] = [];
    const params: unknown[] = [];

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        setClauses.push(`${key} = ?`);
        params.push(value === '' ? null : value);
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    setClauses.push("updated_at = datetime('now')");
    params.push(candidateId);

    await execute(
      `UPDATE candidates SET ${setClauses.join(', ')} WHERE id = ?`,
      params
    );

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
      action: 'update',
      entityType: 'candidate',
      entityId: candidateId,
      details: { fields: Object.keys(validation.data!) },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update candidate error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/candidates/[id] — Delete candidate (auth required)
 */
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    if (!hasPermission(user.role, 'candidates:delete')) {
      return NextResponse.json(
        { success: false, error: 'Only admins can delete candidates' },
        { status: 403 }
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
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    // Fetch identifying info before deleting for audit trail
    const fullRecord = await queryOne<Candidate>(
      'SELECT full_name, email, status, job_id FROM candidates WHERE id = ?',
      [candidateId]
    );

    // CASCADE will delete notes, scores, references, history, attachments
    await execute('DELETE FROM candidates WHERE id = ?', [candidateId]);

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'delete',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        deleted_name: fullRecord?.full_name,
        deleted_email: fullRecord?.email,
        last_status: fullRecord?.status,
        job_id: fullRecord?.job_id,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Candidate deleted successfully' },
    });
  } catch (error) {
    console.error('Delete candidate error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
