'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Job } from '@/types';
import styles from './OpenRoles.module.scss';

interface OpenRolesProps {
  jobs: Job[];
}

export function OpenRoles({ jobs }: OpenRolesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const displayJobs = jobs.slice(0, 3);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>Open Positions</h2>
          <p className={styles.subtitle}>
            Browse our open positions to explore what roles exist, what skills are needed,
            and how to start your journey with pCloud.
          </p>
        </motion.div>

        <div className={styles.cardsGrid}>
          {displayJobs.map((job, index) => (
            <Link key={job.id} href={`/careers/${job.slug}`} className={styles.jobCard}>
              <motion.div
                style={{ height: '100%' }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className={styles.cardBg}>
                  <ImageWithFallback
                    src={job.cover_image || 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?w=600'}
                    alt={job.title}
                  />
                </div>
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <div className={styles.badges}>
                    {job.is_new === 1 && <span className={styles.badgeNew}>NEW</span>}
                    {job.is_high_priority === 1 && <span className={styles.badgePriority}>HIGH PRIORITY</span>}
                  </div>
                  <div className={styles.cardBottom}>
                    <h3 className={styles.cardTitle}>{job.title}</h3>
                    <p className={styles.cardSeniority}>{job.seniority}</p>
                    <div className={styles.cardTags}>
                      <span className={styles.tagDept}>{job.department}</span>
                      <span className={styles.tagProduct}>{job.product}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/careers">
            <motion.button
              className={styles.viewAllButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All ({jobs.length})
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
