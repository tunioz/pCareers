'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Events.module.scss';

const events = [
  {
    title: 'Monthly All-Hands',
    date: 'First Friday of Every Month',
    description:
      'Company-wide meeting where we share updates, celebrate wins, and align on our goals for the upcoming month.',
    image: '/images/all-hands.jpg',
  },
  {
    title: 'Hackathons',
    date: 'Quarterly',
    description:
      '48-hour innovation sprints where teams work on passion projects, experiment with new technologies, and compete for fun prizes.',
    image: '/images/hackathones.jpg',
  },
  {
    title: 'Company Retreat',
    date: 'Annual',
    description:
      'A week-long off-site where the entire company gathers to collaborate, connect, and celebrate our achievements together.',
    image: '/images/retreats.jpg',
  },
  {
    title: 'Team Lunches & Socials',
    date: 'Weekly',
    description:
      'Regular team gatherings for lunch, coffee, or after-work activities to build relationships beyond work.',
    image: '/images/socials.jpg',
  },
];

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Events &amp; Community
        </motion.h2>

        <div className={styles.grid}>
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              className={styles.card}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
            >
              <div className={styles.cardImage}>
                <img src={event.image} alt={event.title} />
              </div>
              <h3 className={styles.cardTitle}>{event.title}</h3>
              <p className={styles.cardDescription}>{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
