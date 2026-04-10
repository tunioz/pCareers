import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Candidate, CandidateWithJob, CandidateStatus } from '@/types';
import { CANDIDATE_STATUSES } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/applications/[id] — Legacy endpoint, reads from candidates table.
 */
export async function GET(request: Request, context: RouteContext) {
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
        { success: false, error: 'Invalid application ID' },
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
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/applications/[id] — Legacy endpoint, updates candidates table.
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
        { success: false, error: 'Invalid application ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Candidate>(
      'SELECT * FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.status || !CANDIDATE_STATUSES.includes(body.status as CandidateStatus)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${CANDIDATE_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    await execute(
      "UPDATE candidates SET status = ?, previous_status = ?, status_changed_at = datetime('now'), updated_at = datetime('now') WHERE id = ?",
      [body.status, existing.status, candidateId]
    );

    const updated = await queryOne<CandidateWithJob>(
      `SELECT c.*, j.title as job_title, j.slug as job_slug, j.department as job_department
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE c.id = ?`,
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/applications/[id] — Legacy endpoint, deletes from candidates table.
 */
export async function DELETE(request: Request, context: RouteContext) {
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
        { success: false, error: 'Invalid application ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    await execute('DELETE FROM candidates WHERE id = ?', [candidateId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Application deleted successfully' },
    });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
