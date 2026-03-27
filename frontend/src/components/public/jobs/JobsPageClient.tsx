'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import type { Job } from '@/types';
import styles from './JobsPage.module.scss';

interface JobsPageClientProps {
  jobs: Job[];
  departments: string[];
  products: string[];
  seniorities: string[];
}

export function JobsPageClient({ jobs, departments, products, seniorities }: JobsPageClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [department, setDepartment] = useState('All');
  const [product, setProduct] = useState('All');
  const [seniority, setSeniority] = useState('All');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (department !== 'All' && job.department !== department) return false;
      if (product !== 'All' && job.product !== product) return false;
      if (seniority !== 'All' && job.seniority !== seniority) return false;
      return true;
    });
  }, [jobs, department, product, seniority]);

  const hasActiveFilters = department !== 'All' || product !== 'All' || seniority !== 'All';

  const handleClearAll = () => {
    setDepartment('All');
    setProduct('All');
    setSeniority('All');
  };

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className={styles.heading}>Open Positions</h2>
          <p className={styles.subtitle}>Browse our open positions to explore what roles exist, what skills are needed, and how to start your journey with pCloud.</p>
        </motion.div>

        <motion.div className={styles.controls} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
          <select className={styles.select} value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="All">Department</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className={styles.select} value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="All">Product</option>
            {products.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select className={styles.select} value={seniority} onChange={(e) => setSeniority(e.target.value)}>
            <option value="All">Seniority</option>
            {seniorities.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className={styles.resultsCount}>{filteredJobs.length} positions</span>
          {hasActiveFilters && <button className={styles.clearButton} onClick={handleClearAll}>Clear</button>}
        </motion.div>

        {filteredJobs.length > 0 ? (
          <div className={styles.grid}>
            {filteredJobs.map((job, index) => (
              <Link key={job.id} href={`/careers/${job.slug}`} className={styles.jobCard}>
                <motion.div style={{ height: '100%' }} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * (index + 1), duration: 0.6 }} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
                  <div className={styles.cardBg}>
                    <ImageWithFallback src={job.cover_image || `https://images.unsplash.com/photo-1565229284535-2cbbe3049123?w=600`} alt={job.title} />
                  </div>
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <div className={styles.badges}>
                      {job.is_new === 1 && <span className={styles.badgeNew}>NEW</span>}
                      {job.is_high_priority === 1 && <span className={styles.badgePriority}>HIGH PRIORITY</span>}
                    </div>
                    <div>
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
        ) : (
          <div className={styles.noResults}>No positions found matching your criteria.</div>
        )}
      </div>
    </section>
  );
}
