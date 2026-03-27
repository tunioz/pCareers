// =============================================================================
// Validation schemas -- manual validation (English only)
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isOptionalString(value: unknown): value is string | undefined | null {
  return value === undefined || value === null || typeof value === 'string';
}

function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value);
}

function isBooleanLike(value: unknown): value is number {
  return value === 0 || value === 1;
}

// ---------------------------------------------------------------------------
// Post validation
// ---------------------------------------------------------------------------

export interface PostInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  author: string;
  author_title?: string;
  author_image?: string;
  cover_image?: string;
  read_time?: string;
  is_featured?: number;
  is_published?: number;
}

export function validatePost(data: unknown): ValidationResult<PostInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.slug)) errors.push({ field: 'slug', message: 'Slug is required' });
  if (!isNonEmptyString(d.content)) errors.push({ field: 'content', message: 'Content is required' });
  if (!isNonEmptyString(d.category)) errors.push({ field: 'category', message: 'Category is required' });
  if (!isNonEmptyString(d.author)) errors.push({ field: 'author', message: 'Author is required' });
  if (!isOptionalString(d.excerpt)) errors.push({ field: 'excerpt', message: 'Excerpt must be a string' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      slug: (d.slug as string).trim(),
      content: (d.content as string).trim(),
      excerpt: isNonEmptyString(d.excerpt) ? d.excerpt.trim() : undefined,
      category: (d.category as string).trim(),
      author: (d.author as string).trim(),
      author_title: isNonEmptyString(d.author_title) ? (d.author_title as string).trim() : undefined,
      author_image: isNonEmptyString(d.author_image) ? (d.author_image as string).trim() : undefined,
      cover_image: isNonEmptyString(d.cover_image) ? (d.cover_image as string).trim() : undefined,
      read_time: isNonEmptyString(d.read_time) ? (d.read_time as string).trim() : undefined,
      is_featured: isBooleanLike(d.is_featured) ? d.is_featured : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 0,
    },
  };
}

// ---------------------------------------------------------------------------
// Job validation
// ---------------------------------------------------------------------------

export interface JobInput {
  title: string;
  slug: string;
  department: string;
  product: string;
  seniority: string;
  location?: string;
  salary_range?: string;
  employment_type?: string;
  description: string;
  requirements?: string;
  nice_to_have?: string;
  benefits?: string;
  cover_image?: string;
  is_new?: number;
  is_high_priority?: number;
  is_published?: number;
  tags?: string;
  challenges?: string;
  team_name?: string;
  team_size?: string;
  team_lead?: string;
  team_quote?: string;
  team_photo?: string;
  tech_stack?: string;
  what_youll_learn?: string;
  interview_template_id?: number | null;
  process_template_id?: number | null;
}

export function validateJob(data: unknown): ValidationResult<JobInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.slug)) errors.push({ field: 'slug', message: 'Slug is required' });
  if (!isNonEmptyString(d.department)) errors.push({ field: 'department', message: 'Department is required' });
  if (!isNonEmptyString(d.product)) errors.push({ field: 'product', message: 'Product is required' });
  if (!isNonEmptyString(d.seniority)) errors.push({ field: 'seniority', message: 'Seniority is required' });
  if (!isNonEmptyString(d.description)) errors.push({ field: 'description', message: 'Description is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      slug: (d.slug as string).trim(),
      department: (d.department as string).trim(),
      product: (d.product as string).trim(),
      seniority: (d.seniority as string).trim(),
      location: isNonEmptyString(d.location) ? (d.location as string).trim() : undefined,
      salary_range: isNonEmptyString(d.salary_range) ? (d.salary_range as string).trim() : undefined,
      employment_type: isNonEmptyString(d.employment_type) ? (d.employment_type as string).trim() : 'Full-time',
      description: (d.description as string).trim(),
      requirements: isNonEmptyString(d.requirements) ? (d.requirements as string).trim() : undefined,
      nice_to_have: isNonEmptyString(d.nice_to_have) ? (d.nice_to_have as string).trim() : undefined,
      benefits: isNonEmptyString(d.benefits) ? (d.benefits as string).trim() : undefined,
      cover_image: isNonEmptyString(d.cover_image) ? (d.cover_image as string).trim() : undefined,
      is_new: isBooleanLike(d.is_new) ? d.is_new : 0,
      is_high_priority: isBooleanLike(d.is_high_priority) ? d.is_high_priority : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 0,
      tags: isNonEmptyString(d.tags) ? (d.tags as string).trim() : undefined,
      challenges: isNonEmptyString(d.challenges) ? (d.challenges as string).trim() : undefined,
      team_name: isNonEmptyString(d.team_name) ? (d.team_name as string).trim() : undefined,
      team_size: isNonEmptyString(d.team_size) ? (d.team_size as string).trim() : undefined,
      team_lead: isNonEmptyString(d.team_lead) ? (d.team_lead as string).trim() : undefined,
      team_quote: isNonEmptyString(d.team_quote) ? (d.team_quote as string).trim() : undefined,
      team_photo: isNonEmptyString(d.team_photo) ? (d.team_photo as string).trim() : undefined,
      tech_stack: isNonEmptyString(d.tech_stack) ? (d.tech_stack as string).trim() : undefined,
      what_youll_learn: isNonEmptyString(d.what_youll_learn) ? (d.what_youll_learn as string).trim() : undefined,
      interview_template_id: isInteger(d.interview_template_id) ? d.interview_template_id : (d.interview_template_id === null ? null : undefined),
      process_template_id: isInteger(d.process_template_id) ? d.process_template_id : (d.process_template_id === null ? null : undefined),
    },
  };
}

