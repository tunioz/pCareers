'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Cpu, Save, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { TechStack } from '@/types';

export default function AdminTechStacksPage() {
  const { showToast } = useToast();
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchTechStacks = useCallback(async () => {
    try {
      const res = await fetch('/api/tech-stacks');
      const data = await res.json();
      if (data.success) setTechStacks(data.data || []);
    } catch {
      showToast('error', 'Failed to load tech stacks');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTechStacks();
  }, [fetchTechStacks]);

  const openCreate = () => {
    setEditingId(null);
    setName('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (tech: TechStack) => {
    setEditingId(tech.id);
    setName(tech.name);
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Tech stack name is required');
      return;
    }

    setSaving(true);
    try {
      const url = editingId ? `/api/tech-stacks/${editingId}` : '/api/tech-stacks';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', editingId ? 'Tech stack updated' : 'Tech stack created');
        setShowModal(false);
        fetchTechStacks();
      } else {
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Failed to save tech stack');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tech-stacks/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Tech stack deleted');
        fetchTechStacks();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete tech stack');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Tech Stacks</h1>
        <div className={styles.pageActions}>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} />
            New Tech Stack
          </button>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : techStacks.length === 0 ? (
          <div className={styles.emptyState}>
            <Cpu />
            <h3>No tech stacks yet</h3>
            <p>Create technologies to assign to job positions.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <Plus size={16} />
              New Tech Stack
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {techStacks.map((tech) => (
                  <tr key={tech.id}>
                    <td style={{ fontWeight: 500 }}>{tech.name}</td>
                    <td>
                      {new Date(tech.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className={styles.tableActions}>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => openEdit(tech)} title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => setDeleteId(tech.id)} title="Delete">
                          <Trash2 size={14} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'Edit Tech Stack' : 'New Tech Stack'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tech Stack Name *</label>
                <input
                  className={styles.formInput}
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  placeholder="Enter technology name"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
                {error && <span className={styles.formError}>{error}</span>}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
                <Save size={16} />
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Tech Stack"
        message="Are you sure you want to delete this technology? It will be removed from the selection list."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
