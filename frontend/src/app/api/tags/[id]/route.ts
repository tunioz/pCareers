import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Tag } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
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
    const tagId = parseInt(id, 10);

    if (isNaN(tagId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tag ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Tag>('SELECT * FROM tags WHERE id = ?', [tagId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Tag name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate name (excluding this tag)
    const duplicate = await queryOne<Tag>(
      'SELECT id FROM tags WHERE name = ? AND id != ?',
      [name, tagId]
    );
    if (duplicate) {
      return NextResponse.json(
        { success: false, error: 'A tag with this name already exists' },
        { status: 400 }
      );
    }

    await execute('UPDATE tags SET name = ? WHERE id = ?', [name, tagId]);

    const updated = await queryOne<Tag>('SELECT * FROM tags WHERE id = ?', [tagId]);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update tag error:', error);
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
    const tagId = parseInt(id, 10);

    if (isNaN(tagId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tag ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Tag>('SELECT id FROM tags WHERE id = ?', [tagId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }

    // CASCADE will delete post_tags entries automatically
    await execute('DELETE FROM tags WHERE id = ?', [tagId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Tag deleted successfully' },
    });
  } catch (error) {
    console.error('Delete tag error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