// ---------------------------------------------------------------------------
// Application validation (legacy)
// ---------------------------------------------------------------------------

export interface ApplicationInput {
  job_id: number;
  name: string;
  email: string;
  cv_path?: string;
  cover_letter?: string;
}

export function validateApplication(data: unknown): ValidationResult<ApplicationInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isInteger(d.job_id) || (d.job_id as number) < 1) {
    errors.push({ field: 'job_id', message: 'Valid job ID is required' });
  }
  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });
  if (!isEmail(d.email)) errors.push({ field: 'email', message: 'Valid email is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      job_id: d.job_id as number,
      name: (d.name as string).trim(),
      email: (d.email as string).trim().toLowerCase(),
      cv_path: isNonEmptyString(d.cv_path) ? (d.cv_path as string).trim() : undefined,
      cover_letter: isNonEmptyString(d.cover_letter) ? (d.cover_letter as string).trim() : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Candidate validation (ATS -- public application)
// ---------------------------------------------------------------------------

function isOptionalUrl(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return true;
  if (typeof value !== 'string') return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isOptionalInteger(value: unknown): boolean {
  return value === undefined || value === null || value === '' || (typeof value === 'number' && Number.isInteger(value));
}

const VALID_SOURCES = ['Direct', 'LinkedIn', 'Referral', 'Job Board', 'Conference', 'Other'];
const VALID_WORK_MODELS = ['On-site Sofia', 'Hybrid', 'Remote'];
const VALID_CANDIDATE_STATUSES = [
  'new', 'screening', 'phone_screen', 'technical',
  'team_interview', 'culture_chat', 'offer', 'hired',
  'rejected', 'on_hold', 'withdrawn',
];
const VALID_RECOMMENDATIONS = ['strong_no', 'lean_no', 'neutral', 'lean_yes', 'strong_yes'];
const VALID_NOTE_TYPES = ['general', 'interview', 'reference', 'system'];
const VALID_REFERENCE_STATUSES = ['pending', 'sent', 'completed', 'expired'];
const VALID_WOULD_REHIRE = ['yes', 'with_reservations', 'no'];
const VALID_EMAIL_TEMPLATE_TYPES = ['application_confirmation', 'rejection', 'offer', 'reference_request', 'interview_invitation', 'status_update'];
const VALID_TASK_SUBMISSION_STATUSES = ['pending', 'submitted', 'reviewed'];
const VALID_REFEREE_RELATIONSHIPS = ['Manager', 'Peer', 'Direct Report', 'Client'];

export interface CandidateInput {
  full_name: string;
  email: string;
  phone?: string;
  job_id?: number;
  cover_message?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  website_url?: string;
  source?: string;
  referrer_name?: string;
  referrer_email?: string;
  referrer_company?: string;
  is_internal_referral?: number;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  earliest_start?: string;
  work_model?: string;
}

export function validateCandidate(data: unknown): ValidationResult<CandidateInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.full_name)) errors.push({ field: 'full_name', message: 'Full name is required' });
  if (!isEmail(d.email)) errors.push({ field: 'email', message: 'Valid email is required' });
  if (!isOptionalUrl(d.linkedin_url)) errors.push({ field: 'linkedin_url', message: 'Invalid LinkedIn URL' });
  if (!isOptionalUrl(d.github_url)) errors.push({ field: 'github_url', message: 'Invalid GitHub URL' });
  if (!isOptionalUrl(d.portfolio_url)) errors.push({ field: 'portfolio_url', message: 'Invalid portfolio URL' });
  if (!isOptionalUrl(d.website_url)) errors.push({ field: 'website_url', message: 'Invalid website URL' });
  if (d.source !== undefined && d.source !== null && !VALID_SOURCES.includes(d.source as string)) {
    errors.push({ field: 'source', message: `Source must be one of: ${VALID_SOURCES.join(', ')}` });
  }
  if (d.work_model !== undefined && d.work_model !== null && d.work_model !== '' && !VALID_WORK_MODELS.includes(d.work_model as string)) {
    errors.push({ field: 'work_model', message: `Work model must be one of: ${VALID_WORK_MODELS.join(', ')}` });
  }
  if (!isOptionalInteger(d.salary_min)) errors.push({ field: 'salary_min', message: 'Salary min must be a number' });
  if (!isOptionalInteger(d.salary_max)) errors.push({ field: 'salary_max', message: 'Salary max must be a number' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      full_name: (d.full_name as string).trim(),
      email: (d.email as string).trim().toLowerCase(),
      phone: isNonEmptyString(d.phone) ? (d.phone as string).trim() : undefined,
      job_id: isInteger(d.job_id) ? d.job_id as number : undefined,
      cover_message: isNonEmptyString(d.cover_message) ? (d.cover_message as string).trim() : undefined,
      linkedin_url: isNonEmptyString(d.linkedin_url) ? (d.linkedin_url as string).trim() : undefined,
      github_url: isNonEmptyString(d.github_url) ? (d.github_url as string).trim() : undefined,
      portfolio_url: isNonEmptyString(d.portfolio_url) ? (d.portfolio_url as string).trim() : undefined,
      website_url: isNonEmptyString(d.website_url) ? (d.website_url as string).trim() : undefined,
      source: isNonEmptyString(d.source) ? (d.source as string).trim() : 'Direct',
      referrer_name: isNonEmptyString(d.referrer_name) ? (d.referrer_name as string).trim() : undefined,
      referrer_email: isNonEmptyString(d.referrer_email) ? (d.referrer_email as string).trim() : undefined,
      referrer_company: isNonEmptyString(d.referrer_company) ? (d.referrer_company as string).trim() : undefined,
      is_internal_referral: isBooleanLike(d.is_internal_referral) ? d.is_internal_referral : 0,
      salary_min: isInteger(d.salary_min) ? d.salary_min as number : undefined,
      salary_max: isInteger(d.salary_max) ? d.salary_max as number : undefined,
      salary_currency: isNonEmptyString(d.salary_currency) ? (d.salary_currency as string).trim() : 'EUR',
      earliest_start: isNonEmptyString(d.earliest_start) ? (d.earliest_start as string).trim() : undefined,
      work_model: isNonEmptyString(d.work_model) ? (d.work_model as string).trim() : 'On-site Sofia',
    },
  };
}

