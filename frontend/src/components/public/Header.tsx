'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Culture', href: '/culture' },
    { name: 'Careers', href: '/careers' },
    { name: 'Life at pCloud', href: '/life' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header
      className={styles.header}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <img src="/images/pcloud-logo-white.svg" alt="pCloud" height={32} />
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : (pathname === link.href || pathname.startsWith(link.href + '/'));
              return (
                <motion.div key={link.name} whileHover={{ y: -2 }}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/careers" className={styles.ctaButton}>
                Join Now
              </Link>
            </motion.div>
          </div>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link, index) => {
                const isActive = link.href === '/' ? pathname === '/' : (pathname === link.href || pathname.startsWith(link.href + '/'));
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className={styles.mobileCta}>
                  Join Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
