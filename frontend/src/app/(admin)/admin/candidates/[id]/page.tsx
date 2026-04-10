'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Clock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  Plus,
  MessageSquare,
  FileText,
  History,
  Users,
  Paperclip,
  Upload,
  RefreshCw,
  X,
  ChevronRight,
  AlertTriangle,
  User,
  Eye,
  EyeOff,
  Printer,
  CheckCircle,
  XCircle,
  Minus,
  Award,
  Edit,
} from 'lucide-react';
import {
  getCandidateStatusBadge,
  getRecommendationBadge,
  getReferenceStatusBadge,
  CANDIDATE_STATUS_MAP,
} from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import { CandidateAiAnalysisPanel } from '@/components/admin/CandidateAiAnalysisPanel';
import { InterviewSessionsPanel } from '@/components/admin/InterviewSessionsPanel';
import { AiProfileCard } from '@/components/admin/AiProfileCard';
import { CandidateEmailsPanel } from '@/components/admin/CandidateEmailsPanel';
import { Sparkles, ShieldAlert, DownloadCloud } from 'lucide-react';
import styles from '@/styles/admin.module.scss';
import type {
  CandidateWithJob,
  CandidateNote,
  CandidateScore,
  CandidateReference,
  CandidateHistory,
  CandidateAttachment,
  CandidateStatus,
  CandidateNoteType,
  ScoreRecommendation,
  ParsedSkill,
  ParsedExperience,
  ParsedEducation,
  ParsedCertification,
  ParsedLanguage,
  ParsedProject,
  PositionCriterion,
} from '@/types';

type TabKey = 'overview' | 'ai' | 'profile' | 'evaluation' | 'decision' | 'timeline' | 'references' | 'notes';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <Users size={14} /> },
  { key: 'ai', label: 'AI Analysis', icon: <Sparkles size={14} /> },
  { key: 'profile', label: 'Profile', icon: <User size={14} /> },
  { key: 'evaluation', label: 'Evaluation', icon: <Star size={14} /> },
  { key: 'decision', label: 'Decision', icon: <Award size={14} /> },
  { key: 'timeline', label: 'Timeline', icon: <History size={14} /> },
  { key: 'references', label: 'References', icon: <Globe size={14} /> },
  { key: 'notes', label: 'Notes & Files', icon: <MessageSquare size={14} /> },
];

const PIPELINE_STATUSES: CandidateStatus[] = [
  'new', 'screening', 'phone_screen', 'technical',
  'team_interview', 'culture_chat', 'offer', 'hired',
  'rejected', 'on_hold', 'withdrawn',
];

const SCORE_DIMENSIONS = [
  { key: 'technical_depth', label: 'Technical Depth' },
  { key: 'problem_solving', label: 'Problem Solving' },
  { key: 'ownership', label: 'Ownership' },
  { key: 'communication', label: 'Communication' },
  { key: 'cultural_add', label: 'Cultural Add' },
  { key: 'growth_potential', label: 'Growth Potential' },
] as const;

function daysInPipeline(createdAt: string): number {
  return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
}

function renderStars(score: number | null, size = 14) {
  if (score === null || score === undefined) return <span style={{ color: '#9ca3af', fontSize: '12px' }}>--</span>;
  const rounded = Math.round(score);
  return (
    <span className={styles.starsDisplay}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rounded ? '#f59e0b' : 'none'}
          stroke={i <= rounded ? '#f59e0b' : '#d1d5db'}
        />
      ))}
      <span style={{ marginLeft: 4, fontSize: '12px', color: '#6b7280' }}>
        ({score.toFixed(1)})
      </span>
    </span>
  );
}