// ---------------------------------------------------------------------------
// Candidate update validation (ATS -- admin update)
// ---------------------------------------------------------------------------

export interface CandidateUpdateInput {
  full_name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  job_id?: number | null;
  cover_message?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  website_url?: string;
  source?: string;
  referrer_name?: string;
  referrer_email?: string;
  referrer_company?: string;
  is_internal_referral?: number;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string;
  earliest_start?: string;
  work_model?: string;
  status?: string;
  rejection_reason?: string;
  rejection_notes?: string;
  keep_in_talent_pool?: number;
  is_archived?: number;
}

export function validateCandidateUpdate(data: unknown): ValidationResult<CandidateUpdateInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (d.full_name !== undefined && !isNonEmptyString(d.full_name)) {
    errors.push({ field: 'full_name', message: 'Full name cannot be empty' });
  }
  if (d.email !== undefined && !isEmail(d.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (d.status !== undefined && !VALID_CANDIDATE_STATUSES.includes(d.status as string)) {
    errors.push({ field: 'status', message: `Status must be one of: ${VALID_CANDIDATE_STATUSES.join(', ')}` });
  }
  if (!isOptionalUrl(d.linkedin_url)) errors.push({ field: 'linkedin_url', message: 'Invalid LinkedIn URL' });
  if (!isOptionalUrl(d.github_url)) errors.push({ field: 'github_url', message: 'Invalid GitHub URL' });
  if (!isOptionalUrl(d.portfolio_url)) errors.push({ field: 'portfolio_url', message: 'Invalid portfolio URL' });
  if (!isOptionalUrl(d.website_url)) errors.push({ field: 'website_url', message: 'Invalid website URL' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const result: CandidateUpdateInput = {};

  if (d.full_name !== undefined) result.full_name = (d.full_name as string).trim();
  if (d.email !== undefined) result.email = (d.email as string).trim().toLowerCase();
  if (d.phone !== undefined) result.phone = typeof d.phone === 'string' ? d.phone.trim() : undefined;
  if (d.photo !== undefined) result.photo = typeof d.photo === 'string' ? d.photo.trim() : undefined;
  if (d.job_id !== undefined) result.job_id = d.job_id === null ? null : (isInteger(d.job_id) ? d.job_id as number : undefined);
  if (d.cover_message !== undefined) result.cover_message = typeof d.cover_message === 'string' ? d.cover_message.trim() : undefined;
  if (d.linkedin_url !== undefined) result.linkedin_url = typeof d.linkedin_url === 'string' ? d.linkedin_url.trim() : undefined;
  if (d.github_url !== undefined) result.github_url = typeof d.github_url === 'string' ? d.github_url.trim() : undefined;
  if (d.portfolio_url !== undefined) result.portfolio_url = typeof d.portfolio_url === 'string' ? d.portfolio_url.trim() : undefined;
  if (d.website_url !== undefined) result.website_url = typeof d.website_url === 'string' ? d.website_url.trim() : undefined;
  if (d.source !== undefined) result.source = typeof d.source === 'string' ? d.source.trim() : undefined;
  if (d.referrer_name !== undefined) result.referrer_name = typeof d.referrer_name === 'string' ? d.referrer_name.trim() : undefined;
  if (d.referrer_email !== undefined) result.referrer_email = typeof d.referrer_email === 'string' ? d.referrer_email.trim() : undefined;
  if (d.referrer_company !== undefined) result.referrer_company = typeof d.referrer_company === 'string' ? d.referrer_company.trim() : undefined;
  if (d.is_internal_referral !== undefined) result.is_internal_referral = isBooleanLike(d.is_internal_referral) ? d.is_internal_referral : undefined;
  if (d.salary_min !== undefined) result.salary_min = d.salary_min === null ? null : (isInteger(d.salary_min) ? d.salary_min as number : undefined);
  if (d.salary_max !== undefined) result.salary_max = d.salary_max === null ? null : (isInteger(d.salary_max) ? d.salary_max as number : undefined);
  if (d.salary_currency !== undefined) result.salary_currency = typeof d.salary_currency === 'string' ? d.salary_currency.trim() : undefined;
  if (d.earliest_start !== undefined) result.earliest_start = typeof d.earliest_start === 'string' ? d.earliest_start.trim() : undefined;
  if (d.work_model !== undefined) result.work_model = typeof d.work_model === 'string' ? d.work_model.trim() : undefined;
  if (d.status !== undefined) result.status = d.status as string;
  if (d.rejection_reason !== undefined) result.rejection_reason = typeof d.rejection_reason === 'string' ? d.rejection_reason.trim() : undefined;
  if (d.rejection_notes !== undefined) result.rejection_notes = typeof d.rejection_notes === 'string' ? d.rejection_notes.trim() : undefined;
  if (d.keep_in_talent_pool !== undefined) result.keep_in_talent_pool = isBooleanLike(d.keep_in_talent_pool) ? d.keep_in_talent_pool : undefined;
  if (d.is_archived !== undefined) result.is_archived = isBooleanLike(d.is_archived) ? d.is_archived : undefined;

  return { success: true, data: result };
}

// ---------------------------------------------------------------------------
// Candidate Score validation (ATS -- scorecard submission)
// ---------------------------------------------------------------------------

export interface CandidateScoreInput {
  interviewer_name: string;
  interview_stage: string;
  technical_depth?: number;
  problem_solving?: number;
  ownership?: number;
  communication?: number;
  cultural_add?: number;
  growth_potential?: number;
  technical_depth_notes?: string;
  problem_solving_notes?: string;
  ownership_notes?: string;
  communication_notes?: string;
  cultural_add_notes?: string;
  growth_potential_notes?: string;
  recommendation?: string;
  general_notes?: string;
  key_quotes?: string;
  red_flags?: string;
}

function isValidScore(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 5;
}

export function validateCandidateScore(data: unknown): ValidationResult<CandidateScoreInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.interviewer_name)) errors.push({ field: 'interviewer_name', message: 'Interviewer name is required' });
  if (!isNonEmptyString(d.interview_stage)) errors.push({ field: 'interview_stage', message: 'Interview stage is required' });
  if (!isValidScore(d.technical_depth)) errors.push({ field: 'technical_depth', message: 'Score must be 1-5' });
  if (!isValidScore(d.problem_solving)) errors.push({ field: 'problem_solving', message: 'Score must be 1-5' });
  if (!isValidScore(d.ownership)) errors.push({ field: 'ownership', message: 'Score must be 1-5' });
  if (!isValidScore(d.communication)) errors.push({ field: 'communication', message: 'Score must be 1-5' });
  if (!isValidScore(d.cultural_add)) errors.push({ field: 'cultural_add', message: 'Score must be 1-5' });
  if (!isValidScore(d.growth_potential)) errors.push({ field: 'growth_potential', message: 'Score must be 1-5' });
  if (d.recommendation !== undefined && d.recommendation !== null && !VALID_RECOMMENDATIONS.includes(d.recommendation as string)) {
    errors.push({ field: 'recommendation', message: `Recommendation must be one of: ${VALID_RECOMMENDATIONS.join(', ')}` });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      interviewer_name: (d.interviewer_name as string).trim(),
      interview_stage: (d.interview_stage as string).trim(),
      technical_depth: isInteger(d.technical_depth) ? d.technical_depth as number : undefined,
      problem_solving: isInteger(d.problem_solving) ? d.problem_solving as number : undefined,
      ownership: isInteger(d.ownership) ? d.ownership as number : undefined,
      communication: isInteger(d.communication) ? d.communication as number : undefined,
      cultural_add: isInteger(d.cultural_add) ? d.cultural_add as number : undefined,
      growth_potential: isInteger(d.growth_potential) ? d.growth_potential as number : undefined,
      technical_depth_notes: isNonEmptyString(d.technical_depth_notes) ? (d.technical_depth_notes as string).trim() : undefined,
      problem_solving_notes: isNonEmptyString(d.problem_solving_notes) ? (d.problem_solving_notes as string).trim() : undefined,
      ownership_notes: isNonEmptyString(d.ownership_notes) ? (d.ownership_notes as string).trim() : undefined,
      communication_notes: isNonEmptyString(d.communication_notes) ? (d.communication_notes as string).trim() : undefined,
      cultural_add_notes: isNonEmptyString(d.cultural_add_notes) ? (d.cultural_add_notes as string).trim() : undefined,
      growth_potential_notes: isNonEmptyString(d.growth_potential_notes) ? (d.growth_potential_notes as string).trim() : undefined,
      recommendation: isNonEmptyString(d.recommendation) ? (d.recommendation as string).trim() : undefined,
      general_notes: isNonEmptyString(d.general_notes) ? (d.general_notes as string).trim() : undefined,
      key_quotes: isNonEmptyString(d.key_quotes) ? (d.key_quotes as string).trim() : undefined,
      red_flags: isNonEmptyString(d.red_flags) ? (d.red_flags as string).trim() : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Candidate Reference validation (ATS)
// ---------------------------------------------------------------------------

export interface CandidateReferenceInput {
  referee_name: string;
  referee_email: string;
  referee_relationship?: string;
  referee_company?: string;
  technical_competence?: number;
  reliability?: number;
  communication?: number;
  teamwork?: number;
  initiative?: number;
  strengths?: string;
  improvements?: string;
  would_rehire?: string;
  additional_comments?: string;
  status?: string;
}

export function validateCandidateReference(data: unknown): ValidationResult<CandidateReferenceInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.referee_name)) errors.push({ field: 'referee_name', message: 'Referee name is required' });
  if (!isEmail(d.referee_email)) errors.push({ field: 'referee_email', message: 'Valid referee email is required' });
  if (!isValidScore(d.technical_competence)) errors.push({ field: 'technical_competence', message: 'Rating must be 1-5' });
  if (!isValidScore(d.reliability)) errors.push({ field: 'reliability', message: 'Rating must be 1-5' });
  if (!isValidScore(d.communication)) errors.push({ field: 'communication', message: 'Rating must be 1-5' });
  if (!isValidScore(d.teamwork)) errors.push({ field: 'teamwork', message: 'Rating must be 1-5' });
  if (!isValidScore(d.initiative)) errors.push({ field: 'initiative', message: 'Rating must be 1-5' });
  if (d.would_rehire !== undefined && d.would_rehire !== null && !VALID_WOULD_REHIRE.includes(d.would_rehire as string)) {
    errors.push({ field: 'would_rehire', message: `Must be one of: ${VALID_WOULD_REHIRE.join(', ')}` });
  }
  if (d.status !== undefined && d.status !== null && !VALID_REFERENCE_STATUSES.includes(d.status as string)) {
    errors.push({ field: 'status', message: `Status must be one of: ${VALID_REFERENCE_STATUSES.join(', ')}` });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      referee_name: (d.referee_name as string).trim(),
      referee_email: (d.referee_email as string).trim().toLowerCase(),
      referee_relationship: isNonEmptyString(d.referee_relationship) ? (d.referee_relationship as string).trim() : undefined,
      referee_company: isNonEmptyString(d.referee_company) ? (d.referee_company as string).trim() : undefined,
      technical_competence: isInteger(d.technical_competence) ? d.technical_competence as number : undefined,
      reliability: isInteger(d.reliability) ? d.reliability as number : undefined,
      communication: isInteger(d.communication) ? d.communication as number : undefined,
      teamwork: isInteger(d.teamwork) ? d.teamwork as number : undefined,
      initiative: isInteger(d.initiative) ? d.initiative as number : undefined,
      strengths: isNonEmptyString(d.strengths) ? (d.strengths as string).trim() : undefined,
      improvements: isNonEmptyString(d.improvements) ? (d.improvements as string).trim() : undefined,
      would_rehire: isNonEmptyString(d.would_rehire) ? (d.would_rehire as string).trim() : undefined,
      additional_comments: isNonEmptyString(d.additional_comments) ? (d.additional_comments as string).trim() : undefined,
      status: isNonEmptyString(d.status) ? (d.status as string).trim() : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Candidate Note validation (ATS)
// ---------------------------------------------------------------------------

export interface CandidateNoteInput {
  content: string;
  note_type?: string;
  author?: string;
}

export function validateCandidateNote(data: unknown): ValidationResult<CandidateNoteInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.content)) errors.push({ field: 'content', message: 'Note content is required' });
  if (d.note_type !== undefined && d.note_type !== null && !VALID_NOTE_TYPES.includes(d.note_type as string)) {
    errors.push({ field: 'note_type', message: `Note type must be one of: ${VALID_NOTE_TYPES.join(', ')}` });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      content: (d.content as string).trim(),
      note_type: isNonEmptyString(d.note_type) ? (d.note_type as string).trim() : 'general',
      author: isNonEmptyString(d.author) ? (d.author as string).trim() : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Login validation
// ---------------------------------------------------------------------------

export interface LoginInput {
  username: string;
  password: string;
}

export function validateLogin(data: unknown): ValidationResult<LoginInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.username)) errors.push({ field: 'username', message: 'Username is required' });
  if (!isNonEmptyString(d.password)) errors.push({ field: 'password', message: 'Password is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      username: (d.username as string).trim(),
      password: d.password as string,
    },
  };
}

