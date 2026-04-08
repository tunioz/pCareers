'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Post } from '@/types';
import styles from './BlogTeaser.module.scss';

interface BlogTeaserProps {
  posts: Post[];
}

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

export function BlogTeaser({ posts }: BlogTeaserProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const displayPosts = posts.slice(0, 3);
  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            From the <span className={styles.gradientText}>engineering</span> blog
          </h2>
          <Link href="/blog" className={styles.allLink}>
            View all posts
            <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
          </Link>
        </motion.div>

        <div className={styles.grid}>
          {/* Featured wide card */}
          {featured && (
            <motion.div
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Link href={`/blog/${featured.slug}`} className={styles.cardWide}>
                <div className={styles.wideImg}>
                  <div className={styles.wideImgInner}>
                    {featured.cover_image ? (
                      <ImageWithFallback src={featured.cover_image} alt={featured.title} />
                    ) : (
                      <div className={styles.wideImgPlaceholder} />
                    )}
                  </div>
                </div>
                <div className={styles.wideBody}>
                  <span className={`${styles.category} ${styles[getCatClass(featured.category)]}`}>
                    {featured.category}
                  </span>
                  <h3 className={styles.cardTitleWide}>{featured.title}</h3>
                  {featured.excerpt && (
                    <p className={styles.cardExcerpt}>{featured.excerpt}</p>
                  )}
                  <div className={styles.cardMeta}>
                    <span>{formatDate(featured.created_at)}</span>
                    <span className={styles.metaSep} />
                    <span className={styles.readTime}>
                      <svg viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="6.5" />
                        <path d="M8 4.5V8l2.5 1.5" />
                      </svg>
                      {featured.read_time || '5 min read'}
                    </span>
                  </div>
                  <span className={styles.readLink}>
                    Read article
                    <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Standard cards */}
          {rest.map((post, index) => (
            <motion.div
              key={post.id}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <Link href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.cardImg}>
                  <div className={styles.cardImgInner}>
                    {post.cover_image ? (
                      <ImageWithFallback src={post.cover_image} alt={post.title} />
                    ) : (
                      <div className={styles.cardImgPlaceholder} />
                    )}
                  </div>
                  <span className={`${styles.category} ${styles[getCatClass(post.category)]}`}>
                    {post.category}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  {post.excerpt && (
                    <p className={styles.cardExcerptSmall}>{post.excerpt}</p>
                  )}
                  <div className={styles.cardMeta}>
                    <span>{formatDate(post.created_at)}</span>
                    <span className={styles.metaSep} />
                    <span className={styles.readTime}>
                      <svg viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="6.5" />
                        <path d="M8 4.5V8l2.5 1.5" />
                      </svg>
                      {post.read_time || '5 min read'}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
