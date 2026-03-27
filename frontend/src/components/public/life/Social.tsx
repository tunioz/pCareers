'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import styles from './Social.module.scss';

const socials = [
  { name: 'LinkedIn', Icon: Linkedin, href: 'https://www.linkedin.com/company/pcloud/' },
  { name: 'Twitter', Icon: Twitter, href: 'https://twitter.com/paborcloud' },
  { name: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/pcloud/' },
  { name: 'GitHub', Icon: Github, href: 'https://github.com/pcloud' },
];

export function Social() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Follow Us
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Join our community and stay updated with the latest from pCloud
        </motion.p>

        <div className={styles.icons}>
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.iconCircle}>
                <social.Icon size={32} />
              </div>
              <span className={styles.label}>{social.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
