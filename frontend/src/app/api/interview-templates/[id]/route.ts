import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { validateInterviewTemplate } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { InterviewTemplate, InterviewStage } from '@/types';

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

    const template = queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE id = ?',
      [templateId]
    );

    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Interview template not found' },
        { status: 404 }
      );
    }

    const stages = queryAll<InterviewStage>(
      'SELECT * FROM interview_stages WHERE template_id = ? ORDER BY stage_number ASC',
      [templateId]
    );

    return NextResponse.json({
      success: true,
      data: { ...template, stages },
    });
  } catch (error) {
    console.error('Get interview template error:', error);
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

    const existing = queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE id = ?',
      [templateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Interview template not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      name: body.name ?? existing.name,
      description: body.description !== undefined ? body.description : existing.description,
      overall_timeline: body.overall_timeline ?? existing.overall_timeline,
      overall_label: body.overall_label ?? existing.overall_label,
      feedback_label: body.feedback_label ?? existing.feedback_label,
      subtitle: body.subtitle !== undefined ? body.subtitle : existing.subtitle,
      is_default: body.is_default !== undefined ? body.is_default : existing.is_default,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateInterviewTemplate(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // If setting as default, unset any existing default
    if (data.is_default && !existing.is_default) {
      execute('UPDATE interview_templates SET is_default = 0 WHERE is_default = 1');
    }

    execute(
      `UPDATE interview_templates SET
        name = ?, description = ?, overall_timeline = ?, overall_label = ?,
        feedback_label = ?, subtitle = ?, is_default = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.name,
        data.description || null,
        data.overall_timeline || '2-4 weeks',
        data.overall_label || 'From application to offer decision',
        data.feedback_label || 'At each stage to all candidates',
        data.subtitle || null,
        data.is_default || 0,
        data.is_published ?? 1,
        templateId,
      ]
    );

    const updated = queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE id = ?',
      [templateId]
    );

    const stages = queryAll<InterviewStage>(
      'SELECT * FROM interview_stages WHERE template_id = ? ORDER BY stage_number ASC',
      [templateId]
    );

    return NextResponse.json({
      success: true,
      data: { ...updated, stages },
    });
  } catch (error) {
    console.error('Update interview template error:', error);
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

    const existing = queryOne<InterviewTemplate>(
      'SELECT id FROM interview_templates WHERE id = ?',
      [templateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Interview template not found' },
        { status: 404 }
      );
    }

    // Nullify references from jobs before deleting
    execute(
      'UPDATE jobs SET interview_template_id = NULL WHERE interview_template_id = ?',
      [templateId]
    );

    // CASCADE will delete associated stages
    execute('DELETE FROM interview_templates WHERE id = ?', [templateId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Interview template deleted successfully' },
    });
  } catch (error) {
    console.error('Delete interview template error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
