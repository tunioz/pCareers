'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Zap, Share2, GitMerge, MessageSquare, Play } from 'lucide-react';
import styles from './HowWeWork.module.scss';

const items = [
  {
    title: 'Small Teams, Big Impact',
    description:
      'Autonomous squads that move fast, own their outcomes, and ship meaningful work every week.',
    icon: Users,
  },
  {
    title: 'Ship Fast, Learn Faster',
    description:
      'We iterate rapidly, measure outcomes, and use data to guide our next move.',
    icon: Zap,
  },
  {
    title: 'Context Over Control',
    description:
      'We share context widely so everyone can make great decisions without waiting for approvals.',
    icon: Share2,
  },
  {
    title: 'Cross-Functional Collaboration',
    description:
      'Engineers, designers, and product managers work side by side from day one.',
    icon: GitMerge,
  },
  {
    title: 'Debate, Decide, Commit',
    description:
      'We encourage healthy debate, but once a decision is made, we commit fully and move forward.',
    icon: MessageSquare,
  },
  {
    title: 'Bias for Action',
    description:
      'We prefer doing over discussing. Progress beats perfection when speed matters.',
    icon: Play,
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.heading}>
            Built for <span className={styles.highlight}>Performance</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={22} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
