import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { queryAll, queryOne, execute } from '@/lib/db';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { requirePermission, getAuthenticatedUser } from '@/lib/permissions';

export interface AdminUserRow {
  id: number;
  username: string;
  password_hash?: string;
  full_name: string | null;
  email: string | null;
  photo: string | null;
  role: string;
  title: string | null;
  is_active: number;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

const VALID_ROLES = ['admin', 'recruiter', 'interviewer', 'hiring_manager'] as const;

/**
 * GET /api/admin-users
 * List all admin users (no password hashes).
 * Interviewer cannot view user list.
 */
export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }
  if (user.role === 'interviewer') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const users = await queryAll<AdminUserRow>(
      `SELECT id, username, full_name, email, photo, role, title, is_active, last_login_at, created_at, updated_at
       FROM admin_users ORDER BY created_at DESC`
    );
    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin-users
 * Create a new admin user. Only admins can create users.
 * Body: { username, password, full_name, email, role, title, photo }
 */
export async function POST(request: Request) {
  const currentUser = await requirePermission('users:manage');
  if (!currentUser) {
    return NextResponse.json(
      { success: false, error: 'Only admins can create users' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    if (!body.username || !body.password) {
      return NextResponse.json(
        { success: false, error: 'username and password are required' },
        { status: 400 }
      );
    }

    if (body.password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const role = VALID_ROLES.includes(body.role) ? body.role : 'admin';

    // Check username unique
    const existing = await queryOne<{ id: number }>(
      'SELECT id FROM admin_users WHERE username = ?',
      [body.username]
    );
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 409 }
      );
    }

    const hash = await hashPassword(body.password);

    const result = await execute(
      `INSERT INTO admin_users (
        username, password_hash, full_name, email, photo, role, title, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.username,
        hash,
        body.full_name || null,
        body.email || null,
        body.photo || null,
        role,
        body.title || null,
        body.is_active ?? 1,
      ]
    );

    const newId = result.lastInsertRowid as number;

    logAudit({
      userId: currentUser.userId,
      userUsername: currentUser.username,
      action: 'create',
      entityType: 'admin_user',
      entityId: newId,
      details: { username: body.username, role, full_name: body.full_name },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    const created = await queryOne<AdminUserRow>(
      `SELECT id, username, full_name, email, photo, role, title, is_active, last_login_at, created_at, updated_at
       FROM admin_users WHERE id = ?`,
      [newId]
    );

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
