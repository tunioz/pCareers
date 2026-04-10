import { NextResponse } from 'next/server';
import { queryAll } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/candidates/export — Export candidates as CSV
 * Query params: status, job_id, source, search (same as list)
 */
export async function GET(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const jobId = searchParams.get('job_id');
    const source = searchParams.get('source');
    const search = searchParams.get('search');

    const whereClauses: string[] = ['c.is_archived = 0'];
    const queryParams: unknown[] = [];

    if (status) {
      whereClauses.push('c.status = ?');
      queryParams.push(status);
    }
    if (jobId) {
      whereClauses.push('c.job_id = ?');
      queryParams.push(parseInt(jobId, 10));
    }
    if (source) {
      whereClauses.push('c.source = ?');
      queryParams.push(source);
    }
    if (search) {
      whereClauses.push('(c.full_name LIKE ? OR c.email LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const candidates = await queryAll<{
      full_name: string;
      email: string;
      job_title: string | null;
      status: string;
      composite_score: number | null;
      source: string;
      created_at: string;
      work_model: string;
      phone: string | null;
    }>(
      `SELECT c.full_name, c.email, j.title as job_title, c.status,
              c.composite_score, c.source, c.created_at, c.work_model, c.phone
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       ${whereSQL}
       ORDER BY c.created_at DESC`,
      queryParams
    );

    // Build CSV
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Status', 'Score', 'Source', 'Applied Date', 'Work Model'];
    const escapeCSV = (val: string | null | undefined) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };

    const rows = candidates.map((c) => [
      escapeCSV(c.full_name),
      escapeCSV(c.email),
      escapeCSV(c.phone),
      escapeCSV(c.job_title || 'General Application'),
      escapeCSV(c.status),
      c.composite_score !== null ? String(c.composite_score) : '',
      escapeCSV(c.source),
      escapeCSV(c.created_at.substring(0, 10)),
      escapeCSV(c.work_model),
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="candidates-${new Date().toISOString().substring(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export candidates error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
