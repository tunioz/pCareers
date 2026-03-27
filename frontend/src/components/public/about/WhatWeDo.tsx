'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cloud, Lock, Key } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './WhatWeDo.module.scss';

const products = [
  { icon: Cloud, name: 'pCloud Storage', description: 'Seamlessly store, sync, and access your files from any device with our flagship cloud storage platform built for speed and reliability.', image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=600', color: '#1EBCC5' },
  { icon: Lock, name: 'pCloud Encryption', description: 'Military-grade zero-knowledge encryption that ensures only you can access your sensitive files, even we cannot see them.', image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600', color: '#E6FF00' },
  { icon: Key, name: 'pCloud Pass', description: 'Secure password manager integrated with your cloud storage, protecting your credentials with the same zero-knowledge encryption.', image: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?w=600', color: '#1EBCC5' },
];

export function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className={styles.heading}>Cloud storage built on <span className={styles.highlight}>security, privacy, and reliable.</span></h2>
        </motion.div>
        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div key={product.name} className={styles.card} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.2, duration: 0.6 }} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <div className={styles.cardImage}>
                <ImageWithFallback src={product.image} alt={product.name} />
                <div className={styles.cardGradient} />
              </div>
              <div className={styles.cardBody}>
                <motion.div className={styles.iconWrapper} style={{ backgroundColor: product.color, color: product.color === '#E6FF00' ? '#05183f' : 'white' }} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                  <product.icon size={32} />
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
