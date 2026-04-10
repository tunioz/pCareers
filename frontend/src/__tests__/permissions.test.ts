import { describe, it, expect } from 'vitest';
import { hasPermission } from '@/lib/permissions';

describe('permissions', () => {
  it('admin has all permissions', () => {
    expect(hasPermission('admin', 'users:manage')).toBe(true);
    expect(hasPermission('admin', 'candidates:delete')).toBe(true);
    expect(hasPermission('admin', 'system:audit_log')).toBe(true);
    expect(hasPermission('admin', 'system:settings')).toBe(true);
  });

  it('recruiter can manage candidates but not users', () => {
    expect(hasPermission('recruiter', 'candidates:view')).toBe(true);
    expect(hasPermission('recruiter', 'candidates:edit')).toBe(true);
    expect(hasPermission('recruiter', 'candidates:export_gdpr')).toBe(true);
    expect(hasPermission('recruiter', 'users:manage')).toBe(false);
    expect(hasPermission('recruiter', 'system:audit_log')).toBe(false);
  });

  it('hiring_manager can view and edit candidates, cannot delete', () => {
    expect(hasPermission('hiring_manager', 'candidates:view')).toBe(true);
    expect(hasPermission('hiring_manager', 'candidates:edit')).toBe(true);
    expect(hasPermission('hiring_manager', 'candidates:delete')).toBe(false);
    expect(hasPermission('hiring_manager', 'pipeline:status_change')).toBe(true);
  });

  it('interviewer has minimal permissions', () => {
    expect(hasPermission('interviewer', 'candidates:view')).toBe(true);
    expect(hasPermission('interviewer', 'candidates:edit')).toBe(false);
    expect(hasPermission('interviewer', 'candidates:delete')).toBe(false);
    expect(hasPermission('interviewer', 'interviews:submit_scorecard')).toBe(true);
    expect(hasPermission('interviewer', 'interviews:view_all_scorecards')).toBe(false);
    expect(hasPermission('interviewer', 'candidates:view_salary')).toBe(false);
  });

  it('unknown role has no permissions', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(hasPermission('unknown_role' as any, 'candidates:view')).toBe(false);
  });
});
