'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Post } from '@/types';
import styles from './BlogTeaser.module.scss';

interface BlogTeaserProps {
  posts: Post[];
}

export function BlogTeaser({ posts }: BlogTeaserProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const displayPosts = posts.slice(0, 3);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.heading}>
            From the <span className={styles.headingHighlight}>engineering blog</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {displayPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
              <motion.article
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                style={{ height: '100%' }}
              >
                <div className={styles.cardImage}>
                  <ImageWithFallback
                    src={post.cover_image || 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=600'}
                    alt={post.title}
                  />
                  <div
                    className={styles.categoryPill}
                    style={{
                      backgroundColor: '#1EBCC5',
                      color: 'white',
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <div className={styles.cardMeta}>
                    <span>{post.author}</span>
                    <div className={styles.readTime}>
                      <Clock size={14} />
                      <span>{post.read_time || '5 min'}</span>
                    </div>
                  </div>
                  <div className={styles.readMore}>
                    Read Article
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/blog">
            <motion.button
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Posts
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
