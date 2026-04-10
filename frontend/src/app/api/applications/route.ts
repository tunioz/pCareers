import { NextResponse } from 'next/server';
import { queryAll, queryOne } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { CandidateWithJob } from '@/types';

/**
 * GET /api/applications — Legacy endpoint, now reads from candidates table.
 * Redirects to /api/candidates logic for backward compatibility.
 */
export async function GET(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get('perPage') || '20', 10)));
    const status = searchParams.get('status');
    const jobId = searchParams.get('jobId');

    const whereClauses: string[] = [];
    const queryParams: unknown[] = [];

    if (status) {
      whereClauses.push('c.status = ?');
      queryParams.push(status);
    }

    if (jobId) {
      whereClauses.push('c.job_id = ?');
      queryParams.push(parseInt(jobId, 10));
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = await queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM candidates c ${whereSQL}`,
      queryParams
    );
    const total = countResult?.total || 0;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;

    const candidates = await queryAll<CandidateWithJob>(
      `SELECT c.*, j.title as job_title, j.slug as job_slug, j.department as job_department
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       ${whereSQL}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, perPage, offset]
    );

    return NextResponse.json({
      success: true,
      data: candidates,
      meta: {
        page,
        perPage,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
