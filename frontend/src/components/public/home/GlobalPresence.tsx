'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './GlobalPresence.module.scss';

export function GlobalPresence() {
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
            Built from the heart of Europe. Trusted{' '}
            <span className={styles.highlight}>worldwide.</span>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/about" className={styles.readMore}>
              Read More
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={styles.mapWrapper}>
            <div className={styles.mapBg}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <object
                type="image/svg+xml"
                data="/images/map.svg"
                aria-label="pCloud global server locations"
                className={styles.mapSvg}
              />
            </div>

          </div>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Serving 24M+ users across 175+ countries from trusted global locations
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
