import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { queryOne, queryAll } from '@/lib/db';
import type { Post } from '@/types';
import { ImageWithFallback } from '@/components/public/ImageWithFallback';
import { ReadingProgressBar } from '@/components/public/blog/ReadingProgressBar';
import styles from '@/components/public/blog/BlogPost.module.scss';

function calculateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export const revalidate = 60;

const catColorMap: Record<string, string> = {
  'ai & ml': 'catAi',
  'ai': 'catAi',
  'security': 'catSec',
  'infrastructure': 'catInf',
  'engineering': 'catInf',
};

function getCatClass(category: string): string {
  return catColorMap[category.toLowerCase()] || 'catInf';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await queryOne<Post>('SELECT * FROM posts WHERE slug = ? AND is_published = 1', [slug]);
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

  const post = await queryOne<Post>('SELECT * FROM posts WHERE slug = ? AND is_published = 1', [slug]);
  if (!post) notFound();

  const title = post.title;
  const content = post.content;
  const excerpt = post.excerpt || '';
  const readTime = calculateReadTime(content);

  const relatedPosts = await queryAll<Post>(
    'SELECT * FROM posts WHERE is_published = 1 AND category = ? AND slug != ? ORDER BY created_at DESC LIMIT 3',
    [post.category, post.slug]
  );

  return (
    <div className={styles.page}>
      <ReadingProgressBar />
      <section className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/blog">Blog</Link>
          <ChevronRight size={16} />
          <Link href="/blog">{post.category}</Link>
          <ChevronRight size={16} />
          <span>{title}</span>
        </div>
      </section>

      <section className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.authorRow}>
            {post.author_image && (
              <div className={styles.authorPhoto}>
                <ImageWithFallback src={post.author_image} alt={post.author} />
              </div>
            )}
            <div className={styles.authorMeta}>
              <span className={styles.authorName}>{post.author}</span>
              {post.author_title && (
                <>
                  <span className={styles.authorSep} />
                  <span className={styles.authorTitle}>{post.author_title}</span>
                </>
              )}
              <span className={styles.authorSep} />
              <span className={styles.metaDate}>{formatDate(post.created_at)}</span>
              <span className={styles.authorSep} />
              <span className={styles.readTime}>
                <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" /><path d="M8 4.5V8l2.5 1.5" /></svg>
                {readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.coverImage}>
        <div className={styles.coverImageInner}>
          <div className={styles.coverImgWrapper}>
            {post.cover_image && (
              <ImageWithFallback src={post.cover_image} alt={title} />
            )}
            <span className={`${styles.categoryBadge} ${styles[getCatClass(post.category)]}`}>{post.category}</span>
          </div>
        </div>
      </section>

      <section className={styles.articleContent}>
        <div className={styles.articleContentInner}>
          {excerpt && <p className={styles.intro}>{excerpt}</p>}
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      </section>

      <section className={styles.authorBar}>
        <div className={styles.authorBarInner}>
          <div className={styles.authorBarCard}>
            <div className={styles.authorBarLine} />
            {post.author_image && (
              <div className={styles.authorBarPhoto}>
                <ImageWithFallback src={post.author_image} alt={post.author} />
              </div>
            )}
            <div className={styles.authorBarContent}>
              <div className={styles.authorBarInfo}>
                <span className={styles.authorBarName}>{post.author}</span>
                {post.author_title && (
                  <>
                    <span className={styles.authorBarSep} />
                    <span className={styles.authorBarRole}>{post.author_title}</span>
                  </>
                )}
              </div>
              <p className={styles.authorBarText}>
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
                    <div className={styles.relatedCardImgInner}>
                      <ImageWithFallback src={relPost.cover_image || 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?w=600'} alt={relPost.title} />
                    </div>
                    <span className={`${styles.relatedCardCat} ${styles[getCatClass(relPost.category)]}`}>{relPost.category}</span>
                  </div>
                  <div className={styles.relatedCardBody}>
                    <h4 className={styles.relatedCardTitle}>{relPost.title}</h4>
                    <div className={styles.relatedCardMeta}>
                      <span>{formatDate(relPost.created_at)}</span>
                      <span className={styles.metaSep} />
                      <span className={styles.readTime}>
                        <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" /><path d="M8 4.5V8l2.5 1.5" /></svg>
                        {relPost.read_time || '5 min read'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBlob1} />
        <div className={styles.ctaBlob2} />
        <div className={styles.ctaBlob3} />
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaHeading}>
            Ready to build something that <span className={styles.ctaHighlight}>matters?</span>
          </h2>
          <div className={styles.ctaButtons}>
            <Link href="/careers" className={styles.ctaPrimary}>View open positions</Link>
            <Link href="/culture" className={styles.ctaSecondary}>Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
