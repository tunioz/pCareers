'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ImageWithFallback } from './ImageWithFallback';
import styles from './PageHero.module.scss';

interface PageHeroProps {
  label: string;
  heading: string;
  backgroundImage: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

export function PageHero({ label, heading, backgroundImage, subtitle, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <ImageWithFallback src={backgroundImage} alt="" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <div className={styles.inner}>
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className={styles.label}>{label}</div>
          </motion.div>
          <motion.h1 className={styles.heading} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
            {heading}
          </motion.h1>
          {subtitle && (
            <motion.p className={styles.subtitle} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              {subtitle}
            </motion.p>
          )}
          {(primaryCta || secondaryCta) && (
            <motion.div className={styles.buttons} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              {primaryCta && (
                <Link href={primaryCta.href}>
                  <motion.button className={styles.primaryButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{primaryCta.text}</motion.button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <motion.button className={styles.secondaryButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{secondaryCta.text}</motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
