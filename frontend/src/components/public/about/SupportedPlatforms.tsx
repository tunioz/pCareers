'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './SupportedPlatforms.module.scss';

const platforms = [
  { name: 'Web', key: 'Web', icon: '/images/web-ic.svg', href: '/careers', cardClass: styles.cardWeb, linkClass: styles.viewRoleWeb },
  { name: 'iOS', key: 'Ios', icon: '/images/ios-ic.svg', href: '/careers/senior-ios-developer', cardClass: styles.cardIos, linkClass: styles.viewRoleIos },
  { name: 'Android', key: 'Android', icon: '/images/android-ic.svg', href: '/careers', cardClass: styles.cardAndroid, linkClass: styles.viewRoleAndroid },
  { name: 'mac OS', key: 'Macos', icon: '/images/macos-ic.svg', href: '/careers/senior-macos-desktop-developer', cardClass: styles.cardMacos, linkClass: styles.viewRoleMacos },
  { name: 'Windows', key: 'Windows', icon: '/images/win-ic.svg', href: '/careers/senior-windows-desktop-developer', cardClass: styles.cardWindows, linkClass: styles.viewRoleWindows },
  { name: 'Linux', key: 'Linux', icon: '/images/linux-ic.svg', href: '/careers/senior-linux-desktop-developer', cardClass: styles.cardLinux, linkClass: styles.viewRoleLinux },
];

export function SupportedPlatforms() {
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
          <h2 className={styles.title}>
            We hire for <span className={styles.titleHighlight}>every</span> platform
          </h2>
          <p className={styles.subtitle}>
            From kernel-level C to SwiftUI, from Electron to native Windows — our teams build
            for every major platform. Find your stack.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {platforms.map((platform, index) => (
              <Link
                key={platform.key}
                href={platform.href}
                className={styles.cardLink}
              >
                <motion.div
                  className={`${styles.card} ${platform.cardClass}`}
                  initial={false}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.iconBox}>
                    <Image src={platform.icon} alt={platform.name} width={48} height={48} />
                  </div>
                  <h3 className={styles.platformName}>{platform.name}</h3>
                </motion.div>
                <motion.span
                  className={`${styles.viewRole} ${platform.linkClass}`}
                  initial={false}
                  animate={isInView ? { opacity: 0.7 } : {}}
                  transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
                >
                  View role <ArrowRight size={13} />
                </motion.span>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
