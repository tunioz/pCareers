'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './GlobalPresence.module.scss';

export function GlobalPresence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const locations = [
    { name: 'Zurich', country: 'Switzerland', type: 'HQ', x: 50, y: 40 },
    { name: 'Luxembourg', country: 'Luxembourg', type: 'Data Center', x: 48, y: 42 },
    { name: 'Dallas', country: 'USA', type: 'Data Center', x: 25, y: 48 },
    { name: 'Singapore', country: 'Singapore', type: 'Office', x: 75, y: 62 },
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
            Built from the heart of Europe. Trusted{' '}
            <span className={styles.highlight}>worldwide.</span>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/about" className={styles.readMore}>
              Read More
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={styles.mapWrapper}>
            <div className={styles.mapBg}>
              <svg viewBox="0 0 1000 500" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1" fill="#ffffff" />
                  </pattern>
                </defs>
                <path d="M 100 80 Q 150 60 200 80 L 220 100 Q 230 120 220 140 L 200 160 Q 180 180 150 180 L 120 170 Q 90 150 100 120 Z" fill="url(#dots)" />
                <path d="M 180 200 Q 200 190 220 200 L 230 250 Q 240 300 220 330 L 200 340 Q 180 330 170 310 L 160 260 Q 165 220 180 200 Z" fill="url(#dots)" />
                <path d="M 400 80 Q 440 70 480 85 L 500 100 Q 510 120 500 140 L 480 150 Q 450 160 420 150 L 395 130 Q 385 105 400 80 Z" fill="url(#dots)" />
                <path d="M 420 160 Q 460 150 500 165 L 520 200 Q 530 260 510 310 L 480 340 Q 450 350 430 340 L 410 310 Q 400 260 405 210 Z" fill="url(#dots)" />
                <path d="M 520 60 Q 600 50 680 70 L 750 90 Q 800 110 820 140 L 840 180 Q 850 220 830 250 L 800 270 Q 760 280 720 270 L 680 250 Q 640 230 600 210 L 560 180 Q 520 150 520 110 Z" fill="url(#dots)" />
                <path d="M 700 300 Q 740 290 780 300 L 800 320 Q 810 340 800 360 L 770 375 Q 740 380 710 370 L 690 350 Q 685 325 700 300 Z" fill="url(#dots)" />
              </svg>
            </div>

            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className={styles.pin}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              >
                <motion.div className={styles.pinGroup} whileHover={{ scale: 1.1 }}>
                  <motion.div
                    className={`${styles.pinLabel} ${location.type === 'HQ' ? styles.pinLabelHQ : styles.pinLabelServer}`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {location.type === 'HQ' ? 'DATA CENTER' : 'ACCELERATING SERVERS'}
                    <div className={`${styles.pinArrow} ${location.type === 'HQ' ? styles.pinArrowHQ : styles.pinArrowServer}`} />
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <div className={styles.pinDot} />
                    <motion.div
                      className={styles.pinPulse}
                      animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>

                  <div className={styles.tooltip}>
                    <div className={styles.tooltipInner}>
                      <div className={styles.tooltipName}>{location.name}</div>
                      <div className={styles.tooltipType}>{location.type}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Serving 22M+ users across 195+ countries from trusted global locations
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
