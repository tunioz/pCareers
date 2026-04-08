'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './WhyTrust.module.scss';

const features = [
  { title: 'Zero-Knowledge Encryption', description: "You'll work with real cryptography — not API wrappers. AES-256, RSA-4096, and encryption architectures that even we can't decrypt.", icon: '/images/zero-knowledge.svg' },
  { title: 'Code Review Culture', description: "Code review is mandatory. Every PR gets at least two sets of eyes. We learn from each other's code, not just review it.", icon: '/images/code-review.svg' },
  { title: 'Tech Debt Investment', description: '20% of every sprint is reserved for tech debt. Non-negotiable. We invest in the codebase because we\'ll be maintaining it for decades.', icon: '/images/tech-debt.svg' },
  { title: 'Ship Fast, Ship Safely', description: 'Deploy 200+ times per day with confidence. Automated testing, staged rollouts, and instant rollback. Ship fast, ship safely.', icon: '/images/ship-fast.svg' },
  { title: 'Deep Work Culture', description: 'No micromanagement. Deep work blocks are protected. Async-first communication. You own your schedule and your output.', icon: '/images/deep-work.svg' },
  { title: 'End-to-End Ownership', description: 'You design it, build it, ship it, and monitor it. No throwing code over the wall.', icon: '/images/end-to-end.svg' },
];

export function WhyTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.bgImage} />
      <div className={styles.container}>
        <motion.div className={styles.header} initial={false} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>Why engineers trust <span className={styles.highlight}>pCloud</span></h2>
        </motion.div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
              <motion.div key={feature.title} className={styles.feature} initial={false} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className={styles.iconWrapper}>
                  <Image src={feature.icon} alt={feature.title} width={48} height={48} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