// ---------------------------------------------------------------------------
// Team member validation
// ---------------------------------------------------------------------------

export interface TeamMemberInput {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  department?: string;
  sort_order?: number;
  is_published?: number;
}

export function validateTeamMember(data: unknown): ValidationResult<TeamMemberInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });
  if (!isNonEmptyString(d.role)) errors.push({ field: 'role', message: 'Role is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      role: (d.role as string).trim(),
      bio: isNonEmptyString(d.bio) ? (d.bio as string).trim() : undefined,
      photo: isNonEmptyString(d.photo) ? (d.photo as string).trim() : undefined,
      department: isNonEmptyString(d.department) ? (d.department as string).trim() : undefined,
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Category validation
// ---------------------------------------------------------------------------

export interface CategoryInput {
  name: string;
  slug: string;
}

export function validateCategory(data: unknown): ValidationResult<CategoryInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });
  if (!isNonEmptyString(d.slug)) errors.push({ field: 'slug', message: 'Slug is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      slug: (d.slug as string).trim(),
    },
  };
}

// ---------------------------------------------------------------------------
// Interview Template validation
// ---------------------------------------------------------------------------

export interface InterviewTemplateInput {
  name: string;
  description?: string;
  overall_timeline?: string;
  overall_label?: string;
  feedback_label?: string;
  subtitle?: string;
  is_default?: number;
  is_published?: number;
}

