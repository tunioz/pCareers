'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2 } from 'lucide-react';
import FileUpload from '@/components/admin/FileUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { PostWithTags, CategoryWithCount, TagWithCount } from '@/types';

import { createSlug as slugify } from '@/lib/slugify';

interface PostFormProps {
  post?: PostWithTags | null;
  postId?: number;
}

export default function PostForm({ post, postId }: PostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEditing = !!postId;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [category, setCategory] = useState(post?.category || '');
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [author, setAuthor] = useState(post?.author || '');
  const [author_title, setAuthorTitle] = useState(post?.author_title || '');
  const [author_image, setAuthorImage] = useState(post?.author_image || '');
  const [cover_image, setCoverImage] = useState(post?.cover_image || '');
  const [read_time, setReadTime] = useState(post?.read_time || '');
  const [is_featured, setIsFeatured] = useState(!!post?.is_featured);
  const [is_published, setIsPublished] = useState(!!post?.is_published);

  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [allTags, setAllTags] = useState<TagWithCount[]>([]);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/tags').then((r) => r.json()),
    ]).then(([catData, tagData]) => {
      if (catData.success) setCategories(catData.data || []);
      if (tagData.success) {
        const tags: TagWithCount[] = tagData.data || [];
        setAllTags(tags);

        // If editing, match existing tag names to tag IDs
        if (post?.tags && tags.length > 0) {
          const ids = tags
            .filter((t) => post.tags.includes(t.name))
            .map((t) => t.id);
          setSelectedTagIds(ids);
        }
      }
    });
  }, [post?.tags]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title && !isEditing) {
      setSlug(slugify(title));
    }
  }, [title, slugManual, isEditing]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!content.trim()) errs.content = 'Content is required';
    if (!category) errs.category = 'Category is required';
    if (!author.trim()) errs.author = 'Author is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    const body = {
      title,
      slug: slug || undefined,
      content,
      excerpt: excerpt || undefined,
      category,
      author,
      author_title: author_title || undefined,
      author_image: author_image || undefined,
      cover_image: cover_image || undefined,
      read_time: read_time || undefined,
      is_featured: is_featured ? 1 : 0,
      is_published: is_published ? 1 : 0,
      tagIds: selectedTagIds,
    };

    try {
      const url = isEditing ? `/api/posts/${postId}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        showToast('success', isEditing ? 'Post updated successfully' : 'Post created successfully');
        if (!isEditing && data.data?.id) {
          router.push(`/admin/posts/${data.data.id}/edit`);
        }
      } else {
        showToast('error', data.error || 'Failed to save post');
        if (data.errors) {
          const fieldErrors: Record<string, string> = {};
          for (const err of data.errors) {
            fieldErrors[err.field] = err.message;
          }
          setErrors(fieldErrors);
        }
      }
    } catch {
      showToast('error', 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!postId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Post deleted');
        router.push('/admin/posts');
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete post');
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Title *</label>
            <input
              className={styles.formInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
            />
            {errors.title && <span className={styles.formError}>{errors.title}</span>}
          </div>

          {/* Slug */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Slug</label>
            <input
              className={styles.formInput}
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManual(true);
              }}
              placeholder="auto-generated-from-title"
            />
          </div>

          {/* Content */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Content *</label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog post content here..."
              minHeight="400px"
            />
            {errors.content && <span className={styles.formError}>{errors.content}</span>}
          </div>

          {/* Excerpt */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Excerpt</label>
            <textarea
              className={styles.formTextarea}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary..."
              style={{ minHeight: '80px' }}
            />
          </div>

          {/* Category + Author */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category *</label>
              <select
                className={styles.formSelect}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <span className={styles.formError}>{errors.category}</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Author *</label>
              <input
                className={styles.formInput}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
              {errors.author && <span className={styles.formError}>{errors.author}</span>}
            </div>
          </div>

          {/* Author details */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Author Title</label>
              <input
                className={styles.formInput}
                value={author_title}
                onChange={(e) => setAuthorTitle(e.target.value)}
                placeholder="e.g. Senior Developer"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Author Image URL</label>
              <input
                className={styles.formInput}
                value={author_image}
                onChange={(e) => setAuthorImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Read time */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Read Time</label>
              <input
                className={styles.formInput}
                value={read_time}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min"
              />
            </div>
            <div />
          </div>

          {/* Tags */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {allTags.map((tag) => (
                <label
                  key={tag.id}
                  className={styles.formCheckbox}
                  style={{
                    background: selectedTagIds.includes(tag.id) ? 'rgba(30,188,197,0.1)' : '#f8f9fa',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    border: selectedTagIds.includes(tag.id) ? '1px solid #1EBCC5' : '1px solid #dee2e6',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTagIds.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                    style={{ display: 'none' }}
                  />
                  <span style={{ fontSize: '13px', cursor: 'pointer' }}>{tag.name}</span>
                </label>
              ))}
              {allTags.length === 0 && (
                <span style={{ fontSize: '13px', color: '#adb5bd' }}>No tags available</span>
              )}
            </div>
          </div>

          {/* Cover image */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Cover Image</label>
            <FileUpload
              value={cover_image || null}
              onChange={(url) => setCoverImage(url || '')}
              subDir="images"
            />
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', gap: '24px' }}>
            <label className={styles.formCheckbox}>
              <input
                type="checkbox"
                checked={is_featured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <label>Featured</label>
            </label>
            <label className={styles.formCheckbox}>
              <input
                type="checkbox"
                checked={is_published}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <label>Published</label>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => router.push('/admin/posts')}
          >
            Cancel
          </button>
          {isEditing && (
            <button
              type="button"
              className={styles.btnDanger}
              onClick={() => setShowDelete(true)}
              style={{ marginLeft: 'auto' }}
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={showDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleting}
      />
    </>
  );
}
