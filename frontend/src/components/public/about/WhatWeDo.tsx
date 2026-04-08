'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './WhatWeDo.module.scss';

const products = [
  { logo: '/images/apps-logo-pcloud.svg', name: 'pCloud Storage', description: 'Seamlessly store, sync, and access your files from any device with our flagship cloud storage platform built for speed and reliability.', image: '/images/apps-bg-pcloud.jpg' },
  { logo: '/images/apps-logo-crypto.svg', name: 'pCloud Encryption', description: 'Military-grade zero-knowledge encryption that ensures only you can access your sensitive files, even we cannot see them.', image: '/images/apps-bg-crypto.jpg' },
  { logo: '/images/apps-logo-pass.svg', name: 'pCloud Pass', description: 'Secure password manager integrated with your cloud storage, protecting your credentials with the same zero-knowledge encryption.', image: '/images/apps-bg-pass.jpg' },
];

export function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} initial={false} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>Cloud storage built on <span className={styles.highlight}>security, privacy, and reliable.</span></h2>
        </motion.div>
        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div key={product.name} className={styles.card} initial={false} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.2, duration: 0.6 }} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <div className={styles.cardImage}>
                <ImageWithFallback src={product.image} alt={product.name} />
                <div className={styles.cardGradient} />
              </div>
              <div className={styles.cardBody}>
                <motion.div className={styles.iconWrapper} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <img src={product.logo} alt={product.name} className={styles.productLogo} />
                </motion.div>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardDescription}>{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
