import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { TechStack } from '@/types';

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
    const techId = parseInt(id, 10);

    if (isNaN(techId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tech stack ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<TechStack>('SELECT * FROM tech_stacks WHERE id = ?', [techId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Tech stack not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Tech stack name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate name (excluding this tech stack)
    const duplicate = await queryOne<TechStack>(
      'SELECT id FROM tech_stacks WHERE name = ? AND id != ?',
      [name, techId]
    );
    if (duplicate) {
      return NextResponse.json(
        { success: false, error: 'A tech stack with this name already exists' },
        { status: 400 }
      );
    }

    await execute('UPDATE tech_stacks SET name = ? WHERE id = ?', [name, techId]);

    const updated = await queryOne<TechStack>('SELECT * FROM tech_stacks WHERE id = ?', [techId]);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update tech stack error:', error);
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
    const techId = parseInt(id, 10);

    if (isNaN(techId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tech stack ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<TechStack>('SELECT id FROM tech_stacks WHERE id = ?', [techId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Tech stack not found' },
        { status: 404 }
      );
    }

    await execute('DELETE FROM tech_stacks WHERE id = ?', [techId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Tech stack deleted successfully' },
    });
  } catch (error) {
    console.error('Delete tech stack error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
