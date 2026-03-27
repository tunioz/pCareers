import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateCandidateValue } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { CandidateValue } from '@/types';

export async function GET() {
  try {
    const user = await getAuthUser();
    const isAdmin = !!user;

    let values: CandidateValue[];
    if (isAdmin) {
      values = queryAll<CandidateValue>(
        'SELECT * FROM candidate_values ORDER BY sort_order ASC'
      );
    } else {
      values = queryAll<CandidateValue>(
        'SELECT * FROM candidate_values WHERE is_published = 1 ORDER BY sort_order ASC'
      );
    }

    return NextResponse.json({
      success: true,
      data: values,
    });
  } catch (error) {
    console.error('Get candidate values error:', error);
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
    const validation = validateCandidateValue(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    const result = execute(
      'INSERT INTO candidate_values (title, description, image, sort_order, is_published) VALUES (?, ?, ?, ?, ?)',
      [
        data.title,
        data.description,
        data.image || null,
        data.sort_order ?? 0,
        data.is_published ?? 1,
      ]
    );

    const newValue = queryOne<CandidateValue>(
      'SELECT * FROM candidate_values WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newValue },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create candidate value error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
