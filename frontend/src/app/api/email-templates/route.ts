import { NextResponse } from 'next/server';
import { queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateEmailTemplate } from '@/lib/validations';
import type { EmailTemplate } from '@/types';

/**
 * GET /api/email-templates — List all email templates (auth required)
 */
export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const templates = await queryAll<EmailTemplate>(
      'SELECT * FROM email_templates ORDER BY template_type ASC, name ASC'
    );

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error('Get email templates error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/email-templates — Create a new email template (auth required)
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
    const validation = validateEmailTemplate(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    const result = await execute(
      `INSERT INTO email_templates (name, slug, subject, body, template_type, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [v.name, v.slug, v.subject, v.body, v.template_type, v.is_active ?? 1]
    );

    const templates = await queryAll<EmailTemplate>(
      'SELECT * FROM email_templates WHERE id = ?',
      [result.lastInsertRowid]
    );
    const template = templates[0];

    return NextResponse.json(
      { success: true, data: template },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create email template error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
