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

interface SessionRow {
  id: number;
  stage: string;
  scheduled_at: string | null;
  location: string | null;
  meet_link: string | null;
  duration_minutes: number | null;
  interviewer_name: string;
  kit_id: number | null;
}

interface InterviewerRow {
  username: string;
  full_name: string | null;
  email: string | null;
}

/**
 * POST /api/ai/draft-email
 * Body: { candidate_id, email_type, context?, highlights?, session_id? }
 *
 * Generates an AI draft email AND saves it to candidate_emails as status='draft'.
 * Admin can then edit via PUT /api/candidate-emails/[id] and send via POST .../send.
 *
 * For email_type='interview_invite':
 *   - If session_id provided, use that session's details
 *   - Otherwise auto-pick the latest 'scheduled' session for this candidate
 *   - Session details (date, time, location, interviewer, duration) are injected
 *     into the AI prompt so the generated email has real data, not placeholders
 *   - The email is linked to the session so it auto-attaches the .ics on send
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
    const sessionId = body.session_id ? parseInt(body.session_id, 10) : null;

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

    // For interview invite emails, pull session details
    let sessionDetails: string | undefined;
    let linkedSession: SessionRow | null = null;
    if (emailType === 'interview_invite') {
      let session: SessionRow | null = null;

      if (sessionId) {
        session = queryOne<SessionRow>(
          'SELECT id, stage, scheduled_at, location, meet_link, duration_minutes, interviewer_name, kit_id FROM candidate_interview_sessions WHERE id = ? AND candidate_id = ?',
          [sessionId, candidateId]
        ) || null;
      } else {
        // Auto-pick latest scheduled session for this candidate
        session = queryOne<SessionRow>(
          `SELECT id, stage, scheduled_at, location, meet_link, duration_minutes, interviewer_name, kit_id
           FROM candidate_interview_sessions
           WHERE candidate_id = ? AND status = 'scheduled'
           ORDER BY scheduled_at DESC LIMIT 1`,
          [candidateId]
        ) || null;
      }

      if (session) {
        linkedSession = session;
        const scheduledDate = session.scheduled_at
          ? new Date(session.scheduled_at).toLocaleString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })
          : 'TBD';

        const interviewer = queryOne<InterviewerRow>(
          'SELECT username, full_name, email FROM admin_users WHERE username = ?',
          [session.interviewer_name]
        );
        const interviewerLabel = interviewer?.full_name || interviewer?.username || session.interviewer_name;

        const duration = session.duration_minutes || 60;

        sessionDetails = [
          `Stage: ${session.stage}`,
          `Date & time: ${scheduledDate}`,
          `Duration: ${duration} minutes`,
          `Interviewer: ${interviewerLabel}`,
          session.location ? `Location: ${session.location}` : 'Location: To be confirmed',
          session.meet_link ? `Meet link: ${session.meet_link}` : '',
        ].filter(Boolean).join('\n');
      }
    }

    const firstName = candidate.full_name.split(' ')[0];

    // Merge session details into admin context for interview invites
    const finalContext = sessionDetails
      ? `${sessionDetails}${context ? '\n\nADDITIONAL NOTES:\n' + context : ''}`
      : context;

    const result = await callAiJson<DraftedEmail>({
      model: 'sonnet',
      maxTokens: 1500,
      temperature: 0.5,
      systemPrompt: DRAFT_EMAIL_SYSTEM,
      userPrompt: buildDraftEmailPrompt({
        emailType,
        candidateFirstName: firstName,
        jobTitle: job?.title || 'the role',
        stage: linkedSession?.stage || (candidate as Candidate & { status?: string }).status,
        context: finalContext,
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
        ai_prompt_context, session_id, created_by
      ) VALUES (?, ?, ?, ?, 'draft', 1, ?, ?, ?)`,
      [
        candidateId,
        emailType,
        result.data.subject,
        result.data.body,
        finalContext ? finalContext.slice(0, 2000) : null,
        linkedSession?.id || null,
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
        linked_session_id: linkedSession?.id,
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
        linked_session_id: linkedSession?.id || null,
        meta: {
          tokens_in: result.tokensIn,
          tokens_out: result.tokensOut,
          cost_usd: result.costUsd,
          duration_ms: result.durationMs,
          note: linkedSession
            ? 'AI draft saved. Edit if needed, then send — the linked interview session .ics will be attached automatically.'
            : 'This is an AI draft. Edit it in /api/candidate-emails/[id] and send when ready.',
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
