'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './TalentCommunity.module.scss';

export function TalentCommunity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [pcloudLink, setPcloudLink] = useState('');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent || !fullName || !email || !pcloudLink) return;
    setSubmitting(true);
    setFormError('');

    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          cover_message: message,
          source: 'Direct',
          portfolio_url: pcloudLink,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setFullName('');
          setEmail('');
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
      {/* Ambient blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />

      <div className={styles.container}>
        {/* Left: motivation */}
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>We&apos;re always looking for talent</span>
          </div>
          <h2 className={styles.title}>
            Don&apos;t see what you&apos;re{' '}
            <span className={styles.highlight}>looking for</span>?
          </h2>
          <p className={styles.subtitle}>
            Just send your details and CV. We review every application and reach out when there&apos;s a match.
          </p>
          <div className={styles.socialProof}>
            <div className={styles.avatarStack}>
              <div className={`${styles.avatar} ${styles.avatarG}`}>G</div>
              <div className={`${styles.avatar} ${styles.avatarA}`}>A</div>
              <div className={`${styles.avatar} ${styles.avatarT}`}>T</div>
              <div className={`${styles.avatar} ${styles.avatarP}`}>P</div>
              <div className={`${styles.avatar} ${styles.avatarN}`}>N</div>
            </div>
            <span className={styles.socialProofText}>
              Join <strong>50+ people</strong> building the future of cloud
            </span>
          </div>
        </motion.div>

        {/* Right: form card */}
        {!submitted ? (
          <motion.div
            className={styles.formCard}
            initial={false}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className={styles.formTitle}>Send your application</div>
            <div className={styles.formSub}>We&apos;ll keep your details on file for future opportunities.</div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {formError && (
                <div className={styles.error}>{formError}</div>
              )}

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Full Name <span className={styles.req}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Email <span className={styles.req}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  CV Link (pCloud) <span className={styles.req}>*</span>
                </label>
                <input
                  type="url"
                  placeholder="Paste your CV link from pCloud"
                  value={pcloudLink}
                  onChange={(e) => setPcloudLink(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  About you <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                  className={styles.textarea}
                />
                {message.length > 0 && (
                  <span className={styles.charCount}>{message.length}/1000</span>
                )}
              </div>

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

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting || !privacyConsent}
              >
                {submitting ? 'Sending...' : 'Send Application'}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className={styles.success}
            initial={false}
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
