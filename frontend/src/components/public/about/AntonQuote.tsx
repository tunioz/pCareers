'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './AntonQuote.module.scss';

export function AntonQuote() {
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
                <span>Building </span>
                <span className={styles.muted}>tomorrow&apos;s</span>
              </h2>
              <h2>
                <span className={styles.muted}>infrastructure</span>
                <span> with</span>
              </h2>
              <h2>
                <span className={styles.muted}>security</span>
                <span> at the </span>
                <span className={styles.highlight}>core</span>
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
                  Every line of code we write is an opportunity to strengthen user trust. Our
                  engineering philosophy is simple: privacy and performance are not trade-offs—they&apos;re requirements.
                </p>
                <p className={styles.quoteAuthor}>Anton Titov, CTO</p>
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
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Anton Titov, CTO"
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
