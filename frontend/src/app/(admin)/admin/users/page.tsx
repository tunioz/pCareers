'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, User, Shield, Users, Camera } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface AdminUser {
  id: number;
  username: string;
  full_name: string | null;
  email: string | null;
  photo: string | null;
  role: string;
  title: string | null;
  is_active: number;
  last_login_at: string | null;
  created_at: string;
}

const ROLES = [
  { value: 'admin', label: 'Admin', desc: 'Full access to all features' },
  { value: 'recruiter', label: 'Recruiter', desc: 'Manage candidates and communications' },
  { value: 'interviewer', label: 'Interviewer', desc: 'Conduct interviews and submit scores' },
  { value: 'hiring_manager', label: 'Hiring Manager', desc: 'Make final hiring decisions' },
];

function roleColor(role: string): { bg: string; fg: string } {
  if (role === 'admin') return { bg: '#FEE2E2', fg: '#991B1B' };
  if (role === 'recruiter') return { bg: '#DBEAFE', fg: '#1E40AF' };
  if (role === 'interviewer') return { bg: '#E0F7FA', fg: '#006064' };
  if (role === 'hiring_manager') return { bg: '#F3E5F5', fg: '#6A1B9A' };
  return { bg: '#F3F4F6', fg: '#374151' };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<AdminUser> | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin-users');
      const json = await res.json();
      if (json.success) setUsers(json.data);
      else setError(json.error || 'Failed to load');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const isNew = !editing.id;
      const url = isNew ? '/api/admin-users' : `/api/admin-users/${editing.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const body: Record<string, unknown> = {
        username: editing.username,
        full_name: editing.full_name,
        email: editing.email,
        photo: editing.photo,
        role: editing.role,
        title: editing.title,
        is_active: editing.is_active,
      };
      if (editPassword) body.password = editPassword;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to save');
      } else {
        setEditing(null);
        setEditPassword('');
        await load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, username: string) {
    if (!confirm(`Delete user "${username}"?`)) return;
    try {
      const res = await fetch(`/api/admin-users/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) setError(json.error);
      else await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    }
  }

  async function handlePhotoUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subDir', 'images');
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const json = await res.json();
    if (json.success && editing) {
      setEditing({ ...editing, photo: json.data.url });
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Admin Users</h1>
          <p className={styles.pageSubtitle}>
            Manage admin users, their roles and permissions. Each action is audit-logged.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing({ role: 'recruiter', is_active: 1 });
            setEditPassword('');
          }}
          className={styles.primaryButton}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} />
          New user
        </button>
      </div>

      {error && (
        <div style={{ padding: '12px', background: '#FEE2E2', color: '#991B1B', borderRadius: '8px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#F9FAFB' }}>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>User</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Role</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Title</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Last login</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const rc = roleColor(u.role);
                return (
                  <tr key={u.id} style={{ borderTop: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {u.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={u.photo} alt={u.username} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={18} color="#9CA3AF" />
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                            {u.full_name || u.username}
                            {!u.is_active && <span style={{ marginLeft: '8px', color: '#DC2626', fontSize: '11px' }}>(inactive)</span>}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>{u.email || u.username}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '4px 10px', background: rc.bg, color: rc.fg, borderRadius: '100px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' }}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>{u.title || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280' }}>
                      {u.last_login_at ? new Date(u.last_login_at).toLocaleString() : 'Never'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(u);
                          setEditPassword('');
                        }}
                        style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#6B7280' }}
                        aria-label="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(u.id, u.username)}
                        style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#DC2626' }}
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
          onClick={() => setEditing(null)}
        >
          <div
            style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, fontSize: '20px' }}>{editing.id ? 'Edit user' : 'Create new user'}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              {editing.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editing.photo} alt="" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={32} color="#9CA3AF" />
                </div>
              )}
              <label style={{ padding: '8px 14px', background: '#F3F4F6', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={14} />
                Upload photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handlePhotoUpload(f);
                  }}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Username *</label>
                <input
                  type="text"
                  value={editing.username || ''}
                  onChange={(e) => setEditing({ ...editing, username: e.target.value })}
                  disabled={!!editing.id}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Full name</label>
                <input
                  type="text"
                  value={editing.full_name || ''}
                  onChange={(e) => setEditing({ ...editing, full_name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  value={editing.email || ''}
                  onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Title</label>
                <input
                  type="text"
                  value={editing.title || ''}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. Senior Recruiter"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Role *</label>
              <select
                value={editing.role || 'recruiter'}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                {editing.id ? 'New password (leave empty to keep current)' : 'Password *'}
              </label>
              <input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="At least 8 characters"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
              />
            </div>

            {editing.id && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={!!editing.is_active}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked ? 1 : 0 })}
                />
                Active account
              </label>
            )}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setEditing(null)}
                style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving || !editing.username || (!editing.id && !editPassword)}
                style={{
                  padding: '10px 20px',
                  background: saving ? '#9CA3AF' : '#17BED0',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                }}
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
