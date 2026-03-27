import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateTeamMember } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { TeamMember } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const memberId = parseInt(id, 10);

    if (isNaN(memberId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid member ID' },
        { status: 400 }
      );
    }

    const user = await getAuthUser();
    const member = queryOne<TeamMember>(
      'SELECT * FROM team_members WHERE id = ?',
      [memberId]
    );

    if (!member) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    if (!member.is_published && !user) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error('Get team member error:', error);
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
    const memberId = parseInt(id, 10);

    if (isNaN(memberId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid member ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<TeamMember>(
      'SELECT * FROM team_members WHERE id = ?',
      [memberId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      name: body.name ?? existing.name,
      role: body.role ?? existing.role,
      bio: body.bio !== undefined ? body.bio : existing.bio,
      photo: body.photo !== undefined ? body.photo : existing.photo,
      department: body.department !== undefined ? body.department : existing.department,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateTeamMember(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    execute(
      `UPDATE team_members SET
        name = ?, role = ?, bio = ?,
        photo = ?, department = ?, sort_order = ?, is_published = ?
       WHERE id = ?`,
      [
        data.name,
        data.role,
        data.bio || null,
        data.photo || null,
        data.department || null,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        memberId,
      ]
    );

    const updated = queryOne<TeamMember>(
      'SELECT * FROM team_members WHERE id = ?',
      [memberId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update team member error:', error);
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
    const memberId = parseInt(id, 10);

    if (isNaN(memberId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid member ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<TeamMember>(
      'SELECT id FROM team_members WHERE id = ?',
      [memberId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    execute('DELETE FROM team_members WHERE id = ?', [memberId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Team member deleted successfully' },
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
