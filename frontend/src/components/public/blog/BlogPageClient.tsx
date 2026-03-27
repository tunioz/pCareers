'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Clock, User, ChevronDown, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Post, Job } from '@/types';
import styles from './BlogPage.module.scss';

interface BlogPageClientProps {
  posts: Post[];
  categories: string[];
  jobs: Job[];
}

export function BlogPageClient({ posts, categories, jobs }: BlogPageClientProps) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const jobsRef = useRef(null);
  const isJobsInView = useInView(jobsRef, { once: true, margin: '-100px' });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft = index * slideWidth;
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Hero */}
      <section ref={heroRef} className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <motion.div className={styles.heroContent} initial={{ opacity: 0, y: 30 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <h1 className={styles.heroTitle}>Under the hood</h1>
            <p className={styles.heroSubtitle}>Engineering insights from the pCloud team</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className={styles.featuredSection}>
          <div className={styles.blogContainer}>
            <p className={styles.sectionLabel}>Featured</p>
            <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredGrid}>
                <div className={styles.featuredImage}>
                  <ImageWithFallback src={featuredPost.cover_image || 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?w=800'} alt={featuredPost.title} />
                  <div className={styles.featuredCat}>{featuredPost.category}</div>
                </div>
                <div className={styles.featuredBody}>
                  <h3 className={styles.featuredTitle}>{featuredPost.title}</h3>
                  <p className={styles.featuredExcerpt}>{featuredPost.excerpt || ''}</p>
                  <div className={styles.featuredMeta}>
                    <div className={styles.metaItem}><User size={16} /><span>{featuredPost.author}</span></div>
                    <div className={styles.metaItem}><Clock size={16} /><span>{featuredPost.read_time || '5 min'}</span></div>
                  </div>
                  <span className={styles.readLink}>Read article →</span>
                </div>
              </div>
            </Link>
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
                <Link key={post.id} href={`/blog/${post.slug}`} className={styles.articleCard}>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} whileHover={{ y: -5 }} style={{ height: '100%' }}>
                    <div className={styles.articleImage}>
                      <ImageWithFallback src={post.cover_image || 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?w=600'} alt={post.title} />
                      <div className={styles.articleCat}>{post.category}</div>
                    </div>
                    <div className={styles.articleBody}>
                      <h3 className={styles.articleTitle}>{post.title}</h3>
                      <div className={styles.articleMeta}>
                        <div className={styles.articleMetaRow}><User size={14} /><span>{post.author}</span></div>
                        <div className={styles.articleMetaDate}>
                          <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          <span className={styles.articleMetaTime}><Clock size={14} />{post.read_time || '5 min'}</span>
                        </div>
                      </div>
                      <span className={styles.articleReadLink}>Read article →</span>
                    </div>
                  </motion.div>
                </Link>
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

      {/* Related Jobs - "These problems excite you?" */}
      {jobs.length > 0 && (
        <section ref={jobsRef} className={styles.relatedJobsSection}>
          <div className={styles.relatedJobsContainer}>
            <motion.div
              className={styles.relatedJobsGrid}
              initial={{ opacity: 0, y: 30 }}
              animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Left Content */}
              <div className={styles.relatedJobsLeft}>
                <h2 className={styles.relatedJobsTitle}>
                  These problems excite you?
                </h2>
                <div className={styles.relatedJobsDivider} />
                <p className={styles.relatedJobsDescription}>
                  We&apos;re looking for talented engineers to solve them
                </p>
                <Link href="/careers">
                  <motion.button className={styles.relatedJobsCta} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    View All Open Roles
                  </motion.button>
                </Link>
              </div>

              {/* Right - Job Cards Carousel */}
              <div className={styles.relatedJobsRight}>
                <div
                  className={styles.jobCarousel}
                  ref={carouselRef}
                  onScroll={(e) => {
                    const container = e.currentTarget;
                    const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
                    setActiveSlide(newIndex);
                  }}
                >
                  {jobs.slice(0, 3).map((job, index) => (
                    <Link key={job.id} href={`/careers/${job.slug}`} className={styles.jobCardLink}>
                      <motion.div
                        className={styles.jobCard}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -5 }}
                      >
                        <ImageWithFallback
                          src={job.cover_image || `https://images.unsplash.com/photo-163009179065${index}-85ec55570e0b?w=600&h=400&fit=crop`}
                          alt={job.title}
                        />
                        <div className={styles.jobCardOverlay}>
                          <h3>{job.title}</h3>
                          <div className={styles.jobCardMeta}>
                            <span>{job.department}</span>
                            <span> • {job.product}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Dots */}
                <div className={styles.carouselDots}>
                  {jobs.slice(0, 3).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`${styles.dot} ${activeSlide === index ? styles.dotActive : ''}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Share our blog */}
      <section className={styles.shareSection}>
        <div className={styles.blogContainer}>
          <motion.div
            className={styles.shareContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={styles.shareTitle}>Share our blog</h3>
            <div className={styles.shareButtons}>
              <motion.button className={styles.shareLinkedin} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Share on LinkedIn">
                <Linkedin size={24} />
              </motion.button>
              <motion.button className={styles.shareTwitter} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Share on Twitter">
                <Twitter size={24} />
              </motion.button>
              <motion.button className={styles.shareEmail} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Share via Email">
                <Mail size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
