'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Values.module.scss';

const values = [
  { number: '01', value: 'Trust', description: 'We build trust through transparency, consistency, and always doing what we say.' },
  { number: '02', value: 'Excellence', description: 'We pursue mastery in everything we do and never settle for mediocrity.' },
  { number: '03', value: 'Growth', description: 'We invest in continuous learning and push ourselves beyond comfort zones.' },
  { number: '04', value: 'Privacy', description: "We champion user privacy as a fundamental right, not a feature." },
  { number: '05', value: 'Honesty', description: 'We communicate with candor and integrity in every interaction.' },
  { number: '06', value: 'Ownership', description: 'We take full responsibility for our work and its impact on users.' },
];

export function Values() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>The Principles That Guide Us</h2>
        </motion.div>
        {values.map((item, index) => (
          <motion.div key={item.number} className={styles.valueItem} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.6 }}>
            <div className={styles.valueNumber}>{item.number}</div>
            <div className={styles.valueContent}>
              <h3 className={styles.valueTitle}>{item.value}</h3>
              <p className={styles.valueDescription}>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
