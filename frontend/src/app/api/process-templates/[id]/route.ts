import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { validateProcessTemplate } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { ProcessTemplate, ProcessStep } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid template ID' },
        { status: 400 }
      );
    }

    const template = queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE id = ?',
      [templateId]
    );

    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Process template not found' },
        { status: 404 }
      );
    }

    const steps = queryAll<ProcessStep>(
      'SELECT * FROM process_steps WHERE template_id = ? ORDER BY step_number ASC',
      [templateId]
    );

    return NextResponse.json({
      success: true,
      data: { ...template, steps },
    });
  } catch (error) {
    console.error('Get process template error:', error);
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
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid template ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE id = ?',
      [templateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Process template not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      name: body.name ?? existing.name,
      description: body.description !== undefined ? body.description : existing.description,
      intro_text: body.intro_text !== undefined ? body.intro_text : existing.intro_text,
      is_default: body.is_default !== undefined ? body.is_default : existing.is_default,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateProcessTemplate(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // If setting as default, unset any existing default
    if (data.is_default && !existing.is_default) {
      execute('UPDATE process_templates SET is_default = 0 WHERE is_default = 1');
    }

    execute(
      `UPDATE process_templates SET
        name = ?, description = ?, intro_text = ?,
        is_default = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.name,
        data.description || null,
        data.intro_text || null,
        data.is_default || 0,
        data.is_published ?? 1,
        templateId,
      ]
    );

    const updated = queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE id = ?',
      [templateId]
    );

    const steps = queryAll<ProcessStep>(
      'SELECT * FROM process_steps WHERE template_id = ? ORDER BY step_number ASC',
      [templateId]
    );

    return NextResponse.json({
      success: true,
      data: { ...updated, steps },
    });
  } catch (error) {
    console.error('Update process template error:', error);
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
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid template ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<ProcessTemplate>(
      'SELECT id FROM process_templates WHERE id = ?',
      [templateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Process template not found' },
        { status: 404 }
      );
    }

    // Nullify references from jobs before deleting
    execute(
      'UPDATE jobs SET process_template_id = NULL WHERE process_template_id = ?',
      [templateId]
    );

    // CASCADE will delete associated steps
    execute('DELETE FROM process_templates WHERE id = ?', [templateId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Process template deleted successfully' },
    });
  } catch (error) {
    console.error('Delete process template error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
