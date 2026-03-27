'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Manifesto.module.scss';

const values = [
  { title: 'Freedom With Responsibility', description: "We give you the autonomy to make decisions, own your projects, and work in ways that bring out your best. But with freedom comes accountability.", color: '#1EBCC5' },
  { title: 'High Standards Always', description: "Good enough is never good enough at pCloud. We set the bar high because our users trust us with their most important data.", color: '#E6FF00' },
  { title: 'Radical Transparency', description: "Information is shared openly and honestly across all levels. We believe that context enables better decisions, so we default to transparency.", color: '#1EBCC5' },
  { title: 'Impact Over Process', description: "We care about outcomes, not activities. We won't bog you down with unnecessary meetings, reports, or bureaucracy.", color: '#E6FF00' },
];

export function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>What It Means to Be <span className={styles.highlight}>pCloud</span></h2>
        </motion.div>
        <div className={styles.items}>
          {values.map((value, index) => (
            <motion.div key={value.title} className={`${styles.item} ${index % 2 === 1 ? styles.itemReverse : ''}`} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.2, duration: 0.6 }}>
              <motion.div className={styles.colorBlock} style={{ backgroundColor: value.color }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className={styles.colorBlockInner}>
                  <motion.div className={styles.colorBlockNumber} style={{ color: value.color === '#E6FF00' ? '#05183f' : 'white' }} initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}>
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </div>
              </motion.div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{value.title}</h3>
                <p className={styles.itemDescription}>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
