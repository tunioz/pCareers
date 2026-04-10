/**
 * Branded HTML email templates for pCloud candidate communications.
 *
 * All templates use inline styles for maximum email client compatibility
 * (Gmail, Outlook, Apple Mail, Yahoo). No external CSS, no <style> tags.
 *
 * Brand colors:
 *   Primary teal:  #17BED0
 *   Dark teal:     #0EA5B7
 *   Purple accent:  #7C5CBF
 *   Dark text:     #1F2937
 *   Muted text:    #6B7280
 *   Light bg:      #F9FAFB
 */

const LOGO_URL = process.env.EMAIL_LOGO_URL || 'https://careers.pcloud.com/pcloud-logo.png';
const COMPANY_NAME = 'pCloud';
const COMPANY_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://careers.pcloud.com';

// ─── Shared layout pieces ───

function header(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #17BED0 0%, #7C5CBF 100%); border-radius: 12px 12px 0 0;">
      <tr>
        <td style="padding: 32px 40px; text-align: center;">
          <img src="${LOGO_URL}" alt="${COMPANY_NAME}" width="120" style="display: inline-block; max-width: 120px;" />
        </td>
      </tr>
    </table>`;
}

function footer(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px; border-top: 1px solid #E5E7EB;">
      <tr>
        <td style="padding: 24px 40px; text-align: center;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #6B7280;">
            ${COMPANY_NAME} &middot; Sofia, Bulgaria
          </p>
          <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
            <a href="${COMPANY_URL}" style="color: #17BED0; text-decoration: none;">${COMPANY_URL.replace('https://', '')}</a>
          </p>
        </td>
      </tr>
    </table>`;
}

function wrap(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${COMPANY_NAME}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F3F4F6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td>
              ${header()}
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td>
              ${footer()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Helpers ───

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function linkify(text: string): string {
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" style="color: #17BED0; text-decoration: underline;">$1</a>'
  );
}

function bodyToHtml(body: string): string {
  const escaped = escapeHtml(body);
  const linked = linkify(escaped);
  return linked.replace(/\n/g, '<br>');
}

function badge(text: string, bgColor: string, fgColor: string): string {
  return `<span style="display: inline-block; padding: 4px 12px; background: ${bgColor}; color: ${fgColor}; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">${escapeHtml(text)}</span>`;
}

function ctaButton(text: string, url: string): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
      <tr>
        <td style="background: linear-gradient(135deg, #17BED0 0%, #0EA5B7 100%); border-radius: 8px; padding: 14px 32px;">
          <a href="${url}" style="color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-block;">${escapeHtml(text)}</a>
        </td>
      </tr>
    </table>`;
}

function infoBox(content: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
      <tr>
        <td style="background: #F0FDFA; border-left: 4px solid #17BED0; border-radius: 0 8px 8px 0; padding: 16px 20px;">
          <div style="font-size: 14px; color: #1F2937; line-height: 1.6;">${content}</div>
        </td>
      </tr>
    </table>`;
}

// ─── Template type → renderer ───

export type EmailTemplateType =
  | 'offer'
  | 'rejection_post_interview'
  | 'rejection_after_screen'
  | 'rejection_polite'
  | 'interview_invite'
  | 'reference_request'
  | 'follow_up'
  | 'status_update'
  | 'generic';

interface TemplateContext {
  subject: string;
  body: string;
  candidateName?: string;
  jobTitle?: string;
  emailType: EmailTemplateType;
}

function titleForType(emailType: EmailTemplateType): string {
  const titles: Record<EmailTemplateType, string> = {
    offer: 'Offer Letter',
    rejection_post_interview: 'Application Update',
    rejection_after_screen: 'Application Update',
    rejection_polite: 'Application Update',
    interview_invite: 'Interview Invitation',
    reference_request: 'Reference Request',
    follow_up: 'Follow-up',
    status_update: 'Status Update',
    generic: '',
  };
  return titles[emailType] || '';
}

function accentForType(emailType: EmailTemplateType): { bg: string; fg: string } {
  switch (emailType) {
    case 'offer':
      return { bg: '#D1FAE5', fg: '#065F46' };
    case 'interview_invite':
      return { bg: '#DBEAFE', fg: '#1E40AF' };
    case 'rejection_post_interview':
    case 'rejection_after_screen':
    case 'rejection_polite':
      return { bg: '#FEF3C7', fg: '#92400E' };
    case 'reference_request':
      return { bg: '#EDE9FE', fg: '#5B21B6' };
    default:
      return { bg: '#F0FDFA', fg: '#134E4A' };
  }
}

