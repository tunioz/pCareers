'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Smartphone, Monitor, Laptop } from 'lucide-react';
import styles from './SupportedPlatforms.module.scss';

const platforms = [
  { name: 'Web', icon: Globe },
  { name: 'iOS', icon: Smartphone },
  { name: 'Android', icon: Smartphone },
  { name: 'Windows', icon: Monitor },
  { name: 'macOS', icon: Laptop },
  { name: 'Linux', icon: Monitor },
];

export function SupportedPlatforms() {
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
          <h2 className={styles.title}>Everywhere you are</h2>
          <p className={styles.subtitle}>
            Access pCloud from any device, anywhere. We support all major platforms so you&apos;re
            never limited to one operating system. Your files are always within reach.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={styles.iconBox}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={32} />
                </motion.div>
                <h3 className={styles.platformName}>{platform.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