function getScoreColor(score: number | null): string {
  if (!score) return '#e5e7eb';
  if (score <= 2) return '#ef4444';
  if (score <= 3) return '#f59e0b';
  return '#10b981';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function CandidateDossierPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const candidateId = params.id as string;

  const [candidate, setCandidate] = useState<CandidateWithJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [currentUsername, setCurrentUsername] = useState<string>('');
  const [linkedinText, setLinkedinText] = useState<string>('');
  const [savingLinkedin, setSavingLinkedin] = useState(false);

  // Overview inline edit
  const [editingOverview, setEditingOverview] = useState(false);
  const [overviewForm, setOverviewForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    website_url: '',
    source: '',
    work_model: '',
    earliest_start: '',
  });
  const [overviewSaving, setOverviewSaving] = useState(false);

  // Sub-data
  const [scores, setScores] = useState<CandidateScore[]>([]);
  const [compositeScore, setCompositeScore] = useState<number | null>(null);
  const [history, setHistory] = useState<CandidateHistory[]>([]);
  const [references, setReferences] = useState<CandidateReference[]>([]);
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [attachments, setAttachments] = useState<CandidateAttachment[]>([]);

  // Modals
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showScorecardModal, setShowScorecardModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Status change
  const [newStatus, setNewStatus] = useState<CandidateStatus | ''>('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [keepInPool, setKeepInPool] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const [statusSaving, setStatusSaving] = useState(false);

  // Note form
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState<CandidateNoteType>('general');
  const [noteSaving, setNoteSaving] = useState(false);

  // Scorecard form
  const [scInterviewerName, setScInterviewerName] = useState('');
  const [scStage, setScStage] = useState('');
  const [scScores, setScScores] = useState<Record<string, number | null>>({
    technical_depth: null, problem_solving: null, ownership: null,
    communication: null, cultural_add: null, growth_potential: null,
  });
  const [scNotes, setScNotes] = useState<Record<string, string>>({
    technical_depth_notes: '', problem_solving_notes: '', ownership_notes: '',
    communication_notes: '', cultural_add_notes: '', growth_potential_notes: '',
  });
  const [scRecommendation, setScRecommendation] = useState<ScoreRecommendation | ''>('');
  const [scGeneralNotes, setScGeneralNotes] = useState('');
  const [scKeyQuotes, setScKeyQuotes] = useState('');
  const [scRedFlags, setScRedFlags] = useState('');
  const [scSaving, setScSaving] = useState(false);

  // Reference form
  const [refName, setRefName] = useState('');
  const [refEmail, setRefEmail] = useState('');
  const [refRelationship, setRefRelationship] = useState('');
  const [refCompany, setRefCompany] = useState('');
  const [refSaving, setRefSaving] = useState(false);

  // Compare
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareCandidates, setCompareCandidates] = useState<{ id: number; full_name: string }[]>([]);
  const [selectedCompareIds, setSelectedCompareIds] = useState<number[]>([]);

  // Profile tab (Feature 1)
  const [profileData, setProfileData] = useState<{
    parsed_skills: ParsedSkill[] | null;
    parsed_experience: ParsedExperience[] | null;
    parsed_education: ParsedEducation[] | null;
    parsed_certifications: ParsedCertification[] | null;
    parsed_languages: ParsedLanguage[] | null;
    parsed_projects: ParsedProject[] | null;
    professional_summary: string | null;
  } | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    professional_summary: '',
    parsed_skills: '[]',
    parsed_experience: '[]',
    parsed_education: '[]',
    parsed_certifications: '[]',
    parsed_languages: '[]',
    parsed_projects: '[]',
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Anti-bias (Feature 3)
  const [revealScores, setRevealScores] = useState(false);

  // Position criteria (Feature 2)
  const [positionCriteria, setPositionCriteria] = useState<PositionCriterion[]>([]);

  // Decision (Feature 6)
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decisionValue, setDecisionValue] = useState<'hire' | 'reject' | 'on_hold' | ''>('');
  const [decisionJustification, setDecisionJustification] = useState('');
  const [decisionSaving, setDecisionSaving] = useState(false);

  // File upload
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load candidate
  const loadCandidate = useCallback(async () => {
    try {
      const res = await fetch(`/api/candidates/${candidateId}`);
      const data = await res.json();
      if (data.success) {
        setCandidate(data.data);
        if (data.data.linkedin_profile_text) {
          setLinkedinText(data.data.linkedin_profile_text);
        }
      } else {
        showToast('error', 'Candidate not found');
        router.push('/admin/candidates');
      }
    } catch {
      showToast('error', 'Failed to load candidate');
    } finally {
      setLoading(false);
    }
  }, [candidateId, router, showToast]);

  // Fetch current user
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success && data.data?.username) {
          setCurrentUsername(data.data.username);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  // Save LinkedIn profile text
  const saveLinkedinText = useCallback(async () => {
    if (!candidate) return;
    setSavingLinkedin(true);
    try {
      const res = await fetch(`/api/candidates/${candidate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_profile_text: linkedinText }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'LinkedIn profile saved');
        await loadCandidate();
      } else {
        showToast('error', json.error || 'Failed to save');
      }
    } catch {
      showToast('error', 'Network error');
    } finally {
      setSavingLinkedin(false);
    }
  }, [candidate, linkedinText, loadCandidate, showToast]);

  // Open overview edit form
  const startEditOverview = () => {
    if (!candidate) return;
    setOverviewForm({
      full_name: candidate.full_name || '',
      email: candidate.email || '',
      phone: candidate.phone || '',
      linkedin_url: candidate.linkedin_url || '',
      github_url: candidate.github_url || '',
      portfolio_url: candidate.portfolio_url || '',
      website_url: candidate.website_url || '',
      source: candidate.source || '',
      work_model: candidate.work_model || '',
      earliest_start: candidate.earliest_start || '',
    });
    setEditingOverview(true);
  };

  // Save overview edits
  const saveOverview = async () => {
    if (!candidate) return;
    setOverviewSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overviewForm),
      });
      const json = await res.json();
      if (json.success) {
        showToast('success', 'Candidate updated');
        setEditingOverview(false);
        await loadCandidate();
      } else {
        showToast('error', json.error || 'Failed to update');
      }
    } catch {
      showToast('error', 'Network error');
    } finally {
      setOverviewSaving(false);
    }
  };

  const loadScores = useCallback(async () => {
    const res = await fetch(`/api/candidates/${candidateId}/scores`);
    const data = await res.json();
    if (data.success) {
      setScores(data.data.scorecards || []);
      setCompositeScore(data.data.composite_score);
    }
  }, [candidateId]);

  const loadHistory = useCallback(async () => {
    const res = await fetch(`/api/candidates/${candidateId}/history`);
    const data = await res.json();
    if (data.success) setHistory(data.data || []);
  }, [candidateId]);

  const loadReferences = useCallback(async () => {
    const res = await fetch(`/api/candidates/${candidateId}/references`);
    const data = await res.json();
    if (data.success) setReferences(data.data || []);
  }, [candidateId]);

  const loadNotes = useCallback(async () => {
    const res = await fetch(`/api/candidates/${candidateId}/notes`);
    const data = await res.json();
    if (data.success) setNotes(data.data || []);
  }, [candidateId]);

  const loadAttachments = useCallback(async () => {
    const res = await fetch(`/api/candidates/${candidateId}/attachments`);
    const data = await res.json();
    if (data.success) setAttachments(data.data || []);
  }, [candidateId]);

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch(`/api/candidates/${candidateId}/profile`);
      const data = await res.json();
      if (data.success) setProfileData(data.data);
    } catch { /* silent */ }
  }, [candidateId]);

  const loadPositionCriteria = useCallback(async () => {
    if (!candidate?.job_id) return;
    try {
      const res = await fetch(`/api/jobs/${candidate.job_id}/criteria`);
      const data = await res.json();
      if (data.success) setPositionCriteria(data.data || []);
    } catch { /* silent */ }
  }, [candidate?.job_id]);

  useEffect(() => { loadCandidate(); }, [loadCandidate]);

  useEffect(() => {
    if (!candidate) return;
    if (activeTab === 'profile') { loadProfile(); }
    if (activeTab === 'evaluation') { loadScores(); loadPositionCriteria(); }
    if (activeTab === 'decision') { loadScores(); }
    if (activeTab === 'timeline') { loadHistory(); }
    if (activeTab === 'references') { loadReferences(); }
    if (activeTab === 'notes') { loadNotes(); loadAttachments(); }
  }, [activeTab, candidate, loadScores, loadHistory, loadReferences, loadNotes, loadAttachments, loadProfile, loadPositionCriteria]);

  // Status change handler
  const handleStatusChange = async () => {
    if (!newStatus || !candidate) return;
    if (newStatus === 'rejected' && !rejectionReason.trim()) {
      showToast('error', 'Rejection reason is required');
      return;
    }
    setStatusSaving(true);
    try {
      const body: Record<string, unknown> = { status: newStatus, notes: statusNote };
      if (newStatus === 'rejected') {
        body.rejection_reason = rejectionReason;
        body.rejection_notes = rejectionNotes;
        body.keep_in_talent_pool = keepInPool;
      }
      const res = await fetch(`/api/candidates/${candidateId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setCandidate(data.data);
        showToast('success', 'Status updated');
        setShowStatusModal(false);
        setNewStatus('');
        setRejectionReason('');
        setRejectionNotes('');
        setKeepInPool(false);
        setStatusNote('');
      } else {
        showToast('error', data.error || 'Failed to update status');
      }
    } catch {
      showToast('error', 'Failed to update status');
    } finally {
      setStatusSaving(false);
    }
  };

  // Add note handler
  const handleAddNote = async () => {
    if (!noteContent.trim()) return;
    setNoteSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidateId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: noteContent, note_type: noteType }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Note added');
        setNoteContent('');
        setNoteType('general');
        setShowNoteModal(false);
        loadNotes();
      } else {
        showToast('error', data.error || 'Failed to add note');
      }
    } catch {
      showToast('error', 'Failed to add note');
    } finally {
      setNoteSaving(false);
    }
  };

  // Add scorecard handler
  const handleAddScorecard = async () => {
    if (!scInterviewerName.trim() || !scStage.trim()) {
      showToast('error', 'Interviewer name and stage are required');
      return;
    }
    setScSaving(true);
    try {
      const body: Record<string, unknown> = {
        interviewer_name: scInterviewerName,
        interview_stage: scStage,
        general_notes: scGeneralNotes,
        key_quotes: scKeyQuotes,
        red_flags: scRedFlags,
      };
      if (scRecommendation) body.recommendation = scRecommendation;
      for (const dim of SCORE_DIMENSIONS) {
        if (scScores[dim.key] !== null) body[dim.key] = scScores[dim.key];
        if (scNotes[`${dim.key}_notes`]) body[`${dim.key}_notes`] = scNotes[`${dim.key}_notes`];
      }
      const res = await fetch(`/api/candidates/${candidateId}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Scorecard submitted');
        setShowScorecardModal(false);
        resetScorecardForm();
        loadScores();
        loadCandidate();
      } else {
        showToast('error', data.error || 'Failed to submit scorecard');
      }
    } catch {
      showToast('error', 'Failed to submit scorecard');
    } finally {
      setScSaving(false);
    }
  };

  const resetScorecardForm = () => {
    setScInterviewerName('');
    setScStage('');
    setScScores({ technical_depth: null, problem_solving: null, ownership: null, communication: null, cultural_add: null, growth_potential: null });
    setScNotes({ technical_depth_notes: '', problem_solving_notes: '', ownership_notes: '', communication_notes: '', cultural_add_notes: '', growth_potential_notes: '' });
    setScRecommendation('');
    setScGeneralNotes('');
    setScKeyQuotes('');
    setScRedFlags('');
  };

  // Add reference handler
  const handleAddReference = async () => {
    if (!refName.trim() || !refEmail.trim()) {
      showToast('error', 'Referee name and email are required');
      return;
    }
    setRefSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidateId}/references`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referee_name: refName,
          referee_email: refEmail,
          referee_relationship: refRelationship,
          referee_company: refCompany,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Reference request added');
        setShowReferenceModal(false);
        setRefName('');
        setRefEmail('');
        setRefRelationship('');
        setRefCompany('');
        loadReferences();
      } else {
        showToast('error', data.error || 'Failed to add reference');
      }
    } catch {
      showToast('error', 'Failed to add reference');
    } finally {
      setRefSaving(false);
    }
  };

  // Profile save handler (Feature 1)
  const handleSaveProfile = async () => {
    setProfileSaving(true);
    try {
      const body: Record<string, unknown> = {
        professional_summary: profileForm.professional_summary || null,
      };
      const jsonFields = ['parsed_skills', 'parsed_experience', 'parsed_education', 'parsed_certifications', 'parsed_languages', 'parsed_projects'] as const;
      for (const field of jsonFields) {
        try {
          body[field] = JSON.parse(profileForm[field]);
        } catch {
          body[field] = [];
        }
      }

      const res = await fetch(`/api/candidates/${candidateId}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Profile updated');
        setEditingProfile(false);
        loadProfile();
      } else {
        showToast('error', data.error || 'Failed to update profile');
      }
    } catch {
      showToast('error', 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  // Decision handler (Feature 6)
  const handleRecordDecision = async () => {
    if (!decisionValue || !candidate) return;
    setDecisionSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          final_decision: decisionValue,
          decision_justification: decisionJustification,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Log to history
        await fetch(`/api/candidates/${candidateId}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `Final decision: ${decisionValue.toUpperCase()}. ${decisionJustification || ''}`.trim(),
            note_type: 'system',
          }),
        });
        showToast('success', 'Decision recorded');
        setShowDecisionModal(false);
        setDecisionValue('');
        setDecisionJustification('');
        loadCandidate();
      } else {
        showToast('error', data.error || 'Failed to record decision');
      }
    } catch {
      showToast('error', 'Failed to record decision');
    } finally {
      setDecisionSaving(false);
    }
  };

  // CV upload handler
  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !candidate) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/api/candidates/${candidateId}/cv`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'CV uploaded');
        await loadCandidate();
      } else {
        showToast('error', data.error || 'Failed to upload CV');
      }
    } catch {
      showToast('error', 'Failed to upload CV');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/api/candidates/${candidateId}/attachments`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'File uploaded');
        loadAttachments();
      } else {
        showToast('error', data.error || 'Failed to upload file');
      }
    } catch {
      showToast('error', 'Failed to upload file');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Delete candidate handler
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/candidates/${candidateId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Candidate deleted');
        router.push('/admin/candidates');
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete candidate');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  if (!candidate) {
    return <p>Candidate not found.</p>;
  }

  const initials = candidate.full_name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/candidates"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6c757d', textDecoration: 'none', marginBottom: '16px' }}
      >
        <ArrowLeft size={14} /> Back to Candidates
      </Link>

      {/* Header */}
      <div className={styles.dossierHeader}>
        <div className={styles.dossierAvatar}>
          {candidate.photo ? (
            <img src={candidate.photo} alt={candidate.full_name} />
          ) : (
            initials
          )}
        </div>

        <div className={styles.dossierHeaderInfo}>
          <h1>{candidate.full_name}</h1>
          <p>{candidate.job_title || 'General Application'}{candidate.job_department ? ` - ${candidate.job_department}` : ''}</p>
          <div className={styles.dossierHeaderMeta}>
            {getCandidateStatusBadge(candidate.status)}
            {renderStars(candidate.composite_score)}
            <span className={styles.atsCandidateCardSource}>{candidate.source}</span>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>
              Applied {formatDate(candidate.created_at)} ({daysInPipeline(candidate.created_at)} days)
            </span>
            {candidate.is_returning === 1 && (
              <span className={styles.badgeOrange} style={{ fontSize: '11px' }}>
                <RefreshCw size={10} style={{ marginRight: 2 }} /> Returning
              </span>
            )}
            {candidate.final_decision && (
              <span style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
                background: candidate.final_decision === 'hire' ? '#d1fae5' : candidate.final_decision === 'reject' ? '#fee2e2' : '#fef3c7',
                color: candidate.final_decision === 'hire' ? '#065f46' : candidate.final_decision === 'reject' ? '#991b1b' : '#92400e',
              }}>
                Decision: {candidate.final_decision.toUpperCase()}
              </span>
            )}
          </div>
          {/* Cooldown Warning (Feature 9) */}
          {candidate.is_returning === 1 && candidate.previous_candidate_id && (() => {
            // Calculate if cooldown is active (rejected < 6 months ago)
            // We show this based on presence of returning flag
            return (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                padding: '8px 12px',
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9a3412',
              }}>
                <AlertTriangle size={16} />
                <span>
                  <strong>Returning candidate</strong> -- Previously applied (ID #{candidate.previous_candidate_id}).
                  Check previous application history before proceeding.
                </span>
              </div>
            );
          })()}
        </div>

        <div className={styles.dossierHeaderActions}>
          <button className={styles.btnPrimary} onClick={() => { setNewStatus(''); setShowStatusModal(true); }}>
            Change Status
          </button>
          <button className={styles.btnSecondary} onClick={() => setShowNoteModal(true)}>
            <Plus size={14} /> Note
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => setShowCompareModal(true)}
            title="Compare with other candidates"
          >
            Compare
          </button>
          <button
            className={`${styles.btnGhost} ${styles.btnSmall}`}
            onClick={() => window.print()}
            title="Print / Export PDF"
          >
            <Printer size={14} /> Print
          </button>
          <button
            className={`${styles.btnGhost} ${styles.btnSmall}`}
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete candidate"
            style={{ color: '#ef4444' }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.dossierTabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.dossierTab} ${activeTab === tab.key ? styles.dossierTabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span style={{ marginLeft: 4 }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Personal Info */}
          <div className={styles.dossierSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Personal Information</h3>
              {!editingOverview ? (
                <button className={styles.btnSecondary} onClick={startEditOverview} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '6px 12px' }}>
                  <Edit size={12} /> Edit
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className={styles.btnSecondary} onClick={() => setEditingOverview(false)} style={{ fontSize: '12px', padding: '6px 12px' }}>Cancel</button>
                  <button className={styles.btnPrimary} onClick={saveOverview} disabled={overviewSaving} style={{ fontSize: '12px', padding: '6px 12px' }}>
                    {overviewSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            {editingOverview ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input className={styles.formInput} value={overviewForm.full_name} onChange={(e) => setOverviewForm({ ...overviewForm, full_name: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input className={styles.formInput} type="email" value={overviewForm.email} onChange={(e) => setOverviewForm({ ...overviewForm, email: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input className={styles.formInput} value={overviewForm.phone} onChange={(e) => setOverviewForm({ ...overviewForm, phone: e.target.value })} placeholder="+359..." />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Source</label>
                  <select className={styles.formInput} value={overviewForm.source} onChange={(e) => setOverviewForm({ ...overviewForm, source: e.target.value })}>
                    <option value="Direct">Direct</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Job Board">Job Board</option>
                    <option value="Conference">Conference</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Linkedin size={14} color="#0A66C2" /> LinkedIn URL</label>
                  <input className={styles.formInput} value={overviewForm.linkedin_url} onChange={(e) => setOverviewForm({ ...overviewForm, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Github size={14} /> GitHub URL</label>
                  <input className={styles.formInput} value={overviewForm.github_url} onChange={(e) => setOverviewForm({ ...overviewForm, github_url: e.target.value })} placeholder="https://github.com/..." />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} /> Portfolio URL</label>
                  <input className={styles.formInput} value={overviewForm.portfolio_url} onChange={(e) => setOverviewForm({ ...overviewForm, portfolio_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ExternalLink size={14} /> Website URL</label>
                  <input className={styles.formInput} value={overviewForm.website_url} onChange={(e) => setOverviewForm({ ...overviewForm, website_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Work Model</label>
                  <select className={styles.formInput} value={overviewForm.work_model} onChange={(e) => setOverviewForm({ ...overviewForm, work_model: e.target.value })}>
                    <option value="On-site Sofia">On-site Sofia</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Earliest Start</label>
                  <input className={styles.formInput} type="date" value={overviewForm.earliest_start} onChange={(e) => setOverviewForm({ ...overviewForm, earliest_start: e.target.value })} />
                </div>
              </div>
            ) : (
              <div className={styles.dossierInfoGrid}>
                <div className={styles.dossierInfoItem}>
                  <label>Email</label>
                  <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                </div>
                {candidate.phone && (
                  <div className={styles.dossierInfoItem}>
                    <label>Phone</label>
                    <p>{candidate.phone}</p>
                  </div>
                )}
                {candidate.linkedin_url ? (
                  <div className={styles.dossierInfoItem}>
                    <label><Linkedin size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />LinkedIn</label>
                    <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer">
                      {candidate.linkedin_url.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}
                    </a>
                  </div>
                ) : (
                  <div className={styles.dossierInfoItem}>
                    <label><Linkedin size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />LinkedIn</label>
                    <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Not provided</p>
                  </div>
                )}
                {candidate.github_url ? (
                  <div className={styles.dossierInfoItem}>
                    <label><Github size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />GitHub</label>
                    <a href={candidate.github_url} target="_blank" rel="noopener noreferrer">
                      {candidate.github_url.replace(/https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')}
                    </a>
                  </div>
                ) : (
                  <div className={styles.dossierInfoItem}>
                    <label><Github size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />GitHub</label>
                    <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Not provided</p>
                  </div>
                )}
                {candidate.portfolio_url ? (
                  <div className={styles.dossierInfoItem}>
                    <label><Globe size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Portfolio</label>
                    <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer">View Portfolio</a>
                  </div>
                ) : (
                  <div className={styles.dossierInfoItem}>
                    <label><Globe size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Portfolio</label>
                    <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Not provided</p>
                  </div>
                )}
                {candidate.website_url ? (
                  <div className={styles.dossierInfoItem}>
                    <label><ExternalLink size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Website</label>
                    <a href={candidate.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
                  </div>
                ) : (
                  <div className={styles.dossierInfoItem}>
                    <label><ExternalLink size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Website</label>
                    <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Not provided</p>
                  </div>
                )}
                {candidate.work_model && (
                  <div className={styles.dossierInfoItem}>
                    <label>Work Model</label>
                    <p>{candidate.work_model}</p>
                  </div>
                )}
                {candidate.earliest_start && (
                  <div className={styles.dossierInfoItem}>
                    <label>Earliest Start</label>
                    <p>{candidate.earliest_start}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cover Message */}
          {candidate.cover_message && (
            <div className={styles.dossierSection}>
              <h3>Cover Message</h3>
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {candidate.cover_message}
              </p>
            </div>
          )}

          {/* CV */}
          <div className={styles.dossierSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Resume / CV</h3>
              <label
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '6px 12px', fontSize: '12px', cursor: 'pointer',
                  background: '#17BED0', color: '#fff', borderRadius: '6px', fontWeight: 600,
                }}
              >
                <Upload size={12} />
                {candidate.cv_path ? 'Replace CV' : 'Upload CV'}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  style={{ display: 'none' }}
                  onChange={handleCvUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            {candidate.cv_path ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <FileText size={16} color="#6B7280" />
                <a
                  href={candidate.cv_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#17BED0', fontSize: '14px', textDecoration: 'underline' }}
                >
                  {candidate.cv_original_name || 'Download CV'}
                </a>
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic', marginTop: '8px' }}>
                No CV uploaded yet. Upload a PDF, DOC, or DOCX file.
              </p>
            )}
          </div>

          {/* Source & Referral */}
          <div className={styles.dossierSection}>
            <h3>Source & Referral</h3>
            <div className={styles.dossierInfoGrid}>
              <div className={styles.dossierInfoItem}>
                <label>Source</label>
                <p>{candidate.source}</p>
              </div>
              {candidate.referrer_name && (
                <div className={styles.dossierInfoItem}>
                  <label>Referred By</label>
                  <p>
                    {candidate.referrer_name}
                    {candidate.referrer_company ? ` (${candidate.referrer_company})` : ''}
                    {candidate.is_internal_referral === 1 ? ' - Internal' : ''}
                  </p>
                </div>
              )}
              {candidate.referrer_email && (
                <div className={styles.dossierInfoItem}>
                  <label>Referrer Email</label>
                  <a href={`mailto:${candidate.referrer_email}`}>{candidate.referrer_email}</a>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className={styles.dossierSection}>
            <h3>Preferences</h3>
            <div className={styles.dossierInfoGrid}>
              <div className={styles.dossierInfoItem}>
                <label>Work Model</label>
                <p>{candidate.work_model || 'Not specified'}</p>
              </div>
              {(candidate.salary_min || candidate.salary_max) && (
                <div className={styles.dossierInfoItem}>
                  <label>Salary Range</label>
                  <p>
                    {candidate.salary_min && candidate.salary_max
                      ? `${candidate.salary_min.toLocaleString()} - ${candidate.salary_max.toLocaleString()} ${candidate.salary_currency}`
                      : candidate.salary_min
                        ? `From ${candidate.salary_min.toLocaleString()} ${candidate.salary_currency}`
                        : `Up to ${candidate.salary_max!.toLocaleString()} ${candidate.salary_currency}`}
                  </p>
                </div>
              )}
              {candidate.earliest_start && (
                <div className={styles.dossierInfoItem}>
                  <label>Earliest Start</label>
                  <p>{candidate.earliest_start}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Tab — unified analysis, interview sessions, LinkedIn paste */}
      {activeTab === 'ai' && candidate && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <CandidateAiAnalysisPanel candidateId={candidate.id} />

          <AiProfileCard
            candidateId={candidate.id}
            hasCv={!!candidate.cv_path}
            existingSummary={candidate.professional_summary || null}
            existingSkills={candidate.parsed_skills || null}
            existingExperience={candidate.parsed_experience || null}
            onRefresh={() => loadCandidate()}
          />

          <InterviewSessionsPanel
            candidateId={candidate.id}
            currentUsername={currentUsername || 'admin'}
          />

          <CandidateEmailsPanel
            candidateId={candidate.id}
            candidateName={candidate.full_name}
          />

          {/* GDPR controls */}
          <div style={{ border: '1px solid #FEE2E2', borderRadius: '12px', padding: '20px', background: '#FEF2F2' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#991B1B', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={16} />
              GDPR controls
            </h3>
            <p style={{ margin: '6px 0 12px', fontSize: '12px', color: '#7F1D1D' }}>
              Export or permanently delete all candidate data to comply with GDPR data subject requests.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={`/api/candidates/${candidate.id}/gdpr-export`}
                download
                style={{ padding: '8px 14px', background: '#FFFFFF', color: '#1F2937', border: '1px solid #D1D5DB', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <DownloadCloud size={14} />
                Export all data (JSON)
              </a>
              <button
                type="button"
                onClick={async () => {
                  if (!confirm(`PERMANENTLY delete all data for ${candidate.full_name}? This cannot be undone. Audit log entries will be retained for compliance.`)) return;
                  if (!confirm('This is a GDPR deletion. Are you ABSOLUTELY sure?')) return;
                  try {
                    const res = await fetch(`/api/candidates/${candidate.id}/gdpr-delete`, { method: 'POST' });
                    const json = await res.json();
                    if (json.success) {
                      showToast('success', 'Candidate data permanently deleted');
                      router.push('/admin/candidates');
                    } else {
                      showToast('error', json.error || 'Deletion failed');
                    }
                  } catch {
                    showToast('error', 'Network error');
                  }
                }}
                style={{ padding: '8px 14px', background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ShieldAlert size={14} />
                GDPR delete (permanent)
              </button>
            </div>
          </div>

          {/* LinkedIn profile paste area */}
          <div style={{
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '20px',
            background: '#FFFFFF',
          }}>
            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Linkedin size={16} color="#0A66C2" />
                LinkedIn Profile Text
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6B7280' }}>
                Paste raw text from the candidate&apos;s LinkedIn &quot;About&quot;, &quot;Experience&quot;, and &quot;Skills&quot; sections.
                AI will include this in the unified analysis.
              </p>
            </div>
            <textarea
              value={linkedinText}
              onChange={(e) => setLinkedinText(e.target.value)}
              rows={8}
              placeholder="Paste LinkedIn profile text here..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="button"
                onClick={saveLinkedinText}
                disabled={savingLinkedin}
                style={{
                  padding: '8px 16px',
                  background: savingLinkedin ? '#9CA3AF' : '#17BED0',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: savingLinkedin ? 'not-allowed' : 'pointer',
                }}
              >
                {savingLinkedin ? 'Saving…' : 'Save LinkedIn profile'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab (Feature 1) */}
      {activeTab === 'profile' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Standardized CV Profile</h3>
            <button
              className={styles.btnSecondary}
              onClick={() => {
                if (editingProfile) {
                  setEditingProfile(false);
                } else {
                  setProfileForm({
                    professional_summary: profileData?.professional_summary || '',
                    parsed_skills: JSON.stringify(profileData?.parsed_skills || [], null, 2),
                    parsed_experience: JSON.stringify(profileData?.parsed_experience || [], null, 2),
                    parsed_education: JSON.stringify(profileData?.parsed_education || [], null, 2),
                    parsed_certifications: JSON.stringify(profileData?.parsed_certifications || [], null, 2),
                    parsed_languages: JSON.stringify(profileData?.parsed_languages || [], null, 2),
                    parsed_projects: JSON.stringify(profileData?.parsed_projects || [], null, 2),
                  });
                  setEditingProfile(true);
                }
              }}
            >
              <Edit size={14} /> {editingProfile ? 'Cancel' : (profileData?.professional_summary ? 'Edit Profile' : 'Fill Manually')}
            </button>
          </div>

          {editingProfile ? (
            <div style={{ display: 'grid', gap: '16px' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Professional Summary</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.professional_summary}
                  onChange={(e) => setProfileForm({ ...profileForm, professional_summary: e.target.value })}
                  rows={4}
                  placeholder="Brief professional summary..."
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Skills (JSON)</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.parsed_skills}
                  onChange={(e) => setProfileForm({ ...profileForm, parsed_skills: e.target.value })}
                  rows={4}
                  placeholder='[{"name": "React", "proficiency": 4}]'
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Experience (JSON)</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.parsed_experience}
                  onChange={(e) => setProfileForm({ ...profileForm, parsed_experience: e.target.value })}
                  rows={4}
                  placeholder='[{"company": "...", "role": "...", "duration": "...", "achievements": "..."}]'
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Education (JSON)</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.parsed_education}
                  onChange={(e) => setProfileForm({ ...profileForm, parsed_education: e.target.value })}
                  rows={3}
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Certifications (JSON)</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.parsed_certifications}
                  onChange={(e) => setProfileForm({ ...profileForm, parsed_certifications: e.target.value })}
                  rows={3}
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Languages (JSON)</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.parsed_languages}
                  onChange={(e) => setProfileForm({ ...profileForm, parsed_languages: e.target.value })}
                  rows={3}
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Notable Projects (JSON)</label>
                <textarea
                  className={styles.formTextarea}
                  value={profileForm.parsed_projects}
                  onChange={(e) => setProfileForm({ ...profileForm, parsed_projects: e.target.value })}
                  rows={3}
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className={styles.btnPrimary} onClick={handleSaveProfile} disabled={profileSaving}>
                  {profileSaving ? 'Saving...' : 'Save Profile'}
                </button>
                <button className={styles.btnSecondary} onClick={() => setEditingProfile(false)}>Cancel</button>
              </div>
            </div>
          ) : profileData && (profileData.professional_summary || profileData.parsed_skills?.length) ? (
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Professional Summary */}
              {profileData.professional_summary && (
                <div className={styles.dossierSection}>
                  <h3>Professional Summary</h3>
                  <p style={{ fontSize: '14px', color: '#495057', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {profileData.professional_summary}
                  </p>
                </div>
              )}

              {/* Skills Matrix */}
              {profileData.parsed_skills && profileData.parsed_skills.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Skills Matrix</h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {profileData.parsed_skills.map((skill, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 500, minWidth: '120px' }}>{skill.name}</span>
                        <div style={{ flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${(skill.proficiency / 5) * 100}%`,
                            height: '100%',
                            background: skill.proficiency >= 4 ? '#10b981' : skill.proficiency >= 3 ? '#f59e0b' : '#ef4444',
                            borderRadius: '4px',
                            transition: 'width 0.3s',
                          }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '24px' }}>{skill.proficiency}/5</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Timeline */}
              {profileData.parsed_experience && profileData.parsed_experience.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Experience</h3>
                  {profileData.parsed_experience.map((exp, i) => (
                    <div key={i} style={{ marginBottom: '16px', paddingLeft: '16px', borderLeft: '3px solid #e5e7eb' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{exp.role}</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>{exp.company} -- {exp.duration}</div>
                      {exp.achievements && (
                        <p style={{ fontSize: '13px', color: '#495057', marginTop: '4px' }}>{exp.achievements}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {profileData.parsed_education && profileData.parsed_education.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Education</h3>
                  {profileData.parsed_education.map((edu, i) => (
                    <div key={i} style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{edu.degree}</span>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}> -- {edu.institution}, {edu.year}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {profileData.parsed_certifications && profileData.parsed_certifications.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Certifications</h3>
                  {profileData.parsed_certifications.map((cert, i) => (
                    <div key={i} style={{ marginBottom: '6px', fontSize: '13px' }}>
                      <strong>{cert.name}</strong> -- {cert.issuer} ({cert.date})
                    </div>
                  ))}
                </div>
              )}

              {/* Languages */}
              {profileData.parsed_languages && profileData.parsed_languages.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Languages</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {profileData.parsed_languages.map((lang, i) => (
                      <span key={i} style={{
                        padding: '4px 10px',
                        borderRadius: '16px',
                        border: '1px solid #d1d5db',
                        fontSize: '13px',
                        background: lang.level === 'Native' ? '#d1fae5' : '#f3f4f6',
                      }}>
                        {lang.language} ({lang.level})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {profileData.parsed_projects && profileData.parsed_projects.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Notable Projects</h3>
                  {profileData.parsed_projects.map((proj, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>
                        {proj.name}
                        {proj.url && (
                          <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', fontSize: '12px', color: '#0066ff' }}>
                            <ExternalLink size={12} /> Link
                          </a>
                        )}
                      </div>
                      <p style={{ fontSize: '13px', color: '#495057', marginTop: '2px' }}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <User />
              <h3>Not yet parsed</h3>
              <p>No structured profile data available. Click &quot;Fill Manually&quot; to add skills, experience, and other structured data.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'evaluation' && (
        <div>
          {/* Composite Score Summary */}
          <div className={styles.dossierSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Composite Score</h3>
              <button className={styles.btnPrimary} onClick={() => setShowScorecardModal(true)}>
                <Plus size={14} /> Add Scorecard
              </button>
            </div>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>
              {renderStars(compositeScore, 20)}
            </div>
          </div>

          {/* Anti-Bias Toggle (Feature 3) */}
          {scores.length > 0 && !revealScores && (
            <div style={{
              padding: '12px 16px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ fontSize: '13px', color: '#1e40af' }}>
                <Eye size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Individual scores are hidden. Submit your own scorecard first to see other evaluations.
              </div>
              <button
                className={styles.btnSecondary}
                onClick={() => {
                  if (window.confirm('Have you submitted your own evaluation? Click OK to reveal all scores.')) {
                    setRevealScores(true);
                  }
                }}
                style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
              >
                <EyeOff size={12} /> Reveal Scores
              </button>
            </div>
          )}

          {/* Scorecards */}
          {scores.length === 0 ? (
            <div className={styles.emptyState}>
              <Star />
              <h3>No scorecards yet</h3>
              <p>Add a scorecard after interviewing this candidate.</p>
            </div>
          ) : (
            scores.map((sc) => (
              <div key={sc.id} className={styles.scorecardItem}>
                <div className={styles.scorecardHeader}>
                  <div>
                    <h4>{revealScores ? sc.interviewer_name : 'Interviewer (hidden)'}</h4>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {sc.interview_stage} - {formatDate(sc.created_at)}
                    </span>
                  </div>
                  {revealScores ? getRecommendationBadge(sc.recommendation) : (
                    <span style={{ fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' }}>Hidden</span>
                  )}
                </div>

                {revealScores ? (
                  <>
                    <div className={styles.scorecardDimensions}>
                      {SCORE_DIMENSIONS.map((dim) => {
                        const value = sc[dim.key as keyof CandidateScore] as number | null;
                        return (
                          <div key={dim.key} className={styles.scorecardDimension}>
                            <label>{dim.label}</label>
                            <div className={styles.scorecardBar}>
                              <div
                                className={styles.scorecardBarFill}
                                style={{
                                  width: value ? `${(value / 5) * 100}%` : '0%',
                                  background: getScoreColor(value),
                                }}
                              />
                            </div>
                            <span className={styles.scorecardBarValue} style={{ color: getScoreColor(value) }}>
                              {value !== null ? `${value}/5` : '--'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {sc.general_notes && (
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '12px', color: '#6b7280' }}>Notes:</strong>
                        <p style={{ fontSize: '13px', color: '#495057', marginTop: '4px', whiteSpace: 'pre-wrap' }}>
                          {sc.general_notes}
                        </p>
                      </div>
                    )}
                    {sc.key_quotes && (
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '12px', color: '#6b7280' }}>Key Quotes:</strong>
                        <p style={{ fontSize: '13px', color: '#495057', fontStyle: 'italic', marginTop: '4px' }}>
                          {sc.key_quotes}
                        </p>
                      </div>
                    )}
                    {sc.red_flags && (
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '12px', color: '#ef4444' }}>Red Flags:</strong>
                        <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '4px' }}>{sc.red_flags}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ padding: '16px', color: '#9ca3af', fontStyle: 'italic', fontSize: '13px', textAlign: 'center' }}>
                    Scores hidden until you reveal them
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Decision Tab (Feature 6) */}
      {activeTab === 'decision' && (
        <div>
          {!['culture_chat', 'offer', 'hired', 'rejected'].includes(candidate.status) ? (
            <div className={styles.emptyState}>
              <Award />
              <h3>Decision view available at later stages</h3>
              <p>The decision view becomes available when the candidate reaches the Culture Chat stage or later.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Current Decision */}
              {candidate.final_decision && (
                <div className={styles.dossierSection}>
                  <h3>Final Decision</h3>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '16px',
                    background: candidate.final_decision === 'hire' ? '#d1fae5' : candidate.final_decision === 'reject' ? '#fee2e2' : '#fef3c7',
                    borderRadius: '8px',
                  }}>
                    {candidate.final_decision === 'hire' && <CheckCircle size={24} color="#065f46" />}
                    {candidate.final_decision === 'reject' && <XCircle size={24} color="#991b1b" />}
                    {candidate.final_decision === 'on_hold' && <Minus size={24} color="#92400e" />}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '16px', textTransform: 'uppercase' }}>
                        {candidate.final_decision}
                      </div>
                      {candidate.decision_justification && (
                        <p style={{ fontSize: '13px', marginTop: '4px', color: '#4b5563' }}>
                          {candidate.decision_justification}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Score Comparison Matrix */}
              {scores.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Interviewer Scores Comparison</h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                          <th style={{ textAlign: 'left', padding: '8px', fontWeight: 600 }}>Dimension</th>
                          {scores.map((sc) => (
                            <th key={sc.id} style={{ textAlign: 'center', padding: '8px', fontWeight: 600 }}>
                              {sc.interviewer_name}
                              <div style={{ fontSize: '11px', fontWeight: 400, color: '#6b7280' }}>{sc.interview_stage}</div>
                            </th>
                          ))}
                          <th style={{ textAlign: 'center', padding: '8px', fontWeight: 600 }}>Spread</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SCORE_DIMENSIONS.map((dim) => {
                          const dimScores = scores
                            .map((sc) => sc[dim.key as keyof CandidateScore] as number | null)
                            .filter((v): v is number => v !== null);
                          const min = dimScores.length > 0 ? Math.min(...dimScores) : 0;
                          const max = dimScores.length > 0 ? Math.max(...dimScores) : 0;
                          const spread = max - min;
                          const isConsensus = spread <= 1 && dimScores.length > 1;
                          const isDisagreement = spread > 2;

                          return (
                            <tr key={dim.key} style={{
                              borderBottom: '1px solid #f3f4f6',
                              background: isConsensus ? '#f0fdf4' : isDisagreement ? '#fef2f2' : 'transparent',
                            }}>
                              <td style={{ padding: '8px', fontWeight: 500 }}>{dim.label}</td>
                              {scores.map((sc) => {
                                const value = sc[dim.key as keyof CandidateScore] as number | null;
                                return (
                                  <td key={sc.id} style={{ textAlign: 'center', padding: '8px' }}>
                                    <span style={{ color: getScoreColor(value), fontWeight: 600 }}>
                                      {value !== null ? `${value}/5` : '--'}
                                    </span>
                                  </td>
                                );
                              })}
                              <td style={{
                                textAlign: 'center', padding: '8px', fontWeight: 600,
                                color: isConsensus ? '#16a34a' : isDisagreement ? '#dc2626' : '#6b7280',
                              }}>
                                {dimScores.length > 1 ? spread : '--'}
                                {isConsensus && ' (consensus)'}
                                {isDisagreement && ' (disagree)'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Recommendation Distribution */}
              {scores.length > 0 && (
                <div className={styles.dossierSection}>
                  <h3>Recommendation Distribution</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {(['strong_yes', 'lean_yes', 'neutral', 'lean_no', 'strong_no'] as const).map((rec) => {
                      const count = scores.filter((s) => s.recommendation === rec).length;
                      const colors: Record<string, { bg: string; text: string }> = {
                        strong_yes: { bg: '#d1fae5', text: '#065f46' },
                        lean_yes: { bg: '#e0f2fe', text: '#0369a1' },
                        neutral: { bg: '#f3f4f6', text: '#6b7280' },
                        lean_no: { bg: '#fef3c7', text: '#92400e' },
                        strong_no: { bg: '#fee2e2', text: '#991b1b' },
                      };
                      const c = colors[rec];
                      return (
                        <div key={rec} style={{
                          padding: '10px 16px',
                          borderRadius: '8px',
                          background: c.bg,
                          color: c.text,
                          textAlign: 'center',
                          minWidth: '80px',
                        }}>
                          <div style={{ fontSize: '20px', fontWeight: 700 }}>{count}</div>
                          <div style={{ fontSize: '11px', textTransform: 'capitalize' }}>{rec.replace(/_/g, ' ')}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Decision rule */}
                  {(() => {
                    const positives = scores.filter((s) => s.recommendation === 'strong_yes' || s.recommendation === 'lean_yes').length;
                    const total = scores.filter((s) => s.recommendation).length;
                    const threshold = Math.ceil(total * 0.67);
                    const pass = positives >= threshold && total > 0;
                    return (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: `2px solid ${pass ? '#16a34a' : '#dc2626'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        {pass ? <CheckCircle size={18} color="#16a34a" /> : <XCircle size={18} color="#dc2626" />}
                        <span style={{ fontSize: '13px' }}>
                          Decision rule: {threshold > 0 ? `${threshold} out of ${total}` : '2 out of 3'} Lean Yes or better required --{' '}
                          <strong style={{ color: pass ? '#16a34a' : '#dc2626' }}>{pass ? 'PASS' : 'FAIL'}</strong>
                          {' '}({positives} positive{positives !== 1 ? 's' : ''})
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Record Decision Button */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className={styles.btnPrimary} onClick={() => setShowDecisionModal(true)}>
                  <Award size={14} /> Record Decision
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className={styles.dossierSection}>
          <h3>Activity Timeline</h3>
          {history.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>No history yet.</p>
          ) : (
            <div className={styles.timelineList}>
              {history.map((entry) => {
                const isStatusChange = entry.action === 'status_changed';
                const bgColor = isStatusChange && entry.to_status
                  ? (CANDIDATE_STATUS_MAP[entry.to_status]?.color || '#6b7280')
                  : '#6b7280';
                return (
                  <div key={entry.id} className={styles.timelineItem}>
                    <div
                      className={styles.timelineIcon}
                      style={{ background: bgColor, color: '#fff' }}
                    >
                      {isStatusChange ? <ChevronRight /> : <MessageSquare />}
                    </div>
                    <div className={styles.timelineContent}>
                      <h4>
                        {isStatusChange ? (
                          <>
                            {entry.from_status && getCandidateStatusBadge(entry.from_status)}
                            <span style={{ margin: '0 6px', color: '#9ca3af' }}>&rarr;</span>
                            {entry.to_status && getCandidateStatusBadge(entry.to_status)}
                          </>
                        ) : (
                          entry.action.replace(/_/g, ' ')
                        )}
                      </h4>
                      {entry.notes && (
                        <p style={{ color: '#6b7280' }}>{entry.notes}</p>
                      )}
                      <div className={styles.timelineDate}>
                        {formatDateTime(entry.created_at)} by {entry.performed_by}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'references' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>References</h3>
            <button className={styles.btnPrimary} onClick={() => setShowReferenceModal(true)}>
              <Plus size={14} /> Request Reference
            </button>
          </div>

          {references.length === 0 ? (
            <div className={styles.emptyState}>
              <Users />
              <h3>No references yet</h3>
              <p>Add a reference request for this candidate.</p>
            </div>
          ) : (
            references.map((ref) => (
              <div key={ref.id} className={styles.refCard}>
                <div className={styles.refHeader}>
                  <div>
                    <h4>{ref.referee_name}</h4>
                    <p>
                      {ref.referee_relationship && `${ref.referee_relationship} `}
                      {ref.referee_company && `at ${ref.referee_company}`}
                    </p>
                  </div>
                  {getReferenceStatusBadge(ref.status)}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                  <a href={`mailto:${ref.referee_email}`} style={{ color: '#1EBCC5' }}>{ref.referee_email}</a>
                </div>
                {ref.status === 'completed' && (
                  <>
                    <div className={styles.refRatings}>
                      {[
                        { key: 'technical_competence', label: 'Technical' },
                        { key: 'reliability', label: 'Reliability' },
                        { key: 'communication', label: 'Comm.' },
                        { key: 'teamwork', label: 'Teamwork' },
                        { key: 'initiative', label: 'Initiative' },
                      ].map((dim) => {
                        const val = ref[dim.key as keyof CandidateReference] as number | null;
                        return (
                          <div key={dim.key} className={styles.refRating}>
                            <label>{dim.label}</label>
                            <span style={{ color: getScoreColor(val) }}>{val || '--'}/5</span>
                          </div>
                        );
                      })}
                    </div>
                    {ref.strengths && (
                      <div style={{ marginTop: '12px' }}>
                        <strong style={{ fontSize: '12px', color: '#6b7280' }}>Strengths:</strong>
                        <p style={{ fontSize: '13px', marginTop: '2px' }}>{ref.strengths}</p>
                      </div>
                    )}
                    {ref.improvements && (
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '12px', color: '#6b7280' }}>Areas for improvement:</strong>
                        <p style={{ fontSize: '13px', marginTop: '2px' }}>{ref.improvements}</p>
                      </div>
                    )}
                    {ref.would_rehire && (
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '12px', color: '#6b7280' }}>Would rehire:</strong>{' '}
                        <span style={{ fontSize: '13px' }}>
                          {ref.would_rehire === 'yes' ? 'Yes' : ref.would_rehire === 'no' ? 'No' : 'With reservations'}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          {/* Notes Section */}
          <div className={styles.dossierSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Notes</h3>
              <button className={styles.btnSecondary} onClick={() => setShowNoteModal(true)}>
                <Plus size={14} /> Add Note
              </button>
            </div>
            {notes.length === 0 ? (
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>No notes yet.</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className={styles.noteItem}>
                  <div className={styles.noteHeader}>
                    <strong>{note.author}</strong>
                    <span className={styles.atsCandidateCardSource}>{note.note_type}</span>
                    <span>{formatDateTime(note.created_at)}</span>
                  </div>
                  <div className={styles.noteContent}>{note.content}</div>
                </div>
              ))
            )}
          </div>

          {/* Attachments Section */}
          <div className={styles.dossierSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Attachments</h3>
              <label className={styles.btnSecondary} style={{ cursor: 'pointer' }}>
                <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload File'}
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            {attachments.length === 0 ? (
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>No attachments yet.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {attachments.map((att) => (
                  <li key={att.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid #f1f3f5',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Paperclip size={14} color="#6b7280" />
                      <span style={{ fontSize: '14px' }}>{att.file_name}</span>
                      <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                        by {att.uploaded_by} - {formatDate(att.created_at)}
                      </span>
                    </div>
                    <a
                      href={att.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.btnGhost} ${styles.btnSmall}`}
                    >
                      <Download size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ---- MODALS ---- */}

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className={styles.modalOverlay} onClick={() => setShowStatusModal(false)}>
          <div className={`${styles.modal} ${styles.statusModal}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Change Status</h2>
              <button className={styles.modalClose} onClick={() => setShowStatusModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                Current: {getCandidateStatusBadge(candidate.status)}
              </p>
              <div className={styles.statusGrid}>
                {PIPELINE_STATUSES.filter((s) => s !== candidate.status).map((s) => {
                  const info = CANDIDATE_STATUS_MAP[s];
                  return (
                    <button
                      key={s}
                      className={`${styles.statusOption} ${newStatus === s ? styles.statusOptionActive : ''}`}
                      onClick={() => setNewStatus(s)}
                      style={newStatus === s ? { borderColor: info.color, color: info.color } : {}}
                    >
                      {info.label}
                    </button>
                  );
                })}
              </div>

              {newStatus === 'rejected' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Rejection Reason *</label>
                    <input
                      className={styles.formInput}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="e.g., Not enough experience, Failed technical..."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Rejection Notes</label>
                    <textarea
                      className={styles.formTextarea}
                      value={rejectionNotes}
                      onChange={(e) => setRejectionNotes(e.target.value)}
                      rows={2}
                      placeholder="Additional notes..."
                    />
                  </div>
                  <div className={styles.formCheckbox}>
                    <input
                      type="checkbox"
                      id="keepInPool"
                      checked={keepInPool}
                      onChange={(e) => setKeepInPool(e.target.checked)}
                    />
                    <label htmlFor="keepInPool">Keep in talent pool for future roles</label>
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Note (optional)</label>
                <textarea
                  className={styles.formTextarea}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={2}
                  placeholder="Add a note about this status change..."
                  style={{ minHeight: '60px' }}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowStatusModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleStatusChange} disabled={!newStatus || statusSaving}>
                {statusSaving ? 'Saving...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className={styles.modalOverlay} onClick={() => setShowNoteModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add Note</h2>
              <button className={styles.modalClose} onClick={() => setShowNoteModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                <label className={styles.formLabel}>Type</label>
                <select
                  className={styles.formSelect}
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as CandidateNoteType)}
                >
                  <option value="general">General</option>
                  <option value="interview">Interview</option>
                  <option value="reference">Reference</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Content</label>
                <textarea
                  className={styles.formTextarea}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  placeholder="Write your note..."
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowNoteModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleAddNote} disabled={!noteContent.trim() || noteSaving}>
                {noteSaving ? 'Saving...' : 'Add Note'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Scorecard Modal */}
      {showScorecardModal && (
        <div className={styles.modalOverlay} onClick={() => setShowScorecardModal(false)}>
          <div className={`${styles.modal} ${styles.modalLarge}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add Scorecard</h2>
              <button className={styles.modalClose} onClick={() => setShowScorecardModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <div className={styles.formRow} style={{ marginBottom: '16px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Interviewer Name *</label>
                  <input className={styles.formInput} value={scInterviewerName} onChange={(e) => setScInterviewerName(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Interview Stage *</label>
                  <select className={styles.formSelect} value={scStage} onChange={(e) => setScStage(e.target.value)}>
                    <option value="">Select stage...</option>
                    <option value="Phone Screen">Phone Screen</option>
                    <option value="Technical Interview">Technical Interview</option>
                    <option value="Team Interview">Team Interview</option>
                    <option value="Culture Chat">Culture Chat</option>
                    <option value="Final Round">Final Round</option>
                  </select>
                </div>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#343a40', marginBottom: '12px' }}>
                Dimension Scores (1-5)
              </h4>

              {SCORE_DIMENSIONS.map((dim) => (
                <div key={dim.key} style={{ marginBottom: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500 }}>{dim.label}</label>
                    <div className={styles.scoreInput}>
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          className={scScores[dim.key] === v ? styles.scoreInputActive : ''}
                          style={scScores[dim.key] === v ? { background: getScoreColor(v), color: '#fff', borderColor: 'transparent' } : {}}
                          onClick={() => setScScores((prev) => ({ ...prev, [dim.key]: prev[dim.key] === v ? null : v }))}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    className={styles.formInput}
                    placeholder={`Notes for ${dim.label}...`}
                    value={scNotes[`${dim.key}_notes`] || ''}
                    onChange={(e) => setScNotes((prev) => ({ ...prev, [`${dim.key}_notes`]: e.target.value }))}
                    rows={1}
                    style={{ minHeight: '32px', fontSize: '12px' }}
                  />
                </div>
              ))}

              {/* Position-Specific Criteria (Feature 2) */}
              {positionCriteria.length > 0 && (
                <>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#343a40', marginTop: '16px', marginBottom: '12px' }}>
                    Position-Specific Criteria
                  </h4>
                  {positionCriteria.map((crit) => (
                    <div key={crit.id} style={{ marginBottom: '12px', padding: '12px', background: '#fefce8', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 500 }}>
                          {crit.name}
                          <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '6px' }}>
                            (weight: {crit.weight})
                          </span>
                        </label>
                      </div>
                      {crit.description && (
                        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>{crit.description}</p>
                      )}
                      <p style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic' }}>
                        Custom criteria scoring is tracked at the job level
                      </p>
                    </div>
                  ))}
                </>
              )}

              <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                <label className={styles.formLabel}>Recommendation</label>
                <select className={styles.formSelect} value={scRecommendation} onChange={(e) => setScRecommendation(e.target.value as ScoreRecommendation)}>
                  <option value="">Select...</option>
                  <option value="strong_no">Strong No</option>
                  <option value="lean_no">Lean No</option>
                  <option value="neutral">Neutral</option>
                  <option value="lean_yes">Lean Yes</option>
                  <option value="strong_yes">Strong Yes</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                <label className={styles.formLabel}>General Notes</label>
                <textarea className={styles.formTextarea} value={scGeneralNotes} onChange={(e) => setScGeneralNotes(e.target.value)} rows={3} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Key Quotes</label>
                  <textarea className={styles.formInput} value={scKeyQuotes} onChange={(e) => setScKeyQuotes(e.target.value)} rows={2} style={{ minHeight: '50px', resize: 'vertical' }} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Red Flags</label>
                  <textarea className={styles.formInput} value={scRedFlags} onChange={(e) => setScRedFlags(e.target.value)} rows={2} style={{ minHeight: '50px', resize: 'vertical' }} />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowScorecardModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleAddScorecard} disabled={scSaving}>
                {scSaving ? 'Submitting...' : 'Submit Scorecard'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Reference Modal */}
      {showReferenceModal && (
        <div className={styles.modalOverlay} onClick={() => setShowReferenceModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Request Reference</h2>
              <button className={styles.modalClose} onClick={() => setShowReferenceModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                <label className={styles.formLabel}>Referee Name *</label>
                <input className={styles.formInput} value={refName} onChange={(e) => setRefName(e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                <label className={styles.formLabel}>Referee Email *</label>
                <input className={styles.formInput} type="email" value={refEmail} onChange={(e) => setRefEmail(e.target.value)} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Relationship</label>
                  <input className={styles.formInput} value={refRelationship} onChange={(e) => setRefRelationship(e.target.value)} placeholder="e.g., Former Manager" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Company</label>
                  <input className={styles.formInput} value={refCompany} onChange={(e) => setRefCompany(e.target.value)} />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowReferenceModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleAddReference} disabled={refSaving}>
                {refSaving ? 'Saving...' : 'Request Reference'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCompareModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Compare with Other Candidates</h2>
              <button className={styles.modalClose} onClick={() => setShowCompareModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                Select up to 3 other candidates to compare side-by-side.
                {candidate.job_title && ` Showing candidates for ${candidate.job_title}.`}
              </p>
              {compareCandidates.length === 0 ? (
                <div>
                  <button
                    className={styles.btnSecondary}
                    onClick={async () => {
                      try {
                        const url = candidate.job_id
                          ? `/api/candidates?job_id=${candidate.job_id}&limit=20`
                          : '/api/candidates?limit=20';
                        const res = await fetch(url);
                        const data = await res.json();
                        if (data.success) {
                          setCompareCandidates(
                            (data.data || [])
                              .filter((c: { id: number }) => c.id !== candidate.id)
                              .map((c: { id: number; full_name: string }) => ({ id: c.id, full_name: c.full_name }))
                          );
                        }
                      } catch {
                        // silent
                      }
                    }}
                  >
                    Load Candidates
                  </button>
                </div>
              ) : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {compareCandidates.map((c) => (
                    <label
                      key={c.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px',
                        borderBottom: '1px solid #f3f4f6', cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCompareIds.includes(c.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (selectedCompareIds.length < 3) {
                              setSelectedCompareIds([...selectedCompareIds, c.id]);
                            }
                          } else {
                            setSelectedCompareIds(selectedCompareIds.filter((id) => id !== c.id));
                          }
                        }}
                        disabled={!selectedCompareIds.includes(c.id) && selectedCompareIds.length >= 3}
                      />
                      <span style={{ fontSize: '14px' }}>{c.full_name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowCompareModal(false)}>Cancel</button>
              <button
                className={styles.btnPrimary}
                disabled={selectedCompareIds.length === 0}
                onClick={() => {
                  const ids = [candidate.id, ...selectedCompareIds].join(',');
                  router.push(`/admin/candidates/compare?ids=${ids}`);
                }}
              >
                Compare ({selectedCompareIds.length + 1} candidates)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decision Modal (Feature 6) */}
      {showDecisionModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDecisionModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Record Final Decision</h2>
              <button className={styles.modalClose} onClick={() => setShowDecisionModal(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label className={styles.formLabel}>Decision *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['hire', 'reject', 'on_hold'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDecisionValue(d)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: decisionValue === d ? '2px solid' : '1px solid #d1d5db',
                        borderColor: decisionValue === d
                          ? (d === 'hire' ? '#16a34a' : d === 'reject' ? '#dc2626' : '#f59e0b')
                          : '#d1d5db',
                        background: decisionValue === d
                          ? (d === 'hire' ? '#d1fae5' : d === 'reject' ? '#fee2e2' : '#fef3c7')
                          : '#fff',
                        color: d === 'hire' ? '#065f46' : d === 'reject' ? '#991b1b' : '#92400e',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                      }}
                    >
                      {d === 'on_hold' ? 'On Hold' : d}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Justification</label>
                <textarea
                  className={styles.formTextarea}
                  value={decisionJustification}
                  onChange={(e) => setDecisionJustification(e.target.value)}
                  rows={4}
                  placeholder="Explain the reasoning behind this decision..."
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setShowDecisionModal(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleRecordDecision} disabled={!decisionValue || decisionSaving}>
                {decisionSaving ? 'Saving...' : 'Record Decision'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Candidate"
        message="Are you sure you want to permanently delete this candidate and all associated data (notes, scores, references, history)? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        loading={deleting}
      />
    </div>
  );
}
