'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Wrench, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './EngineeringProof.module.scss';

const metrics = [
  {
    value: '200+',
    label: 'Deploys per day',
    Icon: Zap,
  },
  {
    value: '85%+',
    label: 'Test coverage on critical paths',
    Icon: Shield,
  },
  {
    value: '20%',
    label: 'Sprint time for tech debt',
    Icon: Wrench,
  },
  {
    value: '25',
    label: 'Max days from application to offer',
    Icon: Clock,
  },
];

export function EngineeringProof() {
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
          <h2 className={styles.title}>Engineering at scale</h2>
          <p className={styles.subtitle}>
            The numbers behind our engineering culture
          </p>
        </motion.div>

        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={styles.metricCard}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.6 }}
            >
              <div className={styles.metricIcon}>
                <metric.Icon size={24} />
              </div>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.links}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="https://github.com/pcloud"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View our GitHub <ArrowRight size={16} />
          </a>
          <Link href="/blog" className={styles.link}>
            Read our engineering blog <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
