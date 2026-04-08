'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
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
            initial={false}
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
                <p className={styles.quoteText}>
                  <motion.img
                    src="/images/left-quote.svg"
                    alt=""
                    className={styles.quoteMark}
                    initial={false}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
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
            initial={false}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/images/anton-titov.jpg"
                alt="Anton Titov, CTO"
                width={800}
                height={900}
              />
            </div>
            <motion.div
              className={styles.verticalLabel}
              initial={false}
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
