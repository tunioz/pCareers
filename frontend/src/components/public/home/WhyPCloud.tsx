'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './WhyPCloud.module.scss';

const reasons = [
  {
    icon: '/images/icon-top1.svg',
    title: 'Top 1% Only',
    description: 'Compensation benchmarked to top tier. Culture and impact that drive excellence.',
  },
  {
    icon: '/images/icon-global.svg',
    title: 'Global Impact',
    description: 'Trusted by 24M+ users. Operating in 175+ countries. Storing 500+ petabytes.',
  },
  {
    icon: '/images/icon-swiss.svg',
    title: 'Swiss Quality',
    description: 'Zero-knowledge encryption. Swiss privacy standards. 99.92% uptime track record.',
  },
  {
    icon: '/images/icon-impact.svg',
    title: 'Impact, Not Bureaucracy',
    description: 'We ship fast. You own your impact. Autonomy > process.',
  },
];

export function WhyPCloud() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            Why the <span className={styles.headingHighlight}>top 1%</span> choose pCloud
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className={styles.card}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  width={64}
                  height={64}
                />
              </div>
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <p className={styles.cardDescription}>{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
