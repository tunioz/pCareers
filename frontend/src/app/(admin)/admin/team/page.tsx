'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, UserCircle, ArrowUp, ArrowDown, Save, X } from 'lucide-react';
import FileUpload from '@/components/admin/FileUpload';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { TeamMember } from '@/types';

interface MemberFormData {
  name: string;
  role: string;
  bio: string;
  photo: string;
  department: string;
  sort_order: number;
  is_published: number;
}

const emptyForm: MemberFormData = {
  name: '',
  role: '',
  bio: '',
  photo: '',
  department: '',
  sort_order: 0,
  is_published: 1,
};

export default function AdminTeamPage() {
  const { showToast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MemberFormData>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.success) {
        setMembers(data.data || []);
      }
    } catch {
      showToast('error', 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, sort_order: members.length });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      photo: member.photo || '',
      department: member.department || '',
      sort_order: member.sort_order,
      is_published: member.is_published,
    });
    setErrors({});
    setShowModal(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.role.trim()) errs.role = 'Role is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const url = editingId ? `/api/team/${editingId}` : '/api/team';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          photo: form.photo || undefined,
          department: form.department || undefined,
          bio: form.bio || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        showToast('success', editingId ? 'Member updated' : 'Member created');
        setShowModal(false);
        fetchMembers();
      } else {
        showToast('error', data.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/team/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Member deleted');
        fetchMembers();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete member');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newMembers = [...members];
    [newMembers[index - 1], newMembers[index]] = [newMembers[index], newMembers[index - 1]];
    newMembers.forEach((m, i) => (m.sort_order = i));
    setMembers(newMembers);
    setOrderChanged(true);
  };

  const moveDown = (index: number) => {
    if (index >= members.length - 1) return;
    const newMembers = [...members];
    [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]];
    newMembers.forEach((m, i) => (m.sort_order = i));
    setMembers(newMembers);
    setOrderChanged(true);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const items = members.map((m, i) => ({ id: m.id, sort_order: i }));
      const res = await fetch('/api/team/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Order saved');
        setOrderChanged(false);
      } else {
        showToast('error', data.error || 'Failed to save order');
      }
    } catch {
      showToast('error', 'Failed to save order');
    } finally {
      setSavingOrder(false);
    }
  };

  const togglePublish = async (member: TeamMember) => {
    try {
      const res = await fetch(`/api/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: member.is_published ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', member.is_published ? 'Member hidden' : 'Member visible');
        fetchMembers();
      }
    } catch {
      showToast('error', 'Failed to update');
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Team Members</h1>
        <div className={styles.pageActions}>
          {orderChanged && (
            <button className={styles.btnPrimary} onClick={saveOrder} disabled={savingOrder}>
              <Save size={16} />
              {savingOrder ? 'Saving...' : 'Save Order'}
            </button>
          )}
          <button className={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} />
            Add Member
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}><div className={styles.spinner} /></div>
      ) : members.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptyState}>
            <UserCircle />
            <h3>No team members yet</h3>
            <p>Add your first team member.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <Plus size={16} />
              Add Member
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.teamGrid}>
          {members.map((member, index) => (
            <div key={member.id} className={styles.teamCard}>
              <span className={styles.teamCardOrder}>#{index + 1}</span>
              <div className={styles.teamCardPublished}>
                <label className={styles.toggle} title={member.is_published ? 'Published' : 'Hidden'}>
                  <input
                    type="checkbox"
                    checked={!!member.is_published}
                    onChange={() => togglePublish(member)}
                  />
                  <span className={styles.toggleTrack} />
                </label>
              </div>

              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.photo} alt={member.name} className={styles.teamCardPhoto} />
              ) : (
                <div className={styles.teamCardPhoto} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCircle size={40} color="#adb5bd" />
                </div>
              )}

              <div className={styles.teamCardName}>{member.name}</div>
              <div className={styles.teamCardRole}>{member.role}</div>
              {member.department && <div className={styles.teamCardDept}>{member.department}</div>}

              <div className={styles.teamCardActions}>
                <button
                  className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  title="Move up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                  onClick={() => moveDown(index)}
                  disabled={index === members.length - 1}
                  title="Move down"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                  onClick={() => openEdit(member)}
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                  onClick={() => setDeleteId(member.id)}
                  title="Delete"
                >
                  <Trash2 size={14} color="#ef4444" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'Edit Member' : 'Add Member'}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name *</label>
                  <input className={styles.formInput} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                  {errors.name && <span className={styles.formError}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Role *</label>
                  <input className={styles.formInput} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role / title" />
                  {errors.role && <span className={styles.formError}>{errors.role}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Department</label>
                  <input className={styles.formInput} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Engineering" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bio</label>
                  <textarea className={styles.formTextarea} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio..." style={{ minHeight: '80px' }} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Photo</label>
                  <FileUpload value={form.photo || null} onChange={(url) => setForm({ ...form, photo: url || '' })} subDir="team" />
                </div>

                <label className={styles.formCheckbox}>
                  <input type="checkbox" checked={!!form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked ? 1 : 0 })} />
                  <label>Published</label>
                </label>
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
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
