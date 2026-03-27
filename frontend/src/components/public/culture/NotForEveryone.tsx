'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './NotForEveryone.module.scss';

const cards = [
  {
    ifText: 'If you need constant hand-holding',
    description:
      'We give you ownership, context, and trust. Not micromanagement. If you need someone checking on you every hour, this isn\'t the place.',
  },
  {
    ifText: 'If you prefer politics over code',
    description:
      'We promote based on impact, not office politics. No ladder-climbing. No credit-stealing. Just build great things.',
  },
  {
    ifText: 'If 99.9% uptime is "good enough"',
    description:
      '24 million people depend on us. We obsess over the 0.1%. Every edge case matters. Every failure is personal.',
  },
  {
    ifText: 'If you stop learning after 5pm',
    description:
      'Our best engineers read papers, contribute to open source, and stay curious. Not because we make them \u2014 because they can\'t help it.',
  },
];

export function NotForEveryone() {
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
          <h2 className={styles.heading}>pCloud is not for everyone.</h2>
          <p className={styles.subtitle}>And that&apos;s exactly how we like it.</p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, index) => (
            <motion.div
              key={card.ifText}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className={styles.cardTitle}>
                <span className={styles.ifPrefix}>{card.ifText.split(' ').slice(0, 2).join(' ')}</span>{' '}
                {card.ifText.split(' ').slice(2).join(' ')}
              </h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
