import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { getSpendByDay, getSpendBySkill, getTotalSpendToday } from '@/lib/ai/audit';

/**
 * GET /api/ai/usage
 * Returns AI spend analytics for the admin dashboard.
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
    const days = Math.min(parseInt(searchParams.get('days') || '30', 10), 365);

    const byDay = getSpendByDay(days);
    const bySkill = getSpendBySkill(days);
    const todayTotal = getTotalSpendToday();

    const totalCost = byDay.reduce((sum, row) => sum + row.total_cost, 0);
    const totalCalls = byDay.reduce((sum, row) => sum + row.total_calls, 0);
    const totalTokens = byDay.reduce((sum, row) => sum + row.total_tokens, 0);

    return NextResponse.json({
      success: true,
      data: {
        window_days: days,
        today_total_usd: todayTotal,
        period_total_usd: totalCost,
        period_total_calls: totalCalls,
        period_total_tokens: totalTokens,
        by_day: byDay,
        by_skill: bySkill,
      },
    });
  } catch (error) {
    console.error('AI usage error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