/**
 * Render an AI-drafted (or manually written) email body into a branded HTML template.
 *
 * The `body` is plain text (from the AI or admin edits). This function wraps it
 * in branded HTML with header, type badge, styled body, and footer.
 */
export function renderEmailTemplate(ctx: TemplateContext): string {
  const accent = accentForType(ctx.emailType);
  const title = titleForType(ctx.emailType);

  let content = '';

  // Type badge
  if (title) {
    content += `<div style="margin-bottom: 20px;">${badge(title, accent.bg, accent.fg)}</div>`;
  }

  // Body content
  content += `<div style="font-size: 15px; color: #1F2937; line-height: 1.7;">${bodyToHtml(ctx.body)}</div>`;

  return wrap(content);
}

/**
 * Render interview invite with structured session details box.
 */
export function renderInterviewInviteTemplate(ctx: TemplateContext & {
  sessionDetails?: {
    stage: string;
    dateTime: string;
    duration: string;
    interviewer: string;
    location?: string;
    meetLink?: string;
  };
}): string {
  let content = '';

  content += `<div style="margin-bottom: 20px;">${badge('Interview Invitation', '#DBEAFE', '#1E40AF')}</div>`;
  content += `<div style="font-size: 15px; color: #1F2937; line-height: 1.7;">${bodyToHtml(ctx.body)}</div>`;

  // Session details card
  if (ctx.sessionDetails) {
    const sd = ctx.sessionDetails;
    const details = [
      `<strong>Stage:</strong> ${escapeHtml(sd.stage)}`,
      `<strong>Date & Time:</strong> ${escapeHtml(sd.dateTime)}`,
      `<strong>Duration:</strong> ${escapeHtml(sd.duration)}`,
      `<strong>Interviewer:</strong> ${escapeHtml(sd.interviewer)}`,
    ];
    if (sd.location) details.push(`<strong>Location:</strong> ${escapeHtml(sd.location)}`);
    if (sd.meetLink) details.push(`<strong>Meet Link:</strong> <a href="${sd.meetLink}" style="color: #17BED0; text-decoration: underline;">${escapeHtml(sd.meetLink)}</a>`);

    content += infoBox(details.join('<br>'));
  }

  if (ctx.sessionDetails?.meetLink) {
    content += ctaButton('Join Meeting', ctx.sessionDetails.meetLink);
  }

  return wrap(content);
}

/**
 * Render offer email with congratulations styling.
 */
export function renderOfferTemplate(ctx: TemplateContext): string {
  let content = '';

  content += `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 40px; margin-bottom: 8px;">&#127881;</div>
      ${badge('Offer Letter', '#D1FAE5', '#065F46')}
    </div>`;

  content += `<div style="font-size: 15px; color: #1F2937; line-height: 1.7;">${bodyToHtml(ctx.body)}</div>`;

  return wrap(content);
}

/**
 * Simple generic template — wraps any plain text body in the branded layout.
 * Used as fallback when no specific template matches.
 */
export function renderGenericTemplate(subject: string, body: string): string {
  const content = `<div style="font-size: 15px; color: #1F2937; line-height: 1.7;">${bodyToHtml(body)}</div>`;
  return wrap(content);
}

/**
 * Main entry point: pick the right template based on email type and render.
 */
export function buildEmailHtml(opts: {
  emailType: string;
  subject: string;
  body: string;
  candidateName?: string;
  jobTitle?: string;
  sessionDetails?: {
    stage: string;
    dateTime: string;
    duration: string;
    interviewer: string;
    location?: string;
    meetLink?: string;
  };
}): string {
  const ctx: TemplateContext = {
    subject: opts.subject,
    body: opts.body,
    candidateName: opts.candidateName,
    jobTitle: opts.jobTitle,
    emailType: (opts.emailType as EmailTemplateType) || 'generic',
  };

  switch (opts.emailType) {
    case 'offer':
      return renderOfferTemplate(ctx);
    case 'interview_invite':
      return renderInterviewInviteTemplate({ ...ctx, sessionDetails: opts.sessionDetails });
    default:
      return renderEmailTemplate(ctx);
  }
}
