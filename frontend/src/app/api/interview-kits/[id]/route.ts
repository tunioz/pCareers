import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryAll, queryOne, execute, transaction } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface InterviewKit {
  id: number;
  name: string;
  description: string | null;
  role_type: string | null;
  stage: string;
  duration_minutes: number;
  focus_dimensions: string | null;
  instructions: string | null;
  is_published: number;
  ai_generated: number;
  created_at: string;
  updated_at: string;
}

interface InterviewKitQuestion {
  id: number;
  kit_id: number;
  sort_order: number;
  question: string;
  category: string | null;
  expected_signal: string | null;
  follow_up: string | null;
  dimension: string | null;
  difficulty: string;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await context.params;
  const kitId = parseInt(id, 10);

  const kit = await queryOne<InterviewKit>('SELECT * FROM interview_kits WHERE id = ?', [kitId]);
  if (!kit) {
    return NextResponse.json({ success: false, error: 'Kit not found' }, { status: 404 });
  }

  const questions = await queryAll<InterviewKitQuestion>(
    'SELECT * FROM interview_kit_questions WHERE kit_id = ? ORDER BY sort_order',
    [kitId]
  );

  return NextResponse.json({ success: true, data: { ...kit, questions } });
}

export async function PUT(request: Request, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await context.params;
  const kitId = parseInt(id, 10);
  const body = await request.json();

  await transaction(async () => {
    await execute(
      `UPDATE interview_kits SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        role_type = COALESCE(?, role_type),
        stage = COALESCE(?, stage),
        duration_minutes = COALESCE(?, duration_minutes),
        focus_dimensions = COALESCE(?, focus_dimensions),
        instructions = COALESCE(?, instructions),
        is_published = COALESCE(?, is_published),
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        body.name ?? null,
        body.description ?? null,
        body.role_type ?? null,
        body.stage ?? null,
        body.duration_minutes ?? null,
        body.focus_dimensions ? JSON.stringify(body.focus_dimensions) : null,
        body.instructions ?? null,
        body.is_published ?? null,
        kitId,
      ]
    );

    // Replace questions if provided
    if (Array.isArray(body.questions)) {
      await execute('DELETE FROM interview_kit_questions WHERE kit_id = ?', [kitId]);
      for (let i = 0; i < body.questions.length; i++) {
        const q = body.questions[i] as Record<string, unknown>;
        if (!q || !q.question) continue;
        await execute(
          `INSERT INTO interview_kit_questions (
            kit_id, sort_order, question, category, expected_signal, follow_up, dimension, difficulty
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            kitId,
            i,
            q.question as string,
            (q.category as string) || null,
            (q.expected_signal as string) || null,
            (q.follow_up as string) || null,
            (q.dimension as string) || null,
            (q.difficulty as string) || 'medium',
          ]
        );
      }
    }
  });

  const kit = await queryOne<InterviewKit>('SELECT * FROM interview_kits WHERE id = ?', [kitId]);
  const questions = await queryAll<InterviewKitQuestion>(
    'SELECT * FROM interview_kit_questions WHERE kit_id = ? ORDER BY sort_order',
    [kitId]
  );

  return NextResponse.json({ success: true, data: { ...kit, questions } });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await context.params;
  const kitId = parseInt(id, 10);

  await execute('DELETE FROM interview_kits WHERE id = ?', [kitId]);

  return NextResponse.json({ success: true });
}
