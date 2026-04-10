'use client';

import { useEffect, useState, useCallback } from 'react';
import { Mail, Sparkles, Send, Loader2, Edit3, Trash2, CheckCircle, AlertCircle, Plus, Calendar, Eye } from 'lucide-react';

interface Props {
  candidateId: number;
  candidateName: string;
}

interface EmailRow {
  id: number;
  candidate_id: number;
  email_type: string;
  subject: string | null;
  body: string | null;
  status: string;
  ai_generated: number;
  session_id: number | null;
  sent_at: string | null;
  sent_by: string | null;
  sent_to_email: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const EMAIL_TYPES = [
  { value: 'offer', label: 'Offer Letter' },
  { value: 'rejection_post_interview', label: 'Rejection (post-interview)' },
  { value: 'rejection_after_screen', label: 'Rejection (after screen)' },
  { value: 'rejection_polite', label: 'Rejection (brief polite)' },
  { value: 'interview_invite', label: 'Interview invitation' },
  { value: 'reference_request', label: 'Reference request' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'status_update', label: 'Status update' },
];

function typeLabel(t: string): string {
  return EMAIL_TYPES.find((x) => x.value === t)?.label || t;
}

function statusColor(s: string): { bg: string; fg: string } {
  if (s === 'sent') return { bg: '#D1FAE5', fg: '#065F46' };
  if (s === 'failed') return { bg: '#FEE2E2', fg: '#991B1B' };
  if (s === 'draft') return { bg: '#FEF3C7', fg: '#92400E' };
  return { bg: '#F3F4F6', fg: '#374151' };
}

export function CandidateEmailsPanel({ candidateId, candidateName }: Props) {
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState<string>('offer');
  const [composeContext, setComposeContext] = useState('');
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState<EmailRow | null>(null);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/candidate-emails?candidate_id=${candidateId}`);
      const json = await res.json();
      if (json.success) setEmails(json.data);
      else setError(json.error || 'Failed to load emails');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }, [candidateId]);

  useEffect(() => {
    load();
  }, [load]);

  async function generateDraft() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_id: candidateId,
          email_type: composeType,
          context: composeContext || undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'AI draft failed');
      } else {
        setShowCompose(false);
        setComposeContext('');
        await load();
        // Open the newly created draft for editing
        const newEmail: EmailRow = {
          id: json.data.draft_id,
          candidate_id: candidateId,
          email_type: composeType,
          subject: json.data.subject,
          body: json.data.body,
          status: 'draft',
          ai_generated: 1,
          session_id: json.data.linked_session_id ?? null,
          sent_at: null,
          sent_by: null,
          sent_to_email: null,
          created_by: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setEditing(newEmail);
        setEditSubject(newEmail.subject || '');
        setEditBody(newEmail.body || '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setGenerating(false);
    }
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/candidate-emails/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: editSubject, body: editBody }),
      });
      const json = await res.json();
      if (!json.success) setError(json.error);
      else {
        setEditing(null);
        await load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setSaving(false);
    }
  }

  async function sendEmail(emailId: number) {
    if (!confirm('Send this email to the candidate? This cannot be undone.')) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/candidate-emails/${emailId}/send`, { method: 'POST' });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Send failed');
      } else {
        setEditing(null);
        await load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setSending(false);
    }
  }

  async function deleteEmail(emailId: number) {
    if (!confirm('Delete this email draft?')) return;
    try {
      await fetch(`/api/candidate-emails/${emailId}`, { method: 'DELETE' });
      await load();
    } catch {
      setError('Failed to delete');
    }
  }

  function openEmail(email: EmailRow) {
    setEditing(email);
    setEditSubject(email.subject || '');
    setEditBody(email.body || '');
    setPreviewing(false);
  }

  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '20px',
      background: '#FFFFFF',
      marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={18} />
          Emails
        </h3>
        <button
          type="button"
          onClick={() => setShowCompose(!showCompose)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            background: '#17BED0',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Sparkles size={14} />
          Draft with AI
        </button>
      </div>

      {error && (
        <div style={{
          padding: '10px 14px',
          background: '#FEE2E2',
          color: '#991B1B',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {showCompose && (
        <div style={{
          padding: '16px',
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          marginBottom: '16px',
        }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '14px' }}>
            Generate draft with AI
          </h4>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
              Email type
            </label>
            <select
              value={composeType}
              onChange={(e) => setComposeType(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
            >
              {EMAIL_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
              Additional context (optional)
            </label>
            <textarea
              value={composeContext}
              onChange={(e) => setComposeContext(e.target.value)}
              rows={3}
              placeholder="E.g. 'Mention the Redis work she did in her technical round' or 'Use a warmer tone'"
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowCompose(false)}
              style={{ padding: '8px 14px', background: 'transparent', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={generateDraft}
              disabled={generating}
              style={{
                padding: '8px 14px',
                background: generating ? '#9CA3AF' : '#17BED0',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: generating ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {generating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {generating ? 'Generating…' : 'Generate'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Loader2 size={16} className="animate-spin" />
        </div>
      ) : emails.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>
          No emails yet. Generate a draft with AI or compose one manually.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {emails.map((e) => {
            const sc = statusColor(e.status);
            return (
              <div
                key={e.id}
                style={{
                  padding: '12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  background: '#F9FAFB',
                  cursor: 'pointer',
                }}
                onClick={() => openEmail(e)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: sc.bg,
                    color: sc.fg,
                  }}>
                    {e.status}
                  </span>
                  {e.ai_generated === 1 && (
                    <span style={{ color: '#17BED0' }}>
                      <Sparkles size={12} />
                    </span>
                  )}
                  {e.session_id && (
                    <span
                      style={{ color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                      title="Calendar invite (.ics) will be attached on send"
                    >
                      <Calendar size={12} />
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>{typeLabel(e.email_type)}</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', marginLeft: 'auto' }}>
                    {new Date(e.created_at).toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                  {e.subject || '(no subject)'}
                </div>
                {e.body && (
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {e.body.slice(0, 120)}…
                  </div>
                )}
                {e.sent_at && e.sent_to_email && (
                  <div style={{ fontSize: '10px', color: '#059669', marginTop: '4px' }}>
                    Sent to {e.sent_to_email} on {new Date(e.sent_at).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
          onClick={() => setEditing(null)}
        >
          <div
            style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '720px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}
            onClick={(evt) => evt.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>
                {typeLabel(editing.email_type)}
                {editing.status === 'sent' && (
                  <span style={{ marginLeft: '12px', padding: '2px 8px', background: '#D1FAE5', color: '#065F46', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                    Sent
                  </span>
                )}
              </h2>
              <button type="button" onClick={() => setEditing(null)} style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#6B7280', padding: '8px' }}>
                ×
              </button>
            </div>

            {previewing ? (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={12} /> HTML Preview
                </div>
                <iframe
                  src={`/api/candidate-emails/${editing.id}/preview`}
                  title="Email preview"
                  style={{
                    width: '100%',
                    height: '500px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    background: '#F3F4F6',
                  }}
                />
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    disabled={editing.status === 'sent'}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Body
                  </label>
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    disabled={editing.status === 'sent'}
                    rows={18}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '16px', padding: '10px', background: '#F9FAFB', borderRadius: '6px' }}>
                  To: <strong>{candidateName}&apos;s email from candidate record</strong>
                  <br />
                  Tip: Replace placeholders like [SALARY], [START_DATE], [DATE] with actual values before sending.
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => deleteEmail(editing.id)}
                disabled={editing.status === 'sent'}
                style={{
                  padding: '10px 16px',
                  background: 'transparent',
                  color: '#DC2626',
                  border: '1px solid #FEE2E2',
                  borderRadius: '8px',
                  cursor: editing.status === 'sent' ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Trash2 size={14} />
                Delete
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  style={{ padding: '10px 16px', background: 'transparent', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewing(!previewing)}
                  style={{
                    padding: '10px 16px',
                    background: previewing ? '#17BED0' : 'transparent',
                    color: previewing ? '#FFFFFF' : '#17BED0',
                    border: '1px solid #17BED0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Eye size={14} />
                  {previewing ? 'Edit' : 'Preview'}
                </button>
                {editing.status !== 'sent' && (
                  <>
                    <button
                      type="button"
                      onClick={saveEdit}
                      disabled={saving}
                      style={{
                        padding: '10px 16px',
                        background: saving ? '#9CA3AF' : '#6B7280',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Edit3 size={14} />
                      {saving ? 'Saving…' : 'Save draft'}
                    </button>
                    <button
                      type="button"
                      onClick={() => sendEmail(editing.id)}
                      disabled={sending || !editSubject || !editBody}
                      style={{
                        padding: '10px 16px',
                        background: sending ? '#9CA3AF' : '#059669',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: sending || !editSubject || !editBody ? 'not-allowed' : 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      {sending ? 'Sending…' : 'Send now'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
