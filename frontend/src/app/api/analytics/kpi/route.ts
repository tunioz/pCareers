import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryAll, queryOne } from '@/lib/db';

/**
 * GET /api/analytics/kpi
 *
 * Comprehensive KPI dashboard data:
 *  - Time-to-hire (overall + per job)
 *  - Source breakdown with hire rates
 *  - Stage conversion rates (full pipeline)
 *  - Offer acceptance rate
 *  - Active pipeline snapshot
 *  - Monthly trends (applications, hires)
 *  - Avg time per stage
 */
export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const months = parseInt(searchParams.get('months') || '6', 10);
    const dateFrom = new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // ─── 1. Summary cards ───
    const totalCandidates = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM candidates WHERE is_archived = 0 AND created_at >= ?`,
      [dateFrom]
    )?.count || 0;

    const totalHired = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM candidates WHERE status = 'hired' AND is_archived = 0 AND created_at >= ?`,
      [dateFrom]
    )?.count || 0;

    const totalRejected = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM candidates WHERE status = 'rejected' AND is_archived = 0 AND created_at >= ?`,
      [dateFrom]
    )?.count || 0;

    const openJobs = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM jobs WHERE is_published = 1`
    )?.count || 0;

    // Active pipeline: candidates not in terminal states
    const activePipeline = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM candidates
       WHERE is_archived = 0 AND status NOT IN ('hired', 'rejected', 'withdrawn')
       AND created_at >= ?`,
      [dateFrom]
    )?.count || 0;

    // ─── 2. Time-to-hire (overall) ───
    const tthRows = queryAll<{ days: number }>(
      `SELECT CAST(julianday(h.created_at) - julianday(c.created_at) AS INTEGER) as days
       FROM candidates c
       JOIN candidate_history h ON h.candidate_id = c.id AND h.to_status = 'hired'
       WHERE c.status = 'hired' AND c.is_archived = 0 AND c.created_at >= ?`,
      [dateFrom]
    );
    const tthDays = tthRows.map(r => r.days).filter(d => d != null && d >= 0);
    const sortedTth = [...tthDays].sort((a, b) => a - b);

    const timeToHire = {
      count: tthDays.length,
      avg: tthDays.length > 0 ? Math.round(tthDays.reduce((a, b) => a + b, 0) / tthDays.length) : 0,
      median: tthDays.length > 0 ? sortedTth[Math.floor(sortedTth.length / 2)] : 0,
      min: tthDays.length > 0 ? sortedTth[0] : 0,
      max: tthDays.length > 0 ? sortedTth[sortedTth.length - 1] : 0,
    };

    // ─── 3. Time-to-hire per job ───
    const tthByJob = queryAll<{ job_id: number; job_title: string; avg_days: number; hired_count: number }>(
      `SELECT
         j.id as job_id,
         j.title as job_title,
         ROUND(AVG(CAST(julianday(h.created_at) - julianday(c.created_at) AS REAL)), 0) as avg_days,
         COUNT(*) as hired_count
       FROM candidates c
       JOIN jobs j ON j.id = c.job_id
       JOIN candidate_history h ON h.candidate_id = c.id AND h.to_status = 'hired'
       WHERE c.status = 'hired' AND c.is_archived = 0 AND c.created_at >= ?
       GROUP BY j.id
       ORDER BY hired_count DESC`,
      [dateFrom]
    );

    // ─── 4. Offer acceptance rate ───
    const offersExtended = queryOne<{ count: number }>(
      `SELECT COUNT(DISTINCT candidate_id) as count
       FROM candidate_history
       WHERE to_status = 'offer'
       AND candidate_id IN (SELECT id FROM candidates WHERE created_at >= ?)`,
      [dateFrom]
    )?.count || 0;

    const offersAccepted = queryOne<{ count: number }>(
      `SELECT COUNT(DISTINCT candidate_id) as count
       FROM candidate_history
       WHERE from_status = 'offer' AND to_status = 'hired'
       AND candidate_id IN (SELECT id FROM candidates WHERE created_at >= ?)`,
      [dateFrom]
    )?.count || 0;

    const offerAcceptanceRate = offersExtended > 0
      ? Math.round((offersAccepted / offersExtended) * 1000) / 10
      : 0;

    // ─── 5. Source breakdown ───
    const sources = queryAll<{ source: string; total: number; hired: number; in_pipeline: number }>(
      `SELECT
         COALESCE(source, 'Direct') as source,
         COUNT(*) as total,
         SUM(CASE WHEN status = 'hired' THEN 1 ELSE 0 END) as hired,
         SUM(CASE WHEN status NOT IN ('hired', 'rejected', 'withdrawn') THEN 1 ELSE 0 END) as in_pipeline
       FROM candidates
       WHERE is_archived = 0 AND created_at >= ?
       GROUP BY COALESCE(source, 'Direct')
       ORDER BY total DESC`,
      [dateFrom]
    ).map(s => ({
      ...s,
      hire_rate: s.total > 0 ? Math.round((s.hired / s.total) * 1000) / 10 : 0,
    }));

    // ─── 6. Stage conversion rates (full pipeline) — single queries ───
    const STAGES = ['new', 'screening', 'phone_screen', 'technical', 'team_interview', 'culture_chat', 'offer', 'hired'];

    const kpiStageTotals = queryAll<{ stage: string; count: number }>(
      `SELECT stage, COUNT(DISTINCT candidate_id) as count FROM (
        SELECT from_status as stage, candidate_id FROM candidate_history WHERE from_status IS NOT NULL AND candidate_id IN (SELECT id FROM candidates WHERE created_at >= ?)
        UNION ALL
        SELECT to_status as stage, candidate_id FROM candidate_history WHERE to_status IS NOT NULL AND candidate_id IN (SELECT id FROM candidates WHERE created_at >= ?)
      ) GROUP BY stage`,
      [dateFrom, dateFrom]
    );
    const kpiStageTotalMap: Record<string, number> = {};
    for (const row of kpiStageTotals) kpiStageTotalMap[row.stage] = row.count;

    const kpiTransitions = queryAll<{ from_status: string; to_status: string; count: number }>(
      `SELECT from_status, to_status, COUNT(DISTINCT candidate_id) as count
       FROM candidate_history
       WHERE from_status IS NOT NULL AND to_status IS NOT NULL
       AND candidate_id IN (SELECT id FROM candidates WHERE created_at >= ?)
       GROUP BY from_status, to_status`,
      [dateFrom]
    );
    const kpiTransMap: Record<string, number> = {};
    for (const row of kpiTransitions) kpiTransMap[`${row.from_status}->${row.to_status}`] = row.count;

    const conversions: Array<{ from: string; to: string; moved: number; total: number; rate: number }> = [];
    for (let i = 0; i < STAGES.length - 1; i++) {
      const from = STAGES[i];
      const to = STAGES[i + 1];
      const fromCount = kpiStageTotalMap[from] || 0;
      const movedCount = kpiTransMap[`${from}->${to}`] || 0;
      conversions.push({
        from,
        to,
        moved: movedCount,
        total: fromCount || totalCandidates,
        rate: fromCount > 0 ? Math.round((movedCount / fromCount) * 1000) / 10 : 0,
      });
    }

    // ─── 7. Monthly trends ───
    const monthlyTrends = queryAll<{
      month: string;
      applications: number;
      hired: number;
      rejected: number;
    }>(
      `SELECT
         strftime('%Y-%m', created_at) as month,
         COUNT(*) as applications,
         SUM(CASE WHEN status = 'hired' THEN 1 ELSE 0 END) as hired,
         SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
       FROM candidates
       WHERE created_at >= ? AND is_archived = 0
       GROUP BY strftime('%Y-%m', created_at)
       ORDER BY month ASC`,
      [dateFrom]
    );

    // ─── 8. Pipeline by status ───
    const pipelineByStatus = queryAll<{ status: string; count: number }>(
      `SELECT status, COUNT(*) as count
       FROM candidates
       WHERE is_archived = 0 AND created_at >= ?
       GROUP BY status
       ORDER BY
         CASE status
           WHEN 'new' THEN 1 WHEN 'screening' THEN 2 WHEN 'phone_screen' THEN 3
           WHEN 'technical' THEN 4 WHEN 'team_interview' THEN 5 WHEN 'culture_chat' THEN 6
           WHEN 'offer' THEN 7 WHEN 'hired' THEN 8 WHEN 'rejected' THEN 9
           WHEN 'on_hold' THEN 10 WHEN 'withdrawn' THEN 11
         END`,
      [dateFrom]
    );

    // ─── 9. Avg time per stage ───
    const stageVelocity = queryAll<{ stage: string; avg_days: number }>(
      `SELECT
         from_status as stage,
         ROUND(AVG(CAST(julianday(
           (SELECT MIN(h2.created_at) FROM candidate_history h2
            WHERE h2.candidate_id = h1.candidate_id AND h2.created_at > h1.created_at)
         ) - julianday(h1.created_at) AS REAL)), 1) as avg_days
       FROM candidate_history h1
       WHERE from_status IN ('new', 'screening', 'phone_screen', 'technical', 'team_interview', 'culture_chat', 'offer')
       AND candidate_id IN (SELECT id FROM candidates WHERE created_at >= ?)
       GROUP BY from_status`,
      [dateFrom]
    ).filter(sv => sv.avg_days != null && sv.avg_days >= 0);

    // ─── 10. Top jobs by candidates ───
    const topJobs = queryAll<{ job_id: number; title: string; candidates: number; hired: number; active: number }>(
      `SELECT
         j.id as job_id,
         j.title,
         COUNT(c.id) as candidates,
         SUM(CASE WHEN c.status = 'hired' THEN 1 ELSE 0 END) as hired,
         SUM(CASE WHEN c.status NOT IN ('hired', 'rejected', 'withdrawn') THEN 1 ELSE 0 END) as active
       FROM jobs j
       LEFT JOIN candidates c ON c.job_id = j.id AND c.is_archived = 0 AND c.created_at >= ?
       WHERE j.is_published = 1
       GROUP BY j.id
       ORDER BY candidates DESC
       LIMIT 10`,
      [dateFrom]
    );

    return NextResponse.json({
      success: true,
      data: {
        period: { months, date_from: dateFrom },
        summary: {
          total_candidates: totalCandidates,
          total_hired: totalHired,
          total_rejected: totalRejected,
          open_jobs: openJobs,
          active_pipeline: activePipeline,
          offer_acceptance_rate: offerAcceptanceRate,
        },
        time_to_hire: timeToHire,
        time_to_hire_by_job: tthByJob,
        sources,
        conversions,
        monthly_trends: monthlyTrends,
        pipeline_by_status: pipelineByStatus,
        stage_velocity: stageVelocity,
        top_jobs: topJobs,
      },
    });
  } catch (error) {
    console.error('KPI analytics error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
