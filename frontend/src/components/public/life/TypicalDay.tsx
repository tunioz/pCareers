'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './TypicalDay.module.scss';

const timeline = [
  {
    time: '9:30 AM',
    badgeClass: 'timeBadgeGreen' as const,
    title: 'Morning Standup',
    description:
      'Quick 15-min async check-in with the storage team. Share blockers, align on sprint goals.',
  },
  {
    time: '11:00 AM',
    badgeClass: 'timeBadgeCyan' as const,
    title: 'Deep Work: Code Review',
    description:
      'Reviewing a critical PR for the sync engine. Two hours of uninterrupted focus \u2014 Slack notifications off.',
  },
  {
    time: '3:00 PM',
    badgeClass: 'timeBadgePurple' as const,
    title: 'Architecture Session',
    description:
      'Whiteboarding a new approach to cross-datacenter replication with the infrastructure team.',
  },
];

export function TypicalDay() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.layout}>
        {/* Left: full-height image */}
        <motion.div
          className={styles.imageCol}
          initial={false}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.imageWrapper}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
              alt="Martin, Backend Engineer"
            />
          </div>
          <div className={styles.overlayCard}>
            <span className={styles.personName}>Martin</span>
            <span className={styles.personTeam}>Backend Engineer</span>
          </div>
        </motion.div>

        {/* Right: coral content */}
        <motion.div
          className={styles.contentCol}
          initial={false}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.contentInner}>
            <h2 className={styles.heading}>A Typical Day at pCloud</h2>

            <div className={styles.timeline}>
              {timeline.map((item, index) => (
                <motion.div
                  key={item.time}
                  className={styles.timelineItem}
                  initial={false}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                >
                  <span
                    className={`${styles.timeBadge} ${styles[item.badgeClass]}`}
                  >
                    {item.time}
                  </span>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineDesc}>{item.description}</p>
                  </div>

                  {/* Curved SVG connector to next item */}
                  {index < timeline.length - 1 && (
                    <svg
                      className={styles.connectorSvg}
                      width="24"
                      height="60"
                      viewBox="0 0 24 60"
                      style={{ top: '100%', marginTop: '-8px' }}
                    >
                      <path
                        className={styles.connectorLine}
                        d="M12 0 C12 20, 12 40, 12 60"
                      />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
