'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Strengths.module.scss';

const cards = [
  {
    title: 'Zero-Knowledge Encryption',
    image: '/images/strength-encryption.jpg',
  },
  {
    title: 'Swiss Privacy Standards',
    image: '/images/strength-swiss.jpg',
  },
  {
    title: '99.92% Uptime',
    image: '/images/strength-uptime.jpg',
  },
  {
    title: 'Top 1% Team',
    image: '/images/strength-team.jpg',
  },
  {
    title: '13+ Years of Innovation',
    image: '/images/strength-innovation.jpg',
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
          initial={false}
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
              initial={false}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={styles.cardImage}>
                <Image src={card.image} alt={card.title} fill sizes="(max-width: 768px) 50vw, 20vw" />
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
