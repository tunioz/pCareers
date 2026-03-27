'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Users, Rocket, TrendingUp } from 'lucide-react';
import styles from './Growth.module.scss';

const cards = [
  {
    title: 'Continuous Learning',
    description:
      'Access to courses, conferences, and resources to keep your skills sharp and your curiosity alive.',
    icon: BookOpen,
    variant: 'blue' as const,
  },
  {
    title: 'Mentorship & Coaching',
    description:
      'Learn from experienced engineers and leaders who are invested in your personal and professional growth.',
    icon: Users,
    variant: 'yellow' as const,
  },
  {
    title: 'Real Challenges',
    description:
      'Work on problems that matter at scale\u2014building systems used by millions of people worldwide.',
    icon: Rocket,
    variant: 'blue' as const,
  },
  {
    title: 'Career Ownership',
    description:
      'Define your own growth path. We support lateral moves, leadership tracks, and deep specialization.',
    icon: TrendingUp,
    variant: 'yellow' as const,
  },
];

export function Growth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            The Path to a <span className={styles.highlight}>Better You</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`${styles.card} ${card.variant === 'blue' ? styles.cardBlue : styles.cardYellow}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.dotPattern} />
                <div className={styles.iconWrapper}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
