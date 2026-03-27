import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateProcessHighlight } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { ProcessHighlight } from '@/types';

export async function GET() {
  try {
    const user = await getAuthUser();
    const isAdmin = !!user;

    let highlights: ProcessHighlight[];
    if (isAdmin) {
      highlights = queryAll<ProcessHighlight>(
        'SELECT * FROM process_highlights ORDER BY sort_order ASC'
      );
    } else {
      highlights = queryAll<ProcessHighlight>(
        'SELECT * FROM process_highlights WHERE is_published = 1 ORDER BY sort_order ASC'
      );
    }

    return NextResponse.json({
      success: true,
      data: highlights,
    });
  } catch (error) {
    console.error('Get process highlights error:', error);
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
    const validation = validateProcessHighlight(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    const result = execute(
      'INSERT INTO process_highlights (label, detail, sort_order, is_published) VALUES (?, ?, ?, ?)',
      [
        data.label,
        data.detail,
        data.sort_order ?? 0,
        data.is_published ?? 1,
      ]
    );

    const newHighlight = queryOne<ProcessHighlight>(
      'SELECT * FROM process_highlights WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newHighlight },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create process highlight error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
