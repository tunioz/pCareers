import { describe, it, expect } from 'vitest';
import { buildEmailHtml, renderGenericTemplate } from '@/lib/email-templates';

describe('email-templates', () => {
  it('renders generic template with branded layout', () => {
    const html = renderGenericTemplate('Test Subject', 'Hello world');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Hello world');
    expect(html).toContain('pCloud');
    expect(html).toContain('#17BED0'); // Brand color
  });

  it('escapes HTML in body text', () => {
    const html = renderGenericTemplate('Test', '<script>alert("xss")</script>');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('renders offer template with confetti emoji', () => {
    const html = buildEmailHtml({
      emailType: 'offer',
      subject: 'Offer',
      body: 'We are pleased to offer you...',
    });
    expect(html).toContain('&#127881;'); // confetti
    expect(html).toContain('Offer Letter');
    expect(html).toContain('We are pleased to offer you...');
  });

  it('renders interview invite with session details box', () => {
    const html = buildEmailHtml({
      emailType: 'interview_invite',
      subject: 'Interview',
      body: 'We would like to invite you...',
      sessionDetails: {
        stage: 'Technical',
        dateTime: 'Monday, April 14, 2026, 10:00',
        duration: '90 minutes',
        interviewer: 'John Doe',
        location: 'Sofia Office',
        meetLink: 'https://meet.google.com/abc-xyz',
      },
    });
    expect(html).toContain('Interview Invitation');
    expect(html).toContain('Technical');
    expect(html).toContain('Monday, April 14, 2026, 10:00');
    expect(html).toContain('90 minutes');
    expect(html).toContain('John Doe');
    expect(html).toContain('Sofia Office');
    expect(html).toContain('https://meet.google.com/abc-xyz');
    expect(html).toContain('Join Meeting'); // CTA button
  });

  it('renders rejection template with appropriate badge', () => {
    const html = buildEmailHtml({
      emailType: 'rejection_post_interview',
      subject: 'Update',
      body: 'Thank you for your time...',
    });
    expect(html).toContain('Application Update');
    expect(html).toContain('Thank you for your time...');
  });

  it('converts URLs to links in body', () => {
    const html = buildEmailHtml({
      emailType: 'generic',
      subject: 'Test',
      body: 'Visit https://pcloud.com for more info',
    });
    expect(html).toContain('<a href="https://pcloud.com"');
    expect(html).toContain('text-decoration: underline');
  });
});
