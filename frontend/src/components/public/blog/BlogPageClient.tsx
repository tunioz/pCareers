'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Post, Job } from '@/types';
import styles from './BlogPage.module.scss';

interface BlogPageClientProps {
  posts: Post[];
  categories: string[];
  jobs: Job[];
}

const catColorMap: Record<string, string> = {
  'ai & ml': 'catAi',
  'ai': 'catAi',
  'security': 'catSec',
  'infrastructure': 'catInf',
  'engineering': 'catInf',
};

const deptColorMap: Record<string, string> = {
  engineering: 'deptEng',
  design: 'deptDes',
  marketing: 'deptMkt',
  support: 'deptSup',
  qa: 'deptQa',
};

function getDeptClass(department: string): string {
  return deptColorMap[department.toLowerCase()] || 'deptEng';
}

function getCatClass(category: string): string {
  return catColorMap[category.toLowerCase()] || 'catInf';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function BlogPageClient({ posts, categories, jobs }: BlogPageClientProps) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const jobsRef = useRef(null);
  const isJobsInView = useInView(jobsRef, { once: true, margin: '-100px' });

  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleArticles, setVisibleArticles] = useState(6);

  const allCategories = ['All', ...categories];
  const featuredPost = posts.find((p) => p.is_featured === 1) || posts[0];
  const otherPosts = posts.filter((p) => p.id !== featuredPost?.id);

  const filteredPosts = activeCategory === 'All'
    ? otherPosts
    : otherPosts.filter((p) => p.category === activeCategory);

  const displayedPosts = filteredPosts.slice(0, visibleArticles);
  const hasMore = visibleArticles < filteredPosts.length;


  return (
    <div className={styles.page}>
      {/* Hero */}
      <section ref={heroRef} className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <motion.div className={styles.heroContent} initial={{ opacity: 0, y: 30 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <h1 className={styles.heroTitle}>Under the <span className={styles.heroAccent}>hood</span></h1>
            <p className={styles.heroSubtitle}>How we build infrastructure for 24 million users. No fluff. Real engineering.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className={styles.featuredSection}>
          <div className={styles.blogContainer}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Link href={`/blog/${featuredPost.slug}`} className={styles.cardWide}>
                <div className={styles.wideImg}>
                  <div className={styles.wideImgInner}>
                    <ImageWithFallback src={featuredPost.cover_image || 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?w=800'} alt={featuredPost.title} />
                  </div>
                </div>
                <div className={styles.wideBody}>
                  <span className={`${styles.category} ${styles[getCatClass(featuredPost.category)]}`}>
                    {featuredPost.category}
                  </span>
                  <h3 className={styles.cardTitleWide}>{featuredPost.title}</h3>
                  {featuredPost.excerpt && (
                    <p className={styles.cardExcerpt}>{featuredPost.excerpt}</p>
                  )}
                  <div className={styles.cardMeta}>
                    <span>{formatDate(featuredPost.created_at)}</span>
                    <span className={styles.metaSep} />
                    <span className={styles.readTime}>
                      <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" /><path d="M8 4.5V8l2.5 1.5" /></svg>
                      {featuredPost.read_time || '5 min read'}
                    </span>
                  </div>
                  <span className={styles.readLink}>
                    Read article
                    <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className={styles.filtersSection}>
        <div className={styles.blogContainer}>
          <div className={styles.filtersWrap}>
            {allCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => { setActiveCategory(category); setVisibleArticles(6); }}
                className={`${styles.filterPill} ${activeCategory === category ? styles.filterActive : styles.filterInactive}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className={styles.gridSection}>
        <div className={styles.blogContainer}>
          <h2 className={styles.gridTitle}>Latest Articles</h2>
          {displayedPosts.length > 0 ? (
            <div className={styles.articlesGrid}>
              {displayedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={`/blog/${post.slug}`} className={styles.card}>
                    <div className={styles.cardImg}>
                      <div className={styles.cardImgInner}>
                        <ImageWithFallback src={post.cover_image || 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?w=600'} alt={post.title} />
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
                          <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" /><path d="M8 4.5V8l2.5 1.5" /></svg>
                          {post.read_time || '5 min read'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>No articles found for this category.</div>
          )}

          {hasMore && (
            <div className={styles.loadMore}>
              <motion.button onClick={() => setVisibleArticles((prev) => prev + 6)} className={styles.loadMoreButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Load More Articles <ChevronDown size={20} />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Related Jobs */}
      {jobs.length > 0 && (
        <section ref={jobsRef} className={styles.relatedJobsSection}>
          <div className={styles.relatedJobsContainer}>
            <motion.div
              className={styles.relatedJobsGrid}
              initial={{ opacity: 0, y: 30 }}
              animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.relatedJobsLeft}>
                <h2 className={styles.relatedJobsTitle}>
                  These problems excite you?
                </h2>
                <div className={styles.relatedJobsDivider} />
                <p className={styles.relatedJobsDescription}>
                  We&apos;re looking for engineers to solve them
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/careers" className={styles.relatedJobsCta}>
                    View All Open Roles
                  </Link>
                </motion.div>
              </div>

              <div className={styles.relatedJobsRight}>
                <div className={styles.jobCards}>
                  {jobs.slice(0, 3).map((job) => (
                    <Link key={job.id} href={`/careers/${job.slug}`} className={styles.jobCard}>
                      <div className={styles.jobCardTop}>
                        <span className={`${styles.deptPill} ${styles[getDeptClass(job.department)]}`}>
                          {job.department}
                        </span>
                        <div className={styles.jobCardArrow}>
                          <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
                        </div>
                      </div>
                      <h3 className={styles.jobCardTitle}>{job.title}</h3>
                      <div className={styles.jobCardMeta}>
                        <span>
                          <svg viewBox="0 0 16 16">
                            <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" />
                            <circle cx="8" cy="6" r="1.5" />
                          </svg>
                          {job.location || 'Sofia'}
                        </span>
                        <span>{job.employment_type}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

    </div>
  );
}
