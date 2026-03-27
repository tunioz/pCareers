'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Star,
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import FileUpload from '@/components/admin/FileUpload';
import styles from '@/styles/admin.module.scss';
import type {
  InterviewStage,
  InterviewTemplateWithStages,
  CandidateValue,
  PCloudBarCriterion,
  ProcessStep,
  ProcessTemplateWithSteps,
  DefaultBenefit,
} from '@/types';

// ---------------------------------------------------------------------------
// Icon options for interview stages
// ---------------------------------------------------------------------------
const STAGE_ICONS = [
  'Phone', 'FileText', 'Code', 'Layers', 'Heart', 'Award',
  'Briefcase', 'Target', 'Users', 'GraduationCap', 'CheckCircle',
  'Gift', 'Zap', 'Clock',
] as const;

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------
type TabKey = 'templates' | 'values' | 'pcloud-bar' | 'process' | 'benefits';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'templates', label: 'Interview Templates' },
  { key: 'values', label: 'Candidate Values' },
  { key: 'pcloud-bar', label: 'pCloud Bar' },
  { key: 'process', label: 'Working Process' },
  { key: 'benefits', label: 'Default Benefits' },
];

// ============================================================================
// Main Page
// ============================================================================
export default function HiringContentPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('templates');

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Hiring Content</h1>
      </div>

      <div className={styles.card}>
        {/* Tab bar */}
        <div className={styles.hcTabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.hcTab} ${activeTab === tab.key ? styles.hcTabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '24px' }}>
          {activeTab === 'templates' && <InterviewTemplatesTab />}
          {activeTab === 'values' && <CandidateValuesTab />}
          {activeTab === 'pcloud-bar' && <PCloudBarTab />}
          {activeTab === 'process' && <WorkingProcessTab />}
          {activeTab === 'benefits' && <DefaultBenefitsTab />}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Tab 1: Interview Templates
// ============================================================================

interface StageFormData {
  id?: number;
  stage_number: number;
  title: string;
  duration: string;
  description: string;
  focus: string;
  timeline: string;
  icon: string;
  _isNew?: boolean;
}

interface TemplateFormData {
  id?: number;
  name: string;
  description: string;
  overall_timeline: string;
  overall_label: string;
  feedback_label: string;
  subtitle: string;
  is_default: number;
  stages: StageFormData[];
}

