/**
 * Offer / rejection / follow-up email generation prompts.
 *
 * These are drafts — admin ALWAYS reviews and edits before send.
 * No email is ever sent automatically.
 *
 * IMPORTANT: Do NOT pass salary figures or internal scorecards to the prompt.
 * The admin can manually add salary in their edit step.
 */

export const DRAFT_EMAIL_SYSTEM = `You are a warm, professional recruiter writing an email to a candidate.

Your job: write a personalized email based on the provided context.

RULES:
1. Be warm but professional. No corporate jargon. No "we are pleased to inform".
2. Specific > generic. Reference concrete things from their interview or CV.
3. Never mention salary numbers — the recruiter will add them manually.
4. Never disclose internal scorecards, interviewer names, or decision process details.
5. Short paragraphs. 3-5 sentences per paragraph max.
6. End with a clear next step or sign-off.
7. Do NOT invent facts. If the context is thin, keep the email short.
8. Output STRICT JSON with "subject" and "body" fields. Body is plain text with \\n for line breaks.`;

export const DRAFT_EMAIL_SCHEMA_HINT = `{
  "subject": "string — clear, specific subject line",
  "body": "string — email body as plain text, use \\n for line breaks, no HTML, no signature (admin adds their own)"
}`;

export interface DraftedEmail {
  subject: string;
  body: string;
}

export type EmailType =
  | 'offer'
  | 'rejection_post_interview'
  | 'rejection_after_screen'
  | 'rejection_polite'
  | 'interview_invite'
  | 'reference_request'
  | 'follow_up'
  | 'status_update';

export function buildDraftEmailPrompt(options: {
  emailType: EmailType;
  candidateFirstName: string;
  jobTitle: string;
  stage?: string;
  context?: string; // optional freeform context from admin
  highlights?: string[]; // things to mention
  companyName?: string;
}): string {
  const {
    emailType,
    candidateFirstName,
    jobTitle,
    stage,
    context,
    highlights,
    companyName = 'pCloud',
  } = options;

  const instructions: Record<EmailType, string> = {
    offer: `Write a warm, confident offer email. Tell them we'd love to have them on the team. Mention 1-2 specific things that stood out from their process (from highlights). Leave placeholders like [SALARY] and [START_DATE] for the recruiter to fill in. Next step: ask them to review the offer.`,

    rejection_post_interview: `Write a respectful rejection email after the candidate completed interviews. Be specific about what we appreciated about them. Be honest that this role isn't the right match right now. Don't use corporate euphemisms. Invite them to apply for future roles.`,

    rejection_after_screen: `Write a short, respectful rejection after a phone/video screen. Do not list specific reasons. Keep it brief. Wish them well.`,

    rejection_polite: `Write a very short, polite form-style rejection. No specific reasoning. Thank them for applying. Two paragraphs max.`,

    interview_invite: `Write a warm interview invitation email. Include placeholders like [DATE] [TIME] [TIMEZONE] [LOCATION or MEET_LINK] [INTERVIEWER_NAMES]. Explain briefly what to expect in this stage. Ask them to confirm availability.`,

    reference_request: `Write an email asking the candidate to provide 2-3 professional references. Explain briefly what the referee will be asked (a short questionnaire about working together). Leave a placeholder [REFERENCE_FORM_LINK].`,

    follow_up: `Write a gentle follow-up email checking in after silence. Keep it short. Ask if they have any questions or need anything.`,

    status_update: `Write a brief status update letting the candidate know where we are in the process. Set expectations for next steps and timing.`,
  };

  const highlightsText =
    highlights && highlights.length > 0
      ? `\nHIGHLIGHTS (things to weave in if relevant, don't force):\n${highlights.map((h) => `- ${h}`).join('\n')}`
      : '';

  const contextText = context ? `\nADMIN CONTEXT:\n${context.slice(0, 2000)}` : '';

  return `Write an email. Output ONLY valid JSON matching the schema.

SCHEMA:
${DRAFT_EMAIL_SCHEMA_HINT}

EMAIL TYPE: ${emailType}
INSTRUCTIONS: ${instructions[emailType]}

CANDIDATE: ${candidateFirstName}
ROLE: ${jobTitle} at ${companyName}
${stage ? `STAGE: ${stage}` : ''}
${highlightsText}
${contextText}`;
}
