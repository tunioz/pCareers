import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { getAuditLog, countAuditLog, type AuditAction, type EntityType } from '@/lib/audit';

/**
 * GET /api/audit-log
 * Returns paginated audit log entries with optional filters.
 *
 * Query params:
 *   entity_type, entity_id, user, action, page, perPage, date_from, date_to
 */
export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const perPage = Math.min(200, parseInt(searchParams.get('perPage') || '50', 10));

    const filters = {
      entityType: (searchParams.get('entity_type') as EntityType) || undefined,
      entityId: searchParams.get('entity_id') ? parseInt(searchParams.get('entity_id')!, 10) : undefined,
      userUsername: searchParams.get('user') || undefined,
      action: (searchParams.get('action') as AuditAction) || undefined,
      dateFrom: searchParams.get('date_from') || undefined,
      dateTo: searchParams.get('date_to') || undefined,
      limit: perPage,
      offset: (page - 1) * perPage,
    };

    const rows = await getAuditLog(filters);
    const total = await countAuditLog(filters);

    return NextResponse.json({
      success: true,
      data: rows,
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
