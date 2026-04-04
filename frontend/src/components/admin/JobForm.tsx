'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2, ChevronDown, ChevronUp, Plus, X as XIcon } from 'lucide-react';
import FileUpload from '@/components/admin/FileUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { Job, InterviewTemplate, ProcessTemplate, Product, Tag, TechStack, DefaultBenefit } from '@/types';

import { createSlug as slugify } from '@/lib/slugify';

const DEPARTMENTS = [
  'Engineering',
  'Infrastructure',
  'Security',
  'Mobile',
  'Design',
  'Quality',
  'Business',
];

const SENIORITY_LEVELS = ['Junior', 'Mid-level', 'Senior', 'Staff', 'Principal'];

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

interface JobFormProps {
  job?: Job | null;
  jobId?: number;
}

// ---------------------------------------------------------------------------
// Collapsible section helper
// ---------------------------------------------------------------------------
function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.collapsibleSection}>
      <button
        type="button"
        className={styles.collapsibleHeader}
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className={styles.collapsibleContent}>{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Multi-select pills component
// ---------------------------------------------------------------------------
function MultiSelectPills({
  label,
  availableItems,
  selectedNames,
  onToggle,
  onAddNew,
  addPlaceholder,
  helperText,
}: {
  label: string;
  availableItems: { id: number; name: string }[];
  selectedNames: string[];
  onToggle: (name: string) => void;
  onAddNew: (name: string) => Promise<void>;
  addPlaceholder: string;
  helperText?: string;
}) {
  const [newItemName, setNewItemName] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAddNew = async () => {
    const trimmed = newItemName.trim();
    if (!trimmed) return;

    // Check if already exists in available items (case-insensitive)
    const exists = availableItems.some(
      (item) => item.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      // Just select it if not already selected
      const existingName = availableItems.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase()
      )!.name;
      if (!selectedNames.includes(existingName)) {
        onToggle(existingName);
      }
      setNewItemName('');
      return;
    }

    setAdding(true);
    try {
      await onAddNew(trimmed);
      setNewItemName('');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
        {availableItems.map((item) => {
          const isSelected = selectedNames.includes(item.name);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.name)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '16px',
                border: isSelected ? '1.5px solid #0066ff' : '1px solid #d0d5dd',
                backgroundColor: isSelected ? '#e8f0fe' : '#fff',
                color: isSelected ? '#0052cc' : '#344054',
                fontSize: '13px',
                fontWeight: isSelected ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {item.name}
              {isSelected && <XIcon size={12} />}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          className={styles.formInput}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={addPlaceholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddNew();
            }
          }}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={handleAddNew}
          disabled={adding || !newItemName.trim()}
          style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Plus size={14} />
          Add
        </button>
      </div>
      {helperText && (
        <span style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px', display: 'block' }}>
          {helperText}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main JobForm component
// ---------------------------------------------------------------------------
export default function JobForm({ job, jobId }: JobFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEditing = !!jobId;

  // --- Existing fields ---
  const [title, setTitle] = useState(job?.title || '');
  const [slug, setSlug] = useState(job?.slug || '');
  const [department, setDepartment] = useState(job?.department || '');
  const [product, setProduct] = useState(job?.product || '');
  const [seniority, setSeniority] = useState(job?.seniority || '');
  const [location, setLocation] = useState(job?.location || '');
  const [salary_range, setSalaryRange] = useState(job?.salary_range || '');
  const [employment_type, setEmploymentType] = useState(job?.employment_type || 'Full-time');
  const [description, setDescription] = useState(job?.description || '');
  const [requirements, setRequirements] = useState(job?.requirements || '');
  const [nice_to_have, setNiceToHave] = useState(job?.nice_to_have || '');
  const [cover_image, setCoverImage] = useState(job?.cover_image || '');
  const [tags, setTags] = useState(job?.tags || '');
  const [is_new, setIsNew] = useState(!!job?.is_new);
  const [is_high_priority, setIsHighPriority] = useState(!!job?.is_high_priority);
  const [is_published, setIsPublished] = useState(!!job?.is_published);

  // --- New Role Preview fields ---
  const [interview_template_id, setInterviewTemplateId] = useState<number | null>(job?.interview_template_id ?? null);
  const [process_template_id, setProcessTemplateId] = useState<number | null>(job?.process_template_id ?? null);
  const [challenges, setChallenges] = useState(job?.challenges || '');
  const [team_name, setTeamName] = useState(job?.team_name || '');
  const [team_size, setTeamSize] = useState(job?.team_size || '');
  const [team_lead, setTeamLead] = useState(job?.team_lead || '');
  const [team_quote, setTeamQuote] = useState(job?.team_quote || '');
  const [team_photo, setTeamPhoto] = useState(job?.team_photo || '');
  const [tech_stack, setTechStack] = useState(job?.tech_stack || '');
  const [what_youll_learn, setWhatYoullLearn] = useState(job?.what_youll_learn || '');

  // --- Benefits (relational multi-select) ---
  const [selectedBenefitIds, setSelectedBenefitIds] = useState<number[]>([]);
  const [availableBenefits, setAvailableBenefits] = useState<DefaultBenefit[]>([]);

  // --- Dynamic data lists ---
  const [interviewTemplates, setInterviewTemplates] = useState<InterviewTemplate[]>([]);
  const [processTemplates, setProcessTemplates] = useState<ProcessTemplate[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [availableTechStacks, setAvailableTechStacks] = useState<TechStack[]>([]);

  // --- Position-Specific Criteria (Feature 2) ---
  const [criteria, setCriteria] = useState<{ id?: number; name: string; description: string; weight: number; sort_order: number }[]>([]);
  const [criteriaLoaded, setCriteriaLoaded] = useState(false);

  // --- UI state ---
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Parse comma-separated strings into arrays ---
  const selectedTagNames = tags
    ? tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];
  const selectedTechNames = tech_stack
    ? tech_stack.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  // Fetch interview templates on mount
  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/interview-templates');
      const json = await res.json();
      if (json.success) {
        setInterviewTemplates(json.data);
      }
    } catch {
      // silently fail -- templates are optional
    }
  }, []);

  // Fetch process templates on mount
  const fetchProcessTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/process-templates');
      const json = await res.json();
      if (json.success) {
        setProcessTemplates(json.data);
      }
    } catch {
      // silently fail -- templates are optional
    }
  }, []);

  // Fetch products on mount
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success) {
        setProductsList(json.data || []);
      }
    } catch {
      // silently fail
    }
  }, []);

  // Fetch tags on mount
  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch('/api/tags');
      const json = await res.json();
      if (json.success) {
        setAvailableTags(json.data || []);
      }
    } catch {
      // silently fail
    }
  }, []);

  // Fetch tech stacks on mount
  const fetchTechStacks = useCallback(async () => {
    try {
      const res = await fetch('/api/tech-stacks');
      const json = await res.json();
      if (json.success) {
        setAvailableTechStacks(json.data || []);
      }
    } catch {
      // silently fail
    }
  }, []);

  // Fetch all default benefits on mount
  const fetchBenefits = useCallback(async () => {
    try {
      const res = await fetch('/api/default-benefits');
      const json = await res.json();
      if (json.success) {
        setAvailableBenefits(json.data || []);
      }
    } catch {
      // silently fail
    }
  }, []);

  // Fetch job's selected benefits on mount (if editing)
  const fetchJobBenefits = useCallback(async () => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}/benefits`);
      const json = await res.json();
      if (json.success) {
        setSelectedBenefitIds((json.data || []).map((b: DefaultBenefit) => b.id));
      }
    } catch {
      // silently fail
    }
  }, [jobId]);

  // Fetch criteria for this job
  const fetchCriteria = useCallback(async () => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}/criteria`);
      const json = await res.json();
      if (json.success) {
        setCriteria(json.data || []);
      }
    } catch {
      // silently fail
    }
    setCriteriaLoaded(true);
  }, [jobId]);

  useEffect(() => {
    fetchTemplates();
    fetchProcessTemplates();
    fetchProducts();
    fetchTags();
    fetchTechStacks();
    fetchBenefits();
    fetchJobBenefits();
    fetchCriteria();
  }, [fetchTemplates, fetchProcessTemplates, fetchProducts, fetchTags, fetchTechStacks, fetchBenefits, fetchJobBenefits, fetchCriteria]);

  // Auto-generate slug
  useEffect(() => {
    if (!slugManual && title && !isEditing) {
      setSlug(slugify(title));
    }
  }, [title, slugManual, isEditing]);

  // --- Tag toggle handler ---
  const handleTagToggle = (name: string) => {
    const current = selectedTagNames;
    if (current.includes(name)) {
      setTags(current.filter((t) => t !== name).join(','));
    } else {
      setTags([...current, name].join(','));
    }
  };

  // --- Tag add new handler ---
  const handleAddNewTag = async (name: string) => {
    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchTags();
        // Auto-select the new tag
        setTags([...selectedTagNames, name].join(','));
        showToast('success', `Tag "${name}" created`);
      } else {
        showToast('error', data.error || 'Failed to create tag');
      }
    } catch {
      showToast('error', 'Failed to create tag');
    }
  };

  // --- Tech stack toggle handler ---
  const handleTechToggle = (name: string) => {
    const current = selectedTechNames;
    if (current.includes(name)) {
      setTechStack(current.filter((t) => t !== name).join(','));
    } else {
      setTechStack([...current, name].join(','));
    }
  };

  // --- Tech stack add new handler ---
  const handleAddNewTech = async (name: string) => {
    try {
      const res = await fetch('/api/tech-stacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchTechStacks();
        // Auto-select the new tech
        setTechStack([...selectedTechNames, name].join(','));
        showToast('success', `Tech "${name}" created`);
      } else {
        showToast('error', data.error || 'Failed to create tech stack');
      }
    } catch {
      showToast('error', 'Failed to create tech stack');
    }
  };

  // --- Benefit toggle handler ---
  const handleBenefitToggle = (id: number) => {
    setSelectedBenefitIds((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Required';
    if (!department) errs.department = 'Required';
    if (!product) errs.product = 'Required';
    if (!seniority) errs.seniority = 'Required';
    if (!description.trim()) errs.description = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    const body = {
      title,
      slug: slug || undefined,
      department,
      product,
      seniority,
      location: location || undefined,
      salary_range: salary_range || undefined,
      employment_type,
      description,
      requirements: requirements || undefined,
      nice_to_have: nice_to_have || undefined,
      cover_image: cover_image || undefined,
      tags: tags || undefined,
      is_new: is_new ? 1 : 0,
      is_high_priority: is_high_priority ? 1 : 0,
      is_published: is_published ? 1 : 0,
      // New Role Preview fields
      interview_template_id: interview_template_id,
      process_template_id: process_template_id,
      challenges: challenges || undefined,
      team_name: team_name || undefined,
      team_size: team_size || undefined,
      team_lead: team_lead || undefined,
      team_quote: team_quote || undefined,
      team_photo: team_photo || undefined,
      tech_stack: tech_stack || undefined,
      what_youll_learn: what_youll_learn || undefined,
    };

    try {
      const url = isEditing ? `/api/jobs/${jobId}` : '/api/jobs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        // Save benefits via junction table
        const savedJobId = isEditing ? jobId : data.data?.id;
        if (savedJobId) {
          try {
            await fetch(`/api/jobs/${savedJobId}/benefits`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ benefit_ids: selectedBenefitIds }),
            });
          } catch {
            // Benefits save failed but job was saved
            showToast('error', 'Job saved but benefits update failed');
          }
        }

        // Save criteria (Feature 2)
        const savedJobIdForCriteria = isEditing ? jobId : data.data?.id;
        if (savedJobIdForCriteria && criteria.length > 0) {
          try {
            for (const crit of criteria) {
              if (crit.id) {
                // Update existing
                await fetch(`/api/jobs/${savedJobIdForCriteria}/criteria/${crit.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: crit.name, description: crit.description, weight: crit.weight, sort_order: crit.sort_order }),
                });
              } else {
                // Create new
                await fetch(`/api/jobs/${savedJobIdForCriteria}/criteria`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: crit.name, description: crit.description, weight: crit.weight, sort_order: crit.sort_order }),
                });
              }
            }
          } catch {
            showToast('error', 'Job saved but criteria update failed');
          }
        }

        showToast('success', isEditing ? 'Job updated successfully' : 'Job created successfully');
        if (!isEditing && data.data?.id) {
          router.push(`/admin/jobs/${data.data.id}/edit`);
        }
      } else {
        showToast('error', data.error || 'Failed to save job');
        if (data.errors) {
          const fieldErrors: Record<string, string> = {};
          for (const err of data.errors) {
            fieldErrors[err.field] = err.message;
          }
          setErrors(fieldErrors);
        }
      }
    } catch {
      showToast('error', 'Failed to save job');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!jobId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Job deleted');
        router.push('/admin/jobs');
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete job');
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Title *</label>
            <input className={styles.formInput} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" />
            {errors.title && <span className={styles.formError}>{errors.title}</span>}
          </div>

          {/* Slug */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Slug</label>
            <input className={styles.formInput} value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }} placeholder="auto-generated-from-title" />
          </div>

          {/* Department, Product, Seniority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Department *</label>
              <select className={styles.formSelect} value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Select...</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <span className={styles.formError}>{errors.department}</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Product *</label>
              <select className={styles.formSelect} value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value="">Select...</option>
                {productsList.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
              {errors.product && <span className={styles.formError}>{errors.product}</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Seniority *</label>
              <select className={styles.formSelect} value={seniority} onChange={(e) => setSeniority(e.target.value)}>
                <option value="">Select...</option>
                {SENIORITY_LEVELS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.seniority && <span className={styles.formError}>{errors.seniority}</span>}
            </div>
          </div>

          {/* Location, Salary, Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input className={styles.formInput} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Sofia, Bulgaria" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Salary Range</label>
              <input className={styles.formInput} value={salary_range} onChange={(e) => setSalaryRange(e.target.value)} placeholder="e.g. 3000-5000 EUR" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Employment Type</label>
              <select className={styles.formSelect} value={employment_type} onChange={(e) => setEmploymentType(e.target.value)}>
                {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Description (Issue 4: renamed to "About the Role") */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>About the Role *</label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe the role, its purpose, and what the candidate will be working on day-to-day..."
              minHeight="250px"
            />
            {errors.description && <span className={styles.formError}>{errors.description}</span>}
          </div>

          {/* Requirements (Issue 4: renamed to "What We're Looking For") */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What We&apos;re Looking For</label>
            <textarea className={styles.formTextarea} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="List the skills, experience, and qualifications ideal candidates should have..." />
          </div>

          {/* Nice to Have (Issue 4: keep label, add helper) */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nice to Have</label>
            <textarea className={styles.formTextarea} value={nice_to_have} onChange={(e) => setNiceToHave(e.target.value)} placeholder="List any bonus skills or experience that would be great but are not required..." />
            <span style={{ fontSize: '12px', color: '#6c757d' }}>
              Shown under &quot;What We&apos;re Looking For&quot; on the public page.
            </span>
          </div>

          {/* Benefits (relational multi-select checkbox cards) */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What We Offer</label>
            {availableBenefits.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {availableBenefits.map((benefit) => {
                  const isSelected = selectedBenefitIds.includes(benefit.id);
                  return (
                    <label
                      key={benefit.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #0066ff' : '1px solid #d0d5dd',
                        backgroundColor: isSelected ? '#f0f5ff' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        alignItems: 'flex-start',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleBenefitToggle(benefit.id)}
                        style={{ marginTop: '3px', accentColor: '#0066ff' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a1a2e' }}>
                          {benefit.title}
                        </div>
                        {benefit.description && (
                          <div style={{ fontSize: '13px', color: '#6c757d', marginTop: '4px', lineHeight: 1.4 }}>
                            {benefit.description}
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#6c757d' }}>No benefits available. Create them in the Default Benefits section first.</p>
            )}
            <span style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px', display: 'block' }}>
              Select which benefits to show on this job&apos;s page. If none are selected, all default benefits will be displayed as a fallback.
            </span>
          </div>

          {/* Tags (Issue 2: multi-select pills) */}
          <MultiSelectPills
            label="Tags"
            availableItems={availableTags}
            selectedNames={selectedTagNames}
            onToggle={handleTagToggle}
            onAddNew={handleAddNewTag}
            addPlaceholder="Add new tag..."
            helperText="Click tags to select/deselect. Type a name and press Enter or click Add to create a new tag."
          />

          {/* Cover Image */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Cover Image</label>
            <FileUpload value={cover_image || null} onChange={(url) => setCoverImage(url || '')} subDir="images" />
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', gap: '24px' }}>
            <label className={styles.formCheckbox}>
              <input type="checkbox" checked={is_new} onChange={(e) => setIsNew(e.target.checked)} />
              <label>New</label>
            </label>
            <label className={styles.formCheckbox}>
              <input type="checkbox" checked={is_high_priority} onChange={(e) => setIsHighPriority(e.target.checked)} />
              <label>High Priority</label>
            </label>
            <label className={styles.formCheckbox}>
              <input type="checkbox" checked={is_published} onChange={(e) => setIsPublished(e.target.checked)} />
              <label>Published</label>
            </label>
          </div>

          {/* ================================================================ */}
          {/* Interview Process Template */}
          {/* ================================================================ */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Interview Process Template</label>
            <select
              className={styles.formSelect}
              value={interview_template_id ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                setInterviewTemplateId(val === '' ? null : parseInt(val, 10));
              }}
            >
              <option value="">(Use default template)</option>
              {interviewTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}{t.is_default ? ' (default)' : ''}
                </option>
              ))}
            </select>
            <span style={{ fontSize: '12px', color: '#6c757d' }}>
              Select which interview process template to show on this job&apos;s Role Preview page. Leave empty to use the default.
            </span>
          </div>

          {/* ================================================================ */}
          {/* Working Process Template */}
          {/* ================================================================ */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Working Process Template</label>
            <select
              className={styles.formSelect}
              value={process_template_id ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                setProcessTemplateId(val === '' ? null : parseInt(val, 10));
              }}
            >
              <option value="">(Use default template)</option>
              {processTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}{t.is_default ? ' (default)' : ''}
                </option>
              ))}
            </select>
            <span style={{ fontSize: '12px', color: '#6c757d' }}>
              Select which working process template to show on this job&apos;s Role Preview page. Leave empty to use the default.
            </span>
          </div>

          {/* ================================================================ */}
          {/* The Challenges (Issue 4: renamed from "Role Challenges") */}
          {/* ================================================================ */}
          <CollapsibleSection title="The Challenges" defaultOpen={!!challenges}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Challenges</label>
              <textarea
                className={styles.formTextarea}
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="Enter one challenge per line, e.g.&#10;Build performant file management UI handling 100k+ items&#10;Implement real-time collaboration features..."
                style={{ minHeight: '120px' }}
              />
              <span style={{ fontSize: '12px', color: '#6c757d' }}>
                Enter one challenge per line. These appear as bullet points in the &quot;The Challenges&quot; section on the Role Preview page.
              </span>
            </div>
          </CollapsibleSection>

          {/* ================================================================ */}
          {/* Your Team (Issue 4: renamed from "Team Information") */}
          {/* ================================================================ */}
          <CollapsibleSection title="Your Team" defaultOpen={!!team_name}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Team Name</label>
                  <input
                    className={styles.formInput}
                    value={team_name}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Web Platform Team"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Team Size</label>
                  <input
                    className={styles.formInput}
                    value={team_size}
                    onChange={(e) => setTeamSize(e.target.value)}
                    placeholder="e.g. 12 engineers"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Team Lead</label>
                  <input
                    className={styles.formInput}
                    value={team_lead}
                    onChange={(e) => setTeamLead(e.target.value)}
                    placeholder="e.g. Georgi Ivanov, VP of Engineering"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Team Quote</label>
                <textarea
                  className={styles.formTextarea}
                  value={team_quote}
                  onChange={(e) => setTeamQuote(e.target.value)}
                  placeholder="A quote from the team lead about the team culture and mission..."
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Team Photo</label>
                <FileUpload
                  value={team_photo || null}
                  onChange={(url) => setTeamPhoto(url || '')}
                  subDir="images"
                />
              </div>

              {/* Tech Stack (Issue 3F: multi-select pills) */}
              <MultiSelectPills
                label="Tech Stack"
                availableItems={availableTechStacks}
                selectedNames={selectedTechNames}
                onToggle={handleTechToggle}
                onAddNew={handleAddNewTech}
                addPlaceholder="Add new technology..."
                helperText="Click technologies to select/deselect. Type a name and press Enter or click Add to create a new one."
              />
            </div>
          </CollapsibleSection>

          {/* ================================================================ */}
          {/* What You'll Learn (collapsible) */}
          {/* ================================================================ */}
          <CollapsibleSection title="What You'll Learn" defaultOpen={!!what_youll_learn}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>What You&apos;ll Learn</label>
              <RichTextEditor
                value={what_youll_learn}
                onChange={setWhatYoullLearn}
                placeholder="Describe what the candidate will learn in this role, including growth opportunities, skills they will develop, and knowledge they will gain..."
                minHeight="200px"
              />
              <span style={{ fontSize: '12px', color: '#6c757d' }}>
                A paragraph describing growth and learning opportunities. Shown on the Role Preview page.
              </span>
            </div>
          </CollapsibleSection>
          {/* ================================================================ */}
          {/* Position-Specific Scoring Criteria (Feature 2) */}
          {/* ================================================================ */}
          <CollapsibleSection title="Position-Specific Scoring Criteria" defaultOpen={criteria.length > 0}>
            <div style={{ display: 'grid', gap: '12px' }}>
              {criteria.map((crit, idx) => (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr auto auto',
                  gap: '8px',
                  padding: '12px',
                  background: '#fefce8',
                  borderRadius: '8px',
                  alignItems: 'end',
                }}>
                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.formLabel} style={{ fontSize: '11px' }}>Name</label>
                    <input
                      className={styles.formInput}
                      value={crit.name}
                      onChange={(e) => {
                        const updated = [...criteria];
                        updated[idx] = { ...updated[idx], name: e.target.value };
                        setCriteria(updated);
                      }}
                      placeholder="e.g. System Design"
                    />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.formLabel} style={{ fontSize: '11px' }}>Description</label>
                    <input
                      className={styles.formInput}
                      value={crit.description}
                      onChange={(e) => {
                        const updated = [...criteria];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setCriteria(updated);
                      }}
                      placeholder="Optional description..."
                    />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: 0, width: '80px' }}>
                    <label className={styles.formLabel} style={{ fontSize: '11px' }}>Weight</label>
                    <input
                      className={styles.formInput}
                      type="number"
                      min="1"
                      max="100"
                      value={crit.weight}
                      onChange={(e) => {
                        const updated = [...criteria];
                        updated[idx] = { ...updated[idx], weight: parseInt(e.target.value, 10) || 10 };
                        setCriteria(updated);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className={`${styles.btnGhost} ${styles.btnSmall}`}
                    onClick={async () => {
                      if (crit.id && jobId) {
                        // Delete from server
                        try {
                          await fetch(`/api/jobs/${jobId}/criteria/${crit.id}`, { method: 'DELETE' });
                        } catch { /* silent */ }
                      }
                      setCriteria(criteria.filter((_, i) => i !== idx));
                    }}
                    style={{ color: '#ef4444', alignSelf: 'end', marginBottom: '2px' }}
                  >
                    <XIcon size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setCriteria([...criteria, { name: '', description: '', weight: 10, sort_order: criteria.length }])}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', justifySelf: 'start' }}
              >
                <Plus size={14} /> Add Criterion
              </button>
              <span style={{ fontSize: '12px', color: '#6c757d' }}>
                Define position-specific scoring criteria beyond the 6 core dimensions. These will be shown in the scorecard when evaluating candidates for this position.
              </span>
            </div>
          </CollapsibleSection>
        </div>

        {/* Actions */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
          </button>
          <button type="button" className={styles.btnSecondary} onClick={() => router.push('/admin/jobs')}>
            Cancel
          </button>
          {isEditing && (
            <button type="button" className={styles.btnDanger} onClick={() => setShowDelete(true)} style={{ marginLeft: 'auto' }}>
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={showDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job posting? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleting}
      />
    </>
  );
}
