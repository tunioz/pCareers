import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validatePCloudBarCriterion } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { PCloudBarCriterion } from '@/types';

export async function GET() {
  try {
    const user = await getAuthUser();
    const isAdmin = !!user;

    let criteria: PCloudBarCriterion[];
    if (isAdmin) {
      criteria = queryAll<PCloudBarCriterion>(
        'SELECT * FROM pcloud_bar_criteria ORDER BY sort_order ASC'
      );
    } else {
      criteria = queryAll<PCloudBarCriterion>(
        'SELECT * FROM pcloud_bar_criteria WHERE is_published = 1 ORDER BY sort_order ASC'
      );
    }

    return NextResponse.json({
      success: true,
      data: criteria,
    });
  } catch (error) {
    console.error('Get pCloud bar criteria error:', error);
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
    const validation = validatePCloudBarCriterion(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    const result = execute(
      'INSERT INTO pcloud_bar_criteria (title, description, sort_order, is_published) VALUES (?, ?, ?, ?)',
      [
        data.title,
        data.description,
        data.sort_order ?? 0,
        data.is_published ?? 1,
      ]
    );

    const newCriterion = queryOne<PCloudBarCriterion>(
      'SELECT * FROM pcloud_bar_criteria WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newCriterion },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create pCloud bar criterion error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
