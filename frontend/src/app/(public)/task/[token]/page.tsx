'use client';

import { useState, useEffect, use } from 'react';
import { Upload, CheckCircle, X, Clock } from 'lucide-react';
import styles from '@/components/public/reference/ReferencePage.module.scss';

interface TaskInfo {
  task_title: string;
  task_description: string;
  task_instructions: string;
  deadline: string | null;
  status: string;
}

export default function TaskSubmissionPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [info, setInfo] = useState<TaskInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch(`/api/task-submissions/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInfo(data.data);
        } else {
          setPageError(data.error || 'Task not found');
        }
      })
      .catch(() => setPageError('Failed to load task'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFormError('Please upload your solution file');
      return;
    }
    setFormError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (notes) formData.append('notes', notes);

      const res = await fetch(`/api/task-submissions/${token}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setFormError(data.error || 'Failed to submit task');
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

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
            <div className={styles.errorTitle}>Task Unavailable</div>
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
            <h2 className={styles.successTitle}>Submission Received!</h2>
            <p className={styles.successText}>
              Your solution has been submitted successfully. The team will review it and get back to you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const deadlineDate = info?.deadline ? new Date(info.deadline) : null;
  const isExpiringSoon = deadlineDate && deadlineDate.getTime() - Date.now() < 24 * 60 * 60 * 1000;

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.logo}>
          <img src="/images/pcloud-logo-full.svg" alt="pCloud" />
        </div>

        <h1 className={styles.title}>Technical Task</h1>
        <p className={styles.subtitle}>{info?.task_title}</p>

        {deadlineDate && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '10px', borderRadius: '8px', marginBottom: '24px',
            background: isExpiringSoon ? '#fef2f2' : '#f0fdf4',
            color: isExpiringSoon ? '#dc2626' : '#16a34a',
            fontSize: '13px', fontWeight: 500,
          }}>
            <Clock size={14} />
            Deadline: {deadlineDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        )}

        {formError && <div className={styles.error}>{formError}</div>}

        {/* Task Description */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Description</h3>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {info?.task_description}
          </div>
        </div>

        {/* Instructions */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Instructions</h3>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {info?.task_instructions}
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Submit Your Solution</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Solution file <span className={styles.required}>*</span>
              </label>
              <label style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '24px', border: '2px dashed #d1d5db', borderRadius: '10px',
                cursor: 'pointer', transition: 'border-color 0.2s',
              }}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept=".zip,.tar,.gz,.rar,.pdf,.doc,.docx,.txt,.md,.js,.ts,.py,.go,.java,.c,.cpp,.h"
                />
                {file ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#1f2937', fontWeight: 500 }}>{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setFile(null); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
                    <Upload size={18} />
                    Click to upload your solution (max 20MB)
                  </span>
                )}
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Notes (optional)</label>
              <textarea
                className={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any notes about your approach, assumptions, or things to consider..."
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting || !file}
          >
            {submitting ? 'Submitting...' : 'Submit Solution'}
          </button>
        </form>
      </div>
    </div>
  );
}
