import jwt, { type SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || (
  process.env.NODE_ENV === 'production'
    ? (() => { throw new Error('JWT_SECRET environment variable is required in production'); })()
    : 'dev-secret-change-in-production'
);
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];
const COOKIE_NAME = 'auth_token';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface JwtPayload {
  userId: number;
  username: string;
}

export interface AuthResult {
  success: boolean;
  userId?: number;
  username?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------

const SALT_ROUNDS = 12;

/**
 * Hash a plaintext password.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plaintext password against a hash.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ---------------------------------------------------------------------------
// JWT
// ---------------------------------------------------------------------------

/**
 * Sign a JWT token with user payload.
 */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode a JWT token.
 * Returns null if the token is invalid or expired.
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Cookie-based auth helpers (Server Components / Route Handlers)
// ---------------------------------------------------------------------------

/**
 * Set the auth cookie with httpOnly + secure flags.
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Remove the auth cookie (logout).
 */
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get the current authenticated user from cookies.
 * Returns null if not authenticated.
 */
export async function getAuthUser(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Check if the current request is authenticated.
 * For use in Server Components and Route Handlers.
 */
export async function requireAuth(): Promise<AuthResult> {
  const user = await getAuthUser();

  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  return {
    success: true,
    userId: user.userId,
    username: user.username,
  };
}

/**
 * Extract token from Authorization header (for API routes).
 */
export function getTokenFromHeader(
  authHeader: string | null
): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}
