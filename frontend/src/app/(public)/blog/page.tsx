import type { Metadata } from 'next';
import { queryAll } from '@/lib/db';
import type { Post, Job } from '@/types';
import { BlogPageClient } from '@/components/public/blog/BlogPageClient';

export const metadata: Metadata = {
  title: 'Engineering Blog',
};

export default function BlogPage() {
  const posts = queryAll<Post>(
    'SELECT * FROM posts WHERE is_published = 1 ORDER BY created_at DESC'
  );

  const jobs = queryAll<Job>(
    'SELECT * FROM jobs WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3'
  );

  const categories = [...new Set(posts.map((p) => p.category))];

  return <BlogPageClient posts={posts} categories={categories} jobs={jobs} />;
}
