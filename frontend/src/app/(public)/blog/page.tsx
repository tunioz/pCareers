export const revalidate = 60;
import type { Metadata } from 'next';
import { queryAll } from '@/lib/db';
import type { Post, Job } from '@/types';
import { BlogPageClient } from '@/components/public/blog/BlogPageClient';

export const metadata: Metadata = {
  title: 'Engineering Blog | pCloud Careers',
  description: 'Insights from the pCloud engineering team — deep dives into cloud storage, encryption, infrastructure, and the culture behind our products.',
  openGraph: {
    title: 'Engineering Blog | pCloud Careers',
    description: 'Insights from the pCloud engineering team — deep dives into cloud storage, encryption, infrastructure, and the culture behind our products.',
  },
};

export default async function BlogPage() {
  const posts = await queryAll<Post>(
    'SELECT * FROM posts WHERE is_published = 1 ORDER BY created_at DESC'
  );

  // Load tags for each post
  const postTags = await queryAll<{ post_id: number; name: string }>(
    `SELECT pt.post_id, t.name FROM post_tags pt JOIN tags t ON t.id = pt.tag_id`
  );
  const tagsByPost = new Map<number, string[]>();
  for (const pt of postTags) {
    if (!tagsByPost.has(pt.post_id)) tagsByPost.set(pt.post_id, []);
    tagsByPost.get(pt.post_id)!.push(pt.name);
  }
  const postsWithTags = posts.map(p => ({ ...p, tags: tagsByPost.get(p.id) || [] }));

  const jobs = await queryAll<Job>(
    'SELECT * FROM jobs WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3'
  );

  const categories = [...new Set(posts.map((p) => p.category))];
  const allTags = [...new Set(postTags.map(pt => pt.name))];

  return <BlogPageClient posts={postsWithTags} categories={categories} jobs={jobs} allTags={allTags} />;
}
