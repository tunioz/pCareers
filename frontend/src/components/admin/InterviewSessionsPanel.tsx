'use client';

import { useEffect, useState } from 'react';
import { Calendar, User, Clock, Lock, CheckCircle, Loader2, Plus, Download } from 'lucide-react';

interface Session {
  id: number;
  candidate_id: number;
  kit_id: number | null;
  interviewer_name: string;
  stage: string;
  scheduled_at: string | null;
  completed_at: string | null;
  raw_notes: string | null;
  score_id: number | null;
  status: string;
  created_at: string;
  _hidden?: boolean;
}

interface Props {
  candidateId: number;
  currentUsername: string;
}

interface AdminUser {
  id: number;
  username: string;
  full_name: string | null;
  role: string;
}

const STAGES = ['screening', 'technical', 'systems', 'culture', 'final'];

export function InterviewSessionsPanel({ candidateId, currentUsername }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [currentUserSubmitted, setCurrentUserSubmitted] = useState(false);

  const [newInterviewer, setNewInterviewer] = useState(currentUsername);
  const [newStage, setNewStage] = useState('technical');
  const [newScheduledAt, setNewScheduledAt] = useState('');

  async function load() {
    try {
      const [sessionsRes, usersRes] = await Promise.all([
        fetch(`/api/candidates/${candidateId}/sessions`),
        fetch('/api/admin-users'),
      ]);
      const sJson = await sessionsRes.json();
      const uJson = await usersRes.json();
      if (sJson.success) {
        setSessions(sJson.data);
        setCurrentUserSubmitted(sJson.meta?.current_user_submitted || false);
      }
      if (uJson.success) setUsers(uJson.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();

  }, [candidateId]);

  async function createSession() {
    if (!newInterviewer || !newStage) return;
    try {
      const res = await fetch(`/api/candidates/${candidateId}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewer_name: newInterviewer,
          stage: newStage,
          scheduled_at: newScheduledAt || null,
        }),
      });
      if (res.ok) {
        setShowCreate(false);
        setNewScheduledAt('');
        await load();
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280' }}>
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
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
          <Calendar size={18} />
          Interview Sessions
        </h3>
        <button
          type="button"
          onClick={() => setShowCreate(!showCreate)}
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
          <Plus size={14} />
          Schedule
        </button>
      </div>

      {!currentUserSubmitted && sessions.length > 1 && (
        <div style={{
          padding: '10px 14px',
          background: '#FEF3C7',
          color: '#92400E',
          borderRadius: '8px',
          fontSize: '12px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Lock size={12} />
          Other interviewers' notes are hidden until you submit your own scorecard.
        </div>
      )}

      {showCreate && (
        <div style={{
          padding: '16px',
          background: '#F9FAFB',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #E5E7EB',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Interviewer</label>
              <select
                value={newInterviewer}
                onChange={(e) => setNewInterviewer(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.username}>
                    {u.full_name || u.username} ({u.role})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Stage</label>
              <select
                value={newStage}
                onChange={(e) => setNewStage(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>When</label>
              <input
                type="datetime-local"
                value={newScheduledAt}
                onChange={(e) => setNewScheduledAt(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={createSession}
              style={{ padding: '6px 14px', background: '#17BED0', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
            >
              Create session
            </button>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
          No interview sessions yet. Schedule one to track interviews with their notes and scores.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sessions.map((s) => {
            const isOwn = s.interviewer_name === currentUsername;
            const isCompleted = s.status === 'completed';
            const isHidden = s._hidden;
            return (
              <div
                key={s.id}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  background: isOwn ? '#F0FDFA' : '#F9FAFB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                      {s.stage.toUpperCase()}
                    </span>
                    {isOwn && (
                      <span style={{ padding: '2px 8px', background: '#17BED0', color: '#FFFFFF', borderRadius: '100px', fontSize: '10px', fontWeight: 600 }}>
                        Your session
                      </span>
                    )}
                    {isCompleted ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#059669', fontSize: '11px' }}>
                        <CheckCircle size={12} />
                        Completed
                      </span>
                    ) : (
                      <span style={{ color: '#D97706', fontSize: '11px' }}>Scheduled</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <User size={11} />
                      {s.interviewer_name}
                    </span>
                    {s.scheduled_at && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} />
                        {new Date(s.scheduled_at).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {isHidden && (
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Lock size={11} />
                      Notes hidden (submit your own scorecard to unlock)
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {s.scheduled_at && (
                    <a
                      href={`/api/candidates/${candidateId}/sessions/${s.id}/ics`}
                      download
                      title="Download .ics calendar file"
                      style={{
                        padding: '6px 10px',
                        background: '#F3F4F6',
                        color: '#374151',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Download size={12} />
                      .ics
                    </a>
                  )}
                  {isOwn && !isCompleted && (
                    <a
                      href={`/admin/candidates/${candidateId}?session=${s.id}`}
                      style={{
                        padding: '6px 12px',
                        background: '#17BED0',
                        color: '#FFFFFF',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Open
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
