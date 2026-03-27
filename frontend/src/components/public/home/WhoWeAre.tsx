'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './WhoWeAre.module.scss';

export function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Box 1 - Title */}
          <motion.div
            className={styles.titleBox}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.titleBoxHeading}>
              Who We Are
            </h2>
            <Link href="/about" className={styles.readMoreLink}>
              See how we build
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </Link>
          </motion.div>

          {/* Box 2 - Image */}
          <motion.div
            className={styles.imageBox}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1646153114001-495dfb56506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Modern tech office workspace"
            />
          </motion.div>

          {/* Box 3 - Mission */}
          <motion.div
            className={styles.contentBox}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className={styles.bgDecoration}>
              <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
                <circle cx="125" cy="100" r="70" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="125" cy="100" r="50" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="125" cy="100" r="30" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="125" cy="100" r="10" stroke="white" strokeWidth="3" fill="none" />
                <line x1="125" y1="20" x2="125" y2="180" stroke="white" strokeWidth="2" />
                <line x1="45" y1="100" x2="205" y2="100" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.boxContent}>
              <h3 className={styles.boxTitle}>
                Our Mission
              </h3>
              <p className={styles.boxText}>
                We build the vault where 24 million people keep their most important data &mdash; family photos, business documents, passwords, memories. Every line of code either earns that trust or breaks it.
              </p>
            </div>
          </motion.div>

          {/* Box 4 - Image wide */}
          <motion.div
            className={`${styles.imageBox} ${styles.imageBoxWide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758873269317-51888e824b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Diverse team collaboration"
            />
          </motion.div>

          {/* Box 5 - Vision */}
          <motion.div
            className={`${styles.contentBox} ${styles.contentBoxSmall}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.fullHeightContent}>
              <div className={styles.boxContent}>
                <h3 className={styles.boxTitle}>
                  Our Vision
                </h3>
                <p className={styles.boxText}>
                  Make private, secure cloud storage so good that people choose it over Google and Apple. Not because it&apos;s cheaper &mdash; because it&apos;s better and because their data belongs to them.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 6 - Goals */}
          <motion.div
            className={`${styles.contentBox} ${styles.contentBoxSmall}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className={styles.fullHeightContent}>
              <div className={styles.boxContent}>
                <h3 className={styles.boxTitle}>
                  Our Goals
                </h3>
                <p className={styles.boxText}>
                  Zero-knowledge encryption by default. 99.9% uptime as the minimum, not the target. Infrastructure so reliable that our users never think about it.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
