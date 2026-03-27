'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, Save, X, Image, MessageSquareQuote,
  ArrowUp, ArrowDown, Link as LinkIcon,
} from 'lucide-react';
import FileUpload from '@/components/admin/FileUpload';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type {
  GalleryCategory, GalleryPhotoWithCategory, TeamStory,
  GalleryCategoryWithCount,
} from '@/types';

// ---------------------------------------------------------------------------
// Tab types
// ---------------------------------------------------------------------------
type Tab = 'gallery' | 'stories';

// ---------------------------------------------------------------------------
// Form types
// ---------------------------------------------------------------------------
interface CategoryFormData {
  name: string;
  slug: string;
}

interface PhotoFormData {
  category_id: number;
  image: string;
  alt_text: string;
  is_published: number;
}

interface StoryFormData {
  name: string;
  role: string;
  photo: string;
  quote: string;
  is_published: number;
}

const emptyCategoryForm: CategoryFormData = { name: '', slug: '' };
const emptyPhotoForm: PhotoFormData = { category_id: 0, image: '', alt_text: '', is_published: 1 };
const emptyStoryForm: StoryFormData = { name: '', role: '', photo: '', quote: '', is_published: 1 };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function LifeContentPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('gallery');

  // Gallery state
  const [categories, setCategories] = useState<GalleryCategoryWithCount[]>([]);
  const [photos, setPhotos] = useState<GalleryPhotoWithCategory[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [filterCategoryId, setFilterCategoryId] = useState<number | ''>('');

  // Category modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({ ...emptyCategoryForm });
  const [savingCategory, setSavingCategory] = useState(false);

  // Photo modal
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [photoForm, setPhotoForm] = useState<PhotoFormData>({ ...emptyPhotoForm });
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [photoInputMode, setPhotoInputMode] = useState<'upload' | 'url'>('upload');

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'category' | 'photo' | 'story'; id: number } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Team stories state
  const [stories, setStories] = useState<TeamStory[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<number | null>(null);
  const [storyForm, setStoryForm] = useState<StoryFormData>({ ...emptyStoryForm });
  const [savingStory, setSavingStory] = useState(false);
  const [storyPhotoMode, setStoryPhotoMode] = useState<'upload' | 'url'>('upload');
  const [storyOrderChanged, setStoryOrderChanged] = useState(false);
  const [savingStoryOrder, setSavingStoryOrder] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // =========================================================================
  // Data fetching
  // =========================================================================

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery-categories');
      const data = await res.json();
      if (data.success) setCategories(data.data || []);
    } catch {
      showToast('error', 'Failed to load gallery categories');
    }
  }, [showToast]);

  const fetchPhotos = useCallback(async () => {
    try {
      const url = filterCategoryId
        ? `/api/gallery-photos?category_id=${filterCategoryId}`
        : '/api/gallery-photos';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setPhotos(data.data || []);
    } catch {
      showToast('error', 'Failed to load gallery photos');
    }
  }, [showToast, filterCategoryId]);

  const fetchStories = useCallback(async () => {
    try {
      const res = await fetch('/api/team-stories');
      const data = await res.json();
      if (data.success) setStories(data.data || []);
    } catch {
      showToast('error', 'Failed to load team stories');
    } finally {
      setLoadingStories(false);
    }
  }, [showToast]);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchPhotos()]).finally(() => setLoadingGallery(false));
  }, [fetchCategories, fetchPhotos]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  useEffect(() => {
    fetchPhotos();
  }, [filterCategoryId, fetchPhotos]);

  // =========================================================================
  // Category CRUD
  // =========================================================================

  const openCreateCategory = () => {
    setEditingCategoryId(null);
    setCategoryForm({ ...emptyCategoryForm });
    setErrors({});
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat: GalleryCategory) => {
    setEditingCategoryId(cat.id);
    setCategoryForm({ name: cat.name, slug: cat.slug });
    setErrors({});
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    const errs: Record<string, string> = {};
    if (!categoryForm.name.trim()) errs.name = 'Name is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSavingCategory(true);
    try {
      const url = editingCategoryId
        ? `/api/gallery-categories/${editingCategoryId}`
        : '/api/gallery-categories';
      const method = editingCategoryId ? 'PUT' : 'POST';

      const payload: Record<string, unknown> = { name: categoryForm.name };
      if (categoryForm.slug.trim()) payload.slug = categoryForm.slug;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', editingCategoryId ? 'Category updated' : 'Category created');
        setShowCategoryModal(false);
        fetchCategories();
      } else {
        showToast('error', data.error || 'Failed to save category');
      }
    } catch {
      showToast('error', 'Failed to save category');
    } finally {
      setSavingCategory(false);
    }
  };

  // =========================================================================
  // Photo CRUD
  // =========================================================================

  const openCreatePhoto = () => {
    setEditingPhotoId(null);
    setPhotoForm({
      ...emptyPhotoForm,
      category_id: filterCategoryId ? Number(filterCategoryId) : (categories[0]?.id || 0),
    });
    setPhotoInputMode('upload');
    setErrors({});
    setShowPhotoModal(true);
  };

  const openEditPhoto = (photo: GalleryPhotoWithCategory) => {
    setEditingPhotoId(photo.id);
    setPhotoForm({
      category_id: photo.category_id,
      image: photo.image,
      alt_text: photo.alt_text || '',
      is_published: photo.is_published,
    });
    setPhotoInputMode('url');
    setErrors({});
    setShowPhotoModal(true);
  };

  const handleSavePhoto = async () => {
    const errs: Record<string, string> = {};
    if (!photoForm.image.trim()) errs.image = 'Image is required';
    if (!photoForm.category_id) errs.category_id = 'Category is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSavingPhoto(true);
    try {
      const url = editingPhotoId
        ? `/api/gallery-photos/${editingPhotoId}`
        : '/api/gallery-photos';
      const method = editingPhotoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_id: photoForm.category_id,
          image: photoForm.image,
          alt_text: photoForm.alt_text || undefined,
          is_published: photoForm.is_published,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', editingPhotoId ? 'Photo updated' : 'Photo added');
        setShowPhotoModal(false);
        fetchPhotos();
        fetchCategories();
      } else {
        showToast('error', data.error || 'Failed to save photo');
      }
    } catch {
      showToast('error', 'Failed to save photo');
    } finally {
      setSavingPhoto(false);
    }
  };

  const togglePhotoPublish = async (photo: GalleryPhotoWithCategory) => {
    try {
      const res = await fetch(`/api/gallery-photos/${photo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: photo.is_published ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', photo.is_published ? 'Photo hidden' : 'Photo visible');
        fetchPhotos();
      }
    } catch {
      showToast('error', 'Failed to update');
    }
  };

  // =========================================================================
  // Story CRUD
  // =========================================================================

  const openCreateStory = () => {
    setEditingStoryId(null);
    setStoryForm({ ...emptyStoryForm });
    setStoryPhotoMode('upload');
    setErrors({});
    setShowStoryModal(true);
  };

  const openEditStory = (story: TeamStory) => {
    setEditingStoryId(story.id);
    setStoryForm({
      name: story.name,
      role: story.role,
      photo: story.photo || '',
      quote: story.quote,
      is_published: story.is_published,
    });
    setStoryPhotoMode(story.photo ? 'url' : 'upload');
    setErrors({});
    setShowStoryModal(true);
  };

  const handleSaveStory = async () => {
    const errs: Record<string, string> = {};
    if (!storyForm.name.trim()) errs.name = 'Name is required';
    if (!storyForm.role.trim()) errs.role = 'Role is required';
    if (!storyForm.quote.trim()) errs.quote = 'Quote is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSavingStory(true);
    try {
      const url = editingStoryId
        ? `/api/team-stories/${editingStoryId}`
        : '/api/team-stories';
      const method = editingStoryId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: storyForm.name,
          role: storyForm.role,
          photo: storyForm.photo || undefined,
          quote: storyForm.quote,
          is_published: storyForm.is_published,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', editingStoryId ? 'Story updated' : 'Story created');
        setShowStoryModal(false);
        fetchStories();
      } else {
        showToast('error', data.error || 'Failed to save story');
      }
    } catch {
      showToast('error', 'Failed to save story');
    } finally {
      setSavingStory(false);
    }
  };

  const toggleStoryPublish = async (story: TeamStory) => {
    try {
      const res = await fetch(`/api/team-stories/${story.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: story.is_published ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', story.is_published ? 'Story hidden' : 'Story visible');
        fetchStories();
      }
    } catch {
      showToast('error', 'Failed to update');
    }
  };

  const moveStoryUp = (index: number) => {
    if (index === 0) return;
    const newStories = [...stories];
    [newStories[index - 1], newStories[index]] = [newStories[index], newStories[index - 1]];
    newStories.forEach((s, i) => (s.sort_order = i));
    setStories(newStories);
    setStoryOrderChanged(true);
  };

  const moveStoryDown = (index: number) => {
    if (index >= stories.length - 1) return;
    const newStories = [...stories];
    [newStories[index], newStories[index + 1]] = [newStories[index + 1], newStories[index]];
    newStories.forEach((s, i) => (s.sort_order = i));
    setStories(newStories);
    setStoryOrderChanged(true);
  };

  const saveStoryOrder = async () => {
    setSavingStoryOrder(true);
    try {
      // Update each story's sort_order individually
      for (const story of stories) {
        await fetch(`/api/team-stories/${story.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sort_order: story.sort_order }),
        });
      }
      showToast('success', 'Order saved');
      setStoryOrderChanged(false);
    } catch {
      showToast('error', 'Failed to save order');
    } finally {
      setSavingStoryOrder(false);
    }
  };

  // =========================================================================
  // Delete handler
  // =========================================================================

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const apiMap = {
        category: '/api/gallery-categories',
        photo: '/api/gallery-photos',
        story: '/api/team-stories',
      };
      const res = await fetch(`${apiMap[deleteTarget.type]}/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `${deleteTarget.type === 'category' ? 'Category' : deleteTarget.type === 'photo' ? 'Photo' : 'Story'} deleted`);
        if (deleteTarget.type === 'category') {
          fetchCategories();
          fetchPhotos();
        } else if (deleteTarget.type === 'photo') {
          fetchPhotos();
          fetchCategories();
        } else {
          fetchStories();
        }
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // =========================================================================
  // Render
  // =========================================================================

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Life Content</h1>
      </div>

      {/* Tabs */}
      <div className={styles.hcTabs} style={{ marginBottom: 24, paddingLeft: 0 }}>
        <button
          className={`${styles.hcTab} ${activeTab === 'gallery' ? styles.hcTabActive : ''}`}
          onClick={() => setActiveTab('gallery')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Image size={16} />
          Photo Gallery
        </button>
        <button
          className={`${styles.hcTab} ${activeTab === 'stories' ? styles.hcTabActive : ''}`}
          onClick={() => setActiveTab('stories')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <MessageSquareQuote size={16} />
          Team Stories
        </button>
      </div>

      {/* ===== GALLERY TAB ===== */}
      {activeTab === 'gallery' && (
        <>
          {/* Categories sub-section */}
          <div className={styles.card} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Gallery Categories</h2>
              <button className={styles.btnPrimary} onClick={openCreateCategory}>
                <Plus size={16} />
                Add Category
              </button>
            </div>

            {categories.length === 0 ? (
              <p style={{ color: '#6c757d', fontSize: 14 }}>No categories yet. Add one to get started.</p>
            ) : (
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Photos</th>
                      <th style={{ width: 100 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td>{cat.name}</td>
                        <td><code style={{ fontSize: 12, background: '#f1f3f5', padding: '2px 6px', borderRadius: 4 }}>{cat.slug}</code></td>
                        <td>{cat.photo_count}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button
                              className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                              onClick={() => openEditCategory(cat)}
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                              onClick={() => setDeleteTarget({ type: 'category', id: cat.id })}
                              title="Delete"
                            >
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

          {/* Photos sub-section */}
          <div className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Photos</h2>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  className={styles.formSelect}
                  value={filterCategoryId}
                  onChange={(e) => setFilterCategoryId(e.target.value ? Number(e.target.value) : '')}
                  style={{ minWidth: 160 }}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button className={styles.btnPrimary} onClick={openCreatePhoto} disabled={categories.length === 0}>
                  <Plus size={16} />
                  Add Photo
                </button>
              </div>
            </div>

            {loadingGallery ? (
              <div className={styles.loading}><div className={styles.spinner} /></div>
            ) : photos.length === 0 ? (
              <div className={styles.emptyState}>
                <Image size={32} />
                <h3>No photos yet</h3>
                <p>{categories.length === 0 ? 'Create a category first, then add photos.' : 'Add your first photo.'}</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 16,
              }}>
                {photos.map((photo) => (
                  <div key={photo.id} style={{
                    border: '1px solid #dee2e6',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: '#fff',
                    opacity: photo.is_published ? 1 : 0.5,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.image}
                      alt={photo.alt_text || 'Gallery photo'}
                      style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: 10 }}>
                      <div style={{ fontSize: 11, color: '#6c757d', marginBottom: 6 }}>
                        {photo.category_name}
                      </div>
                      {photo.alt_text && (
                        <div style={{ fontSize: 12, color: '#495057', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {photo.alt_text}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                        <label className={styles.toggle} title={photo.is_published ? 'Published' : 'Hidden'} style={{ transform: 'scale(0.8)' }}>
                          <input
                            type="checkbox"
                            checked={!!photo.is_published}
                            onChange={() => togglePhotoPublish(photo)}
                          />
                          <span className={styles.toggleTrack} />
                        </label>
                        <div style={{ display: 'flex', gap: 2 }}>
                          <button
                            className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                            onClick={() => openEditPhoto(photo)}
                            title="Edit"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                            onClick={() => setDeleteTarget({ type: 'photo', id: photo.id })}
                            title="Delete"
                          >
                            <Trash2 size={12} color="#ef4444" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ===== STORIES TAB ===== */}
      {activeTab === 'stories' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
            {storyOrderChanged && (
              <button className={styles.btnPrimary} onClick={saveStoryOrder} disabled={savingStoryOrder}>
                <Save size={16} />
                {savingStoryOrder ? 'Saving...' : 'Save Order'}
              </button>
            )}
            <button className={styles.btnPrimary} onClick={openCreateStory}>
              <Plus size={16} />
              Add Story
            </button>
          </div>

          {loadingStories ? (
            <div className={styles.loading}><div className={styles.spinner} /></div>
          ) : stories.length === 0 ? (
            <div className={styles.card}>
              <div className={styles.emptyState}>
                <MessageSquareQuote size={32} />
                <h3>No team stories yet</h3>
                <p>Add your first team story.</p>
                <button className={styles.btnPrimary} onClick={openCreateStory}>
                  <Plus size={16} />
                  Add Story
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {stories.map((story, index) => (
                <div key={story.id} className={styles.card} style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  opacity: story.is_published ? 1 : 0.5,
                  padding: 16,
                }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#6c757d',
                    minWidth: 24,
                    textAlign: 'center',
                    marginTop: 4,
                  }}>
                    #{index + 1}
                  </span>

                  {story.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={story.photo}
                      alt={story.name}
                      style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%', background: '#e9ecef',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      fontSize: 20, fontWeight: 600, color: '#adb5bd',
                    }}>
                      {story.name.charAt(0)}
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: '#212529' }}>{story.name}</div>
                    <div style={{ fontSize: 13, color: '#6c757d', marginBottom: 4 }}>{story.role}</div>
                    <div style={{
                      fontSize: 13, color: '#495057', fontStyle: 'italic',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                    }}>
                      &ldquo;{story.quote}&rdquo;
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 4, flexShrink: 0, alignItems: 'center' }}>
                    <label className={styles.toggle} title={story.is_published ? 'Published' : 'Hidden'} style={{ transform: 'scale(0.8)' }}>
                      <input
                        type="checkbox"
                        checked={!!story.is_published}
                        onChange={() => toggleStoryPublish(story)}
                      />
                      <span className={styles.toggleTrack} />
                    </label>
                    <button
                      className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                      onClick={() => moveStoryUp(index)}
                      disabled={index === 0}
                      title="Move up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                      onClick={() => moveStoryDown(index)}
                      disabled={index === stories.length - 1}
                      title="Move down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                      onClick={() => openEditStory(story)}
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                      onClick={() => setDeleteTarget({ type: 'story', id: story.id })}
                      title="Delete"
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== CATEGORY MODAL ===== */}
      {showCategoryModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCategoryModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className={styles.modalHeader}>
              <h2>{editingCategoryId ? 'Edit Category' : 'Add Category'}</h2>
              <button className={styles.modalClose} onClick={() => setShowCategoryModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gap: 16 }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name *</label>
                  <input
                    className={styles.formInput}
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    placeholder="e.g. Office Life"
                  />
                  {errors.name && <span className={styles.formError}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Slug (auto-generated if empty)</label>
                  <input
                    className={styles.formInput}
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="e.g. office-life"
                  />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowCategoryModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSaveCategory} disabled={savingCategory}>
                <Save size={16} />
                {savingCategory ? 'Saving...' : editingCategoryId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== PHOTO MODAL ===== */}
      {showPhotoModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPhotoModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className={styles.modalHeader}>
              <h2>{editingPhotoId ? 'Edit Photo' : 'Add Photo'}</h2>
              <button className={styles.modalClose} onClick={() => setShowPhotoModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gap: 16 }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category *</label>
                  <select
                    className={styles.formSelect}
                    value={photoForm.category_id}
                    onChange={(e) => setPhotoForm({ ...photoForm, category_id: Number(e.target.value) })}
                  >
                    <option value={0}>Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category_id && <span className={styles.formError}>{errors.category_id}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Image *</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <button
                      className={photoInputMode === 'upload' ? styles.btnPrimary : styles.btnSecondary}
                      onClick={() => setPhotoInputMode('upload')}
                      style={{ fontSize: 12, padding: '4px 12px' }}
                    >
                      Upload
                    </button>
                    <button
                      className={photoInputMode === 'url' ? styles.btnPrimary : styles.btnSecondary}
                      onClick={() => setPhotoInputMode('url')}
                      style={{ fontSize: 12, padding: '4px 12px' }}
                    >
                      <LinkIcon size={12} /> URL
                    </button>
                  </div>
                  {photoInputMode === 'upload' ? (
                    <FileUpload
                      value={photoForm.image || null}
                      onChange={(url) => setPhotoForm({ ...photoForm, image: url || '' })}
                      subDir="gallery"
                    />
                  ) : (
                    <>
                      <input
                        className={styles.formInput}
                        value={photoForm.image}
                        onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.value })}
                        placeholder="https://example.com/photo.jpg"
                      />
                      {photoForm.image && (
                        <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', maxHeight: 160 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoForm.image}
                            alt="Preview"
                            style={{ width: '100%', maxHeight: 160, objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {errors.image && <span className={styles.formError}>{errors.image}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Alt Text</label>
                  <input
                    className={styles.formInput}
                    value={photoForm.alt_text}
                    onChange={(e) => setPhotoForm({ ...photoForm, alt_text: e.target.value })}
                    placeholder="Descriptive text for accessibility"
                  />
                </div>

                <label className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    checked={!!photoForm.is_published}
                    onChange={(e) => setPhotoForm({ ...photoForm, is_published: e.target.checked ? 1 : 0 })}
                  />
                  <label>Published</label>
                </label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowPhotoModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSavePhoto} disabled={savingPhoto}>
                <Save size={16} />
                {savingPhoto ? 'Saving...' : editingPhotoId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== STORY MODAL ===== */}
      {showStoryModal && (
        <div className={styles.modalOverlay} onClick={() => setShowStoryModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className={styles.modalHeader}>
              <h2>{editingStoryId ? 'Edit Story' : 'Add Story'}</h2>
              <button className={styles.modalClose} onClick={() => setShowStoryModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gap: 16 }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name *</label>
                  <input
                    className={styles.formInput}
                    value={storyForm.name}
                    onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                    placeholder="Full name"
                  />
                  {errors.name && <span className={styles.formError}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Role *</label>
                  <input
                    className={styles.formInput}
                    value={storyForm.role}
                    onChange={(e) => setStoryForm({ ...storyForm, role: e.target.value })}
                    placeholder="e.g. Senior Backend Engineer"
                  />
                  {errors.role && <span className={styles.formError}>{errors.role}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Photo</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <button
                      className={storyPhotoMode === 'upload' ? styles.btnPrimary : styles.btnSecondary}
                      onClick={() => setStoryPhotoMode('upload')}
                      style={{ fontSize: 12, padding: '4px 12px' }}
                    >
                      Upload
                    </button>
                    <button
                      className={storyPhotoMode === 'url' ? styles.btnPrimary : styles.btnSecondary}
                      onClick={() => setStoryPhotoMode('url')}
                      style={{ fontSize: 12, padding: '4px 12px' }}
                    >
                      <LinkIcon size={12} /> URL
                    </button>
                  </div>
                  {storyPhotoMode === 'upload' ? (
                    <FileUpload
                      value={storyForm.photo || null}
                      onChange={(url) => setStoryForm({ ...storyForm, photo: url || '' })}
                      subDir="stories"
                    />
                  ) : (
                    <>
                      <input
                        className={styles.formInput}
                        value={storyForm.photo}
                        onChange={(e) => setStoryForm({ ...storyForm, photo: e.target.value })}
                        placeholder="https://example.com/photo.jpg"
                      />
                      {storyForm.photo && (
                        <div style={{ marginTop: 8 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={storyForm.photo}
                            alt="Preview"
                            style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Quote *</label>
                  <textarea
                    className={styles.formTextarea}
                    value={storyForm.quote}
                    onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                    placeholder="Their story or testimonial..."
                    style={{ minHeight: 100 }}
                  />
                  {errors.quote && <span className={styles.formError}>{errors.quote}</span>}
                </div>

                <label className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    checked={!!storyForm.is_published}
                    onChange={(e) => setStoryForm({ ...storyForm, is_published: e.target.checked ? 1 : 0 })}
                  />
                  <label>Published</label>
                </label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowStoryModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSaveStory} disabled={savingStory}>
                <Save size={16} />
                {savingStory ? 'Saving...' : editingStoryId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== CONFIRM DELETE ===== */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title={`Delete ${deleteTarget?.type === 'category' ? 'Category' : deleteTarget?.type === 'photo' ? 'Photo' : 'Story'}`}
        message={
          deleteTarget?.type === 'category'
            ? 'Are you sure you want to delete this category? All photos in this category will also be deleted. This action cannot be undone.'
            : deleteTarget?.type === 'photo'
            ? 'Are you sure you want to delete this photo? This action cannot be undone.'
            : 'Are you sure you want to delete this story? This action cannot be undone.'
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
