import { NextResponse } from 'next/server';
import { queryAll } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/candidates/stats — Pipeline statistics (auth required)
 * Returns counts per status, per source, and per job.
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

    // Counts per status
    const byStatus = queryAll<{ status: string; count: number }>(
      `SELECT status, COUNT(*) as count
       FROM candidates
       WHERE is_archived = 0
       GROUP BY status
       ORDER BY count DESC`
    );

    // Counts per source
    const bySource = queryAll<{ source: string; count: number }>(
      `SELECT source, COUNT(*) as count
       FROM candidates
       WHERE is_archived = 0
       GROUP BY source
       ORDER BY count DESC`
    );

    // Counts per job
    const byJob = queryAll<{ job_id: number | null; job_title: string | null; count: number }>(
      `SELECT c.job_id, j.title as job_title, COUNT(*) as count
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE c.is_archived = 0
       GROUP BY c.job_id
       ORDER BY count DESC`
    );

    // Total counts
    const totalActive = byStatus.reduce((sum, s) => sum + s.count, 0);
    const totalArchived = queryAll<{ count: number }>(
      'SELECT COUNT(*) as count FROM candidates WHERE is_archived = 1'
    )[0]?.count || 0;

    // Recent activity (last 30 days)
    const recentApplications = queryAll<{ count: number }>(
      `SELECT COUNT(*) as count FROM candidates
       WHERE created_at >= datetime('now', '-30 days')`
    )[0]?.count || 0;

    // Average composite score (for scored candidates)
    const avgScore = queryAll<{ avg_score: number | null }>(
      `SELECT AVG(composite_score) as avg_score
       FROM candidates
       WHERE composite_score IS NOT NULL AND is_archived = 0`
    )[0]?.avg_score || null;

    return NextResponse.json({
      success: true,
      data: {
        byStatus,
        bySource,
        byJob,
        totals: {
          active: totalActive,
          archived: totalArchived,
          recentApplications,
          avgCompositeScore: avgScore ? Math.round(avgScore * 100) / 100 : null,
        },
      },
    });
  } catch (error) {
    console.error('Get candidate stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
