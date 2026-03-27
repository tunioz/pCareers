'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './Strengths.module.scss';

const cards = [
  {
    title: 'Zero-Knowledge Encryption',
    image: 'https://images.unsplash.com/photo-1638645540399-40229456a236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    title: 'Swiss Privacy Standards',
    image: 'https://images.unsplash.com/photo-1640022578241-4a3275e7ffce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    title: '99.92% Uptime',
    image: 'https://images.unsplash.com/photo-1548544027-1a96c4c24c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    title: 'Top 1% Team',
    image: 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    title: '13+ Years of Innovation',
    image: 'https://images.unsplash.com/photo-1763298464558-1b63197f2a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
];

export function Strengths() {
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
          <h2 className={styles.title}>
            Security and privacy are not features.{' '}
            <span className={styles.highlight}>They&apos;re our foundation.</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className={styles.card}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={styles.cardImage}>
                <ImageWithFallback src={card.image} alt={card.title} />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
