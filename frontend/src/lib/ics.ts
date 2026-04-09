/**
 * ICS calendar file generation.
 *
 * ICS is a universal calendar format that works with Google Calendar,
 * Outlook, Apple Calendar, and every other calendar app. No OAuth needed.
 *
 * Flow:
 *   1. Recruiter creates interview session with date/time
 *   2. System generates .ics file
 *   3. Recruiter downloads or emails .ics to all panelists + candidate
 *   4. They import into their calendar of choice
 *
 * This covers 95% of "calendar integration" without the OAuth complexity.
 * Real-time sync (Google/Outlook OAuth) can be added later as Phase 2.
 */

export interface IcsEvent {
  uid: string; // unique ID, e.g. `interview-session-${id}@pcloud.com`
  summary: string; // event title
  description?: string;
  location?: string;
  startIso: string; // ISO datetime
  durationMinutes: number;
  organizerEmail?: string;
  organizerName?: string;
  attendees?: Array<{ name: string; email: string }>;
  url?: string; // e.g. meet link or admin candidate URL
}

/**
 * Escape special characters per RFC 5545.
 */
function escape(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Format a Date to ICS datetime (UTC): YYYYMMDDTHHMMSSZ
 */
function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

/**
 * Fold a long line per RFC 5545 (max 75 octets).
 */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let remaining = line;
  chunks.push(remaining.slice(0, 75));
  remaining = remaining.slice(75);
  while (remaining.length > 0) {
    chunks.push(' ' + remaining.slice(0, 74));
    remaining = remaining.slice(74);
  }
  return chunks.join('\r\n');
}

/**
 * Generate an .ics file content for a single event.
 */
export function generateIcs(event: IcsEvent): string {
  const start = new Date(event.startIso);
  const end = new Date(start.getTime() + event.durationMinutes * 60 * 1000);
  const now = new Date();

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//pCloud//ATS//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${formatDate(now)}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${escape(event.summary)}`,
  ];

  if (event.description) {
    lines.push(`DESCRIPTION:${escape(event.description)}`);
  }
  if (event.location) {
    lines.push(`LOCATION:${escape(event.location)}`);
  }
  if (event.url) {
    lines.push(`URL:${event.url}`);
  }
  if (event.organizerEmail) {
    const name = event.organizerName ? `CN=${escape(event.organizerName)}:` : '';
    lines.push(`ORGANIZER;${name}mailto:${event.organizerEmail}`);
  }
  if (event.attendees && event.attendees.length > 0) {
    for (const att of event.attendees) {
      lines.push(
        `ATTENDEE;CN=${escape(att.name)};ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:${att.email}`
      );
    }
  }

  lines.push('STATUS:CONFIRMED');
  lines.push('SEQUENCE:0');
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return lines.map(foldLine).join('\r\n');
}
