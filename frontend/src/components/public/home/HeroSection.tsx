'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './HeroSection.module.scss';

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div aria-hidden="true" className={styles.background}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt=""
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.wrapper}>
            <div className={styles.grid}>
              <motion.div
                className={styles.textContent}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className={styles.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  CAREER OPPORTUNITIES
                </motion.div>

                <motion.h1
                  className={styles.heading}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  24 million people trust us with their data. We need engineers who take that personally.
                </motion.h1>

                <motion.p
                  className={styles.description}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  We ship code that 24 million people depend on every day. The bar is high. The work is real.
                </motion.p>

                <motion.div
                  className={styles.cta}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Link href="/careers">
                    <motion.button
                      className={styles.ctaButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      See open roles
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
