/**
 * Centralized JWT configuration.
 *
 * Both auth.ts (jsonwebtoken, server-side) and middleware.ts (jose, Edge runtime)
 * must use the exact same secret. This module is the single source of truth.
 */

const isBuilding = process.env.NEXT_BUILD_MODE === '1' ||
  process.env.NEXT_PHASE === 'phase-production-build';

const envSecret = process.env.JWT_SECRET;

if (process.env.NODE_ENV === 'production' && !envSecret && !isBuilding) {
  throw new Error(
    'FATAL: JWT_SECRET environment variable is required in production. ' +
    'Set it in your deployment environment (Railway, Docker, etc.).'
  );
}

/**
 * JWT secret string — used by both jsonwebtoken (auth.ts) and jose (middleware.ts).
 * In development, falls back to a dev-only value. In production, requires JWT_SECRET.
 */
export const JWT_SECRET: string = envSecret || 'dev-secret-change-in-production';

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const COOKIE_NAME = 'auth_token';
