'use client';

import { useEffect, useState } from 'react';
import { Loader2, Shield, User, Activity, Filter } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface LogEntry {
  id: number;
  user_id: number | null;
  user_username: string;
  user_role: string | null;
  action: string;
  entity_type: string | null;
  entity_id: number | null;
  details: string | null;
  ip_address: string | null;
  created_at: string;
}

function actionColor(action: string): string {
  if (action === 'login') return '#059669';
  if (action === 'login_failed') return '#DC2626';
  if (action === 'logout') return '#6B7280';
  if (action === 'delete') return '#DC2626';
  if (action === 'create') return '#059669';
  if (action === 'update') return '#D97706';
  if (action === 'ai_call') return '#17BED0';
  if (action === 'score_submitted') return '#7C5CBF';
  return '#374151';
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterAction, setFilterAction] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterEntity, setFilterEntity] = useState('');

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '50' });
      if (filterAction) params.set('action', filterAction);
      if (filterUser) params.set('user', filterUser);
      if (filterEntity) params.set('entity_type', filterEntity);

      const res = await fetch(`/api/audit-log?${params}`);
      const json = await res.json();
      if (json.success) {
        setLogs(json.data);
        setTotal(json.meta?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();

  }, [page, filterAction, filterUser, filterEntity]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Audit Log</h1>
          <p className={styles.pageSubtitle}>
            Complete history of all admin actions. Who, when, what, to what.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
        padding: '16px',
        background: '#F9FAFB',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
      }}>
        <div>
          <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Action</label>
          <select
            value={filterAction}
            onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
          >
            <option value="">All actions</option>
            <option value="login">Login</option>
            <option value="login_failed">Login failed</option>
            <option value="logout">Logout</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="ai_call">AI call</option>
            <option value="score_submitted">Score submitted</option>
            <option value="session_created">Session created</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>User</label>
          <input
            type="text"
            value={filterUser}
            placeholder="Username"
            onChange={(e) => { setFilterUser(e.target.value); setPage(1); }}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Entity</label>
          <select
            value={filterEntity}
            onChange={(e) => { setFilterEntity(e.target.value); setPage(1); }}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
          >
            <option value="">All entities</option>
            <option value="candidate">Candidate</option>
            <option value="job">Job</option>
            <option value="admin_user">Admin user</option>
            <option value="interview_session">Interview session</option>
            <option value="scorecard">Scorecard</option>
            <option value="reference">Reference</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#F9FAFB' }}>
                <tr>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', textTransform: 'uppercase', color: '#6B7280' }}>When</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', textTransform: 'uppercase', color: '#6B7280' }}>User</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', textTransform: 'uppercase', color: '#6B7280' }}>Action</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', textTransform: 'uppercase', color: '#6B7280' }}>Entity</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', textTransform: 'uppercase', color: '#6B7280' }}>Details</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '10px', textTransform: 'uppercase', color: '#6B7280' }}>IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => {
                  let details: Record<string, unknown> | null = null;
                  try { if (l.details) details = JSON.parse(l.details); } catch { /* ignore */ }
                  return (
                    <tr key={l.id} style={{ borderTop: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '10px 12px', fontSize: '11px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        {new Date(l.created_at).toLocaleString()}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '12px' }}>
                        <div style={{ fontWeight: 600, color: '#1F2937' }}>{l.user_username}</div>
                        {l.user_role && <div style={{ fontSize: '10px', color: '#6B7280' }}>{l.user_role}</div>}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          background: `${actionColor(l.action)}20`,
                          color: actionColor(l.action),
                        }}>
                          {l.action}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '12px', color: '#374151' }}>
                        {l.entity_type ? `${l.entity_type}${l.entity_id ? ` #${l.entity_id}` : ''}` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '11px', color: '#6B7280', maxWidth: '320px' }}>
                        {details ? (
                          <code style={{ fontSize: '10px', background: '#F3F4F6', padding: '2px 4px', borderRadius: '3px' }}>
                            {Object.entries(details).slice(0, 3).map(([k, v]) => `${k}: ${typeof v === 'string' ? v.slice(0, 30) : JSON.stringify(v).slice(0, 30)}`).join(' · ')}
                          </code>
                        ) : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '10px', color: '#9CA3AF' }}>{l.ip_address || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>
              {total} total entries · Page {page} of {Math.ceil(total / 50)}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ padding: '6px 14px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: '12px' }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={page * 50 >= total}
                style={{ padding: '6px 14px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: page * 50 >= total ? 'not-allowed' : 'pointer', fontSize: '12px' }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
