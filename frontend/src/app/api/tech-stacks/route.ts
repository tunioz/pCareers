import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { TechStack } from '@/types';

export async function GET() {
  try {
    const techStacks = await queryAll<TechStack>(
      'SELECT * FROM tech_stacks ORDER BY name ASC'
    );

    return NextResponse.json({
      success: true,
      data: techStacks,
    });
  } catch (error) {
    console.error('Get tech stacks error:', error);
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
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Tech stack name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = await queryOne<TechStack>('SELECT id FROM tech_stacks WHERE name = ?', [name]);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Tech stack already exists' },
        { status: 400 }
      );
    }

    const result = await execute('INSERT INTO tech_stacks (name) VALUES (?)', [name]);

    const newTechStack = await queryOne<TechStack>('SELECT * FROM tech_stacks WHERE id = ?', [result.lastInsertRowid]);

    return NextResponse.json(
      { success: true, data: newTechStack },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create tech stack error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
