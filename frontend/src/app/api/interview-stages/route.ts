import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateInterviewStage } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { InterviewStage } from '@/types';

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

    const stages = queryAll<InterviewStage>(
      'SELECT * FROM interview_stages WHERE template_id = ? ORDER BY stage_number ASC',
      [tId]
    );

    return NextResponse.json({
      success: true,
      data: stages,
    });
  } catch (error) {
    console.error('Get interview stages error:', error);
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
    const validation = validateInterviewStage(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Verify template exists
    const template = queryOne('SELECT id FROM interview_templates WHERE id = ?', [data.template_id]);
    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Interview template not found' },
        { status: 404 }
      );
    }

    const result = execute(
      `INSERT INTO interview_stages (template_id, stage_number, title, duration, description, focus, timeline, icon, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.template_id,
        data.stage_number,
        data.title,
        data.duration,
        data.description,
        data.focus,
        data.timeline,
        data.icon || 'Phone',
        data.is_published ?? 1,
      ]
    );

    const newStage = queryOne<InterviewStage>(
      'SELECT * FROM interview_stages WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newStage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create interview stage error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
