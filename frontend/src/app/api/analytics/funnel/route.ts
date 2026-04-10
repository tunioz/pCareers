import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryAll, queryOne } from '@/lib/db';

/**
 * GET /api/analytics/funnel
 *
 * Returns hiring funnel metrics:
 *  - Stage-by-stage counts
 *  - Conversion rates between consecutive stages
 *  - Velocity (avg days in stage)
 *  - Source quality (hire rate by source)
 *  - Time to hire distribution
 *
 * Query params:
 *  - job_id (optional): scope to one job
 *  - date_from (optional): YYYY-MM-DD, default = 6 months ago
 *  - date_to (optional): YYYY-MM-DD, default = today
 */
export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('job_id');
    const dateFrom =
      searchParams.get('date_from') ||
      new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const dateTo = searchParams.get('date_to') || new Date().toISOString().slice(0, 10);

    const whereClauses: string[] = ['created_at >= ?', 'created_at <= ?'];
    const params: unknown[] = [dateFrom, dateTo + ' 23:59:59'];

    if (jobId) {
      whereClauses.push('job_id = ?');
      params.push(parseInt(jobId, 10));
    }

    const whereSql = whereClauses.join(' AND ');

    // ─── Stage counts ───
    // We approximate the funnel by counting candidates whose status REACHED
    // or passed each stage. Rejected candidates still count toward the stage
    // they reached.
    const stageCounts = await queryAll<{ status: string; count: number }>(
      `SELECT status, COUNT(*) as count
       FROM candidates
       WHERE ${whereSql}
       GROUP BY status`,
      params
    );

    // Derive reached-stage counts by looking at candidate_history
    const historyCounts = await queryAll<{ to_status: string; count: number }>(
      `SELECT to_status, COUNT(DISTINCT candidate_id) as count
       FROM candidate_history
       WHERE candidate_id IN (
         SELECT id FROM candidates WHERE ${whereSql}
       )
       AND to_status IS NOT NULL
       GROUP BY to_status`,
      params
    );

    // Map stage progression
    const STAGES = ['new', 'screening', 'interview', 'offer', 'hired'] as const;

    // Build "reached" counts: for each stage, how many candidates touched it
    const reachedCounts: Record<string, number> = {};
    STAGES.forEach((s) => (reachedCounts[s] = 0));

    // History-based reached counts
    for (const row of historyCounts) {
      if (row.to_status && row.to_status in reachedCounts) {
        reachedCounts[row.to_status] += row.count;
      }
    }

    // Add candidates still in status (not yet in history with this status transition)
    for (const row of stageCounts) {
      if (row.status in reachedCounts) {
        reachedCounts[row.status] = Math.max(reachedCounts[row.status], row.count);
      }
    }

    // The "new" stage equals total applications minus those that skipped directly
    const totalRow = await queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM candidates WHERE ${whereSql}`,
      params
    );
    const total = totalRow?.total || 0;
    reachedCounts['new'] = total;

    // ─── Conversion rates ───
    const conversions: Array<{
      from: string;
      to: string;
      from_count: number;
      to_count: number;
      rate: number;
    }> = [];
    for (let i = 0; i < STAGES.length - 1; i++) {
      const from = STAGES[i];
      const to = STAGES[i + 1];
      const fromCount = reachedCounts[from] || 0;
      const toCount = reachedCounts[to] || 0;
      const rate = fromCount > 0 ? toCount / fromCount : 0;
      conversions.push({ from, to, from_count: fromCount, to_count: toCount, rate });
    }

    // ─── Source quality ───
    const sourceStats = await queryAll<{
      source: string;
      applications: number;
      hired: number;
    }>(
      `SELECT
         COALESCE(source, 'Unknown') as source,
         COUNT(*) as applications,
         SUM(CASE WHEN status = 'hired' THEN 1 ELSE 0 END) as hired
       FROM candidates
       WHERE ${whereSql}
       GROUP BY COALESCE(source, 'Unknown')
       ORDER BY applications DESC`,
      params
    );

    const sourceQuality = sourceStats.map((row) => ({
      source: row.source,
      applications: row.applications,
      hired: row.hired,
      hire_rate: row.applications > 0 ? row.hired / row.applications : 0,
    }));

    // ─── Rejection reasons ───
    const rejectionReasons = await queryAll<{ rejection_reason: string; count: number }>(
      `SELECT
         COALESCE(rejection_reason, 'Not specified') as rejection_reason,
         COUNT(*) as count
       FROM candidates
       WHERE ${whereSql} AND status = 'rejected'
       GROUP BY COALESCE(rejection_reason, 'Not specified')
       ORDER BY count DESC`,
      params
    );

    // ─── Time to hire (for hired candidates) ───
    const timeToHireRows = await queryAll<{ days: number }>(
      `SELECT
         CAST(EXTRACT(EPOCH FROM (status_changed_at::timestamp - created_at::timestamp)) / 86400 AS INTEGER) as days
       FROM candidates
       WHERE ${whereSql} AND status = 'hired'`,
      params
    );

    const timeToHireDays = timeToHireRows
      .map((r) => r.days)
      .filter((d) => d !== null && d >= 0) as number[];

    const timeToHire = {
      hired_count: timeToHireDays.length,
      avg_days:
        timeToHireDays.length > 0
          ? timeToHireDays.reduce((a, b) => a + b, 0) / timeToHireDays.length
          : 0,
      median_days: timeToHireDays.length > 0 ? timeToHireDays.sort((a, b) => a - b)[Math.floor(timeToHireDays.length / 2)] : 0,
      min_days: timeToHireDays.length > 0 ? Math.min(...timeToHireDays) : 0,
      max_days: timeToHireDays.length > 0 ? Math.max(...timeToHireDays) : 0,
    };

    const response = NextResponse.json({
      success: true,
      data: {
        filter: { job_id: jobId ? parseInt(jobId, 10) : null, date_from: dateFrom, date_to: dateTo },
        total_applications: total,
        pipeline: {
          stage_counts: reachedCounts,
          current_status_counts: Object.fromEntries(stageCounts.map((s) => [s.status, s.count])),
          conversions,
        },
        source_quality: sourceQuality,
        rejection_reasons: rejectionReasons,
        time_to_hire: timeToHire,
      },
    });
    // Cache analytics for 5 minutes (auth-gated, private cache only)
    response.headers.set('Cache-Control', 'private, max-age=300');
    return response;
  } catch (error) {
    console.error('Funnel analytics error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
