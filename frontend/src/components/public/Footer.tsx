'use client';

import { Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Culture', href: '/culture' },
    { name: 'Careers', href: '/careers' },
    { name: 'Life at pCloud', href: '/life' },
    { name: 'Blog', href: '/blog' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Cookie Policy', href: '/legal/cookie-policy' },
    { name: 'Terms of Use', href: '/legal/terms-of-use' },
    { name: 'Legal Notice', href: '/legal/legal-notice' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/pcloud/' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/paborcloud' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/pcloud/' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/pcloud' },
  ];

  function handleCookieSettings() {
    window.dispatchEvent(new CustomEvent('reset-cookie-consent'));
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <img src="/images/pcloud-logo-white.svg" alt="pCloud" height={28} className={styles.footerLogo} />
            <p className={styles.description}>
              pCloud is a Swiss cloud storage company founded in 2013.
            </p>
          </div>

          <div>
            <h4 className={styles.columnTitle}>
              Navigation
            </h4>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.columnTitle}>
              Legal
            </h4>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className={styles.cookieSettingsButton}
                  onClick={handleCookieSettings}
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.columnTitle}>
              Follow Us
            </h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} pCloud AG. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
