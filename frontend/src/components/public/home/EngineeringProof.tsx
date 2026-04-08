'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './EngineeringProof.module.scss';

const metrics = [
  { value: '200 +', label: 'Deploys per day' },
  { value: '85% +', label: 'Test coverage on critical paths' },
  { value: '20%', label: 'Sprint time for tech debt' },
  { value: '25 days', label: 'Max from application to offer' },
];

export function EngineeringProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className={styles.title}>Engineering at scale</h2>
          <p className={styles.subtitle}>
            The numbers behind our engineering culture
          </p>
        </motion.div>

        <motion.div
          className={styles.statsRow}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className={styles.stat}>
              <div className={styles.statNumber}>{metric.value}</div>
              <div className={styles.statLabel}>{metric.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.links}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <a
            href="https://github.com/pcloud"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View our GitHub
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </a>
          <Link href="/blog" className={styles.link}>
            Read our engineering blog
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
