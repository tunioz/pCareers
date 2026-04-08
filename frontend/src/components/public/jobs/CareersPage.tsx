'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import type { Job } from '@/types';
import styles from './CareersPage.module.scss';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface CareersPageProps {
  jobs: Job[];
  departments?: string[];
  products?: string[];
  seniorities?: string[];
  allTags: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?w=600';

const BENEFITS = [
  {
    iconSrc: '/images/top1-ic.svg',
    title: 'Top 1% Compensation',
    description:
      'Competitive salary, bonuses, and benefits that put you in the top percentile.',
  },
  {
    iconSrc: '/images/real-impact-ic.svg',
    title: 'Real Impact',
    description:
      'Your work reaches 24M+ users worldwide. Every line of code matters.',
  },
  {
    iconSrc: '/images/continuous-ic.svg',
    title: 'Continuous Growth',
    description:
      'Learning budget, conference attendance, and mentorship from industry leaders.',
  },
  {
    iconSrc: '/images/work-life-ic.svg',
    title: 'Work-Life Balance',
    description:
      'Flexible hours, remote-friendly culture, and generous PTO policy.',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function CareersPage({
  jobs,
  allTags,
}: CareersPageProps) {
  // -- Refs for scroll-triggered animations
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const whyRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' });

  // -- Filter state
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // -- Derived: filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (activeTags.length > 0) {
        const jobTags = job.tags
          ? job.tags.split(',').map((t) => t.trim().toLowerCase())
          : [];
        const hasMatch = activeTags.some((at) =>
          jobTags.includes(at.toLowerCase()),
        );
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [jobs, activeTags]);

  // -- Handlers
  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero */}
      {/* ================================================================= */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContainer}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            What will you build for{' '}
            <span className={styles.heroHighlight}>24M+</span> people?
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {filteredJobs.length} open {filteredJobs.length === 1 ? 'role' : 'roles'}. 500+ petabytes of responsibility. Zero tolerance for mediocrity.
          </motion.p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. Filter Tags */}
      {/* ================================================================= */}
      {allTags.length > 0 && (
        <section className={styles.tagsSection}>
          <div className={styles.tagsContainer}>
            <div className={styles.tagsRow}>
              {allTags.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`${styles.tagPill} ${isActive ? styles.tagPillActive : styles.tagPillInactive}`}
                    onClick={() => handleTagToggle(tag)}
                    aria-pressed={isActive}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 4. Jobs List — grouped by department */}
      {/* ================================================================= */}
      <section className={styles.rolesSection} id="roles" ref={gridRef}>
        <div className={styles.rolesContainer}>
          <div className={styles.rolesHeader}>
            <h2 className={styles.rolesTitle}>Open Roles</h2>
            <span className={styles.rolesCountBadge}>
              {filteredJobs.length}
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className={styles.jobsList}>
              {Object.entries(
                filteredJobs.reduce<Record<string, Job[]>>((groups, job) => {
                  const dept = job.department;
                  if (!groups[dept]) groups[dept] = [];
                  groups[dept].push(job);
                  return groups;
                }, {}),
              ).map(([dept, deptJobs]) => (
                <div key={dept} className={styles.deptGroup}>
                  <div className={styles.deptHeader}>
                    <h3 className={styles.deptName}>{dept}</h3>
                    <span className={styles.deptCount}>
                      {deptJobs.length} {deptJobs.length === 1 ? 'position' : 'positions'}
                    </span>
                  </div>
                  <div className={styles.deptJobs}>
                    {deptJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={gridInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
                      >
                        <Link href={`/careers/${job.slug}`} className={styles.jobRow}>
                          <div className={styles.jobRowLeft}>
                            <div className={styles.jobRowTitle}>
                              <h4>{job.title}</h4>
                              {job.is_new === 1 && (
                                <span className={styles.badgeNew}>NEW</span>
                              )}
                            </div>
                            <p className={styles.jobRowProduct}>{job.product}</p>
                          </div>
                          <div className={styles.jobRowRight}>
                            <div className={styles.jobRowMeta}>
                              <span className={styles.jobRowMetaItem}>
                                <Briefcase size={14} />
                                {job.seniority}
                              </span>
                              <span className={styles.jobRowMetaItem}>
                                <MapPin size={14} />
                                {job.location || 'Sofia, Bulgaria'}
                              </span>
                              <span className={styles.jobRowType}>
                                {job.employment_type}
                              </span>
                            </div>
                            <ArrowRight size={18} className={styles.jobRowArrow} />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              No positions found matching your criteria.
              <p>Try adjusting your filters or clearing them.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. WhyJoin / "Build Something That Matters" */}
      {/* ================================================================= */}
      <section className={styles.whyJoinSection} ref={whyRef}>
        <div className={styles.whyJoinContainer}>
          <motion.h2
            className={styles.whyJoinTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            Build Something That{' '}
            <span className={styles.whyJoinHighlight}>Matters</span>
          </motion.h2>

          <div className={styles.benefitsGrid}>
            {BENEFITS.map((benefit, i) => {
              return (
                <motion.div
                  key={benefit.title}
                  className={styles.benefitCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * (i + 1), duration: 0.5 }}
                >
                  <div className={styles.benefitIcon}>
                    <img src={benefit.iconSrc} alt={benefit.title} className={styles.benefitIconImg} />
                  </div>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
