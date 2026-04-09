import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { callAiJson } from '@/lib/ai/client';
import {
  DRAFT_EMAIL_SYSTEM,
  buildDraftEmailPrompt,
  type DraftedEmail,
  type EmailType,
} from '@/lib/ai/prompts/draft-email';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Candidate, Job } from '@/types';

/**
 * POST /api/ai/draft-email
 * Body: { candidate_id, email_type, context?, highlights? }
 *
 * Generates an AI draft email AND saves it to candidate_emails as status='draft'.
 * Admin can then edit via PUT /api/candidate-emails/[id] and send via POST .../send.
 *
 * IMPORTANT: Salary is NEVER passed to the prompt. Admin manually adds salary
 * numbers during the edit step.
 */
export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Not authenticated' },
      { status: 401 }
    );
  }

  const emailPermsMap: Record<string, 'pipeline:send_offer' | 'pipeline:send_rejection' | 'interviews:schedule'> = {
    offer: 'pipeline:send_offer',
    rejection_post_interview: 'pipeline:send_rejection',
    rejection_after_screen: 'pipeline:send_rejection',
    rejection_polite: 'pipeline:send_rejection',
    interview_invite: 'interviews:schedule',
    reference_request: 'interviews:schedule',
    follow_up: 'pipeline:send_offer',
    status_update: 'pipeline:send_offer',
  };

  try {
    const body = await request.json();
    const candidateId = parseInt(body.candidate_id, 10);
    const emailType = body.email_type as EmailType;
    const context = typeof body.context === 'string' ? body.context : undefined;
    const highlights: string[] = Array.isArray(body.highlights) ? body.highlights : [];

    if (!candidateId || !emailType) {
      return NextResponse.json(
        { success: false, error: 'candidate_id and email_type are required' },
        { status: 400 }
      );
    }

    // Permission check
    const requiredPermission = emailPermsMap[emailType];
    if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions for this email type' },
        { status: 403 }
      );
    }

    const candidate = queryOne<Candidate>('SELECT * FROM candidates WHERE id = ?', [candidateId]);
    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    let job: Job | null = null;
    if (candidate.job_id) {
      job = queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [candidate.job_id]) || null;
    }

    // Build highlights from existing data if none provided
    let autoHighlights: string[] = [];
    if (highlights.length === 0) {
      // Extract top scorecard strengths if available
      const scores = queryAll<{ key_quotes: string | null; general_notes: string | null }>(
        'SELECT key_quotes, general_notes FROM candidate_scores WHERE candidate_id = ? LIMIT 3',
        [candidateId]
      );
      autoHighlights = scores
        .flatMap((s) => [s.general_notes, s.key_quotes])
        .filter(Boolean)
        .map((s) => (s || '').slice(0, 150))
        .slice(0, 3);
    }

    const firstName = candidate.full_name.split(' ')[0];

    const result = await callAiJson<DraftedEmail>({
      model: 'sonnet',
      maxTokens: 1500,
      temperature: 0.5,
      systemPrompt: DRAFT_EMAIL_SYSTEM,
      userPrompt: buildDraftEmailPrompt({
        emailType,
        candidateFirstName: firstName,
        jobTitle: job?.title || 'the role',
        stage: (candidate as Candidate & { status?: string }).status,
        context,
        highlights: highlights.length > 0 ? highlights : autoHighlights,
      }),
      skill: 'draft-email',
      userUsername: user.username,
      candidateId,
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'AI draft failed' },
        { status: 502 }
      );
    }

    // Save draft to candidate_emails
    const insertResult = execute(
      `INSERT INTO candidate_emails (
        candidate_id, email_type, subject, body, status, ai_generated,
        ai_prompt_context, created_by
      ) VALUES (?, ?, ?, ?, 'draft', 1, ?, ?)`,
      [
        candidateId,
        emailType,
        result.data.subject,
        result.data.body,
        context ? context.slice(0, 2000) : null,
        user.username,
      ]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'ai_call',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        skill: 'draft-email',
        email_type: emailType,
        draft_id: insertResult.lastInsertRowid,
        cost_usd: result.costUsd,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        draft_id: insertResult.lastInsertRowid,
        subject: result.data.subject,
        body: result.data.body,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
          note: 'This is an AI draft. Edit it in /api/candidate-emails/[id] and send when ready.',
        },
      },
    });
  } catch (error) {
    console.error('Draft email error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
