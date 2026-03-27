import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateTeamStory } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { TeamStory } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const storyId = parseInt(id, 10);

    if (isNaN(storyId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    const story = queryOne<TeamStory>(
      'SELECT * FROM team_stories WHERE id = ?',
      [storyId]
    );

    if (!story) {
      return NextResponse.json(
        { success: false, error: 'Team story not found' },
        { status: 404 }
      );
    }

    const user = await getAuthUser();
    if (!story.is_published && !user) {
      return NextResponse.json(
        { success: false, error: 'Team story not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error('Get team story error:', error);
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
    const storyId = parseInt(id, 10);

    if (isNaN(storyId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<TeamStory>(
      'SELECT * FROM team_stories WHERE id = ?',
      [storyId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team story not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      name: body.name ?? existing.name,
      role: body.role ?? existing.role,
      photo: body.photo !== undefined ? body.photo : existing.photo,
      quote: body.quote ?? existing.quote,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateTeamStory(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    execute(
      `UPDATE team_stories SET
        name = ?, role = ?, photo = ?, quote = ?,
        sort_order = ?, is_published = ?, updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.name,
        data.role,
        data.photo || null,
        data.quote,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        storyId,
      ]
    );

    const updated = queryOne<TeamStory>(
      'SELECT * FROM team_stories WHERE id = ?',
      [storyId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update team story error:', error);
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
    const storyId = parseInt(id, 10);

    if (isNaN(storyId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<{ id: number }>(
      'SELECT id FROM team_stories WHERE id = ?',
      [storyId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team story not found' },
        { status: 404 }
      );
    }

    execute('DELETE FROM team_stories WHERE id = ?', [storyId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Team story deleted successfully' },
    });
  } catch (error) {
    console.error('Delete team story error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
