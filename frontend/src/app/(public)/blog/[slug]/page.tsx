import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, User, ChevronRight } from 'lucide-react';
import { queryOne, queryAll } from '@/lib/db';
import type { Post } from '@/types';
import { ImageWithFallback } from '@/components/public/ImageWithFallback';
import styles from '@/components/public/blog/BlogPost.module.scss';

export async function generateStaticParams() {
  const posts = queryAll<Post>('SELECT slug FROM posts WHERE is_published = 1');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = queryOne<Post>('SELECT * FROM posts WHERE slug = ? AND is_published = 1', [slug]);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: { images: post.cover_image ? [post.cover_image] : undefined },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = queryOne<Post>('SELECT * FROM posts WHERE slug = ? AND is_published = 1', [slug]);
  if (!post) notFound();

  const title = post.title;
  const content = post.content;
  const excerpt = post.excerpt || '';

  const relatedPosts = queryAll<Post>(
    'SELECT * FROM posts WHERE is_published = 1 AND category = ? AND slug != ? ORDER BY created_at DESC LIMIT 3',
    [post.category, post.slug]
  );

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <section className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/blog">Blog</Link>
          <ChevronRight size={16} />
          <Link href="/blog">{post.category}</Link>
          <ChevronRight size={16} />
          <span style={{ color: '#3a3a3a' }}>{title}</span>
        </div>
      </section>

      <section className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <span className={styles.categoryBadge}>{post.category}</span>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.authorRow}>
            <div className={styles.authorInfo}>
              {post.author_image && (
                <div className={styles.authorPhoto}>
                  <ImageWithFallback src={post.author_image} alt={post.author} />
                </div>
              )}
              <div>
                <div className={styles.authorName}>{post.author}</div>
                {post.author_title && <div className={styles.authorTitle}>{post.author_title}</div>}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.metaInfo}>
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <div className={styles.metaItem}><Clock size={16} /><span>{post.read_time || '5 min'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {post.cover_image && (
        <section className={styles.coverImage}>
          <div className={styles.coverImageInner}>
            <div className={styles.coverImgWrapper}>
              <ImageWithFallback src={post.cover_image} alt={title} />
            </div>
          </div>
        </section>
      )}

      <section className={styles.articleContent}>
        <div className={styles.articleContentInner}>
          {excerpt && <p className={styles.intro}>{excerpt}</p>}
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      <section className={styles.authorBioSection}>
        <div className={styles.authorBioInner}>
          <h3 className={styles.authorBioTitle}>About the Author</h3>
          <div className={styles.authorBioCard}>
            {post.author_image && (
              <div className={styles.authorBioPhoto}>
                <ImageWithFallback src={post.author_image} alt={post.author} />
              </div>
            )}
            <div>
              <h4 className={styles.authorBioName}>{post.author}</h4>
              {post.author_title && <p className={styles.authorBioRole}>{post.author_title}</p>}
              <p className={styles.authorBioText}>
                {post.author} is a member of the pCloud engineering team, contributing to the technical blog with insights on {post.category.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <h3 className={styles.relatedTitle}>Related Articles</h3>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relPost) => (
                <Link key={relPost.id} href={`/blog/${relPost.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedCardImage}>
                    <ImageWithFallback src={relPost.cover_image || 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?w=600'} alt={relPost.title} />
                    <div className={styles.relatedCardCat}>{relPost.category}</div>
                  </div>
                  <div className={styles.relatedCardBody}>
                    <h4 className={styles.relatedCardTitle}>{relPost.title}</h4>
                    <div className={styles.relatedCardMeta}>
                      <User size={14} /><span>{relPost.author}</span>
                      <span>&bull;</span>
                      <Clock size={14} /><span>{relPost.read_time || '5 min'}</span>
                    </div>
                    <span className={styles.relatedCardLink}>Read Article &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
