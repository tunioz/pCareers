import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateCandidateValue } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { CandidateValue } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const valueId = parseInt(id, 10);

    if (isNaN(valueId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const value = await queryOne<CandidateValue>(
      'SELECT * FROM candidate_values WHERE id = ?',
      [valueId]
    );

    if (!value) {
      return NextResponse.json(
        { success: false, error: 'Candidate value not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: value,
    });
  } catch (error) {
    console.error('Get candidate value error:', error);
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
    const valueId = parseInt(id, 10);

    if (isNaN(valueId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<CandidateValue>(
      'SELECT * FROM candidate_values WHERE id = ?',
      [valueId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Candidate value not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      title: body.title ?? existing.title,
      description: body.description ?? existing.description,
      image: body.image !== undefined ? body.image : existing.image,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateCandidateValue(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    await execute(
      `UPDATE candidate_values SET
        title = ?, description = ?, image = ?, sort_order = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.title,
        data.description,
        data.image || null,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        valueId,
      ]
    );

    const updated = await queryOne<CandidateValue>(
      'SELECT * FROM candidate_values WHERE id = ?',
      [valueId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update candidate value error:', error);
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
    const valueId = parseInt(id, 10);

    if (isNaN(valueId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<CandidateValue>(
      'SELECT id FROM candidate_values WHERE id = ?',
      [valueId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Candidate value not found' },
        { status: 404 }
      );
    }

    await execute('DELETE FROM candidate_values WHERE id = ?', [valueId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Candidate value deleted successfully' },
    });
  } catch (error) {
    console.error('Delete candidate value error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
