// =============================================================================
// TypeScript type definitions — pCloud Employee Branding
// Mirrors the SQLite database schema (English only)
// =============================================================================

// ---------------------------------------------------------------------------
// Database entities
// ---------------------------------------------------------------------------

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string;
  author: string;
  author_title: string | null;
  author_image: string | null;
  cover_image: string | null;
  read_time: string | null;
  is_featured: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  title: string;
  slug: string;
  department: string;
  product: string;
  seniority: string;
  location: string | null;
  salary_range: string | null;
  employment_type: string;
  description: string;
  requirements: string | null;
  nice_to_have: string | null;
  benefits: string | null;
  cover_image: string | null;
  is_new: number;
  is_high_priority: number;
  is_published: number;
  tags: string | null;
  challenges: string | null;
  team_name: string | null;
  team_size: string | null;
  team_lead: string | null;
  team_quote: string | null;
  team_photo: string | null;
  tech_stack: string | null;
  what_youll_learn: string | null;
  interview_template_id: number | null;
  process_template_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  photo: string | null;
  department: string | null;
  sort_order: number;
  is_published: number;
  created_at: string;
}

export interface Application {
  id: number;
  job_id: number | null;
  name: string;
  email: string;
  cv_path: string | null;
  cover_letter: string | null;
  status: ApplicationStatus;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Parsed CV profile types (Feature 1: Standardized CV Template View)
// ---------------------------------------------------------------------------

export interface ParsedSkill { name: string; proficiency: number; }
export interface ParsedExperience { company: string; role: string; duration: string; achievements: string; }
export interface ParsedEducation { institution: string; degree: string; year: string; }
export interface ParsedCertification { name: string; issuer: string; date: string; }
export interface ParsedLanguage { language: string; level: 'Native' | 'Fluent' | 'Intermediate' | 'Basic'; }
export interface ParsedProject { name: string; description: string; url: string; }

// ---------------------------------------------------------------------------
// Position-Specific Scoring (Feature 2)
// ---------------------------------------------------------------------------

export interface PositionCriterion {
  id: number;
  job_id: number;
  name: string;
  description: string | null;
  weight: number;
  sort_order: number;
}

export interface CustomScore {
  id: number;
  score_id: number;
  criterion_id: number;
  score: number | null;
  notes: string | null;
}

export interface CustomScoreWithCriterion extends CustomScore {
  criterion_name: string;
  criterion_weight: number;
}

// ---------------------------------------------------------------------------
// ATS (Applicant Tracking System) entities
// ---------------------------------------------------------------------------

export interface Candidate {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  photo: string | null;
  job_id: number | null;
  cover_message: string | null;
  cv_path: string | null;
  cv_original_name: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  website_url: string | null;
  source: string;
  referrer_name: string | null;
  referrer_email: string | null;
  referrer_company: string | null;
  is_internal_referral: number;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  earliest_start: string | null;
  work_model: string;
  status: CandidateStatus;
  previous_status: string | null;
  status_changed_at: string;
  composite_score: number | null;
  rejection_reason: string | null;
  rejection_notes: string | null;
  keep_in_talent_pool: number;
  is_returning: number;
  previous_candidate_id: number | null;
  // Parsed CV profile fields
  parsed_skills: string | null;
  parsed_experience: string | null;
  parsed_education: string | null;
  parsed_certifications: string | null;
  parsed_languages: string | null;
  parsed_projects: string | null;
  professional_summary: string | null;
  // Decision fields
  final_decision: string | null;
  decision_justification: string | null;
  is_archived: number;
  created_at: string;
  updated_at: string;
}

export interface CandidateNote {
  id: number;
  candidate_id: number;
  author: string;
  content: string;
  note_type: CandidateNoteType;
  created_at: string;
}

export interface CandidateScore {
  id: number;
  candidate_id: number;
  interviewer_name: string;
  interview_stage: string;
  technical_depth: number | null;
  problem_solving: number | null;
  ownership: number | null;
  communication: number | null;
  cultural_add: number | null;
  growth_potential: number | null;
  technical_depth_notes: string | null;
  problem_solving_notes: string | null;
  ownership_notes: string | null;
  communication_notes: string | null;
  cultural_add_notes: string | null;
  growth_potential_notes: string | null;
  recommendation: ScoreRecommendation | null;
  general_notes: string | null;
  key_quotes: string | null;
  red_flags: string | null;
  created_at: string;
}

export interface CandidateReference {
  id: number;
  candidate_id: number;
  referee_name: string;
  referee_email: string;
  referee_relationship: string | null;
  referee_company: string | null;
  token: string | null;
  duration_worked: string | null;
  technical_competence: number | null;
  reliability: number | null;
  communication: number | null;
  teamwork: number | null;
  initiative: number | null;
  strengths: string | null;
  improvements: string | null;
  would_rehire: ReferenceWouldRehire | null;
  additional_comments: string | null;
  status: ReferenceStatus;
  requested_at: string;
  completed_at: string | null;
}

export interface CandidateHistory {
  id: number;
  candidate_id: number;
  action: string;
  from_status: string | null;
  to_status: string | null;
  performed_by: string;
  notes: string | null;
  created_at: string;
}

export interface CandidateAttachment {
  id: number;
  candidate_id: number;
  file_path: string;
  file_name: string;
  file_type: string | null;
  uploaded_by: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  created_at: string;
}

export interface PostTag {
  post_id: number;
  tag_id: number;
}

export interface CompanySetting {
  key: string;
  value: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface TechStack {
  id: number;
  name: string;
  created_at: string;
}

export interface LegalPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  last_updated: string;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface InterviewTemplate {
  id: number;
  name: string;
  description: string | null;
  overall_timeline: string;
  overall_label: string;
  feedback_label: string;
  subtitle: string | null;
  is_default: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface InterviewStage {
  id: number;
  template_id: number;
  stage_number: number;
  title: string;
  duration: string;
  description: string;
  focus: string;
  timeline: string;
  icon: string;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface CandidateValue {
  id: number;
  title: string;
  description: string;
  image: string | null;
  sort_order: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface PCloudBarCriterion {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface ProcessHighlight {
  id: number;
  label: string;
  detail: string;
  sort_order: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface DefaultBenefit {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

/** Interview template with its stages loaded */
export interface InterviewTemplateWithStages extends InterviewTemplate {
  stages: InterviewStage[];
}

export interface ProcessTemplate {
  id: number;
  name: string;
  description: string | null;
  intro_text: string | null;
  is_default: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface ProcessStep {
  id: number;
  template_id: number;
  step_number: number;
  label: string;
  detail: string;
  is_published: number;
  created_at: string;
  updated_at: string;
}

/** Process template with its steps loaded */
export interface ProcessTemplateWithSteps extends ProcessTemplate {
  steps: ProcessStep[];
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface GalleryPhoto {
  id: number;
  category_id: number;
  image: string;
  alt_text: string | null;
  sort_order: number;
  is_published: number;
  created_at: string;
}

export interface GalleryPhotoWithCategory extends GalleryPhoto {
  category_name: string;
  category_slug: string;
}

export interface TeamStory {
  id: number;
  name: string;
  role: string;
  photo: string | null;
  quote: string;
  sort_order: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: number;
  name: string;
  slug: string;
  subject: string;
  body: string;
  template_type: EmailTemplateType;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface TechnicalTask {
  id: number;
  job_id: number | null;
  title: string;
  description: string;
  instructions: string;
  deadline_days: number;
  is_active: number;
  created_at: string;
}

export interface TechnicalTaskWithJob extends TechnicalTask {
  job_title?: string;
}

export interface CandidateTaskSubmission {
  id: number;
  candidate_id: number;
  task_id: number;
  submission_token: string;
  file_path: string | null;
  notes: string | null;
  score: number | null;
  reviewer_notes: string | null;
  status: TaskSubmissionStatus;
  deadline: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface CandidateTaskSubmissionWithDetails extends CandidateTaskSubmission {
  task_title?: string;
  candidate_name?: string;
}

// ---------------------------------------------------------------------------
// Enums / Literal types
// ---------------------------------------------------------------------------

export type ApplicationStatus =
  | 'new'
  | 'reviewed'
  | 'interview'
  | 'rejected'
  | 'accepted';

export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Remote';

// ATS Pipeline statuses
export type CandidateStatus =
  | 'new'
  | 'screening'
  | 'phone_screen'
  | 'technical'
  | 'team_interview'
  | 'culture_chat'
  | 'offer'
  | 'hired'
  | 'rejected'
  | 'on_hold'
  | 'withdrawn';

export const CANDIDATE_STATUSES: CandidateStatus[] = [
  'new', 'screening', 'phone_screen', 'technical',
  'team_interview', 'culture_chat', 'offer', 'hired',
  'rejected', 'on_hold', 'withdrawn',
];

export type CandidateNoteType = 'general' | 'interview' | 'reference' | 'system';

export const CANDIDATE_NOTE_TYPES: CandidateNoteType[] = [
  'general', 'interview', 'reference', 'system',
];

export type ScoreRecommendation =
  | 'strong_no'
  | 'lean_no'
  | 'neutral'
  | 'lean_yes'
  | 'strong_yes';

export const SCORE_RECOMMENDATIONS: ScoreRecommendation[] = [
  'strong_no', 'lean_no', 'neutral', 'lean_yes', 'strong_yes',
];

export type ReferenceStatus = 'pending' | 'sent' | 'completed' | 'expired';

export const REFERENCE_STATUSES: ReferenceStatus[] = [
  'pending', 'sent', 'completed', 'expired',
];

export type ReferenceWouldRehire = 'yes' | 'with_reservations' | 'no';

export type EmailTemplateType =
  | 'application_confirmation'
  | 'rejection'
  | 'offer'
  | 'reference_request'
  | 'interview_invitation'
  | 'status_update';

export const EMAIL_TEMPLATE_TYPES: EmailTemplateType[] = [
  'application_confirmation', 'rejection', 'offer',
  'reference_request', 'interview_invitation', 'status_update',
];

export type TaskSubmissionStatus = 'pending' | 'submitted' | 'reviewed';

export const TASK_SUBMISSION_STATUSES: TaskSubmissionStatus[] = [
  'pending', 'submitted', 'reviewed',
];

export type CandidateSource =
  | 'Direct'
  | 'LinkedIn'
  | 'Referral'
  | 'Job Board'
  | 'Conference'
  | 'Other';

export const CANDIDATE_SOURCES: CandidateSource[] = [
  'Direct', 'LinkedIn', 'Referral', 'Job Board', 'Conference', 'Other',
];

export type WorkModel = 'On-site Sofia' | 'Hybrid' | 'Remote';

export const WORK_MODELS: WorkModel[] = [
  'On-site Sofia', 'Hybrid', 'Remote',
];

// ---------------------------------------------------------------------------
// Extended / joined types (for API responses)
// ---------------------------------------------------------------------------

/** Post with its associated tag names */
export interface PostWithTags extends Post {
  tags: string[];
}

/** Application with the job title */
export interface ApplicationWithJob extends Application {
  job_title?: string;
  job_slug?: string;
}

/** Candidate with job info from JOIN */
export interface CandidateWithJob extends Candidate {
  job_title?: string;
  job_slug?: string;
  job_department?: string;
}

/** Category with post count */
export interface CategoryWithCount extends Category {
  post_count: number;
}

/** Tag with post count */
export interface TagWithCount extends Tag {
  post_count: number;
}

/** Gallery category with photo count */
export interface GalleryCategoryWithCount extends GalleryCategory {
  photo_count: number;
}

// ---------------------------------------------------------------------------
// API types
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// ---------------------------------------------------------------------------
// Page params
// ---------------------------------------------------------------------------

export interface SlugParams {
  slug: string;
}

export interface IdParams {
  id: string;
}

// ---------------------------------------------------------------------------
// Analytics types
// ---------------------------------------------------------------------------

export interface PipelineCount {
  status: string;
  count: number;
}

export interface SourceStat {
  source: string;
  total: number;
  hired: number;
  conversion_rate: number;
}

export interface StageConversion {
  from_stage: string;
  to_stage: string;
  count: number;
  percentage: number;
}

export interface MonthlyApplication {
  month: string;
  count: number;
}

export interface AnalyticsData {
  pipeline_counts: PipelineCount[];
  source_stats: SourceStat[];
  avg_time_to_hire: number;
  avg_time_to_first_action: number;
  stage_conversions: StageConversion[];
  monthly_applications: MonthlyApplication[];
  avg_scores: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Filter / query types
// ---------------------------------------------------------------------------

export interface JobFilters {
  department?: string;
  product?: string;
  seniority?: string;
  search?: string;
}

export interface PostFilters {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}
