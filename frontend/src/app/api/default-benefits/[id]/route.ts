import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateDefaultBenefit } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { DefaultBenefit } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const benefitId = parseInt(id, 10);

    if (isNaN(benefitId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const benefit = await queryOne<DefaultBenefit>(
      'SELECT * FROM default_benefits WHERE id = ?',
      [benefitId]
    );

    if (!benefit) {
      return NextResponse.json(
        { success: false, error: 'Default benefit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: benefit,
    });
  } catch (error) {
    console.error('Get default benefit error:', error);
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
    const benefitId = parseInt(id, 10);

    if (isNaN(benefitId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<DefaultBenefit>(
      'SELECT * FROM default_benefits WHERE id = ?',
      [benefitId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Default benefit not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      title: body.title ?? existing.title,
      description: body.description ?? existing.description,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateDefaultBenefit(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    await execute(
      `UPDATE default_benefits SET
        title = ?, description = ?, sort_order = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.title,
        data.description,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        benefitId,
      ]
    );

    const updated = await queryOne<DefaultBenefit>(
      'SELECT * FROM default_benefits WHERE id = ?',
      [benefitId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update default benefit error:', error);
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
    const benefitId = parseInt(id, 10);

    if (isNaN(benefitId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<DefaultBenefit>(
      'SELECT id FROM default_benefits WHERE id = ?',
      [benefitId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Default benefit not found' },
        { status: 404 }
      );
    }

    await execute('DELETE FROM default_benefits WHERE id = ?', [benefitId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Default benefit deleted successfully' },
    });
  } catch (error) {
    console.error('Delete default benefit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
