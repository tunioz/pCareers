import { NextResponse } from 'next/server';
import { queryAll } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

interface CalendarEntry {
  id: number;
  full_name: string;
  status: string;
  job_title: string | null;
  date: string;
  type: 'interview' | 'task_deadline';
}

/**
 * GET /api/candidates/calendar — Get calendar entries for a given month
 * Query params: year, month (both required)
 */
export async function GET(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || '', 10);
    const month = parseInt(searchParams.get('month') || '', 10);

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json({ success: false, error: 'Valid year and month are required' }, { status: 400 });
    }

    const monthStr = String(month).padStart(2, '0');
    const startDate = `${year}-${monthStr}-01`;
    // Calculate end of month
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${monthStr}-${String(lastDay).padStart(2, '0')}`;

    // Candidates in interview stages with status_changed_at in this month
    const interviewStatuses = ['phone_screen', 'technical', 'team_interview', 'culture_chat'];
    const placeholders = interviewStatuses.map(() => '?').join(',');

    const candidates = queryAll<{
      id: number;
      full_name: string;
      status: string;
      status_changed_at: string;
      job_title: string | null;
    }>(
      `SELECT c.id, c.full_name, c.status, c.status_changed_at, j.title as job_title
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE c.status IN (${placeholders})
         AND c.status_changed_at >= ?
         AND c.status_changed_at <= ?
       ORDER BY c.status_changed_at ASC`,
      [...interviewStatuses, startDate, endDate + ' 23:59:59']
    );

    // Task deadlines in this month
    const tasks = queryAll<{
      id: number;
      candidate_id: number;
      candidate_name: string;
      deadline: string;
      job_title: string | null;
    }>(
      `SELECT cts.id, cts.candidate_id, c.full_name as candidate_name,
              cts.deadline, j.title as job_title
       FROM candidate_task_submissions cts
       JOIN candidates c ON cts.candidate_id = c.id
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE cts.deadline >= ? AND cts.deadline <= ?
         AND cts.status = 'pending'
       ORDER BY cts.deadline ASC`,
      [startDate, endDate + ' 23:59:59']
    );

    const entries: CalendarEntry[] = [];

    for (const c of candidates) {
      entries.push({
        id: c.id,
        full_name: c.full_name,
        status: c.status,
        job_title: c.job_title,
        date: c.status_changed_at.substring(0, 10),
        type: 'interview',
      });
    }

    for (const t of tasks) {
      entries.push({
        id: t.candidate_id,
        full_name: t.candidate_name,
        status: 'task_deadline',
        job_title: t.job_title,
        date: t.deadline.substring(0, 10),
        type: 'task_deadline',
      });
    }

    // Group by date
    const grouped: Record<string, CalendarEntry[]> = {};
    for (const entry of entries) {
      if (!grouped[entry.date]) grouped[entry.date] = [];
      grouped[entry.date].push(entry);
    }

    return NextResponse.json({ success: true, data: grouped });
  } catch (error) {
    console.error('Get calendar entries error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
