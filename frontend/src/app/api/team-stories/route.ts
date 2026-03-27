import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateTeamStory } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { TeamStory } from '@/types';

export async function GET() {
  try {
    const user = await getAuthUser();
    const isAdmin = !!user;

    let stories: TeamStory[];

    if (isAdmin) {
      stories = queryAll<TeamStory>(
        'SELECT * FROM team_stories ORDER BY sort_order ASC, id ASC'
      );
    } else {
      stories = queryAll<TeamStory>(
        'SELECT * FROM team_stories WHERE is_published = 1 ORDER BY sort_order ASC, id ASC'
      );
    }

    return NextResponse.json({
      success: true,
      data: stories,
    });
  } catch (error) {
    console.error('Get team stories error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validation = validateTeamStory(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Auto-assign sort_order if not provided
    let sortOrder = data.sort_order ?? 0;
    if (!body.sort_order && body.sort_order !== 0) {
      const maxOrder = queryOne<{ max_order: number | null }>(
        'SELECT MAX(sort_order) as max_order FROM team_stories'
      );
      sortOrder = (maxOrder?.max_order ?? -1) + 1;
    }

    const result = execute(
      `INSERT INTO team_stories (name, role, photo, quote, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.role,
        data.photo || null,
        data.quote,
        sortOrder,
        data.is_published ?? 1,
      ]
    );

    const newStory = queryOne<TeamStory>(
      'SELECT * FROM team_stories WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newStory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create team story error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