export function validateInterviewTemplate(data: unknown): ValidationResult<InterviewTemplateInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      description: isNonEmptyString(d.description) ? (d.description as string).trim() : undefined,
      overall_timeline: isNonEmptyString(d.overall_timeline) ? (d.overall_timeline as string).trim() : '2-4 weeks',
      overall_label: isNonEmptyString(d.overall_label) ? (d.overall_label as string).trim() : 'From application to offer decision',
      feedback_label: isNonEmptyString(d.feedback_label) ? (d.feedback_label as string).trim() : 'At each stage to all candidates',
      subtitle: isNonEmptyString(d.subtitle) ? (d.subtitle as string).trim() : undefined,
      is_default: isBooleanLike(d.is_default) ? d.is_default : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Interview Stage validation
// ---------------------------------------------------------------------------

export interface InterviewStageInput {
  template_id: number;
  stage_number: number;
  title: string;
  duration: string;
  description: string;
  focus: string;
  timeline: string;
  icon?: string;
  is_published?: number;
}

export function validateInterviewStage(data: unknown): ValidationResult<InterviewStageInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isInteger(d.template_id) || (d.template_id as number) < 1) {
    errors.push({ field: 'template_id', message: 'Valid template ID is required' });
  }
  if (!isInteger(d.stage_number) || (d.stage_number as number) < 1) {
    errors.push({ field: 'stage_number', message: 'Valid stage number is required' });
  }
  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.duration)) errors.push({ field: 'duration', message: 'Duration is required' });
  if (!isNonEmptyString(d.description)) errors.push({ field: 'description', message: 'Description is required' });
  if (!isNonEmptyString(d.focus)) errors.push({ field: 'focus', message: 'Focus is required' });
  if (!isNonEmptyString(d.timeline)) errors.push({ field: 'timeline', message: 'Timeline is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      template_id: d.template_id as number,
      stage_number: d.stage_number as number,
      title: (d.title as string).trim(),
      duration: (d.duration as string).trim(),
      description: (d.description as string).trim(),
      focus: (d.focus as string).trim(),
      timeline: (d.timeline as string).trim(),
      icon: isNonEmptyString(d.icon) ? (d.icon as string).trim() : 'Phone',
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Candidate Value validation
// ---------------------------------------------------------------------------

export interface CandidateValueInput {
  title: string;
  description: string;
  image?: string;
  sort_order?: number;
  is_published?: number;
}

export function validateCandidateValue(data: unknown): ValidationResult<CandidateValueInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.description)) errors.push({ field: 'description', message: 'Description is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      description: (d.description as string).trim(),
      image: isNonEmptyString(d.image) ? (d.image as string).trim() : undefined,
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// pCloud Bar Criterion validation
// ---------------------------------------------------------------------------

export interface PCloudBarCriterionInput {
  title: string;
  description: string;
  sort_order?: number;
  is_published?: number;
}

export function validatePCloudBarCriterion(data: unknown): ValidationResult<PCloudBarCriterionInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.description)) errors.push({ field: 'description', message: 'Description is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      description: (d.description as string).trim(),
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Process Highlight validation
// ---------------------------------------------------------------------------

export interface ProcessHighlightInput {
  label: string;
  detail: string;
  sort_order?: number;
  is_published?: number;
}

export function validateProcessHighlight(data: unknown): ValidationResult<ProcessHighlightInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.label)) errors.push({ field: 'label', message: 'Label is required' });
  if (!isNonEmptyString(d.detail)) errors.push({ field: 'detail', message: 'Detail is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      label: (d.label as string).trim(),
      detail: (d.detail as string).trim(),
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Default Benefit validation
// ---------------------------------------------------------------------------

export interface DefaultBenefitInput {
  title: string;
  description: string;
  sort_order?: number;
  is_published?: number;
}

export function validateDefaultBenefit(data: unknown): ValidationResult<DefaultBenefitInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.description)) errors.push({ field: 'description', message: 'Description is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      description: (d.description as string).trim(),
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Process Template validation
// ---------------------------------------------------------------------------

export interface ProcessTemplateInput {
  name: string;
  description?: string;
  intro_text?: string;
  is_default?: number;
  is_published?: number;
}

export function validateProcessTemplate(data: unknown): ValidationResult<ProcessTemplateInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      description: isNonEmptyString(d.description) ? (d.description as string).trim() : undefined,
      intro_text: isNonEmptyString(d.intro_text) ? (d.intro_text as string).trim() : undefined,
      is_default: isBooleanLike(d.is_default) ? d.is_default : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Process Step validation
// ---------------------------------------------------------------------------

export interface ProcessStepInput {
  template_id: number;
  step_number: number;
  label: string;
  detail: string;
  is_published?: number;
}

export function validateProcessStep(data: unknown): ValidationResult<ProcessStepInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isInteger(d.template_id) || (d.template_id as number) < 1) {
    errors.push({ field: 'template_id', message: 'Valid template ID is required' });
  }
  if (!isInteger(d.step_number) || (d.step_number as number) < 1) {
    errors.push({ field: 'step_number', message: 'Valid step number is required' });
  }
  if (!isNonEmptyString(d.label)) errors.push({ field: 'label', message: 'Label is required' });
  if (!isNonEmptyString(d.detail)) errors.push({ field: 'detail', message: 'Detail is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      template_id: d.template_id as number,
      step_number: d.step_number as number,
      label: (d.label as string).trim(),
      detail: (d.detail as string).trim(),
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Gallery Category validation
// ---------------------------------------------------------------------------

export interface GalleryCategoryInput {
  name: string;
  slug: string;
  sort_order?: number;
}

export function validateGalleryCategory(data: unknown): ValidationResult<GalleryCategoryInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });
  if (!isNonEmptyString(d.slug)) errors.push({ field: 'slug', message: 'Slug is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      slug: (d.slug as string).trim(),
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
    },
  };
}

