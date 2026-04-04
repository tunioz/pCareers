import { NextResponse } from 'next/server';
import { validateLogin } from '@/lib/validations';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';
import { queryOne } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
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

    const user = queryOne<AdminUser>(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );

    // Always run bcrypt.compare to prevent timing side-channel
    const isValid = await verifyPassword(password, user?.password_hash || DUMMY_HASH);

    if (!user || !isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user.id, username: user.username });
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
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
