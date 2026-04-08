'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './Benefits.module.scss';

const benefits = [
  {
    title: 'Compensation & Financial',
    description: 'Competitive salary, bonuses, and performance rewards.',
    image: '/images/compensation-bg.jpg',
  },
  {
    title: 'Health & Wellbeing',
    description: 'Premium health insurance and wellness programs.',
    image: '/images/health-bg.jpg',
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote options, and generous PTO.',
    image: '/images/work-bg.jpg',
  },
  {
    title: 'Growth & Learning',
    description: 'Conference budgets, courses, and learning resources.',
    image: '/images/growth-bg.jpg',
  },
  {
    title: 'Team & Social',
    description: 'Team events, retreats, and community activities.',
    image: '/images/team-bg.jpg',
  },
  {
    title: 'Workspace & Tools',
    description: 'Top-tier equipment and a modern, inspiring office.',
    image: '/images/workspace-bg.jpg',
  },
];

export function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.heading}>
            We Take Care of{' '}
            <span className={styles.highlight}>the Team</span>
          </h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            We believe that great work comes from people who feel valued,
            supported, and empowered.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className={styles.card}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={styles.cardImage}>
                <ImageWithFallback src={benefit.image} alt={benefit.title} />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
