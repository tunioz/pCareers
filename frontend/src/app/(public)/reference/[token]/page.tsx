'use client';

import { useState, useEffect, use } from 'react';
import { CheckCircle } from 'lucide-react';
import styles from '@/components/public/reference/ReferencePage.module.scss';

interface ReferenceInfo {
  id: number;
  candidate_id: number;
  referee_name: string;
  referee_email: string;
  candidate_first_name: string;
  position_title: string;
  status: string;
}

const RATING_DIMENSIONS = [
  { key: 'technical_competence', label: 'Technical Competence' },
  { key: 'reliability', label: 'Reliability' },
  { key: 'communication', label: 'Communication' },
  { key: 'teamwork', label: 'Teamwork' },
  { key: 'initiative', label: 'Initiative' },
];

const RELATIONSHIPS = ['Manager', 'Peer', 'Direct Report', 'Client'];

export default function ReferenceFormPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [info, setInfo] = useState<ReferenceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  // Form state
  const [relationship, setRelationship] = useState('');
  const [durationWorked, setDurationWorked] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [wouldRehire, setWouldRehire] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch(`/api/references/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInfo(data.data);
        } else {
          setPageError(data.error || 'Reference not found');
        }
      })
      .catch(() => setPageError('Failed to load reference'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/references/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referee_relationship: relationship,
          duration_worked: durationWorked,
          technical_competence: ratings.technical_competence,
          reliability: ratings.reliability,
          communication: ratings.communication,
          teamwork: ratings.teamwork,
          initiative: ratings.initiative,
          strengths,
          improvements,
          would_rehire: wouldRehire,
          additional_comments: additionalComments || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        if (data.errors) {
          setFormError(data.errors.map((e: { message: string }) => e.message).join(', '));
        } else {
          setFormError(data.error || 'Failed to submit reference');
        }
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  function wordCount(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.loadingContainer}>Loading...</div>
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.errorContainer}>
            <div className={styles.errorTitle}>Reference Form Unavailable</div>
            <p className={styles.errorText}>{pageError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <CheckCircle size={36} color="#22c55e" />
            </div>
            <h2 className={styles.successTitle}>Thank You!</h2>
            <p className={styles.successText}>
              Your reference for {info?.candidate_first_name} has been submitted successfully.
              The hiring team will review your feedback.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.logo}>
          <img src="/images/pcloud-logo-full.svg" alt="pCloud" />
        </div>

        <h1 className={styles.title}>Reference Form</h1>
        <p className={styles.subtitle}>
          You have been listed as a reference for{' '}
          <span className={styles.candidateInfo}>{info?.candidate_first_name}</span>
          {info?.position_title && (
            <>, who is being considered for the position of{' '}
              <span className={styles.candidateInfo}>{info.position_title}</span>
            </>
          )}.
          <br />
          Your feedback is valued and will be kept confidential. This form takes approximately 10 minutes.
        </p>

        {formError && <div className={styles.error}>{formError}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Your Relationship</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Relationship to candidate <span className={styles.required}>*</span>
              </label>
              <select
                className={styles.select}
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                required
              >
                <option value="">Select relationship...</option>
                {RELATIONSHIPS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Duration worked together <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                value={durationWorked}
                onChange={(e) => setDurationWorked(e.target.value)}
                placeholder="e.g., 2 years, 6 months"
                required
              />
            </div>
          </div>

          {/* Ratings */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Ratings (1-5)</h3>

            {RATING_DIMENSIONS.map((dim) => (
              <div key={dim.key} className={styles.ratingGroup}>
                <div className={styles.ratingLabel}>
                  {dim.label} <span className={styles.required}>*</span>
                </div>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={ratings[dim.key] === v ? styles.ratingStarActive : styles.ratingStar}
                      onClick={() => setRatings((prev) => ({ ...prev, [dim.key]: v }))}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Feedback</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Greatest strengths <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="What are this candidate's greatest professional strengths?"
                required
              />
              <div className={styles.wordCount}>{wordCount(strengths)}/200 words</div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Areas for improvement <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="What areas could this candidate improve in?"
                required
              />
              <div className={styles.wordCount}>{wordCount(improvements)}/200 words</div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Would you hire this person again? <span className={styles.required}>*</span>
              </label>
              <div className={styles.rehireGroup}>
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'with_reservations', label: 'With Reservations' },
                  { value: 'no', label: 'No' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={wouldRehire === opt.value ? styles.rehireOptionActive : styles.rehireOption}
                    onClick={() => setWouldRehire(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Additional comments (optional)</label>
              <textarea
                className={styles.textarea}
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                placeholder="Any other information you would like to share about this candidate..."
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Reference'}
          </button>
        </form>
      </div>
    </div>
  );
}
