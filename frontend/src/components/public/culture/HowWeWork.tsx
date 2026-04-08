'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './HowWeWork.module.scss';

const items = [
  {
    title: 'Small Teams, Big Impact',
    description:
      'Autonomous squads that move fast, own their outcomes, and ship meaningful work every week.',
    icon: '/images/small-teams-ic.svg',
  },
  {
    title: 'Ship Fast, Learn Faster',
    description:
      'We iterate rapidly, measure outcomes, and use data to guide our next move.',
    icon: '/images/ship-fast-ic.svg',
  },
  {
    title: 'Context Over Control',
    description:
      'We share context widely so everyone can make great decisions without waiting for approvals.',
    icon: '/images/context-over-control-ic.svg',
  },
  {
    title: 'Cross-Functional Collaboration',
    description:
      'Engineers, designers, and product managers work side by side from day one.',
    icon: '/images/cross-functional-ic.svg',
  },
  {
    title: 'Debate, Decide, Commit',
    description:
      'We encourage healthy debate, but once a decision is made, we commit fully and move forward.',
    icon: '/images/debate-ic.svg',
  },
  {
    title: 'Bias for Action',
    description:
      'We prefer doing over discussing. Progress beats perfection when speed matters.',
    icon: '/images/bias-for-action-ic.svg',
  },
];

export function HowWeWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.heading}>
            Built for <span className={styles.highlight}>Performance</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} alt={item.title} className={styles.iconImg} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
