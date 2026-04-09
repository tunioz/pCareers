import { queryOne } from '@/lib/db';
import { getAuthUser, type JwtPayload } from '@/lib/auth';

/**
 * Role-based permissions for the ATS admin panel.
 *
 * Four roles:
 *   admin          — Full access, user management, system settings
 *   recruiter      — Full candidate workflow, scheduling, offers
 *   hiring_manager — Candidate review, final decisions, cannot manage users
 *   interviewer    — Scorecards only, NO salary visibility, NO AI decision pack
 */

export type Role = 'admin' | 'recruiter' | 'hiring_manager' | 'interviewer';

export interface AuthenticatedUser {
  userId: number;
  username: string;
  role: Role;
  fullName: string | null;
}

/**
 * Resolve the current authenticated user WITH their role from the DB.
 * Use this instead of raw getAuthUser() when role-based checks are needed.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const jwt = await getAuthUser();
  if (!jwt) return null;

  const row = queryOne<{
    id: number;
    username: string;
    role: string | null;
    full_name: string | null;
    is_active: number | null;
  }>(
    'SELECT id, username, role, full_name, is_active FROM admin_users WHERE id = ?',
    [jwt.userId]
  );

  if (!row || row.is_active === 0) return null;

  const role: Role = (row.role as Role) || 'admin';
  return {
    userId: row.id,
    username: row.username,
    role,
    fullName: row.full_name,
  };
}

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSIONS[permission].includes(role);
}

export type Permission =
  // User management
  | 'users:manage'
  | 'users:view'
  // Candidates
  | 'candidates:view'
  | 'candidates:edit'
  | 'candidates:delete'
  | 'candidates:view_salary'
  | 'candidates:export_gdpr'
  // Pipeline control
  | 'pipeline:status_change'
  | 'pipeline:send_offer'
  | 'pipeline:send_rejection'
  // Jobs
  | 'jobs:view'
  | 'jobs:edit'
  // Content
  | 'content:edit' // posts, categories, tags
  // Interviews
  | 'interviews:schedule'
  | 'interviews:submit_scorecard'
  | 'interviews:view_all_scorecards' // see all scores without submitting
  // References
  | 'references:request'
  | 'references:view'
  // Decision
  | 'decision:ai_analysis'
  | 'decision:final'
  // System
  | 'system:audit_log'
  | 'system:settings'
  | 'system:ai_usage';

const PERMISSIONS: Record<Permission, Role[]> = {
  'users:manage': ['admin'],
  'users:view': ['admin', 'recruiter', 'hiring_manager'],

  'candidates:view': ['admin', 'recruiter', 'hiring_manager', 'interviewer'],
  'candidates:edit': ['admin', 'recruiter', 'hiring_manager'],
  'candidates:delete': ['admin'],
  'candidates:view_salary': ['admin', 'recruiter', 'hiring_manager'],
  'candidates:export_gdpr': ['admin', 'recruiter'],

  'pipeline:status_change': ['admin', 'recruiter', 'hiring_manager'],
  'pipeline:send_offer': ['admin', 'recruiter', 'hiring_manager'],
  'pipeline:send_rejection': ['admin', 'recruiter', 'hiring_manager'],

  'jobs:view': ['admin', 'recruiter', 'hiring_manager', 'interviewer'],
  'jobs:edit': ['admin', 'recruiter'],

  'content:edit': ['admin', 'recruiter'],

  'interviews:schedule': ['admin', 'recruiter', 'hiring_manager'],
  'interviews:submit_scorecard': ['admin', 'recruiter', 'hiring_manager', 'interviewer'],
  'interviews:view_all_scorecards': ['admin', 'recruiter', 'hiring_manager'],

  'references:request': ['admin', 'recruiter', 'hiring_manager'],
  'references:view': ['admin', 'recruiter', 'hiring_manager'],

  'decision:ai_analysis': ['admin', 'recruiter', 'hiring_manager'],
  'decision:final': ['admin', 'recruiter', 'hiring_manager'],

  'system:audit_log': ['admin'],
  'system:settings': ['admin'],
  'system:ai_usage': ['admin'],
};

/**
 * Guard helper for route handlers.
 * Returns the user if authenticated and has permission, null otherwise.
 *
 * Usage:
 *   const user = await requirePermission('candidates:edit');
 *   if (!user) return forbidden();
 */
export async function requirePermission(
  permission: Permission
): Promise<AuthenticatedUser | null> {
  const user = await getAuthenticatedUser();
  if (!user) return null;
  if (!hasPermission(user.role, permission)) return null;
  return user;
}

/**
 * Forbid response helper.
 */
export function forbiddenResponse(message = 'Insufficient permissions') {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function unauthorizedResponse(message = 'Not authenticated') {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Strip sensitive fields (salary, etc.) from candidate data based on role.
 * Returns a new object with sensitive fields removed for roles that can't see them.
 */
export function stripSensitiveFields<T extends Record<string, unknown>>(
  candidate: T,
  role: Role
): T {
  if (hasPermission(role, 'candidates:view_salary')) {
    return candidate;
  }

  // Interviewer view: remove salary, compensation, source referrer details
  const copy = { ...candidate };
  const sensitiveKeys = [
    'salary_min',
    'salary_max',
    'salary_currency',
    'rejection_reason',
    'rejection_notes',
    'referrer_name',
    'referrer_email',
    'referrer_company',
    'is_internal_referral',
  ];
  for (const key of sensitiveKeys) {
    if (key in copy) {
      (copy as Record<string, unknown>)[key] = null;
    }
  }
  return copy;
}

export function stripSensitiveFromArray<T extends Record<string, unknown>>(
  candidates: T[],
  role: Role
): T[] {
  return candidates.map((c) => stripSensitiveFields(c, role));
}
