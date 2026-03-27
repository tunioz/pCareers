'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './Benefits.module.scss';

const benefits = [
  {
    title: 'Compensation & Financial',
    description: 'Competitive salary, bonuses, and equity options.',
    image:
      'https://images.unsplash.com/photo-1624953901718-e24ee7200b85?w=600',
  },
  {
    title: 'Health & Wellbeing',
    description: 'Premium health insurance and wellness programs.',
    image:
      'https://images.unsplash.com/photo-1722605341966-a61a3de57ad8?w=600',
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote options, and generous PTO.',
    image:
      'https://images.unsplash.com/photo-1683885356374-a57b7e67ae37?w=600',
  },
  {
    title: 'Growth & Learning',
    description: 'Conference budgets, courses, and learning resources.',
    image:
      'https://images.unsplash.com/photo-1542725752-e9f7259b3881?w=600',
  },
  {
    title: 'Team & Social',
    description: 'Team events, retreats, and community activities.',
    image:
      'https://images.unsplash.com/photo-1744891470331-c660191721b5?w=600',
  },
  {
    title: 'Workspace & Tools',
    description: 'Top-tier equipment and a modern, inspiring office.',
    image:
      'https://images.unsplash.com/photo-1765366417030-16d9765d920a?w=600',
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.heading}>
            We Take Care of{' '}
            <span className={styles.highlight}>Our People</span>
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
              initial={{ opacity: 0, y: 40 }}
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
