'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';

const SETTING_FIELDS = [
  { key: 'company_name', label: 'Company Name', type: 'text' },
  { key: 'company_description', label: 'Company Description', type: 'textarea' },
  { key: 'contact_email', label: 'Contact Email', type: 'text' },
  { key: 'linkedin_url', label: 'LinkedIn URL', type: 'text' },
  { key: 'twitter_url', label: 'Twitter URL', type: 'text' },
  { key: 'github_url', label: 'GitHub URL', type: 'text' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'text' },
] as const;

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/company')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.data || {});
        }
      })
      .catch(() => showToast('error', 'Failed to load settings'))
      .finally(() => setLoading(false));
  }, [showToast]);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();

      if (data.success) {
        showToast('success', 'Settings saved successfully');
        setSettings(data.data || settings);
      } else {
        showToast('error', data.error || 'Failed to save settings');
      }
    } catch {
      showToast('error', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Settings</h1>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.settingsForm}>
          {SETTING_FIELDS.map((field) => (
            <div key={field.key} className={styles.formGroup}>
              <label className={styles.formLabel}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className={styles.formTextarea}
                  value={settings[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  style={{ minHeight: '100px' }}
                />
              ) : (
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}

          <div className={styles.formActions}>
            <button type="submit" className={styles.btnPrimary} disabled={saving}>
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
