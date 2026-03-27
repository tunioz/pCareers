import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/uploads/') ||
    pathname.includes('.') // static files (favicon.ico, etc.)
  ) {
    return NextResponse.next();
  }

  // Admin routes (except login) require authentication check
  // The actual auth verification happens in the route handlers;
  // the middleware just lets everything pass through.
  return NextResponse.next();
}

export const config = {
  // Match all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|uploads/).*)'],
};
