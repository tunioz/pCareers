'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.label}>ABOUT PCLOUD</div>
          </motion.div>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            13 years. 24 million users. Zero compromises.
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Founded with a mission to empower individuals and businesses with secure, reliable cloud storage solutions that protect privacy and enhance productivity.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link href="/careers" className={styles.primaryButton}>
              See open roles
            </Link>
            <Link href="/culture" className={styles.secondaryButton}>
              Read our story
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className={styles.heroImage} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
