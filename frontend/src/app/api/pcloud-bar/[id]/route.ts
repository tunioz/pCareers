import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validatePCloudBarCriterion } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { PCloudBarCriterion } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const criterionId = parseInt(id, 10);

    if (isNaN(criterionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const criterion = queryOne<PCloudBarCriterion>(
      'SELECT * FROM pcloud_bar_criteria WHERE id = ?',
      [criterionId]
    );

    if (!criterion) {
      return NextResponse.json(
        { success: false, error: 'pCloud bar criterion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: criterion,
    });
  } catch (error) {
    console.error('Get pCloud bar criterion error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const criterionId = parseInt(id, 10);

    if (isNaN(criterionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<PCloudBarCriterion>(
      'SELECT * FROM pcloud_bar_criteria WHERE id = ?',
      [criterionId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'pCloud bar criterion not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      title: body.title ?? existing.title,
      description: body.description ?? existing.description,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validatePCloudBarCriterion(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    execute(
      `UPDATE pcloud_bar_criteria SET
        title = ?, description = ?, sort_order = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.title,
        data.description,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        criterionId,
      ]
    );

    const updated = queryOne<PCloudBarCriterion>(
      'SELECT * FROM pcloud_bar_criteria WHERE id = ?',
      [criterionId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update pCloud bar criterion error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const criterionId = parseInt(id, 10);

    if (isNaN(criterionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<PCloudBarCriterion>(
      'SELECT id FROM pcloud_bar_criteria WHERE id = ?',
      [criterionId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'pCloud bar criterion not found' },
        { status: 404 }
      );
    }

    execute('DELETE FROM pcloud_bar_criteria WHERE id = ?', [criterionId]);

    return NextResponse.json({
      success: true,
      data: { message: 'pCloud bar criterion deleted successfully' },
    });
  } catch (error) {
    console.error('Delete pCloud bar criterion error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
