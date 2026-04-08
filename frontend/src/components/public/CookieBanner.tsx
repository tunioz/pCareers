'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.scss';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export type CookieConsent = 'accepted' | 'rejected';

export function CookieBanner() {
  const [consentGiven, setConsentGiven] = useState(true);
  const [visible, setVisible] = useState(false);

  // Check localStorage on mount to determine if consent has been given
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      // Consent already recorded -- keep banner hidden
      setConsentGiven(true);
      setVisible(false);
    } else {
      // No consent recorded -- show banner after a short delay
      setConsentGiven(false);
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for a custom event that resets cookie consent (from footer "Cookie Settings")
  useEffect(() => {
    function handleReset() {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setConsentGiven(false);
      setVisible(true);
    }
    window.addEventListener('reset-cookie-consent', handleReset);
    return () => window.removeEventListener('reset-cookie-consent', handleReset);
  }, []);

  const handleChoice = useCallback((choice: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setConsentGiven(true);
    setVisible(false);
  }, []);

  // Do not render the banner at all when consent has already been given
  if (consentGiven && !visible) {
    return null;
  }

  return (
    <div
      className={`${styles.banner} ${visible ? styles.visible : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      aria-hidden={!visible}
    >
      <span id="cookie-banner-title" className="visually-hidden">Cookie consent</span>
      <div className={styles.container}>
        <p id="cookie-banner-text" className={styles.text}>
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
