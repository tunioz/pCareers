'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, FolderOpen, Save, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { CategoryWithCount } from '@/types';

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) setCategories(data.data || []);
    } catch {
      showToast('error', 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openCreate = () => {
    setEditingId(null);
    setName('');
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (cat: CategoryWithCount) => {
    setEditingId(cat.id);
    setName(cat.name);
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', editingId ? 'Category updated' : 'Category created');
        setShowModal(false);
        fetchCategories();
      } else {
        showToast('error', data.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Category deleted');
        fetchCategories();
      } else {
        showToast('error', data.error || 'Cannot delete category');
      }
    } catch {
      showToast('error', 'Failed to delete category');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Categories</h1>
        <div className={styles.pageActions}>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} />
            New Category
          </button>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : categories.length === 0 ? (
          <div className={styles.emptyState}>
            <FolderOpen />
            <h3>No categories yet</h3>
            <p>Create your first category to organize posts.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <Plus size={16} />
              New Category
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Posts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ fontWeight: 500 }}>{cat.name}</td>
                    <td style={{ color: '#6c757d', fontFamily: 'monospace', fontSize: '13px' }}>{cat.slug}</td>
                    <td>{cat.post_count}</td>
                    <td>
                      <div className={styles.tableActions}>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => openEdit(cat)} title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => setDeleteId(cat.id)} title="Delete">
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
              <h2>{editingId ? 'Edit Category' : 'New Category'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name *</label>
                  <input className={styles.formInput} value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" autoFocus />
                  {errors.name && <span className={styles.formError}>{errors.name}</span>}
                </div>
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
        title="Delete Category"
        message="Are you sure you want to delete this category? This will fail if posts are using it."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
