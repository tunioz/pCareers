import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateTeamMember } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { TeamMember } from '@/types';

export async function GET() {
  try {
    const user = await getAuthUser();
    const isAdmin = !!user;

    let members: TeamMember[];

    if (isAdmin) {
      members = await queryAll<TeamMember>(
        'SELECT * FROM team_members ORDER BY sort_order ASC, id ASC'
      );
    } else {
      members = await queryAll<TeamMember>(
        'SELECT * FROM team_members WHERE is_published = 1 ORDER BY sort_order ASC, id ASC'
      );
    }

    return NextResponse.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error('Get team error:', error);
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

    const validation = validateTeamMember(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Auto-assign sort_order if not provided (append to end)
    let sortOrder = data.sort_order ?? 0;
    if (!body.sort_order && body.sort_order !== 0) {
      const maxOrder = await queryOne<{ max_order: number | null }>(
        'SELECT MAX(sort_order) as max_order FROM team_members'
      );
      sortOrder = (maxOrder?.max_order ?? -1) + 1;
    }

    const result = await execute(
      `INSERT INTO team_members (name, role, bio, photo, department, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.role,
        data.bio || null,
        data.photo || null,
        data.department || null,
        sortOrder,
        data.is_published ?? 1,
      ]
    );

    const newMember = await queryOne<TeamMember>(
      'SELECT * FROM team_members WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create team member error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
