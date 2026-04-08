'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import type { Job } from '@/types';
import styles from './OpenRoles.module.scss';

interface OpenRolesProps {
  jobs: Job[];
}

const CARD_WIDTH = 320;
const GAP = 20;
const DURATION = 55;

const deptColorMap: Record<string, string> = {
  engineering: 'eng',
  design: 'des',
  marketing: 'mkt',
  support: 'sup',
  qa: 'qa',
};

function getDeptClass(department: string): string {
  const key = department.toLowerCase();
  return deptColorMap[key] || 'eng';
}

function RoleCard({ job }: { job: Job }) {
  return (
    <Link href={`/careers/${job.slug}`} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={`${styles.deptPill} ${styles[getDeptClass(job.department)]}`}>
          {job.department}
        </span>
        <div className={styles.cardArrow}>
          <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
        </div>
      </div>
      <h3 className={styles.cardTitle}>{job.title}</h3>
      <div className={styles.cardMeta}>
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
  );
}

export function OpenRoles({ jobs }: OpenRolesProps) {
  const sectionRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const shuffledJobs = useMemo(() => {
    return [...jobs];
  }, [jobs]);

  const handleNav = useCallback((newDir: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const step = CARD_WIDTH + GAP;
    const halfWidth = step * shuffledJobs.length;

    // Capture current animated position
    const computed = window.getComputedStyle(track);
    const matrix = new DOMMatrix(computed.transform);
    const currentX = matrix.m41;

    // Jump one card in the clicked direction
    const jumpedX = newDir === 'left'
      ? currentX - step
      : currentX + step;

    // Wrap around
    let normX = jumpedX % halfWidth;
    if (normX > 0) normX -= halfWidth;
    if (normX < -halfWidth) normX += halfWidth;

    // Stop CSS animation, set jumped position
    track.style.animation = 'none';
    track.style.transition = 'none';
    track.style.transform = `translateX(${currentX}px)`;
    void track.offsetWidth;

    // Animate to jumped position
    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    track.style.transform = `translateX(${jumpedX}px)`;

    const onEnd = () => {
      track.removeEventListener('transitionend', onEnd);

      // Wrap the final position
      let finalX = jumpedX % halfWidth;
      if (finalX > 0) finalX -= halfWidth;
      if (finalX < -halfWidth) finalX += halfWidth;

      // Calculate delay to resume auto-scroll from this position
      let delay: number;
      if (newDir === 'left') {
        delay = (-finalX / halfWidth) * DURATION;
      } else {
        delay = ((halfWidth + finalX) / halfWidth) * DURATION;
      }

      // Resume CSS animation
      track.style.transition = '';
      track.style.transform = '';
      track.style.animation = '';
      track.style.animationDelay = `-${delay}s`;

      setDirection(newDir);
    };

    track.addEventListener('transitionend', onEnd);
  }, [shuffledJobs.length]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerLeft}>
            <h2>We&apos;re <span className={styles.gradientText}>hiring</span></h2>
          </div>
          <div className={styles.headerRight}>
            <button
              className={styles.navBtn}
              onClick={() => handleNav('right')}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" /></svg>
            </button>
            <button
              className={styles.navBtn}
              onClick={() => handleNav('left')}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
            </button>
            <Link href="/careers" className={styles.viewAllBtn}>
              View all positions
              <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.marqueeWrapper}
        initial={false}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div
          ref={trackRef}
          className={`${styles.marqueeTrack} ${direction === 'left' ? styles.scrollLeft : styles.scrollRight}`}
        >
          {shuffledJobs.map((job) => (
            <RoleCard key={`a-${job.id}`} job={job} />
          ))}
          {shuffledJobs.map((job) => (
            <RoleCard key={`b-${job.id}`} job={job} />
          ))}
        </div>
      </motion.div>

      <div className={styles.container}>
        <motion.p
          className={styles.bottomHint}
          initial={false}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Showing {jobs.length} open position{jobs.length !== 1 ? 's' : ''}
        </motion.p>
      </div>
    </section>
  );
}
