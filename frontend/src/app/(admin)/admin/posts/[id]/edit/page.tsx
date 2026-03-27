'use client';

import { useEffect, useState, use } from 'react';
import PostForm from '@/components/admin/PostForm';
import styles from '@/styles/admin.module.scss';
import type { PostWithTags } from '@/types';

export default function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const postId = parseInt(id, 10);
  const [post, setPost] = useState<PostWithTags | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPost(data.data);
        } else {
          setError(data.error || 'Post not found');
        }
      })
      .catch(() => setError('Failed to load post'))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.emptyState}>
        <h3>{error || 'Post not found'}</h3>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Edit Post</h1>
      </div>
      <div className={styles.card}>
        <PostForm post={post} postId={postId} />
      </div>
    </div>
  );
}
