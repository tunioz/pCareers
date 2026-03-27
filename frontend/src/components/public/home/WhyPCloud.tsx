'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Globe, Award, Zap } from 'lucide-react';
import styles from './WhyPCloud.module.scss';

export function WhyPCloud() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: TrendingUp,
      title: 'Top 1% Only',
      description: 'Compensation benchmarked to top tier. Culture and impact that drive excellence.',
      color: '#1EBCC5',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Trusted by 22M+ users. Operating in 195+ countries. Storing 500+ petabytes.',
      color: '#E6FF00',
    },
    {
      icon: Award,
      title: 'Swiss Quality',
      description: 'Zero-knowledge encryption. Swiss privacy standards. 99.92% uptime track record.',
      color: '#1EBCC5',
    },
    {
      icon: Zap,
      title: 'Impact, Not Bureaucracy',
      description: 'We ship fast. You own your impact. Autonomy > process.',
      color: '#E6FF00',
    },
  ];

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <motion.div
                className={styles.cardInner}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={styles.bgAccent}
                  style={{ backgroundColor: reason.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                />

                <div className={styles.cardContent}>
                  <div
                    className={styles.iconWrapper}
                    style={{
                      backgroundColor: reason.color,
                      color: reason.color === '#E6FF00' ? '#05183f' : 'white',
                    }}
                  >
                    <reason.icon size={32} />
                  </div>
                  <h3 className={styles.cardTitle}>{reason.title}</h3>
                  <p className={styles.cardDescription}>{reason.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