function InterviewTemplatesTab() {
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<InterviewTemplateWithStages[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | 'new' | null>(null);
  const [formData, setFormData] = useState<TemplateFormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'template'; id: number } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/interview-templates');
      const json = await res.json();
      if (json.success) {
        setTemplates(json.data);
      }
    } catch {
      showToast('error', 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const startEdit = (template: InterviewTemplateWithStages) => {
    setExpandedId(template.id);
    setFormData({
      id: template.id,
      name: template.name,
      description: template.description || '',
      overall_timeline: template.overall_timeline,
      overall_label: template.overall_label,
      feedback_label: template.feedback_label,
      subtitle: template.subtitle || '',
      is_default: template.is_default,
      stages: template.stages.map((s) => ({
        id: s.id,
        stage_number: s.stage_number,
        title: s.title,
        duration: s.duration,
        description: s.description,
        focus: s.focus,
        timeline: s.timeline,
        icon: s.icon,
      })),
    });
  };

  const startNew = () => {
    setExpandedId('new');
    setFormData({
      name: '',
      description: '',
      overall_timeline: '2-4 weeks',
      overall_label: 'From application to offer decision',
      feedback_label: 'At each stage to all candidates',
      subtitle: '',
      is_default: 0,
      stages: [],
    });
  };

  const cancelEdit = () => {
    setExpandedId(null);
    setFormData(null);
  };

  const updateFormField = (field: keyof Omit<TemplateFormData, 'stages'>, value: string | number) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const updateStage = (index: number, field: keyof StageFormData, value: string | number) => {
    if (!formData) return;
    const stages = [...formData.stages];
    stages[index] = { ...stages[index], [field]: value };
    setFormData({ ...formData, stages });
  };

  const addStage = () => {
    if (!formData) return;
    const nextNumber = formData.stages.length > 0
      ? Math.max(...formData.stages.map((s) => s.stage_number)) + 1
      : 1;
    setFormData({
      ...formData,
      stages: [
        ...formData.stages,
        {
          stage_number: nextNumber,
          title: '',
          duration: '',
          description: '',
          focus: '',
          timeline: '',
          icon: 'Phone',
          _isNew: true,
        },
      ],
    });
  };

  const removeStage = (index: number) => {
    if (!formData) return;
    const stages = formData.stages.filter((_, i) => i !== index);
    // Re-number
    stages.forEach((s, i) => { s.stage_number = i + 1; });
    setFormData({ ...formData, stages });
  };

  const moveStage = (index: number, direction: 'up' | 'down') => {
    if (!formData) return;
    const stages = [...formData.stages];
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= stages.length) return;
    [stages[index], stages[swapIdx]] = [stages[swapIdx], stages[index]];
    stages.forEach((s, i) => { s.stage_number = i + 1; });
    setFormData({ ...formData, stages });
  };

  const saveTemplate = async () => {
    if (!formData) return;
    if (!formData.name.trim()) {
      showToast('error', 'Template name is required');
      return;
    }

    setSaving(true);
    try {
      const isNew = !formData.id;
      const templateBody = {
        name: formData.name,
        description: formData.description || null,
        overall_timeline: formData.overall_timeline,
        overall_label: formData.overall_label,
        feedback_label: formData.feedback_label,
        subtitle: formData.subtitle || null,
        is_default: formData.is_default,
        is_published: 1,
      };

      let templateId: number;

      if (isNew) {
        const res = await fetch('/api/interview-templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateBody),
        });
        const json = await res.json();
        if (!json.success) {
          showToast('error', json.error || 'Failed to create template');
          return;
        }
        templateId = json.data.id;
      } else {
        templateId = formData.id!;
        const res = await fetch(`/api/interview-templates/${templateId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateBody),
        });
        const json = await res.json();
        if (!json.success) {
          showToast('error', json.error || 'Failed to update template');
          return;
        }
      }

      // Sync stages: fetch existing, compare, create/update/delete
      const existingStagesRes = await fetch(`/api/interview-stages?template_id=${templateId}`);
      const existingStagesJson = await existingStagesRes.json();
      const existingStages: InterviewStage[] = existingStagesJson.success ? existingStagesJson.data : [];

      const formStageIds = new Set(formData.stages.filter((s) => s.id).map((s) => s.id!));
      const stagesToDelete = existingStages.filter((s) => !formStageIds.has(s.id));

      // Delete removed stages
      for (const stage of stagesToDelete) {
        await fetch(`/api/interview-stages/${stage.id}`, { method: 'DELETE' });
      }

      // Create or update stages
      for (const stage of formData.stages) {
        const stageBody = {
          template_id: templateId,
          stage_number: stage.stage_number,
          title: stage.title,
          duration: stage.duration,
          description: stage.description,
          focus: stage.focus,
          timeline: stage.timeline,
          icon: stage.icon,
          is_published: 1,
        };

        if (stage.id && !stage._isNew) {
          await fetch(`/api/interview-stages/${stage.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stageBody),
          });
        } else {
          await fetch('/api/interview-stages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stageBody),
          });
        }
      }

      // Reorder
      if (formData.stages.length > 0) {
        const reorderRes = await fetch(`/api/interview-stages?template_id=${templateId}`);
        const reorderJson = await reorderRes.json();
        if (reorderJson.success && reorderJson.data.length > 0) {
          await fetch('/api/interview-stages/reorder', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: reorderJson.data.map((s: InterviewStage, i: number) => ({
                id: s.id,
                stage_number: i + 1,
              })),
            }),
          });
        }
      }

      showToast('success', isNew ? 'Template created' : 'Template updated');
      cancelEdit();
      fetchTemplates();
    } catch {
      showToast('error', 'Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/interview-templates/${deleteTarget.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Template deleted');
        if (expandedId === deleteTarget.id) cancelEdit();
        fetchTemplates();
      } else {
        showToast('error', json.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete template');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          Manage interview process templates. Each template contains a series of stages shown on the Role Preview page.
        </p>
        <button className={styles.btnPrimary} onClick={startNew} disabled={expandedId === 'new'}>
          <Plus size={16} /> Add Template
        </button>
      </div>

      {/* New template form */}
      {expandedId === 'new' && formData && (
        <div className={styles.hcExpandedCard} style={{ marginBottom: '16px' }}>
          <TemplateForm
            formData={formData}
            onUpdateField={updateFormField}
            onUpdateStage={updateStage}
            onAddStage={addStage}
            onRemoveStage={removeStage}
            onMoveStage={moveStage}
            onSave={saveTemplate}
            onCancel={cancelEdit}
            saving={saving}
            isNew
          />
        </div>
      )}

      {/* Existing templates */}
      {templates.length === 0 && expandedId !== 'new' && (
        <div className={styles.emptyState}>
          <h3>No interview templates</h3>
          <p>Create your first template to define interview stages for job positions.</p>
        </div>
      )}

      {templates.map((template) => (
        <div key={template.id} className={styles.hcExpandedCard} style={{ marginBottom: '12px' }}>
          {/* Collapsed header */}
          <div
            className={styles.hcCardHeader}
            onClick={() => expandedId === template.id ? cancelEdit() : startEdit(template)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{template.name}</span>
              {template.is_default === 1 && (
                <span className={styles.badgeBlue}>
                  <Star size={12} style={{ marginRight: '4px' }} /> Default
                </span>
              )}
              <span className={styles.badgeGray}>
                {template.stages.length} stage{template.stages.length !== 1 ? 's' : ''}
              </span>
              {template.description && (
                <span style={{ fontSize: '13px', color: '#6c757d' }}>{template.description}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                className={`${styles.btnDanger} ${styles.btnSmall}`}
                onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'template', id: template.id }); }}
              >
                <Trash2 size={14} />
              </button>
              {expandedId === template.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {/* Expanded edit form */}
          {expandedId === template.id && formData && (
            <div style={{ padding: '20px', borderTop: '1px solid #e9ecef' }}>
              <TemplateForm
                formData={formData}
                onUpdateField={updateFormField}
                onUpdateStage={updateStage}
                onAddStage={addStage}
                onRemoveStage={removeStage}
                onMoveStage={moveStage}
                onSave={saveTemplate}
                onCancel={cancelEdit}
                saving={saving}
                isNew={false}
              />
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Template"
        message="Are you sure you want to delete this interview template and all its stages? Jobs using this template will be unlinked."
        confirmLabel="Delete"
        onConfirm={handleDeleteTemplate}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Template Form (shared between new and edit)
// ---------------------------------------------------------------------------
interface TemplateFormProps {
  formData: TemplateFormData;
  onUpdateField: (field: keyof Omit<TemplateFormData, 'stages'>, value: string | number) => void;
  onUpdateStage: (index: number, field: keyof StageFormData, value: string | number) => void;
  onAddStage: () => void;
  onRemoveStage: (index: number) => void;
  onMoveStage: (index: number, direction: 'up' | 'down') => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew: boolean;
}

function TemplateForm({
  formData,
  onUpdateField,
  onUpdateStage,
  onAddStage,
  onRemoveStage,
  onMoveStage,
  onSave,
  onCancel,
  saving,
  isNew,
}: TemplateFormProps) {
  return (
    <div>
      <div style={{ display: 'grid', gap: '16px' }}>
        {/* Row 1: Name, Description */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name *</label>
            <input
              className={styles.formInput}
              value={formData.name}
              onChange={(e) => onUpdateField('name', e.target.value)}
              placeholder="e.g. Engineering Process"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <input
              className={styles.formInput}
              value={formData.description}
              onChange={(e) => onUpdateField('description', e.target.value)}
              placeholder="Brief description"
            />
          </div>
        </div>

        {/* Row 2: Overall Timeline, Overall Label, Feedback Label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Overall Timeline</label>
            <input
              className={styles.formInput}
              value={formData.overall_timeline}
              onChange={(e) => onUpdateField('overall_timeline', e.target.value)}
              placeholder="2-4 weeks"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Overall Label</label>
            <input
              className={styles.formInput}
              value={formData.overall_label}
              onChange={(e) => onUpdateField('overall_label', e.target.value)}
              placeholder="From application to offer decision"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Feedback Label</label>
            <input
              className={styles.formInput}
              value={formData.feedback_label}
              onChange={(e) => onUpdateField('feedback_label', e.target.value)}
              placeholder="At each stage to all candidates"
            />
          </div>
        </div>

        {/* Row 3: Subtitle */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Subtitle</label>
          <textarea
            className={styles.formTextarea}
            value={formData.subtitle}
            onChange={(e) => onUpdateField('subtitle', e.target.value)}
            placeholder="Subtitle text shown below the section heading"
            style={{ minHeight: '60px' }}
          />
        </div>

        {/* Is Default */}
        <label className={styles.formCheckbox}>
          <input
            type="checkbox"
            checked={formData.is_default === 1}
            onChange={(e) => onUpdateField('is_default', e.target.checked ? 1 : 0)}
          />
          <label>Default template (used when a job has no template assigned)</label>
        </label>

        {/* Stages section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#343a40' }}>
              Stages ({formData.stages.length})
            </h3>
            <button className={`${styles.btnSecondary} ${styles.btnSmall}`} onClick={onAddStage} type="button">
              <Plus size={14} /> Add Stage
            </button>
          </div>

          {formData.stages.length === 0 && (
            <p style={{ fontSize: '13px', color: '#adb5bd', textAlign: 'center', padding: '20px 0' }}>
              No stages yet. Click &quot;Add Stage&quot; to add the first stage.
            </p>
          )}

          {formData.stages.map((stage, idx) => (
            <div key={idx} className={styles.hcStageRow}>
              <div className={styles.hcStageHandle}>
                <GripVertical size={16} color="#adb5bd" />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6c757d' }}>#{stage.stage_number}</span>
              </div>

              <div style={{ flex: 1, display: 'grid', gap: '8px' }}>
                {/* Stage row 1: Title, Duration, Icon */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                  <input
                    className={styles.formInput}
                    value={stage.title}
                    onChange={(e) => onUpdateStage(idx, 'title', e.target.value)}
                    placeholder="Stage title"
                  />
                  <input
                    className={styles.formInput}
                    value={stage.duration}
                    onChange={(e) => onUpdateStage(idx, 'duration', e.target.value)}
                    placeholder="e.g. 30 min"
                  />
                  <select
                    className={styles.formSelect}
                    value={stage.icon}
                    onChange={(e) => onUpdateStage(idx, 'icon', e.target.value)}
                  >
                    {STAGE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                {/* Stage row 2: Description, Focus, Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <input
                    className={styles.formInput}
                    value={stage.description}
                    onChange={(e) => onUpdateStage(idx, 'description', e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    className={styles.formInput}
                    value={stage.focus}
                    onChange={(e) => onUpdateStage(idx, 'focus', e.target.value)}
                    placeholder="Focus area"
                  />
                  <input
                    className={styles.formInput}
                    value={stage.timeline}
                    onChange={(e) => onUpdateStage(idx, 'timeline', e.target.value)}
                    placeholder="e.g. Day 1-2"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                  onClick={() => onMoveStage(idx, 'up')}
                  disabled={idx === 0}
                  type="button"
                  title="Move up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                  onClick={() => onMoveStage(idx, 'down')}
                  disabled={idx === formData.stages.length - 1}
                  type="button"
                  title="Move down"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                  onClick={() => onRemoveStage(idx)}
                  type="button"
                  title="Remove stage"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.formActions}>
        <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : isNew ? 'Create Template' : 'Update Template'}
        </button>
        <button className={styles.btnSecondary} onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Tab 2: Candidate Values
// ============================================================================
function CandidateValuesTab() {
  const { showToast } = useToast();
  const [items, setItems] = useState<CandidateValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Partial<CandidateValue> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/candidate-values');
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch {
      showToast('error', 'Failed to load candidate values');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const startNew = () => {
    setEditItem({ title: '', description: '', image: '', sort_order: items.length });
  };

  const startEdit = (item: CandidateValue) => {
    setEditItem({ ...item });
  };

  const cancelEdit = () => setEditItem(null);

  const saveItem = async () => {
    if (!editItem) return;
    if (!editItem.title?.trim() || !editItem.description?.trim()) {
      showToast('error', 'Title and description are required');
      return;
    }

    setSaving(true);
    try {
      const isNew = !editItem.id;
      const url = isNew ? '/api/candidate-values' : `/api/candidate-values/${editItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editItem.title,
          description: editItem.description,
          image: editItem.image || null,
          sort_order: editItem.sort_order ?? 0,
          is_published: 1,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('success', isNew ? 'Value created' : 'Value updated');
        cancelEdit();
        fetchItems();
      } else {
        showToast('error', json.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/candidate-values/${deleteTarget}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Value deleted');
        fetchItems();
      } else {
        showToast('error', json.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const moveItem = async (idx: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newItems.length) return;
    [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];

    // Update sort_order via API
    try {
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].sort_order !== i) {
          await fetch(`/api/candidate-values/${newItems[i].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sort_order: i }),
          });
        }
      }
      fetchItems();
    } catch {
      showToast('error', 'Failed to reorder');
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          Define what you value in candidates. These cards appear on the Role Preview page.
        </p>
        <button className={styles.btnPrimary} onClick={startNew}>
          <Plus size={16} /> Add Value
        </button>
      </div>

      {/* Edit/New modal-like form */}
      {editItem && (
        <div className={styles.hcExpandedCard} style={{ marginBottom: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
            {editItem.id ? 'Edit Value' : 'New Value'}
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title *</label>
              <input
                className={styles.formInput}
                value={editItem.title || ''}
                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                placeholder="e.g. Problem-Solving Skills"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                className={styles.formTextarea}
                value={editItem.description || ''}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                placeholder="Description of this value"
                style={{ minHeight: '80px' }}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Image</label>
              <FileUpload
                value={editItem.image || null}
                onChange={(url) => setEditItem({ ...editItem, image: url || '' })}
                subDir="images"
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} onClick={saveItem} disabled={saving}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button className={styles.btnSecondary} onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 && !editItem && (
        <div className={styles.emptyState}>
          <h3>No candidate values</h3>
          <p>Add values that you look for in candidates.</p>
        </div>
      )}

      {items.map((item, idx) => (
        <div key={item.id} className={styles.hcListItem}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                onClick={() => moveItem(idx, 'up')}
                disabled={idx === 0}
                title="Move up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                onClick={() => moveItem(idx, 'down')}
                disabled={idx === items.length - 1}
                title="Move down"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
            )}
            <div>
              <strong style={{ fontSize: '14px' }}>{item.title}</strong>
              <p style={{ fontSize: '13px', color: '#6c757d', margin: 0 }}>{item.description}</p>
            </div>
          </div>
          <div className={styles.tableActions}>
            <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => startEdit(item)}>Edit</button>
            <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => setDeleteTarget(item.id)} style={{ color: '#ef4444' }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Candidate Value"
        message="Are you sure you want to delete this candidate value?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}

// ============================================================================
// Tab 3: pCloud Bar
// ============================================================================
function PCloudBarTab() {
  const { showToast } = useToast();
  const [items, setItems] = useState<PCloudBarCriterion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Partial<PCloudBarCriterion> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/pcloud-bar');
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch {
      showToast('error', 'Failed to load pCloud bar criteria');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const startNew = () => {
    setEditItem({ title: '', description: '', sort_order: items.length });
  };

  const startEdit = (item: PCloudBarCriterion) => {
    setEditItem({ ...item });
  };

  const cancelEdit = () => setEditItem(null);

  const saveItem = async () => {
    if (!editItem) return;
    if (!editItem.title?.trim() || !editItem.description?.trim()) {
      showToast('error', 'Title and description are required');
      return;
    }

    setSaving(true);
    try {
      const isNew = !editItem.id;
      const url = isNew ? '/api/pcloud-bar' : `/api/pcloud-bar/${editItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editItem.title,
          description: editItem.description,
          sort_order: editItem.sort_order ?? 0,
          is_published: 1,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('success', isNew ? 'Criterion created' : 'Criterion updated');
        cancelEdit();
        fetchItems();
      } else {
        showToast('error', json.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/pcloud-bar/${deleteTarget}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Criterion deleted');
        fetchItems();
      } else {
        showToast('error', json.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const moveItem = async (idx: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newItems.length) return;
    [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];

    try {
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].sort_order !== i) {
          await fetch(`/api/pcloud-bar/${newItems[i].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sort_order: i }),
          });
        }
      }
      fetchItems();
    } catch {
      showToast('error', 'Failed to reorder');
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          Manage &quot;The pCloud Bar&quot; criteria shown on Role Preview pages.
        </p>
        <button className={styles.btnPrimary} onClick={startNew}>
          <Plus size={16} /> Add Criterion
        </button>
      </div>

      {editItem && (
        <div className={styles.hcExpandedCard} style={{ marginBottom: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
            {editItem.id ? 'Edit Criterion' : 'New Criterion'}
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title *</label>
              <input
                className={styles.formInput}
                value={editItem.title || ''}
                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                placeholder="e.g. Technical Excellence"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                className={styles.formTextarea}
                value={editItem.description || ''}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                placeholder="Description"
                style={{ minHeight: '80px' }}
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} onClick={saveItem} disabled={saving}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button className={styles.btnSecondary} onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 && !editItem && (
        <div className={styles.emptyState}>
          <h3>No pCloud Bar criteria</h3>
          <p>Add criteria that define your hiring bar.</p>
        </div>
      )}

      {items.map((item, idx) => (
        <div key={item.id} className={styles.hcListItem}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                onClick={() => moveItem(idx, 'up')}
                disabled={idx === 0}
                title="Move up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                onClick={() => moveItem(idx, 'down')}
                disabled={idx === items.length - 1}
                title="Move down"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            <div>
              <strong style={{ fontSize: '14px' }}>{item.title}</strong>
              <p style={{ fontSize: '13px', color: '#6c757d', margin: 0 }}>{item.description}</p>
            </div>
          </div>
          <div className={styles.tableActions}>
            <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => startEdit(item)}>Edit</button>
            <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => setDeleteTarget(item.id)} style={{ color: '#ef4444' }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Criterion"
        message="Are you sure you want to delete this pCloud Bar criterion?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}

// ============================================================================
// Tab 4: Working Process
// ============================================================================
// ---------------------------------------------------------------------------
// Process Step Form Data (for template-based working process)
// ---------------------------------------------------------------------------
interface ProcessStepFormData {
  id?: number;
  step_number: number;
  label: string;
  detail: string;
  _isNew?: boolean;
}

interface ProcessTemplateFormData {
  id?: number;
  name: string;
  description: string;
  intro_text: string;
  is_default: number;
  steps: ProcessStepFormData[];
}

function WorkingProcessTab() {
  const { showToast } = useToast();
  const [templates, setTemplates] = useState<ProcessTemplateWithSteps[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | 'new' | null>(null);
  const [formData, setFormData] = useState<ProcessTemplateFormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'template'; id: number } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/process-templates');
      const json = await res.json();
      if (json.success) {
        setTemplates(json.data);
      }
    } catch {
      showToast('error', 'Failed to load process templates');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const startEdit = (template: ProcessTemplateWithSteps) => {
    setExpandedId(template.id);
    setFormData({
      id: template.id,
      name: template.name,
      description: template.description || '',
      intro_text: template.intro_text || '',
      is_default: template.is_default,
      steps: template.steps.map((s) => ({
        id: s.id,
        step_number: s.step_number,
        label: s.label,
        detail: s.detail,
      })),
    });
  };

  const startNew = () => {
    setExpandedId('new');
    setFormData({
      name: '',
      description: '',
      intro_text: '',
      is_default: 0,
      steps: [],
    });
  };

  const cancelEdit = () => {
    setExpandedId(null);
    setFormData(null);
  };

  const updateFormField = (field: keyof Omit<ProcessTemplateFormData, 'steps'>, value: string | number) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const updateStep = (index: number, field: keyof ProcessStepFormData, value: string | number) => {
    if (!formData) return;
    const steps = [...formData.steps];
    steps[index] = { ...steps[index], [field]: value };
    setFormData({ ...formData, steps });
  };

  const addStep = () => {
    if (!formData) return;
    const nextNumber = formData.steps.length > 0
      ? Math.max(...formData.steps.map((s) => s.step_number)) + 1
      : 1;
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          step_number: nextNumber,
          label: '',
          detail: '',
          _isNew: true,
        },
      ],
    });
  };

  const removeStep = (index: number) => {
    if (!formData) return;
    const steps = formData.steps.filter((_, i) => i !== index);
    // Re-number
    steps.forEach((s, i) => { s.step_number = i + 1; });
    setFormData({ ...formData, steps });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (!formData) return;
    const steps = [...formData.steps];
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= steps.length) return;
    [steps[index], steps[swapIdx]] = [steps[swapIdx], steps[index]];
    steps.forEach((s, i) => { s.step_number = i + 1; });
    setFormData({ ...formData, steps });
  };

  const saveTemplate = async () => {
    if (!formData) return;
    if (!formData.name.trim()) {
      showToast('error', 'Template name is required');
      return;
    }

    setSaving(true);
    try {
      const isNew = !formData.id;
      const templateBody = {
        name: formData.name,
        description: formData.description || null,
        intro_text: formData.intro_text || null,
        is_default: formData.is_default,
        is_published: 1,
      };

      let templateId: number;

      if (isNew) {
        const res = await fetch('/api/process-templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateBody),
        });
        const json = await res.json();
        if (!json.success) {
          showToast('error', json.error || 'Failed to create template');
          return;
        }
        templateId = json.data.id;
      } else {
        templateId = formData.id!;
        const res = await fetch(`/api/process-templates/${templateId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateBody),
        });
        const json = await res.json();
        if (!json.success) {
          showToast('error', json.error || 'Failed to update template');
          return;
        }
      }

      // Sync steps: fetch existing, compare, create/update/delete
      const existingStepsRes = await fetch(`/api/process-steps?template_id=${templateId}`);
      const existingStepsJson = await existingStepsRes.json();
      const existingSteps: ProcessStep[] = existingStepsJson.success ? existingStepsJson.data : [];

      const formStepIds = new Set(formData.steps.filter((s) => s.id).map((s) => s.id!));
      const stepsToDelete = existingSteps.filter((s) => !formStepIds.has(s.id));

      // Delete removed steps
      for (const step of stepsToDelete) {
        await fetch(`/api/process-steps/${step.id}`, { method: 'DELETE' });
      }

      // Create or update steps
      for (const step of formData.steps) {
        const stepBody = {
          template_id: templateId,
          step_number: step.step_number,
          label: step.label,
          detail: step.detail,
          is_published: 1,
        };

        if (step.id && !step._isNew) {
          await fetch(`/api/process-steps/${step.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stepBody),
          });
        } else {
          await fetch('/api/process-steps', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stepBody),
          });
        }
      }

      // Reorder
      if (formData.steps.length > 0) {
        const reorderRes = await fetch(`/api/process-steps?template_id=${templateId}`);
        const reorderJson = await reorderRes.json();
        if (reorderJson.success && reorderJson.data.length > 0) {
          await fetch('/api/process-steps/reorder', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: reorderJson.data.map((s: ProcessStep, i: number) => ({
                id: s.id,
                step_number: i + 1,
              })),
            }),
          });
        }
      }

      showToast('success', isNew ? 'Template created' : 'Template updated');
      cancelEdit();
      fetchTemplates();
    } catch {
      showToast('error', 'Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/process-templates/${deleteTarget.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Template deleted');
        if (expandedId === deleteTarget.id) cancelEdit();
        fetchTemplates();
      } else {
        showToast('error', json.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete template');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          Manage working process templates. Each template contains steps shown in the &quot;Working Process Highlights&quot; section on Role Preview pages.
        </p>
        <button className={styles.btnPrimary} onClick={startNew} disabled={expandedId === 'new'}>
          <Plus size={16} /> Add Template
        </button>
      </div>

      {/* New template form */}
      {expandedId === 'new' && formData && (
        <div className={styles.hcExpandedCard} style={{ marginBottom: '16px' }}>
          <ProcessTemplateForm
            formData={formData}
            onUpdateField={updateFormField}
            onUpdateStep={updateStep}
            onAddStep={addStep}
            onRemoveStep={removeStep}
            onMoveStep={moveStep}
            onSave={saveTemplate}
            onCancel={cancelEdit}
            saving={saving}
            isNew
          />
        </div>
      )}

      {/* Existing templates */}
      {templates.length === 0 && expandedId !== 'new' && (
        <div className={styles.emptyState}>
          <h3>No process templates</h3>
          <p>Create your first template to define working process steps for job positions.</p>
        </div>
      )}

      {templates.map((template) => (
        <div key={template.id} className={styles.hcExpandedCard} style={{ marginBottom: '12px' }}>
          {/* Collapsed header */}
          <div
            className={styles.hcCardHeader}
            onClick={() => expandedId === template.id ? cancelEdit() : startEdit(template)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{template.name}</span>
              {template.is_default === 1 && (
                <span className={styles.badgeBlue}>
                  <Star size={12} style={{ marginRight: '4px' }} /> Default
                </span>
              )}
              <span className={styles.badgeGray}>
                {template.steps.length} step{template.steps.length !== 1 ? 's' : ''}
              </span>
              {template.description && (
                <span style={{ fontSize: '13px', color: '#6c757d' }}>{template.description}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                className={`${styles.btnDanger} ${styles.btnSmall}`}
                onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'template', id: template.id }); }}
              >
                <Trash2 size={14} />
              </button>
              {expandedId === template.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {/* Expanded edit form */}
          {expandedId === template.id && formData && (
            <div style={{ padding: '20px', borderTop: '1px solid #e9ecef' }}>
              <ProcessTemplateForm
                formData={formData}
                onUpdateField={updateFormField}
                onUpdateStep={updateStep}
                onAddStep={addStep}
                onRemoveStep={removeStep}
                onMoveStep={moveStep}
                onSave={saveTemplate}
                onCancel={cancelEdit}
                saving={saving}
                isNew={false}
              />
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Template"
        message="Are you sure you want to delete this process template and all its steps? Jobs using this template will be unlinked."
        confirmLabel="Delete"
        onConfirm={handleDeleteTemplate}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Process Template Form (shared between new and edit)
// ---------------------------------------------------------------------------
interface ProcessTemplateFormProps {
  formData: ProcessTemplateFormData;
  onUpdateField: (field: keyof Omit<ProcessTemplateFormData, 'steps'>, value: string | number) => void;
  onUpdateStep: (index: number, field: keyof ProcessStepFormData, value: string | number) => void;
  onAddStep: () => void;
  onRemoveStep: (index: number) => void;
  onMoveStep: (index: number, direction: 'up' | 'down') => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew: boolean;
}

function ProcessTemplateForm({
  formData,
  onUpdateField,
  onUpdateStep,
  onAddStep,
  onRemoveStep,
  onMoveStep,
  onSave,
  onCancel,
  saving,
  isNew,
}: ProcessTemplateFormProps) {
  return (
    <div>
      <div style={{ display: 'grid', gap: '16px' }}>
        {/* Row 1: Name, Description */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name *</label>
            <input
              className={styles.formInput}
              value={formData.name}
              onChange={(e) => onUpdateField('name', e.target.value)}
              placeholder="e.g. Engineering Process"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <input
              className={styles.formInput}
              value={formData.description}
              onChange={(e) => onUpdateField('description', e.target.value)}
              placeholder="Brief description"
            />
          </div>
        </div>

        {/* Row 2: Intro Text */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Intro Text</label>
          <textarea
            className={styles.formTextarea}
            value={formData.intro_text}
            onChange={(e) => onUpdateField('intro_text', e.target.value)}
            placeholder="Introductory text shown above the process steps"
            style={{ minHeight: '60px' }}
          />
        </div>

        {/* Is Default */}
        <label className={styles.formCheckbox}>
          <input
            type="checkbox"
            checked={formData.is_default === 1}
            onChange={(e) => onUpdateField('is_default', e.target.checked ? 1 : 0)}
          />
          <label>Default template (used when a job has no template assigned)</label>
        </label>

        {/* Steps section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#343a40' }}>
              Steps ({formData.steps.length})
            </h3>
            <button className={`${styles.btnSecondary} ${styles.btnSmall}`} onClick={onAddStep} type="button">
              <Plus size={14} /> Add Step
            </button>
          </div>

          {formData.steps.length === 0 && (
            <p style={{ fontSize: '13px', color: '#adb5bd', textAlign: 'center', padding: '20px 0' }}>
              No steps yet. Click &quot;Add Step&quot; to add the first step.
            </p>
          )}

          {formData.steps.map((step, idx) => (
            <div key={idx} className={styles.hcStageRow}>
              <div className={styles.hcStageHandle}>
                <GripVertical size={16} color="#adb5bd" />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6c757d' }}>#{step.step_number}</span>
              </div>

              <div style={{ flex: 1, display: 'grid', gap: '8px' }}>
                {/* Step row: Label, Detail */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                  <input
                    className={styles.formInput}
                    value={step.label}
                    onChange={(e) => onUpdateStep(idx, 'label', e.target.value)}
                    placeholder="Step label"
                  />
                  <input
                    className={styles.formInput}
                    value={step.detail}
                    onChange={(e) => onUpdateStep(idx, 'detail', e.target.value)}
                    placeholder="Step detail"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                  onClick={() => onMoveStep(idx, 'up')}
                  disabled={idx === 0}
                  type="button"
                  title="Move up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                  onClick={() => onMoveStep(idx, 'down')}
                  disabled={idx === formData.steps.length - 1}
                  type="button"
                  title="Move down"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                  onClick={() => onRemoveStep(idx)}
                  type="button"
                  title="Remove step"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.formActions}>
        <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : isNew ? 'Create Template' : 'Update Template'}
        </button>
        <button className={styles.btnSecondary} onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Tab 5: Default Benefits
// ============================================================================
function DefaultBenefitsTab() {
  const { showToast } = useToast();
  const [items, setItems] = useState<DefaultBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Partial<DefaultBenefit> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [introText, setIntroText] = useState('');
  const [introSaving, setIntroSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const [itemsRes, settingsRes] = await Promise.all([
        fetch('/api/default-benefits'),
        fetch('/api/company'),
      ]);
      const itemsJson = await itemsRes.json();
      const settingsJson = await settingsRes.json();
      if (itemsJson.success) setItems(itemsJson.data);
      if (settingsJson.success && settingsJson.data.benefits_intro_text) {
        setIntroText(settingsJson.data.benefits_intro_text);
      }
    } catch {
      showToast('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const saveIntroText = async () => {
    setIntroSaving(true);
    try {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: { benefits_intro_text: introText } }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Intro text saved');
      } else {
        showToast('error', json.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save intro text');
    } finally {
      setIntroSaving(false);
    }
  };

  const startNew = () => {
    setEditItem({ title: '', description: '', sort_order: items.length });
  };

  const startEdit = (item: DefaultBenefit) => {
    setEditItem({ ...item });
  };

  const cancelEdit = () => setEditItem(null);

  const saveItem = async () => {
    if (!editItem) return;
    if (!editItem.title?.trim() || !editItem.description?.trim()) {
      showToast('error', 'Title and description are required');
      return;
    }

    setSaving(true);
    try {
      const isNew = !editItem.id;
      const url = isNew ? '/api/default-benefits' : `/api/default-benefits/${editItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editItem.title,
          description: editItem.description,
          sort_order: editItem.sort_order ?? 0,
          is_published: 1,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('success', isNew ? 'Benefit created' : 'Benefit updated');
        cancelEdit();
        fetchItems();
      } else {
        showToast('error', json.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/default-benefits/${deleteTarget}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Benefit deleted');
        fetchItems();
      } else {
        showToast('error', json.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const moveItem = async (idx: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newItems.length) return;
    [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];

    try {
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].sort_order !== i) {
          await fetch(`/api/default-benefits/${newItems[i].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sort_order: i }),
          });
        }
      }
      fetchItems();
    } catch {
      showToast('error', 'Failed to reorder');
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      {/* Intro text setting */}
      <div className={styles.hcExpandedCard} style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>Benefits Intro Text</h3>
        <div className={styles.formGroup}>
          <textarea
            className={styles.formTextarea}
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            placeholder="Introductory text for the benefits section"
            style={{ minHeight: '80px' }}
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button className={`${styles.btnPrimary} ${styles.btnSmall}`} onClick={saveIntroText} disabled={introSaving}>
            <Save size={14} /> {introSaving ? 'Saving...' : 'Save Intro Text'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          Default benefits shown on Role Preview pages when a job has no custom benefits.
        </p>
        <button className={styles.btnPrimary} onClick={startNew}>
          <Plus size={16} /> Add Benefit
        </button>
      </div>

      {editItem && (
        <div className={styles.hcExpandedCard} style={{ marginBottom: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
            {editItem.id ? 'Edit Benefit' : 'New Benefit'}
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title *</label>
              <input
                className={styles.formInput}
                value={editItem.title || ''}
                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                placeholder="e.g. Health Insurance"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                className={styles.formTextarea}
                value={editItem.description || ''}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                placeholder="Description of this benefit"
                style={{ minHeight: '80px' }}
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} onClick={saveItem} disabled={saving}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button className={styles.btnSecondary} onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 && !editItem && (
        <div className={styles.emptyState}>
          <h3>No default benefits</h3>
          <p>Add default benefits for job positions.</p>
        </div>
      )}

      {items.map((item, idx) => (
        <div key={item.id} className={styles.hcListItem}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                onClick={() => moveItem(idx, 'up')}
                disabled={idx === 0}
                title="Move up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                className={`${styles.btnGhost} ${styles.btnIcon} ${styles.btnSmall}`}
                onClick={() => moveItem(idx, 'down')}
                disabled={idx === items.length - 1}
                title="Move down"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            <div>
              <strong style={{ fontSize: '14px' }}>{item.title}</strong>
              <p style={{ fontSize: '13px', color: '#6c757d', margin: 0 }}>{item.description}</p>
            </div>
          </div>
          <div className={styles.tableActions}>
            <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => startEdit(item)}>Edit</button>
            <button className={`${styles.btnGhost} ${styles.btnSmall}`} onClick={() => setDeleteTarget(item.id)} style={{ color: '#ef4444' }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Benefit"
        message="Are you sure you want to delete this default benefit?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
