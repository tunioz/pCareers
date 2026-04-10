import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateProcessStep } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { ProcessStep } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const stepId = parseInt(id, 10);

    if (isNaN(stepId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid step ID' },
        { status: 400 }
      );
    }

    const step = await queryOne<ProcessStep>(
      'SELECT * FROM process_steps WHERE id = ?',
      [stepId]
    );

    if (!step) {
      return NextResponse.json(
        { success: false, error: 'Process step not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: step,
    });
  } catch (error) {
    console.error('Get process step error:', error);
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
    const stepId = parseInt(id, 10);

    if (isNaN(stepId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid step ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<ProcessStep>(
      'SELECT * FROM process_steps WHERE id = ?',
      [stepId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Process step not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      template_id: body.template_id ?? existing.template_id,
      step_number: body.step_number ?? existing.step_number,
      label: body.label ?? existing.label,
      detail: body.detail ?? existing.detail,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateProcessStep(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    await execute(
      `UPDATE process_steps SET
        template_id = ?, step_number = ?, label = ?, detail = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.template_id,
        data.step_number,
        data.label,
        data.detail,
        data.is_published ?? 1,
        stepId,
      ]
    );

    const updated = await queryOne<ProcessStep>(
      'SELECT * FROM process_steps WHERE id = ?',
      [stepId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update process step error:', error);
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
    const stepId = parseInt(id, 10);

    if (isNaN(stepId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid step ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<ProcessStep>(
      'SELECT id FROM process_steps WHERE id = ?',
      [stepId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Process step not found' },
        { status: 404 }
      );
    }

    await execute('DELETE FROM process_steps WHERE id = ?', [stepId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Process step deleted successfully' },
    });
  } catch (error) {
    console.error('Delete process step error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
