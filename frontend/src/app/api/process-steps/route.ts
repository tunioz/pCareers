import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateProcessStep } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { ProcessStep } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('template_id');

    if (!templateId) {
      return NextResponse.json(
        { success: false, error: 'template_id query parameter is required' },
        { status: 400 }
      );
    }

    const tId = parseInt(templateId, 10);
    if (isNaN(tId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid template_id' },
        { status: 400 }
      );
    }

    const steps = await queryAll<ProcessStep>(
      'SELECT * FROM process_steps WHERE template_id = ? ORDER BY step_number ASC',
      [tId]
    );

    return NextResponse.json({
      success: true,
      data: steps,
    });
  } catch (error) {
    console.error('Get process steps error:', error);
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
    const validation = validateProcessStep(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Verify template exists
    const template = await queryOne('SELECT id FROM process_templates WHERE id = ?', [data.template_id]);
    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Process template not found' },
        { status: 404 }
      );
    }

    const result = await execute(
      `INSERT INTO process_steps (template_id, step_number, label, detail, is_published)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.template_id,
        data.step_number,
        data.label,
        data.detail,
        data.is_published ?? 1,
      ]
    );

    const newStep = await queryOne<ProcessStep>(
      'SELECT * FROM process_steps WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newStep },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create process step error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
