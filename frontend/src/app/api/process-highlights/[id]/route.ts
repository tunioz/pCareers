import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateProcessHighlight } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { ProcessHighlight } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const highlightId = parseInt(id, 10);

    if (isNaN(highlightId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const highlight = await queryOne<ProcessHighlight>(
      'SELECT * FROM process_highlights WHERE id = ?',
      [highlightId]
    );

    if (!highlight) {
      return NextResponse.json(
        { success: false, error: 'Process highlight not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: highlight,
    });
  } catch (error) {
    console.error('Get process highlight error:', error);
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
    const highlightId = parseInt(id, 10);

    if (isNaN(highlightId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<ProcessHighlight>(
      'SELECT * FROM process_highlights WHERE id = ?',
      [highlightId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Process highlight not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      label: body.label ?? existing.label,
      detail: body.detail ?? existing.detail,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateProcessHighlight(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    await execute(
      `UPDATE process_highlights SET
        label = ?, detail = ?, sort_order = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.label,
        data.detail,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        highlightId,
      ]
    );

    const updated = await queryOne<ProcessHighlight>(
      'SELECT * FROM process_highlights WHERE id = ?',
      [highlightId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update process highlight error:', error);
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
    const highlightId = parseInt(id, 10);

    if (isNaN(highlightId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<ProcessHighlight>(
      'SELECT id FROM process_highlights WHERE id = ?',
      [highlightId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Process highlight not found' },
        { status: 404 }
      );
    }

    await execute('DELETE FROM process_highlights WHERE id = ?', [highlightId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Process highlight deleted successfully' },
    });
  } catch (error) {
    console.error('Delete process highlight error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
