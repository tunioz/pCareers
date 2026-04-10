import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET, COOKIE_NAME } from '@/lib/jwt-config';

const secret = new TextEncoder().encode(JWT_SECRET);

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// Admin API routes that require authentication
const PROTECTED_API_PATTERNS = [
  '/api/upload',
  '/api/company',
  '/api/tags',
  '/api/categories',
];

function isProtectedApiRoute(pathname: string, method: string): boolean {
  // POST/PUT/DELETE on these routes require auth
  if (method === 'GET') return false;

  for (const pattern of PROTECTED_API_PATTERNS) {
    if (pathname.startsWith(pattern)) return true;
  }

  // POST/PUT/DELETE on posts and jobs management
  if ((pathname.startsWith('/api/posts') || pathname.startsWith('/api/jobs')) && method !== 'GET') {
    // Allow public job applications
    if (pathname.match(/^\/api\/jobs\/[^/]+\/apply$/)) return false;
    return true;
  }

  // PUT/DELETE on candidate management (not public POST)
  if (pathname.match(/^\/api\/candidates\/\d+/) && method !== 'GET') {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/uploads/') ||
    pathname.includes('.') // static files (favicon.ico, etc.)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Protect admin pages (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token || !(await isValidToken(token))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect sensitive API routes
  if (pathname.startsWith('/api/') && isProtectedApiRoute(pathname, method)) {
    if (!token || !(await isValidToken(token))) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|uploads/).*)'],
};
