import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateInterviewTemplate } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { InterviewTemplate, InterviewStage } from '@/types';

export async function GET() {
  try {
    const templates = queryAll<InterviewTemplate>(
      'SELECT * FROM interview_templates ORDER BY is_default DESC, name ASC'
    );

    // Load stages for each template
    const templatesWithStages = templates.map((template) => {
      const stages = queryAll<InterviewStage>(
        'SELECT * FROM interview_stages WHERE template_id = ? ORDER BY stage_number ASC',
        [template.id]
      );
      return { ...template, stages };
    });

    return NextResponse.json({
      success: true,
      data: templatesWithStages,
    });
  } catch (error) {
    console.error('Get interview templates error:', error);
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
    const validation = validateInterviewTemplate(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // If setting as default, unset any existing default
    if (data.is_default) {
      execute('UPDATE interview_templates SET is_default = 0 WHERE is_default = 1');
    }

    const result = execute(
      `INSERT INTO interview_templates (name, description, overall_timeline, overall_label, feedback_label, subtitle, is_default, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.description || null,
        data.overall_timeline || '2-4 weeks',
        data.overall_label || 'From application to offer decision',
        data.feedback_label || 'At each stage to all candidates',
        data.subtitle || null,
        data.is_default || 0,
        data.is_published ?? 1,
      ]
    );

    const newTemplate = queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: { ...newTemplate, stages: [] } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create interview template error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
