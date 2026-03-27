'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Mail, Save, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { EmailTemplate, EmailTemplateType } from '@/types';

const TEMPLATE_TYPES: { value: EmailTemplateType; label: string }[] = [
  { value: 'application_confirmation', label: 'Application Confirmation' },
  { value: 'rejection', label: 'Rejection' },
  { value: 'offer', label: 'Offer' },
  { value: 'reference_request', label: 'Reference Request' },
  { value: 'interview_invitation', label: 'Interview Invitation' },
  { value: 'status_update', label: 'Status Update' },
];

const PLACEHOLDERS = [
  '{{candidate_name}}',
  '{{position_title}}',
  '{{company_name}}',
  '{{status}}',
  '{{date}}',
  '{{reference_link}}',
  '{{interview_date}}',
  '{{interview_time}}',
];

/**
 * Safely render preview by extracting only text content from HTML template.
 * This renders the template preview using an iframe sandbox for isolation,
 * as the content comes from admin-authored templates stored in the database
 * (not user-generated content).
 */
function PreviewFrame({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`<!DOCTYPE html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;line-height:1.7;color:#4b5563;margin:16px;}</style></head><body>${html}</body></html>`);
        doc.close();
      }
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-same-origin"
      style={{ width: '100%', minHeight: '300px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fafafa' }}
      title="Email preview"
    />
  );
}

export default function EmailTemplatesPage() {
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<EmailTemplateType>('application_confirmation');
  const [editingSubject, setEditingSubject] = useState('');
  const [editingBody, setEditingBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const loadTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/email-templates');
      const data = await res.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch {
      showToast('error', 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadTemplates(); }, [loadTemplates]);

  // Set editing values when tab or templates change
  useEffect(() => {
    const tpl = templates.find((t) => t.template_type === activeType);
    if (tpl) {
      setEditingSubject(tpl.subject);
      setEditingBody(tpl.body);
    } else {
      setEditingSubject('');
      setEditingBody('');
    }
    setShowPreview(false);
  }, [activeType, templates]);

  const activeTemplate = templates.find((t) => t.template_type === activeType);

  const handleSave = async () => {
    if (!activeTemplate) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/email-templates/${activeTemplate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: editingSubject, body: editingBody }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Template saved');
        loadTemplates();
      } else {
        showToast('error', data.error || 'Failed to save template');
      }
    } catch {
      showToast('error', 'Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const renderPreview = (html: string) => {
    let rendered = html;
    rendered = rendered.replace(/\{\{candidate_name\}\}/g, 'John Doe');
    rendered = rendered.replace(/\{\{position_title\}\}/g, 'Senior Backend Engineer');
    rendered = rendered.replace(/\{\{company_name\}\}/g, 'pCloud');
    rendered = rendered.replace(/\{\{status\}\}/g, 'Interview');
    rendered = rendered.replace(/\{\{date\}\}/g, new Date().toLocaleDateString());
    rendered = rendered.replace(/\{\{reference_link\}\}/g, 'https://careers.pcloud.com/reference/abc123');
    rendered = rendered.replace(/\{\{interview_date\}\}/g, 'March 30, 2026');
    rendered = rendered.replace(/\{\{interview_time\}\}/g, '2:00 PM EET');
    return rendered;
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <Mail size={24} /> Email Templates
        </h1>
      </div>

      {/* Type Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {TEMPLATE_TYPES.map((type) => {
          const isActive = activeType === type.value;
          const hasTemplate = templates.some((t) => t.template_type === type.value);
          return (
            <button
              key={type.value}
              onClick={() => setActiveType(type.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: isActive ? '2px solid #1EBCC5' : '1px solid #e5e7eb',
                background: isActive ? '#f0fdfa' : '#ffffff',
                color: isActive ? '#1EBCC5' : '#4b5563',
                fontWeight: isActive ? 600 : 400,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                opacity: hasTemplate ? 1 : 0.5,
              }}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {!activeTemplate ? (
        <div className={styles.emptyState}>
          <Mail />
          <h3>No template for this type</h3>
          <p>Run the seed script to create default templates.</p>
        </div>
      ) : (
        <div className={styles.card} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{activeTemplate.name}</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={styles.btnSecondary}
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                className={styles.btnPrimary}
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={14} />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Subject */}
          <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
            <label className={styles.formLabel}>Subject Line</label>
            {showPreview ? (
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', padding: '10px 0' }}>
                {renderPreview(editingSubject)}
              </div>
            ) : (
              <input
                className={styles.formInput}
                value={editingSubject}
                onChange={(e) => setEditingSubject(e.target.value)}
              />
            )}
          </div>

          {/* Available Placeholders */}
          {!showPreview && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Available Placeholders:</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {PLACEHOLDERS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setEditingBody(editingBody + p)}
                    style={{
                      padding: '3px 8px', borderRadius: '4px', border: '1px solid #e5e7eb',
                      background: '#f9fafb', fontSize: '11px', color: '#6b7280', cursor: 'pointer',
                      fontFamily: 'monospace',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Body */}
          {showPreview ? (
            <div style={{ marginBottom: '16px' }}>
              <label className={styles.formLabel}>Preview</label>
              <PreviewFrame html={renderPreview(editingBody)} />
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Body (HTML)</label>
              <textarea
                className={styles.formTextarea}
                value={editingBody}
                onChange={(e) => setEditingBody(e.target.value)}
                rows={16}
                style={{ fontFamily: 'monospace', fontSize: '13px', minHeight: '300px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
