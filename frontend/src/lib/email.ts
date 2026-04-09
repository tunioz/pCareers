import { Resend } from 'resend';

/**
 * Email delivery via Resend.
 *
 * Setup:
 *   1. Sign up at resend.com
 *   2. Add and verify your domain (careers.pcloud.com or pcloud.com)
 *   3. Get an API key
 *   4. Set RESEND_API_KEY in environment
 *   5. Set EMAIL_FROM to your verified sender (e.g. "pCloud Careers <careers@pcloud.com>")
 *
 * Without RESEND_API_KEY, sendEmail() returns { ok: false, error: 'not configured' }
 * and the UI handles gracefully (email stays as draft).
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'pCloud Careers <careers@pcloud.com>';
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || undefined;

let client: Resend | null = null;

function getClient(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!client) client = new Resend(RESEND_API_KEY);
  return client;
}

export function isEmailConfigured(): boolean {
  return Boolean(RESEND_API_KEY);
}

export interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}

export interface SendEmailResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send a plain-text or HTML email via Resend.
 * Returns { ok: false, error: 'not configured' } if RESEND_API_KEY is missing.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const resend = getClient();
  if (!resend) {
    return { ok: false, error: 'Email provider not configured (RESEND_API_KEY missing)' };
  }

  try {
    const response = await resend.emails.send({
      from: EMAIL_FROM,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html || textToHtml(input.text),
      replyTo: input.replyTo || EMAIL_REPLY_TO,
      cc: input.cc,
      bcc: input.bcc,
    });

    if (response.error) {
      return { ok: false, error: response.error.message || 'Resend API error' };
    }

    return { ok: true, messageId: response.data?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Unknown email error',
    };
  }
}

/**
 * Basic plain text → HTML converter. Preserves line breaks, escapes HTML.
 */
function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const withLinks = escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" style="color: #17BED0; text-decoration: underline;">$1</a>'
  );
  const withBreaks = withLinks.replace(/\n/g, '<br>');
  return `<!DOCTYPE html><html><body style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1F2937; line-height: 1.6;">${withBreaks}</body></html>`;
}
