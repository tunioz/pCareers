'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.scss';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export type CookieConsent = 'accepted' | 'rejected';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      // Small delay so the banner slides in rather than appearing instantly
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for a custom event that resets cookie consent (from footer "Cookie Settings")
  useEffect(() => {
    function handleReset() {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setVisible(true);
    }
    window.addEventListener('reset-cookie-consent', handleReset);
    return () => window.removeEventListener('reset-cookie-consent', handleReset);
  }, []);

  const handleChoice = useCallback((choice: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setVisible(false);
  }, []);

  return (
    <div
      className={`${styles.banner} ${visible ? styles.visible : ''}`}
      role="dialog"
      aria-label="Cookie consent"
      aria-hidden={!visible}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          We use cookies to improve your experience. Essential cookies are always
          active. You can accept or reject optional analytics cookies.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnAccept}
            onClick={() => handleChoice('accepted')}
          >
            Accept All
          </button>
          <button
            type="button"
            className={styles.btnReject}
            onClick={() => handleChoice('rejected')}
          >
            Reject All
          </button>
          <Link href="/legal/cookie-policy" className={styles.btnSettings}>
            Cookie Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
