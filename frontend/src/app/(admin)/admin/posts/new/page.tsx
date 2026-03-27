'use client';

import PostForm from '@/components/admin/PostForm';
import styles from '@/styles/admin.module.scss';

export default function AdminNewPostPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Create New Post</h1>
      </div>
      <div className={styles.card}>
        <PostForm />
      </div>
    </div>
  );
}
