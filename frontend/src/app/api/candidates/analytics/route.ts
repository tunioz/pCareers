import { NextResponse } from 'next/server';
import { queryAll, queryOne } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/candidates/analytics — Returns analytics data for the ATS dashboard (auth required)
 */
export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Pipeline counts: candidates per status
    const pipeline_counts = queryAll<{ status: string; count: number }>(
      `SELECT status, COUNT(*) as count FROM candidates WHERE is_archived = 0 GROUP BY status ORDER BY
        CASE status
          WHEN 'new' THEN 1
          WHEN 'screening' THEN 2
          WHEN 'phone_screen' THEN 3
          WHEN 'technical' THEN 4
          WHEN 'team_interview' THEN 5
          WHEN 'culture_chat' THEN 6
          WHEN 'offer' THEN 7
          WHEN 'hired' THEN 8
          WHEN 'rejected' THEN 9
          WHEN 'on_hold' THEN 10
          WHEN 'withdrawn' THEN 11
        END`
    );

    // Source effectiveness: source -> total -> hired -> conversion rate
    const source_stats = queryAll<{ source: string; total: number; hired: number; conversion_rate: number }>(
      `SELECT
        source,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'hired' THEN 1 ELSE 0 END) as hired,
        ROUND(CAST(SUM(CASE WHEN status = 'hired' THEN 1 ELSE 0 END) AS REAL) / COUNT(*) * 100, 1) as conversion_rate
      FROM candidates
      WHERE is_archived = 0
      GROUP BY source
      ORDER BY total DESC`
    );

    // Average time-to-hire (days from application to hired)
    const timeToHireRow = queryOne<{ avg_days: number }>(
      `SELECT AVG(
        CAST((julianday(h.created_at) - julianday(c.created_at)) AS REAL)
      ) as avg_days
      FROM candidates c
      JOIN candidate_history h ON h.candidate_id = c.id AND h.to_status = 'hired'
      WHERE c.status = 'hired' AND c.is_archived = 0`
    );
    const avg_time_to_hire = timeToHireRow?.avg_days ? Math.round(timeToHireRow.avg_days * 10) / 10 : 0;

    // Average time-to-first-action (days from new to screening)
    const timeToFirstRow = queryOne<{ avg_days: number }>(
      `SELECT AVG(
        CAST((julianday(h.created_at) - julianday(c.created_at)) AS REAL)
      ) as avg_days
      FROM candidates c
      JOIN candidate_history h ON h.candidate_id = c.id AND h.to_status = 'screening' AND h.from_status = 'new'
      WHERE c.is_archived = 0`
    );
    const avg_time_to_first_action = timeToFirstRow?.avg_days ? Math.round(timeToFirstRow.avg_days * 10) / 10 : 0;

    // Stage conversion rates — single queries instead of N+1 loop
    const PIPELINE_ORDER = ['new', 'screening', 'phone_screen', 'technical', 'team_interview', 'culture_chat', 'offer', 'hired'];

    // Count how many candidates touched each stage (appeared as from_status or to_status)
    const stageTotals = queryAll<{ stage: string; count: number }>(
      `SELECT stage, COUNT(*) as count FROM (
        SELECT from_status as stage FROM candidate_history WHERE from_status IS NOT NULL
        UNION ALL
        SELECT to_status as stage FROM candidate_history WHERE to_status IS NOT NULL
      ) GROUP BY stage`
    );
    const stageTotalMap: Record<string, number> = {};
    for (const row of stageTotals) stageTotalMap[row.stage] = row.count;

    // Count transitions between consecutive stages
    const transitions = queryAll<{ from_status: string; to_status: string; count: number }>(
      `SELECT from_status, to_status, COUNT(*) as count
       FROM candidate_history
       WHERE from_status IS NOT NULL AND to_status IS NOT NULL
       GROUP BY from_status, to_status`
    );
    const transMap: Record<string, number> = {};
    for (const row of transitions) transMap[`${row.from_status}->${row.to_status}`] = row.count;

    const stage_conversions: { from_stage: string; to_stage: string; count: number; percentage: number }[] = [];
    for (let i = 0; i < PIPELINE_ORDER.length - 1; i++) {
      const from_stage = PIPELINE_ORDER[i];
      const to_stage = PIPELINE_ORDER[i + 1];
      const total = stageTotalMap[from_stage] || 0;
      const moved = transMap[`${from_stage}->${to_stage}`] || 0;
      stage_conversions.push({
        from_stage,
        to_stage,
        count: moved,
        percentage: total > 0 ? Math.round((moved / total) * 1000) / 10 : 0,
      });
    }

    // Monthly applications (last 6 months)
    const monthly_applications = queryAll<{ month: string; count: number }>(
      `SELECT
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count
      FROM candidates
      WHERE created_at >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month ASC`
    );

    // Average scores across all candidates
    const scoreRow = queryOne<{
      avg_td: number; avg_ps: number; avg_ow: number;
      avg_co: number; avg_ca: number; avg_gp: number;
    }>(
      `SELECT
        AVG(technical_depth) as avg_td,
        AVG(problem_solving) as avg_ps,
        AVG(ownership) as avg_ow,
        AVG(communication) as avg_co,
        AVG(cultural_add) as avg_ca,
        AVG(growth_potential) as avg_gp
      FROM candidate_scores
      WHERE technical_depth IS NOT NULL`
    );

    const avg_scores: Record<string, number> = {
      technical_depth: scoreRow?.avg_td ? Math.round(scoreRow.avg_td * 10) / 10 : 0,
      problem_solving: scoreRow?.avg_ps ? Math.round(scoreRow.avg_ps * 10) / 10 : 0,
      ownership: scoreRow?.avg_ow ? Math.round(scoreRow.avg_ow * 10) / 10 : 0,
      communication: scoreRow?.avg_co ? Math.round(scoreRow.avg_co * 10) / 10 : 0,
      cultural_add: scoreRow?.avg_ca ? Math.round(scoreRow.avg_ca * 10) / 10 : 0,
      growth_potential: scoreRow?.avg_gp ? Math.round(scoreRow.avg_gp * 10) / 10 : 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        pipeline_counts,
        source_stats,
        avg_time_to_hire,
        avg_time_to_first_action,
        stage_conversions,
        monthly_applications,
        avg_scores,
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
