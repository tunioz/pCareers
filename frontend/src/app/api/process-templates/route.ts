import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateProcessTemplate } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { ProcessTemplate, ProcessStep } from '@/types';

export async function GET() {
  try {
    const templates = queryAll<ProcessTemplate>(
      'SELECT * FROM process_templates ORDER BY is_default DESC, name ASC'
    );

    // Load steps for each template
    const templatesWithSteps = templates.map((template) => {
      const steps = queryAll<ProcessStep>(
        'SELECT * FROM process_steps WHERE template_id = ? ORDER BY step_number ASC',
        [template.id]
      );
      return { ...template, steps };
    });

    return NextResponse.json({
      success: true,
      data: templatesWithSteps,
    });
  } catch (error) {
    console.error('Get process templates error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const validation = validateProcessTemplate(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // If setting as default, unset any existing default
    if (data.is_default) {
      execute('UPDATE process_templates SET is_default = 0 WHERE is_default = 1');
    }

    const result = execute(
      `INSERT INTO process_templates (name, description, intro_text, is_default, is_published)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.name,
        data.description || null,
        data.intro_text || null,
        data.is_default || 0,
        data.is_published ?? 1,
      ]
    );

    const newTemplate = queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: { ...newTemplate, steps: [] } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create process template error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
