import { NextResponse } from 'next/server';
import { queryAll, execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { CompanySetting } from '@/types';

// Keys safe to expose publicly without auth
const PUBLIC_SETTINGS_KEYS = new Set([
  'company_name', 'company_logo', 'company_description', 'company_website',
  'company_linkedin', 'company_twitter', 'company_instagram', 'company_github',
  'site_title', 'site_description',
]);

export async function GET(request: Request) {
  try {
    const settings = await queryAll<CompanySetting>(
      'SELECT * FROM company_settings ORDER BY key ASC'
    );

    // Check if the request is authenticated
    const user = await getAuthUser();

    // Convert array to key-value object, filtering by auth status
    const settingsMap: Record<string, string> = {};
    for (const setting of settings) {
      if (user || PUBLIC_SETTINGS_KEYS.has(setting.key)) {
        settingsMap[setting.key] = setting.value;
      }
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

    await transaction(async () => {
      for (const [key, value] of Object.entries(settings)) {
        if (typeof key !== 'string' || typeof value !== 'string') continue;

        await execute(
          `INSERT INTO company_settings (key, value, updated_at)
           VALUES (?, ?, datetime('now'))
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
          [key, value]
        );
      }
    });

    // Return updated settings
    const updatedSettings = await queryAll<CompanySetting>(
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
