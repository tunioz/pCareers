import { NextResponse } from 'next/server';
import { validateLogin } from '@/lib/validations';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';
import { queryOne } from '@/lib/db';
import type { AdminUser } from '@/types';

export async function POST(request: Request) {
  try {
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

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
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
