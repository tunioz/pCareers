'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './EngineeringPrinciples.module.scss';

const principles = [
  {
    number: '01',
    title: 'Security first',
    description:
      'Every feature, every line of code, every decision starts with security as the foundation.',
  },
  {
    number: '02',
    title: 'Privacy by design',
    description:
      'User privacy is not an afterthought\u2014it is architected into every system from day one.',
  },
  {
    number: '03',
    title: 'Simplicity over complexity',
    description:
      'Simple systems are easier to secure, maintain, and scale. We favor elegance over complexity.',
  },
  {
    number: '04',
    title: 'Reliability at scale',
    description:
      'Build systems that work flawlessly for one user and 24 million users alike.',
  },
  {
    number: '05',
    title: 'Own what you build',
    description:
      'Engineers take full ownership of their code\u2014from conception to deployment to maintenance.',
  },
  {
    number: '06',
    title: 'Build for the long term',
    description:
      'We make decisions that will stand the test of time, not just meet quarterly goals.',
  },
];

export function EngineeringPrinciples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            Our <span className={styles.highlight}>engineering principles</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              className={styles.item}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={styles.numberWrapper}>
                <span className={styles.number}>{principle.number}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{principle.title}</h3>
                <p className={styles.description}>{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
