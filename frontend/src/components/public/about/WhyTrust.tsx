'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Share2, History, RefreshCw, Download, KeyRound } from 'lucide-react';
import styles from './WhyTrust.module.scss';

const features = [
  { title: 'Zero-Knowledge Encryption', description: 'Your files are encrypted end-to-end. Only you hold the encryption keys - not even pCloud can access your data.', icon: Shield },
  { title: 'Secure File Sharing', description: 'Control who accesses your files. Set password protection, expiration dates, and download limits.', icon: Share2 },
  { title: 'File Versioning', description: 'Accidentally deleted something? Restore previous versions of any file from your revision history.', icon: History },
  { title: 'Auto Sync', description: 'Changes sync automatically across all your devices - phone, tablet, desktop. Work seamlessly from anywhere.', icon: RefreshCw },
  { title: 'Offline Access', description: "Download files for offline access. Work without internet and sync automatically when you're back online.", icon: Download },
  { title: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account. Require a second verification method to prevent unauthorized access.', icon: KeyRound },
];

export function WhyTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>Why users trust pCloud</h2>
        </motion.div>
        <div className={styles.grid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} className={styles.feature} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <motion.div className={styles.iconWrapper} whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                  <Icon size={24} />
                </motion.div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
