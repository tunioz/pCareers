import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { queryOne, execute, transaction } from '@/lib/db';
import { callAiJson } from '@/lib/ai/client';
import {
  GENERATE_KIT_SYSTEM,
  buildGenerateKitPrompt,
  type GeneratedKit,
} from '@/lib/ai/prompts/generate-kit';
import type { Job } from '@/types';

/**
 * POST /api/ai/generate-kit
 * Body: { job_id: number, stage: string, save?: boolean }
 *
 * Generates an interview kit for a job and stage using Claude.
 * If save=true (default), persists to interview_kits table.
 * Otherwise returns draft for preview.
 */
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
    const jobId = parseInt(body.job_id, 10);
    const stage = typeof body.stage === 'string' ? body.stage : 'technical';
    const save = body.save !== false; // default true

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'job_id is required' },
        { status: 400 }
      );
    }

    const job = await queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [jobId]);
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const result = await callAiJson<GeneratedKit>({
      model: 'sonnet',
      maxTokens: 4096,
      temperature: 0.4,
      systemPrompt: GENERATE_KIT_SYSTEM,
      userPrompt: buildGenerateKitPrompt({
        jobTitle: job.title,
        jobDescription: job.description || '',
        stage,
        roleType: job.department,
      }),
      skill: 'generate-kit',
      userUsername: user.username,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI generation failed' },
        { status: 502 }
      );
    }

    const generated = result.data;

    // If save flag, persist to DB
    let savedKitId: number | bigint | null = null;
    if (save) {
      await transaction(async () => {
        const kitResult = await execute(
          `INSERT INTO interview_kits (
            name, description, role_type, stage, duration_minutes,
            focus_dimensions, instructions, is_published, ai_generated
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            generated.kit.name,
            generated.kit.description,
            job.department || null,
            stage,
            generated.kit.duration_minutes || 60,
            JSON.stringify(generated.kit.focus_dimensions || []),
            generated.kit.instructions,
            1,
            1, // ai_generated
          ]
        );
        savedKitId = kitResult.lastInsertRowid;

        for (let i = 0; i < generated.questions.length; i++) {
          const q = generated.questions[i];
          await execute(
            `INSERT INTO interview_kit_questions (
              kit_id, sort_order, question, category, expected_signal, follow_up, dimension, difficulty
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              savedKitId,
              i,
              q.question,
              q.category || null,
              q.expected_signal || null,
              q.follow_up || null,
              q.dimension || null,
              q.difficulty || 'medium',
            ]
          );
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        generated,
        saved: save,
        kit_id: savedKitId,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
        },
      },
    });
  } catch (error) {
    console.error('Generate kit error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
