'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './TalentCommunity.module.scss';

export function TalentCommunity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [pcloudLink, setPcloudLink] = useState('');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent || !pcloudLink) return;
    setSubmitting(true);
    setFormError('');

    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'General Application',
          email: pcloudLink,
          cover_message: message,
          source: 'Direct',
          portfolio_url: pcloudLink,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setPcloudLink('');
          setMessage('');
          setPrivacyConsent(false);
          setSubmitted(false);
        }, 5000);
      } else {
        setFormError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.bgPattern} />
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            Don&apos;t see what you&apos;re{' '}
            <span className={styles.highlight}>looking for</span>?
          </h2>
          <p className={styles.subtitle}>
            Just send your details and CV.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {formError && (
              <div className={styles.error}>{formError}</div>
            )}

            <div className={styles.fieldGroup}>
              <input
                type="url"
                placeholder="Shared Link in pCloud (paste your CV link) *"
                value={pcloudLink}
                onChange={(e) => setPcloudLink(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <textarea
                placeholder="Tell us about yourself, your experience, and what you're looking for... (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                className={styles.textarea}
                rows={4}
              />
              {message.length > 0 && (
                <span className={styles.charCount}>{message.length}/1000</span>
              )}
            </div>

            <div className={styles.actions}>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.consentText}>
                  I have read and agree to the{' '}
                  <Link href="/legal/privacy-policy">Privacy Policy</Link>
                </span>
              </label>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={submitting || !privacyConsent}
              >
                {submitting ? 'Sending...' : 'Send Application'}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            className={styles.success}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <div className={styles.successIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={40} height={40}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Application Sent!</h3>
            <p>Thank you. We&apos;ll review your details and get back to you.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