// ---------------------------------------------------------------------------
// Gallery Photo validation
// ---------------------------------------------------------------------------

export interface GalleryPhotoInput {
  category_id: number;
  image: string;
  alt_text?: string;
  sort_order?: number;
  is_published?: number;
}

export function validateGalleryPhoto(data: unknown): ValidationResult<GalleryPhotoInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isInteger(d.category_id) || (d.category_id as number) < 1) {
    errors.push({ field: 'category_id', message: 'Valid category ID is required' });
  }
  if (!isNonEmptyString(d.image)) errors.push({ field: 'image', message: 'Image URL is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      category_id: d.category_id as number,
      image: (d.image as string).trim(),
      alt_text: isNonEmptyString(d.alt_text) ? (d.alt_text as string).trim() : undefined,
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Team Story validation
// ---------------------------------------------------------------------------

export interface TeamStoryInput {
  name: string;
  role: string;
  photo?: string;
  quote: string;
  sort_order?: number;
  is_published?: number;
}

export function validateTeamStory(data: unknown): ValidationResult<TeamStoryInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });
  if (!isNonEmptyString(d.role)) errors.push({ field: 'role', message: 'Role is required' });
  if (!isNonEmptyString(d.quote)) errors.push({ field: 'quote', message: 'Quote is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      role: (d.role as string).trim(),
      photo: isNonEmptyString(d.photo) ? (d.photo as string).trim() : undefined,
      quote: (d.quote as string).trim(),
      sort_order: isInteger(d.sort_order) ? d.sort_order : 0,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Legal Page validation
// ---------------------------------------------------------------------------

export interface LegalPageInput {
  title: string;
  slug: string;
  content: string;
  last_updated?: string;
  is_published?: number;
}

export function validateLegalPage(data: unknown): ValidationResult<LegalPageInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.slug)) errors.push({ field: 'slug', message: 'Slug is required' });
  if (!isNonEmptyString(d.content)) errors.push({ field: 'content', message: 'Content is required' });

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      slug: (d.slug as string).trim(),
      content: (d.content as string).trim(),
      last_updated: isNonEmptyString(d.last_updated) ? (d.last_updated as string).trim() : undefined,
      is_published: isBooleanLike(d.is_published) ? d.is_published : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Email Template validation
