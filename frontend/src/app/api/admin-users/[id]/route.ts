import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { queryOne, execute } from '@/lib/db';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import { requirePermission, getAuthenticatedUser } from '@/lib/permissions';
import type { AdminUserRow } from '../route';

interface RouteContext {
  params: Promise<{ id: string }>;
}

const VALID_ROLES = ['admin', 'recruiter', 'interviewer', 'hiring_manager'] as const;

export async function GET(_request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }
  if (user.role === 'interviewer') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await context.params;
  const userId = parseInt(id, 10);

  const row = await queryOne<AdminUserRow>(
    `SELECT id, username, full_name, email, photo, role, title, is_active, last_login_at, created_at, updated_at
     FROM admin_users WHERE id = ?`,
    [userId]
  );

  if (!row) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: row });
}

export async function PUT(request: Request, context: RouteContext) {
  const currentUser = await requirePermission('users:manage');
  if (!currentUser) {
    return NextResponse.json(
      { success: false, error: 'Only admins can update users' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);
    const body = await request.json();

    const existing = await queryOne<AdminUserRow>(
      'SELECT * FROM admin_users WHERE id = ?',
      [userId]
    );
    if (!existing) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const role =
      body.role && VALID_ROLES.includes(body.role) ? body.role : existing.role;

    // Optional password update
    let passwordHashUpdate: string | null = null;
    if (body.password && typeof body.password === 'string' && body.password.length >= 8) {
      passwordHashUpdate = await hashPassword(body.password);
    }

    await execute(
      `UPDATE admin_users SET
        full_name = COALESCE(?, full_name),
        email = COALESCE(?, email),
        photo = COALESCE(?, photo),
        role = ?,
        title = COALESCE(?, title),
        is_active = COALESCE(?, is_active),
        password_hash = COALESCE(?, password_hash),
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        body.full_name ?? null,
        body.email ?? null,
        body.photo ?? null,
        role,
        body.title ?? null,
        body.is_active ?? null,
        passwordHashUpdate,
        userId,
      ]
    );

    logAudit({
      userId: currentUser.userId,
      userUsername: currentUser.username,
      action: 'update',
      entityType: 'admin_user',
      entityId: userId,
      details: {
        target_user: existing.username,
        changed: Object.keys(body),
        password_changed: !!passwordHashUpdate,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    const updated = await queryOne<AdminUserRow>(
      `SELECT id, username, full_name, email, photo, role, title, is_active, last_login_at, created_at, updated_at
       FROM admin_users WHERE id = ?`,
      [userId]
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const currentUser = await requirePermission('users:manage');
  if (!currentUser) {
    return NextResponse.json(
      { success: false, error: 'Only admins can delete users' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    if (userId === currentUser.userId) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const existing = await queryOne<AdminUserRow>(
      'SELECT username FROM admin_users WHERE id = ?',
      [userId]
    );
    if (!existing) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    await execute('DELETE FROM admin_users WHERE id = ?', [userId]);

    logAudit({
      userId: currentUser.userId,
      userUsername: currentUser.username,
      action: 'delete',
      entityType: 'admin_user',
      entityId: userId,
      details: { deleted_username: existing.username },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
