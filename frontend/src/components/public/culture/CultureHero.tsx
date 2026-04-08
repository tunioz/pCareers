'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './CultureHero.module.scss';

export function CultureHero() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.label}>CULTURE AT PCLOUD</div>
          </motion.div>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            Build products that matter. With people who refuse to compromise.
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            We believe great work comes from trust, ownership, and deep focus. Here&apos;s what it&apos;s like to be part of the team.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link href="/careers">
              <button className={styles.primaryButton}>Explore Open Roles</button>
            </Link>
            <Link href="#benefits">
              <button className={styles.secondaryButton}>See Our Benefits</button>
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
