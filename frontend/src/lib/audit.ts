import { execute, queryAll, queryOne } from '@/lib/db';

/**
 * Comprehensive admin action audit log.
 *
 * Every meaningful action by an admin user is recorded: who, when, what, to what,
 * with before/after details. Used for compliance, debugging, and accountability.
 */

export type AuditAction =
  | 'login'
  | 'logout'
  | 'login_failed'
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'status_change'
  | 'ai_call'
  | 'export'
  | 'email_sent'
  | 'reference_requested'
  | 'task_sent'
  | 'score_submitted'
  | 'session_created'
  | 'session_completed';

export type EntityType =
  | 'candidate'
  | 'job'
  | 'post'
  | 'admin_user'
  | 'interview_kit'
  | 'interview_session'
  | 'reference'
  | 'scorecard'
  | 'attachment'
  | 'task_submission'
  | 'email_template'
  | 'system';

export interface AuditLogEntry {
  userId?: number | null;
  userUsername: string;
  userRole?: string | null;
  action: AuditAction;
  entityType?: EntityType;
  entityId?: number | null;
  details?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export function logAudit(entry: AuditLogEntry): void {
  try {
    execute(
      `INSERT INTO audit_log (
        user_id, user_username, user_role, action,
        entity_type, entity_id, details, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.userId ?? null,
        entry.userUsername,
        entry.userRole ?? null,
        entry.action,
        entry.entityType ?? null,
        entry.entityId ?? null,
        entry.details ? JSON.stringify(entry.details) : null,
        entry.ipAddress ?? null,
        entry.userAgent ?? null,
      ]
    );
  } catch (err) {
    // Never let audit failure break the main action
    console.error('Failed to write audit_log:', err);
  }
}

export interface AuditLogRow {
  id: number;
  user_id: number | null;
  user_username: string;
  user_role: string | null;
  action: string;
  entity_type: string | null;
  entity_id: number | null;
  details: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface AuditLogFilters {
  entityType?: EntityType;
  entityId?: number;
  userUsername?: string;
  action?: AuditAction;
  limit?: number;
  offset?: number;
  dateFrom?: string;
  dateTo?: string;
}

export function getAuditLog(filters: AuditLogFilters = {}): AuditLogRow[] {
  const where: string[] = [];
  const params: unknown[] = [];

  if (filters.entityType) {
    where.push('entity_type = ?');
    params.push(filters.entityType);
  }
  if (filters.entityId !== undefined) {
    where.push('entity_id = ?');
    params.push(filters.entityId);
  }
  if (filters.userUsername) {
    where.push('user_username = ?');
    params.push(filters.userUsername);
  }
  if (filters.action) {
    where.push('action = ?');
    params.push(filters.action);
  }
  if (filters.dateFrom) {
    where.push('created_at >= ?');
    params.push(filters.dateFrom);
  }
  if (filters.dateTo) {
    where.push('created_at <= ?');
    params.push(filters.dateTo);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
  const limit = filters.limit ?? 100;
  const offset = filters.offset ?? 0;

  return queryAll<AuditLogRow>(
    `SELECT * FROM audit_log ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
}

export function countAuditLog(filters: AuditLogFilters = {}): number {
  const where: string[] = [];
  const params: unknown[] = [];

  if (filters.entityType) {
    where.push('entity_type = ?');
    params.push(filters.entityType);
  }
  if (filters.entityId !== undefined) {
    where.push('entity_id = ?');
    params.push(filters.entityId);
  }
  if (filters.userUsername) {
    where.push('user_username = ?');
    params.push(filters.userUsername);
  }
  if (filters.action) {
    where.push('action = ?');
    params.push(filters.action);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

  const row = queryOne<{ total: number }>(
    `SELECT COUNT(*) as total FROM audit_log ${whereSql}`,
    params
  );
  return row?.total || 0;
}

export function getClientIp(request: Request): string | null {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

export function getUserAgent(request: Request): string | null {
  return request.headers.get('user-agent');
}
