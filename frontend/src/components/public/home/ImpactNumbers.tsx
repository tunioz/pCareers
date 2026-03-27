'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './ImpactNumbers.module.scss';

export function ImpactNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { number: '24M+', label: 'Users worldwide' },
    { number: '175+', label: 'Countries' },
    { number: '500+', label: 'Petabytes Stored' },
    { number: '13+', label: 'Years of Excellence' },
    { number: '99.92%', label: 'Uptime' },
  ];

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.stat}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <motion.div
                className={styles.number}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
              >
                {stat.number}
              </motion.div>
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
