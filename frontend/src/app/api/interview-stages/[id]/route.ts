import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateInterviewStage } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { InterviewStage } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const stageId = parseInt(id, 10);

    if (isNaN(stageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid stage ID' },
        { status: 400 }
      );
    }

    const stage = queryOne<InterviewStage>(
      'SELECT * FROM interview_stages WHERE id = ?',
      [stageId]
    );

    if (!stage) {
      return NextResponse.json(
        { success: false, error: 'Interview stage not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stage,
    });
  } catch (error) {
    console.error('Get interview stage error:', error);
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
    const stageId = parseInt(id, 10);

    if (isNaN(stageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid stage ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<InterviewStage>(
      'SELECT * FROM interview_stages WHERE id = ?',
      [stageId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Interview stage not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      template_id: body.template_id ?? existing.template_id,
      stage_number: body.stage_number ?? existing.stage_number,
      title: body.title ?? existing.title,
      duration: body.duration ?? existing.duration,
      description: body.description ?? existing.description,
      focus: body.focus ?? existing.focus,
      timeline: body.timeline ?? existing.timeline,
      icon: body.icon !== undefined ? body.icon : existing.icon,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateInterviewStage(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    execute(
      `UPDATE interview_stages SET
        template_id = ?, stage_number = ?, title = ?, duration = ?,
        description = ?, focus = ?, timeline = ?, icon = ?, is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
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
        stageId,
      ]
    );

    const updated = queryOne<InterviewStage>(
      'SELECT * FROM interview_stages WHERE id = ?',
      [stageId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update interview stage error:', error);
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
    const stageId = parseInt(id, 10);

    if (isNaN(stageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid stage ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<InterviewStage>(
      'SELECT id FROM interview_stages WHERE id = ?',
      [stageId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Interview stage not found' },
        { status: 404 }
      );
    }

    execute('DELETE FROM interview_stages WHERE id = ?', [stageId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Interview stage deleted successfully' },
    });
  } catch (error) {
    console.error('Delete interview stage error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
