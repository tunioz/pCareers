'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Tag, Save, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { TagWithCount } from '@/types';

export default function AdminTagsPage() {
  const { showToast } = useToast();
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tagName, setTagName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch('/api/tags');
      const data = await res.json();
      if (data.success) setTags(data.data || []);
    } catch {
      showToast('error', 'Failed to load tags');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const openCreate = () => {
    setEditingId(null);
    setTagName('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (tag: TagWithCount) => {
    setEditingId(tag.id);
    setTagName(tag.name);
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!tagName.trim()) {
      setError('Tag name is required');
      return;
    }

    setSaving(true);
    try {
      const url = editingId ? `/api/tags/${editingId}` : '/api/tags';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tagName }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', editingId ? 'Tag updated' : 'Tag created');
        setShowModal(false);
        fetchTags();
      } else {
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Failed to save tag');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tags/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Tag deleted');
        fetchTags();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete tag');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Tags</h1>
        <div className={styles.pageActions}>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} />
            New Tag
          </button>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : tags.length === 0 ? (
          <div className={styles.emptyState}>
            <Tag />
            <h3>No tags yet</h3>
            <p>Create tags to organize your content.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <Plus size={16} />
              New Tag
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Posts</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.id}>
                    <td style={{ fontWeight: 500 }}>{tag.name}</td>
                    <td>{tag.post_count}</td>
                    <td>
                      {new Date(tag.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className={styles.tableActions}>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => openEdit(tag)} title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => setDeleteId(tag.id)} title="Delete">
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
              <h2>{editingId ? 'Edit Tag' : 'New Tag'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tag Name *</label>
                <input
                  className={styles.formInput}
                  value={tagName}
                  onChange={(e) => { setTagName(e.target.value); setError(''); }}
                  placeholder="Enter tag name"
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
        title="Delete Tag"
        message="Are you sure you want to delete this tag? It will be removed from all associated posts."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
