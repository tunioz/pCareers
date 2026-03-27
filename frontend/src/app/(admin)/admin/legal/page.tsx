'use client';

import { useEffect, useState, useCallback } from 'react';
import { Scale, Pencil, Trash2, Plus, Save, X, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { LegalPage } from '@/types';

const CORE_SLUGS = ['privacy-policy', 'cookie-policy', 'terms-of-use', 'legal-notice'];

export default function AdminLegalPagesPage() {
  const { showToast } = useToast();
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<LegalPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formLastUpdated, setFormLastUpdated] = useState('');
  const [formIsPublished, setFormIsPublished] = useState(1);

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch('/api/legal-pages');
      const data = await res.json();
      if (data.success) setPages(data.data || []);
    } catch {
      showToast('error', 'Failed to load legal pages');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const openCreate = () => {
    setEditingPage(null);
    setIsCreating(true);
    setFormTitle('');
    setFormSlug('');
    setFormContent('');
    setFormLastUpdated(new Date().toISOString().split('T')[0]);
    setFormIsPublished(1);
  };

  const openEdit = (page: LegalPage) => {
    setIsCreating(false);
    setEditingPage(page);
    setFormTitle(page.title);
    setFormSlug(page.slug);
    setFormContent(page.content);
    setFormLastUpdated(page.last_updated ? page.last_updated.split('T')[0].split(' ')[0] : new Date().toISOString().split('T')[0]);
    setFormIsPublished(page.is_published);
  };

  const closeEditor = () => {
    setEditingPage(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('error', 'Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const isEdit = editingPage !== null;
      const url = isEdit ? `/api/legal-pages/${editingPage.id}` : '/api/legal-pages';
      const method = isEdit ? 'PUT' : 'POST';

      const body: Record<string, unknown> = {
        title: formTitle,
        content: formContent,
        last_updated: formLastUpdated || undefined,
        is_published: formIsPublished,
      };

      // Only send slug for new pages (core pages keep their slug)
      if (!isEdit) {
        body.slug = formSlug || undefined;
      } else if (!CORE_SLUGS.includes(editingPage.slug)) {
        body.slug = formSlug;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', isEdit ? 'Legal page updated' : 'Legal page created');
        closeEditor();
        fetchPages();
      } else {
        showToast('error', data.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save legal page');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/legal-pages/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Legal page deleted');
        fetchPages();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete legal page');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  // Editor view
  if (editingPage || isCreating) {
    const isCoreSlug = editingPage ? CORE_SLUGS.includes(editingPage.slug) : false;

    return (
      <div>
        <div className={styles.pageHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className={`${styles.btnGhost} ${styles.btnIcon}`} onClick={closeEditor}>
              <ArrowLeft size={20} />
            </button>
            <h1>{editingPage ? 'Edit Legal Page' : 'New Legal Page'}</h1>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.btnSecondary} onClick={closeEditor}>
              Cancel
            </button>
            <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              <Save size={16} />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title *</label>
              <input
                className={styles.formInput}
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Page title"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Slug {isCoreSlug && '(read-only for core pages)'}</label>
              <input
                className={styles.formInput}
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                placeholder="page-slug"
                disabled={isCoreSlug}
                style={isCoreSlug ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div className={styles.formGroup} style={{ flex: 1, minWidth: '200px' }}>
                <label className={styles.formLabel}>Last Updated Date</label>
                <input
                  className={styles.formInput}
                  type="date"
                  value={formLastUpdated}
                  onChange={(e) => setFormLastUpdated(e.target.value)}
                />
              </div>
              <div className={styles.formGroup} style={{ flex: 1, minWidth: '200px' }}>
                <label className={styles.formLabel}>Status</label>
                <select
                  className={styles.formInput}
                  value={formIsPublished}
                  onChange={(e) => setFormIsPublished(Number(e.target.value))}
                >
                  <option value={1}>Published</option>
                  <option value={0}>Draft</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Content *</label>
              <RichTextEditor
                value={formContent}
                onChange={setFormContent}
                placeholder="Write legal page content here..."
                minHeight="500px"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Legal Pages</h1>
        <div className={styles.pageActions}>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} />
            New Page
          </button>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : pages.length === 0 ? (
          <div className={styles.emptyState}>
            <Scale />
            <h3>No legal pages yet</h3>
            <p>Create legal pages for your website.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <Plus size={16} />
              New Page
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => {
                  const isCoreSlug = CORE_SLUGS.includes(page.slug);
                  return (
                    <tr key={page.id}>
                      <td style={{ fontWeight: 500 }}>{page.title}</td>
                      <td>
                        <code style={{ fontSize: '12px', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>
                          {page.slug}
                        </code>
                      </td>
                      <td>
                        {page.is_published ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontSize: '13px' }}>
                            <Eye size={14} /> Published
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '13px' }}>
                            <EyeOff size={14} /> Draft
                          </span>
                        )}
                      </td>
                      <td>
                        {page.last_updated
                          ? new Date(page.last_updated).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '--'}
                      </td>
                      <td>
                        <div className={styles.tableActions}>
                          <button
                            className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                            onClick={() => openEdit(page)}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          {!isCoreSlug && (
                            <button
                              className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                              onClick={() => setDeleteId(page.id)}
                              title="Delete"
                            >
                              <Trash2 size={14} color="#ef4444" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Legal Page"
        message="Are you sure you want to delete this legal page? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
