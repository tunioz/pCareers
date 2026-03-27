'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClipboardCheck, Plus, Edit, Trash2, X, EyeOff } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import styles from '@/styles/admin.module.scss';
import type { TechnicalTaskWithJob, Job } from '@/types';

export default function TasksPage() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<TechnicalTaskWithJob[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [jobId, setJobId] = useState<string>('');
  const [deadlineDays, setDeadlineDays] = useState('7');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blindMode, setBlindMode] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/technical-tasks');
      const data = await res.json();
      if (data.success) setTasks(data.data);
    } catch {
      showToast('error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const loadJobs = useCallback(async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (data.success) setJobs(data.data);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => { loadTasks(); loadJobs(); }, [loadTasks, loadJobs]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setInstructions('');
    setJobId('');
    setDeadlineDays('7');
    setIsActive(true);
    setEditingId(null);
  };

  const openNew = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (task: TechnicalTaskWithJob) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setInstructions(task.instructions);
    setJobId(task.job_id ? String(task.job_id) : '');
    setDeadlineDays(String(task.deadline_days));
    setIsActive(task.is_active === 1);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim() || !instructions.trim()) {
      showToast('error', 'Title, description, and instructions are required');
      return;
    }
    setSaving(true);

    try {
      const body = {
        title,
        description,
        instructions,
        job_id: jobId ? parseInt(jobId, 10) : null,
        deadline_days: parseInt(deadlineDays, 10) || 7,
        is_active: isActive ? 1 : 0,
      };

      const url = editingId ? `/api/technical-tasks/${editingId}` : '/api/technical-tasks';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', editingId ? 'Task updated' : 'Task created');
        setShowModal(false);
        resetForm();
        loadTasks();
      } else {
        showToast('error', data.error || 'Failed to save task');
      }
    } catch {
      showToast('error', 'Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/technical-tasks/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Task deleted');
        loadTasks();
      } else {
        showToast('error', data.error || 'Failed to delete task');
      }
    } catch {
      showToast('error', 'Failed to delete task');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <ClipboardCheck size={24} /> Technical Tasks
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: '#6b7280', cursor: 'pointer',
            padding: '6px 12px', borderRadius: '8px',
            background: blindMode ? '#e0f2fe' : '#f3f4f6',
            border: blindMode ? '1px solid #7dd3fc' : '1px solid #d1d5db',
          }}>
            <input
              type="checkbox"
              checked={blindMode}
              onChange={(e) => setBlindMode(e.target.checked)}
              style={{ accentColor: '#0ea5e9' }}
            />
            Blind Review
          </label>
          <button className={styles.btnPrimary} onClick={openNew}>
            <Plus size={14} /> New Task
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <ClipboardCheck />
          <h3>No technical tasks yet</h3>
          <p>Create task templates that can be assigned to candidates.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.card} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{task.title}</h3>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                    {task.job_title && <span>For: {task.job_title} | </span>}
                    Deadline: {task.deadline_days} days |
                    Status: <span style={{ color: task.is_active ? '#22c55e' : '#ef4444' }}>
                      {task.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.5 }}>
                    {task.description.length > 200 ? task.description.slice(0, 200) + '...' : task.description}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => openEdit(task)}>
                    <Edit size={14} />
                  </button>
                  <button
                    className={`${styles.btnGhost} ${styles.btnSmall}`}
                    onClick={() => setDeleteId(task.id)}
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={`${styles.modal} ${styles.modalLarge}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'Edit Task' : 'New Technical Task'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label className={styles.formLabel}>Title *</label>
                <input className={styles.formInput} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className={styles.formRow} style={{ marginBottom: '16px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Position (optional)</label>
                  <select className={styles.formSelect} value={jobId} onChange={(e) => setJobId(e.target.value)}>
                    <option value="">All positions</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>{j.title}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Deadline (days)</label>
                  <input className={styles.formInput} type="number" min="1" value={deadlineDays} onChange={(e) => setDeadlineDays(e.target.value)} />
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label className={styles.formLabel}>Description *</label>
                <textarea className={styles.formTextarea} value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="What the task is about..." />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label className={styles.formLabel}>Instructions *</label>
                <textarea className={styles.formTextarea} value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={6} placeholder="Detailed instructions for the candidate..." />
              </div>

              <div className={styles.formCheckbox}>
                <input type="checkbox" id="taskActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <label htmlFor="taskActive">Active</label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Task"
        message="Are you sure you want to delete this task template? This will also delete any associated submissions."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