// ---------------------------------------------------------------------------

export interface EmailTemplateInput {
  name: string;
  slug: string;
  subject: string;
  body: string;
  template_type: string;
  is_active?: number;
}

export function validateEmailTemplate(data: unknown): ValidationResult<EmailTemplateInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.name)) errors.push({ field: 'name', message: 'Name is required' });
  if (!isNonEmptyString(d.slug)) errors.push({ field: 'slug', message: 'Slug is required' });
  if (!isNonEmptyString(d.subject)) errors.push({ field: 'subject', message: 'Subject is required' });
  if (!isNonEmptyString(d.body)) errors.push({ field: 'body', message: 'Body is required' });
  if (!isNonEmptyString(d.template_type) || !VALID_EMAIL_TEMPLATE_TYPES.includes(d.template_type as string)) {
    errors.push({ field: 'template_type', message: `Template type must be one of: ${VALID_EMAIL_TEMPLATE_TYPES.join(', ')}` });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: (d.name as string).trim(),
      slug: (d.slug as string).trim(),
      subject: (d.subject as string).trim(),
      body: (d.body as string).trim(),
      template_type: (d.template_type as string).trim(),
      is_active: isBooleanLike(d.is_active) ? d.is_active : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Technical Task validation
// ---------------------------------------------------------------------------

export interface TechnicalTaskInput {
  job_id?: number | null;
  title: string;
  description: string;
  instructions: string;
  deadline_days?: number;
  is_active?: number;
}

export function validateTechnicalTask(data: unknown): ValidationResult<TechnicalTaskInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.title)) errors.push({ field: 'title', message: 'Title is required' });
  if (!isNonEmptyString(d.description)) errors.push({ field: 'description', message: 'Description is required' });
  if (!isNonEmptyString(d.instructions)) errors.push({ field: 'instructions', message: 'Instructions are required' });
  if (d.deadline_days !== undefined && d.deadline_days !== null && (!isInteger(d.deadline_days) || (d.deadline_days as number) < 1)) {
    errors.push({ field: 'deadline_days', message: 'Deadline days must be a positive number' });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: (d.title as string).trim(),
      description: (d.description as string).trim(),
      instructions: (d.instructions as string).trim(),
      job_id: d.job_id === null ? null : (isInteger(d.job_id) ? d.job_id as number : undefined),
      deadline_days: isInteger(d.deadline_days) ? d.deadline_days as number : 7,
      is_active: isBooleanLike(d.is_active) ? d.is_active : 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Reference submission validation (public form)
// ---------------------------------------------------------------------------

export interface ReferenceSubmissionInput {
  referee_relationship: string;
  duration_worked: string;
  technical_competence: number;
  reliability: number;
  communication: number;
  teamwork: number;
  initiative: number;
  strengths: string;
  improvements: string;
  would_rehire: string;
  additional_comments?: string;
}

export function validateReferenceSubmission(data: unknown): ValidationResult<ReferenceSubmissionInput> {
  const errors: ValidationError[] = [];
  const d = data as Record<string, unknown>;

  if (!isNonEmptyString(d.referee_relationship) || !VALID_REFEREE_RELATIONSHIPS.includes(d.referee_relationship as string)) {
    errors.push({ field: 'referee_relationship', message: `Relationship must be one of: ${VALID_REFEREE_RELATIONSHIPS.join(', ')}` });
  }
  if (!isNonEmptyString(d.duration_worked)) errors.push({ field: 'duration_worked', message: 'Duration worked together is required' });
  if (!isValidScore(d.technical_competence) || d.technical_competence === undefined || d.technical_competence === null) {
    errors.push({ field: 'technical_competence', message: 'Technical competence rating (1-5) is required' });
  }
  if (!isValidScore(d.reliability) || d.reliability === undefined || d.reliability === null) {
    errors.push({ field: 'reliability', message: 'Reliability rating (1-5) is required' });
  }
  if (!isValidScore(d.communication) || d.communication === undefined || d.communication === null) {
    errors.push({ field: 'communication', message: 'Communication rating (1-5) is required' });
  }
  if (!isValidScore(d.teamwork) || d.teamwork === undefined || d.teamwork === null) {
    errors.push({ field: 'teamwork', message: 'Teamwork rating (1-5) is required' });
  }
  if (!isValidScore(d.initiative) || d.initiative === undefined || d.initiative === null) {
    errors.push({ field: 'initiative', message: 'Initiative rating (1-5) is required' });
  }
  if (!isNonEmptyString(d.strengths)) errors.push({ field: 'strengths', message: 'Strengths field is required' });
  if (!isNonEmptyString(d.improvements)) errors.push({ field: 'improvements', message: 'Areas for improvement field is required' });
  if (!isNonEmptyString(d.would_rehire) || !VALID_WOULD_REHIRE.includes(d.would_rehire as string)) {
    errors.push({ field: 'would_rehire', message: `Must be one of: ${VALID_WOULD_REHIRE.join(', ')}` });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      referee_relationship: (d.referee_relationship as string).trim(),
      duration_worked: (d.duration_worked as string).trim(),
      technical_competence: d.technical_competence as number,
      reliability: d.reliability as number,
      communication: d.communication as number,
      teamwork: d.teamwork as number,
      initiative: d.initiative as number,
      strengths: (d.strengths as string).trim(),
      improvements: (d.improvements as string).trim(),
      would_rehire: (d.would_rehire as string).trim(),
      additional_comments: isNonEmptyString(d.additional_comments) ? (d.additional_comments as string).trim() : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Task submission validation (public form)
// ---------------------------------------------------------------------------

export interface TaskSubmissionInput {
  notes?: string;
}

export function validateTaskSubmission(data: unknown): ValidationResult<TaskSubmissionInput> {
  const d = data as Record<string, unknown>;

  return {
    success: true,
    data: {
      notes: isNonEmptyString(d.notes) ? (d.notes as string).trim() : undefined,
    },
  };
}
