'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './AboutHero.module.scss';

export function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="About pCloud"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.label}>ABOUT PCLOUD</div>
          </motion.div>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            We build the world&apos;s most trusted cloud storage.
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Founded with a mission to empower individuals and businesses with secure, reliable cloud storage solutions that protect privacy and enhance productivity.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/careers">
              <motion.button className={styles.primaryButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                See open roles
              </motion.button>
            </Link>
            <Link href="/culture">
              <motion.button className={styles.secondaryButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Read our story
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
