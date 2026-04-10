import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateDefaultBenefit } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { DefaultBenefit } from '@/types';

export async function GET() {
  try {
    const user = await getAuthUser();
    const isAdmin = !!user;

    let benefits: DefaultBenefit[];
    if (isAdmin) {
      benefits = await queryAll<DefaultBenefit>(
        'SELECT * FROM default_benefits ORDER BY sort_order ASC'
      );
    } else {
      benefits = await queryAll<DefaultBenefit>(
        'SELECT * FROM default_benefits WHERE is_published = 1 ORDER BY sort_order ASC'
      );
    }

    return NextResponse.json({
      success: true,
      data: benefits,
    });
  } catch (error) {
    console.error('Get default benefits error:', error);
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
    const validation = validateDefaultBenefit(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    const result = await execute(
      'INSERT INTO default_benefits (title, description, sort_order, is_published) VALUES (?, ?, ?, ?)',
      [
        data.title,
        data.description,
        data.sort_order ?? 0,
        data.is_published ?? 1,
      ]
    );

    const newBenefit = await queryOne<DefaultBenefit>(
      'SELECT * FROM default_benefits WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newBenefit },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create default benefit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
