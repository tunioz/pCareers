import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryAll, queryOne, execute, transaction } from '@/lib/db';

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

/**
 * GET /api/interview-kits
 * List all kits (public list, auth-required).
 * Query params: ?stage=technical (filter by stage)
 */
export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const roleType = searchParams.get('role_type');

    const where: string[] = [];
    const params: unknown[] = [];
    if (stage) {
      where.push('stage = ?');
      params.push(stage);
    }
    if (roleType) {
      where.push('role_type = ?');
      params.push(roleType);
    }
    const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

    const kits = await queryAll<InterviewKit>(
      `SELECT * FROM interview_kits ${whereSql} ORDER BY created_at DESC`,
      params
    );

    return NextResponse.json({ success: true, data: kits });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/interview-kits
 * Create a kit manually with questions.
 * Body: { name, description, role_type, stage, duration_minutes, focus_dimensions, instructions, questions[] }
 */
export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 });
    }
    if (!body.stage || typeof body.stage !== 'string') {
      return NextResponse.json({ success: false, error: 'stage is required' }, { status: 400 });
    }

    const questions = Array.isArray(body.questions) ? body.questions : [];

    let kitId: number | bigint = 0;

    await transaction(async () => {
      const kitResult = await execute(
        `INSERT INTO interview_kits (
          name, description, role_type, stage, duration_minutes,
          focus_dimensions, instructions, is_published, ai_generated
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.name,
          body.description || null,
          body.role_type || null,
          body.stage,
          body.duration_minutes || 60,
          body.focus_dimensions ? JSON.stringify(body.focus_dimensions) : null,
          body.instructions || null,
          body.is_published ?? 1,
          body.ai_generated ?? 0,
        ]
      );
      kitId = kitResult.lastInsertRowid;

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i] as Record<string, unknown>;
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
    });

    const kit = await queryOne<InterviewKit>('SELECT * FROM interview_kits WHERE id = ?', [kitId]);
    const qs = await queryAll<InterviewKitQuestion>(
      'SELECT * FROM interview_kit_questions WHERE kit_id = ? ORDER BY sort_order',
      [kitId]
    );

    return NextResponse.json(
      { success: true, data: { ...kit, questions: qs } },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
