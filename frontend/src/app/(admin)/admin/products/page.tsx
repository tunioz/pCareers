'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Package, Save, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data || []);
    } catch {
      showToast('error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreate = () => {
    setEditingId(null);
    setName('');
    setSortOrder(products.length);
    setError('');
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setSortOrder(product.sort_order);
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }

    setSaving(true);
    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, sort_order: sortOrder }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('success', editingId ? 'Product updated' : 'Product created');
        setShowModal(false);
        fetchProducts();
      } else {
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Product deleted');
        fetchProducts();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete product');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Products</h1>
        <div className={styles.pageActions}>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} />
            New Product
          </button>
        </div>
      </div>

      <div className={styles.card}>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <Package />
            <h3>No products yet</h3>
            <p>Create products to assign to job positions.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <Plus size={16} />
              New Product
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sort Order</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                    <td>{product.sort_order}</td>
                    <td>
                      {new Date(product.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className={styles.tableActions}>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => openEdit(product)} title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => setDeleteId(product.id)} title="Delete">
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
              <h2>{editingId ? 'Edit Product' : 'New Product'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Product Name *</label>
                  <input
                    className={styles.formInput}
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    placeholder="Enter product name"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  />
                  {error && <span className={styles.formError}>{error}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Sort Order</label>
                  <input
                    className={styles.formInput}
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                    placeholder="0"
                  />
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
        title="Delete Product"
        message="Are you sure you want to delete this product? This will fail if jobs are using it."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
