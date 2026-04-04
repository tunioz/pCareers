'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Manifesto.module.scss';

const values = [
  { title: 'Freedom With Responsibility', description: "We give you the autonomy to make decisions, own your projects, and work in ways that bring out your best. But with freedom comes accountability." },
  { title: 'High Standards Always', description: "Good enough is never good enough at pCloud. We set the bar high because our users trust us with their most important data." },
  { title: 'Radical Transparency', description: "Information is shared openly and honestly across all levels. We believe that context enables better decisions, so we default to transparency." },
  { title: 'Impact Over Process', description: "We care about outcomes, not activities. We won't bog you down with unnecessary meetings, reports, or bureaucracy." },
];

export function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        {/* Left: Value rows */}
        <div className={styles.items}>
          {values.map((value, index) => (
            <motion.div key={value.title} className={styles.item} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.5 }}>
              <div className={styles.accent} />
              <div className={styles.number}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{value.title}</h3>
                <p className={styles.itemDescription}>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Heading */}
        <motion.div className={styles.header} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className={styles.heading}>What It Means to Be <span className={styles.highlight}>pCloud</span></h2>
          <p className={styles.headerDescription}>The principles that shape how we work, build, and hold each other accountable every day.</p>
        </motion.div>
      </div>
    </section>
  );
}
