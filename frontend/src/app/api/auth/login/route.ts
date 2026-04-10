import { NextResponse } from 'next/server';
import { validateLogin } from '@/lib/validations';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';
import { queryOne, execute } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { logAudit, getClientIp as getIp, getUserAgent } from '@/lib/audit';
import type { AdminUser } from '@/types';

// Dummy hash for timing-safe comparison when user doesn't exist
const DUMMY_HASH = '$2b$12$LJ3m4ys3Lg3Lg3Lg3Lg3LeDummy.Hash.For.Timing.Safety.Only00';

export async function POST(request: Request) {
  try {
    // Rate limit: 5 attempts per 15 minutes per IP
    const ip = getClientIp(request);
    const { allowed, retryAfter } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: `Too many login attempts. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = validateLogin(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const { username, password } = validation.data!;

    const user = await queryOne<AdminUser>(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );

    // Always run bcrypt.compare to prevent timing side-channel
    const isValid = await verifyPassword(password, user?.password_hash || DUMMY_HASH);

    if (!user || !isValid) {
      logAudit({
        userUsername: username || 'unknown',
        action: 'login_failed',
        entityType: 'admin_user',
        ipAddress: getIp(request),
        userAgent: getUserAgent(request),
      });
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user.id, username: user.username });
    await setAuthCookie(token);

    // Update last_login_at
    await execute(
      "UPDATE admin_users SET last_login_at = datetime('now') WHERE id = ?",
      [user.id]
    );

    logAudit({
      userId: user.id,
      userUsername: user.username,
      userRole: (user as AdminUser & { role?: string }).role || 'admin',
      action: 'login',
      entityType: 'admin_user',
      entityId: user.id,
      ipAddress: getIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        full_name: (user as AdminUser & { full_name?: string }).full_name,
        role: (user as AdminUser & { role?: string }).role || 'admin',
        photo: (user as AdminUser & { photo?: string }).photo,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
