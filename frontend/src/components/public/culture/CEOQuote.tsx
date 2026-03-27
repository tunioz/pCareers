'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './CEOQuote.module.scss';

export function CEOQuote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Content */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.heading}>
              <h2>
                <span>Founded </span>
                <span className={styles.muted}>in 2013</span>
                <span>, we</span>
              </h2>
              <h2>
                <span>are </span>
                <span className={styles.muted}>committed</span>
                <span> to the</span>
              </h2>
              <h2>
                <span>world&apos;s leading, </span>
                <span className={styles.muted}>secure,</span>
              </h2>
              <h2>
                <span className={styles.highlight}>cloud storage platform</span>
              </h2>
            </div>

            <div className={styles.quoteBlock}>
              <div className={styles.quoteLine} />
              <div className={styles.quoteContent}>
                <motion.div
                  className={styles.quoteMark}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  &ldquo;
                </motion.div>
                <p className={styles.quoteText}>
                  We are the go-to source for users who want to protect their
                  privacy and control their data.
                </p>
                <p className={styles.quoteAuthor}>Tunio Zafer, CEO</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageWrapper}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800"
                alt="Tunio Zafer, CEO"
              />
            </div>
            <motion.div
              className={styles.verticalLabel}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span>Leadership</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
