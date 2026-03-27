import { NextResponse } from 'next/server';
import { queryAll, execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { CompanySetting } from '@/types';

export async function GET() {
  try {
    const settings = queryAll<CompanySetting>(
      'SELECT * FROM company_settings ORDER BY key ASC'
    );

    // Convert array to key-value object for easier consumption
    const settingsMap: Record<string, string> = {};
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value;
    }

    return NextResponse.json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    console.error('Get company settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.settings || typeof body.settings !== 'object' || Array.isArray(body.settings)) {
      return NextResponse.json(
        { success: false, error: 'settings object is required' },
        { status: 400 }
      );
    }

    const settings = body.settings as Record<string, string>;

    transaction(() => {
      for (const [key, value] of Object.entries(settings)) {
        if (typeof key !== 'string' || typeof value !== 'string') continue;

        execute(
          `INSERT INTO company_settings (key, value, updated_at)
           VALUES (?, ?, datetime('now'))
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
          [key, value]
        );
      }
    });

    // Return updated settings
    const updatedSettings = queryAll<CompanySetting>(
      'SELECT * FROM company_settings ORDER BY key ASC'
    );
    const settingsMap: Record<string, string> = {};
    for (const setting of updatedSettings) {
      settingsMap[setting.key] = setting.value;
    }

    return NextResponse.json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    console.error('Update company settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
