'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar } from 'lucide-react';
import styles from './Timeline.module.scss';

const milestones = [
  { year: '2013', milestone: 'pCloud founded in Switzerland with mission to protect digital privacy' },
  { year: '2015', milestone: 'Reached 1 million users and launched mobile apps for iOS and Android' },
  { year: '2017', milestone: 'Introduced pCloud Encryption with zero-knowledge architecture' },
  { year: '2019', milestone: 'Expanded to 10M+ users and opened data centers in Luxembourg and Dallas' },
  { year: '2021', milestone: 'Achieved 99.92% uptime and launched pCloud Pass password manager' },
  { year: '2023', milestone: 'Surpassed 20M users and 400 petabytes of stored data worldwide' },
  { year: '2026', milestone: 'Serving 22M+ users across 195 countries with 500+ petabytes capacity' },
];

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.bgPattern} />
      <div className={styles.container}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>13+ years of <span className={styles.highlight}>building trust</span></h2>
        </motion.div>
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          <div className={styles.milestones}>
            {milestones.map((item, index) => (
              <motion.div key={item.year} className={`${styles.milestone} ${index % 2 === 1 ? styles.milestoneReverse : ''}`} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.2, duration: 0.6 }}>
                <div className={`${styles.milestoneContent} ${index % 2 === 1 ? styles.milestoneContentRight : ''}`}>
                  <div className={styles.milestoneCard}>
                    <div className={styles.milestoneYear}>{item.year}</div>
                    <p className={styles.milestoneText}>{item.milestone}</p>
                  </div>
                </div>
                <motion.div className={styles.milestoneIcon} initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: index * 0.2 + 0.3, type: 'spring' }} whileHover={{ scale: 1.2, rotate: 360 }}>
                  <Calendar size={28} />
                </motion.div>
                <div className={styles.milestoneSpacer} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
