'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './AboutCTA.module.scss';

export function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={styles.container}>
        <motion.div className={styles.content} initial={false} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>Ready to build something that <span className={styles.highlight}>matters?</span></h2>
          <motion.div className={styles.buttons} initial={false} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
            <Link href="/careers">
              <motion.button className={styles.primaryButton} whileHover={{ scale: 1.05, x: 10 }} whileTap={{ scale: 0.95 }}>View open positions</motion.button>
            </Link>
            <Link href="/culture">
              <motion.button className={styles.secondaryButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Learn More</motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
