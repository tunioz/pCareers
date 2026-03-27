'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Smartphone, Monitor, Laptop, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './SupportedPlatforms.module.scss';

const platforms = [
  { name: 'Web', icon: Globe, href: '/careers' },
  { name: 'iOS', icon: Smartphone, href: '/careers/senior-ios-developer' },
  { name: 'Android', icon: Smartphone, href: '/careers' },
  { name: 'Windows', icon: Monitor, href: '/careers/senior-windows-desktop-developer' },
  { name: 'macOS', icon: Laptop, href: '/careers/senior-macos-desktop-developer' },
  { name: 'Linux', icon: Monitor, href: '/careers/senior-linux-desktop-developer' },
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
          <h2 className={styles.title}>We hire for every platform</h2>
          <p className={styles.subtitle}>
            From kernel-level C to SwiftUI, from Electron to native Windows — our teams build
            for every major platform. Find your stack.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Link
                key={platform.name}
                href={platform.href}
                className={styles.cardLink}
              >
                <motion.div
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
                  <span className={styles.viewRole}>
                    View role <ArrowRight size={14} />
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
