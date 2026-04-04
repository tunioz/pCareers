'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Growth.module.scss';

const cards = [
  {
    title: 'Continuous Learning',
    description:
      'Access to courses, conferences, and resources to keep your skills sharp and your curiosity alive.',
    phase: '01',
    iconSrc: '/images/phase1-ic.svg',
  },
  {
    title: 'Mentorship & Coaching',
    description:
      'Learn from experienced engineers and leaders who are invested in your personal and professional growth.',
    phase: '02',
    iconSrc: '/images/phase2-ic.svg',
  },
  {
    title: 'Real Challenges',
    description:
      'Work on problems that matter at scale\u2014building systems used by millions of people worldwide.',
    phase: '03',
    iconSrc: '/images/phase3-ic.svg',
  },
  {
    title: 'Career Ownership',
    description:
      'Define your own growth path. We support lateral moves, leadership tracks, and deep specialization.',
    phase: '04',
    iconSrc: '/images/phase4-ic.svg',
  },
];

const nodeColors = [
  { c1: '#20C9DB', c2: '#34C77B' },
  { c1: '#A78BFA', c2: '#20C9DB' },
  { c1: '#F5A623', c2: '#F06060' },
  { c1: '#20C9DB', c2: '#A78BFA' },
];

export function Growth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      {/* SVG gradient defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#20C9DB" />
            <stop offset="35%" stopColor="#A78BFA" />
            <stop offset="65%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#20C9DB" />
          </linearGradient>
          {nodeColors.map((colors, i) => (
            <linearGradient key={i} id={`iconGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.c1} />
              <stop offset="100%" stopColor={colors.c2} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* Particles */}
      <div className={`${styles.particle} ${styles.particle1}`} />
      <div className={`${styles.particle} ${styles.particle2}`} />
      <div className={`${styles.particle} ${styles.particle3}`} />
      <div className={`${styles.particle} ${styles.particle4}`} />
      <div className={`${styles.particle} ${styles.particle5}`} />

      <motion.div
        className={styles.titleArea}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>
          The Path to a <span className={styles.accent}>Better You</span>
        </h2>
      </motion.div>

      <div className={styles.timelineWrapper}>
        {/* SVG flowing line */}
        <div className={`${styles.timelineLine} ${isInView ? styles.animate : ''}`}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path
              className={styles.timelineGlow}
              d="M 0,30 C 100,10 200,50 300,30 C 400,10 500,50 600,30 C 700,10 800,50 900,30 C 1000,10 1100,50 1200,30"
            />
            <path
              className={styles.timelinePath}
              d="M 0,30 C 100,10 200,50 300,30 C 400,10 500,50 600,30 C 700,10 800,50 900,30 C 1000,10 1100,50 1200,30"
            />
          </svg>
        </div>

        {/* Timeline Items */}
        <div className={styles.timelineItems}>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className={styles.timelineItem}
              style={{
                '--node-color-1': nodeColors[index].c1,
                '--node-color-2': nodeColors[index].c2,
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.4, duration: 0.6 }}
            >
              <div className={styles.node}>
                <div className={styles.nodeIcon}>
                  <img src={card.iconSrc} alt={card.title} className={styles.nodeIconImg} />
                </div>
              </div>
              <div className={styles.stepNum}>Phase {card.phase}</div>
              <h3 className={styles.itemTitle}>{card.title}</h3>
              <p className={styles.itemDesc}>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
