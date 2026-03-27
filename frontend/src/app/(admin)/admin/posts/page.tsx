'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, FileText } from 'lucide-react';
import { getPublishBadge } from '@/components/admin/StatusBadge';
import Pagination from '@/components/admin/Pagination';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { PostWithTags, PaginationMeta, CategoryWithCount } from '@/types';

export default function AdminPostsPage() {
  const { showToast } = useToast();
  const [posts, setPosts] = useState<PostWithTags[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 10, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '10' });
      if (search) params.set('search', search);
      if (categoryFilter) params.set('category', categoryFilter);

      const res = await fetch(`/api/posts?${params}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data || []);
        setMeta(data.meta || { page: 1, perPage: 10, total: 0, totalPages: 0 });
      }
    } catch {
      showToast('error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryFilter, showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data || []);
      });
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Post deleted successfully');
        fetchPosts();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete post');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleTogglePublish = async (post: PostWithTags) => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: post.is_published ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', post.is_published ? 'Post unpublished' : 'Post published');
        fetchPosts();
      }
    } catch {
      showToast('error', 'Failed to update post');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Posts</h1>
        <div className={styles.pageActions}>
          <Link href="/admin/posts/new" className={styles.btnPrimary}>
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        {/* Toolbar */}
        <form className={styles.toolbar} onSubmit={handleSearchSubmit}>
          <div className={styles.toolbarLeft}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className={styles.filterSelect}
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Table */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText />
            <h3>No posts found</h3>
            <p>Create your first post to get started.</p>
            <Link href="/admin/posts/new" className={styles.btnPrimary}>
              <Plus size={16} />
              New Post
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          style={{ color: '#212529', textDecoration: 'none', fontWeight: 500 }}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td>{post.category}</td>
                      <td>{post.author}</td>
                      <td>
                        <button
                          onClick={() => handleTogglePublish(post)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          title="Click to toggle"
                        >
                          {getPublishBadge(post.is_published)}
                        </button>
                      </td>
                      <td>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td>
                        <div className={styles.tableActions}>
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                            onClick={() => setDeleteId(post.id)}
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
            <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
