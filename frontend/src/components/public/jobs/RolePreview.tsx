'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Target,
  Users,
  GraduationCap,
  CheckCircle,
  Gift,
  Zap,
  Share2,
  Bookmark,
  Phone,
  FileText,
  Code,
  Layers,
  Heart,
  Award,
  Clock,
  X,
  Link2,
  Linkedin,
  Twitter,
  Check,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/public/ImageWithFallback';
import type {
  Job,
  InterviewTemplate,
  InterviewStage,
  CandidateValue,
  PCloudBarCriterion,
  ProcessTemplate,
  ProcessStep,
  DefaultBenefit,
} from '@/types';
import styles from './RolePreview.module.scss';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RolePreviewProps {
  job: Job;
  interviewTemplate: InterviewTemplate | null;
  interviewStages: InterviewStage[];
  candidateValues: CandidateValue[];
  pcloudBarCriteria: PCloudBarCriterion[];
  processTemplate: ProcessTemplate | null;
  processSteps: ProcessStep[];
  defaultBenefits: DefaultBenefit[];
  jobBenefits: DefaultBenefit[];
  settings: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Icon map for interview stages (maps DB string -> component)
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Phone,
  FileText,
  Code,
  Layers,
  Heart,
  Award,
  Briefcase,
  Target,
  Users,
  GraduationCap,
  CheckCircle,
  Gift,
  Zap,
  Clock,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseList(text: string | null): string[] {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
}

function daysAgo(dateStr: string): string {
  const created = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Posted today';
  if (diff === 1) return 'Posted 1 day ago';
  return `Posted ${diff} days ago`;
}

function padStageNumber(n: number): string {
  return String(n).padStart(2, '0');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RolePreview({
  job,
  interviewTemplate,
  interviewStages,
  candidateValues,
  pcloudBarCriteria,
  processTemplate,
  processSteps,
  defaultBenefits,
  jobBenefits,
  settings,
}: RolePreviewProps) {
  const processRef = useRef<HTMLElement>(null);
  const isProcessInView = useInView(processRef, { once: true, margin: '-100px' });

  // valuesRef kept for potential re-enabling of candidateValues section
  const valuesRef = useRef<HTMLElement>(null);
  useInView(valuesRef, { once: true, margin: '-100px' });

  const pcloudBarRef = useRef<HTMLElement>(null);
  const isPCloudBarInView = useInView(pcloudBarRef, { once: true, margin: '-100px' });

  // talentCommunityRef removed — apply form is now a modal

  // Apply modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyFullName, setApplyFullName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyPcloudLink, setApplyPcloudLink] = useState('');
  const [applyMessage, setApplyMessage] = useState('');
  const [applyConsent, setApplyConsent] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applyError, setApplyError] = useState('');

  // Share dropdown state
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSidebarShareMenu, setShowSidebarShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const sidebarShareMenuRef = useRef<HTMLDivElement>(null);

  const getCurrentUrl = useCallback(() => {
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = getCurrentUrl();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  }, [getCurrentUrl]);

  const handleShareLinkedIn = useCallback(() => {
    const url = encodeURIComponent(getCurrentUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  }, [getCurrentUrl]);

  const handleShareTwitter = useCallback(() => {
    const url = encodeURIComponent(getCurrentUrl());
    const text = encodeURIComponent(`Check out this role at pCloud: ${job.title}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
  }, [getCurrentUrl, job.title]);

  // Close share menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
      if (sidebarShareMenuRef.current && !sidebarShareMenuRef.current.contains(event.target as Node)) {
        setShowSidebarShareMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyConsent || !applyFullName || !applyEmail || !applyPcloudLink) return;
    setApplySubmitting(true);
    setApplyError('');

    try {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: applyFullName,
          email: applyEmail,
          job_id: job.id,
          cover_message: applyMessage,
          portfolio_url: applyPcloudLink,
          source: 'Direct',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setApplySubmitted(true);
        setTimeout(() => {
          setApplyPcloudLink('');
          setApplyMessage('');
          setApplyConsent(false);
          setApplySubmitted(false);
          setShowApplyModal(false);
        }, 4000);
      } else {
        setApplyError(data.error || 'Something went wrong.');
      }
    } catch {
      setApplyError('Network error. Please try again.');
    } finally {
      setApplySubmitting(false);
    }
  };

  // Parse dynamic job data
  const requirementItems = parseList(job.requirements);
  const niceToHaveItems = parseList(job.nice_to_have);
  const challengeItems = parseList(job.challenges);
  const descriptionText = job.description;

  // Tech stack from job data
  const techStackItems = job.tech_stack
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  // Benefits: use job-specific linked benefits if available, otherwise fall back to all defaults
  const benefitsToShow = jobBenefits.length > 0
    ? jobBenefits.map((b) => ({ title: b.title, description: b.description }))
    : defaultBenefits.map((b) => ({ title: b.title, description: b.description }));

  // Meta pills
  const pills = [
    job.department,
    job.product,
    job.employment_type,
    job.seniority,
    job.location || 'Remote',
    daysAgo(job.created_at),
  ];

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero Section                                                    */}
      {/* ================================================================= */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>{job.title}</h1>

            {/* Meta Pills */}
            <div className={styles.metaPills}>
              {pills.map((pill, index) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.metaPill}
                >
                  {pill}
                </motion.span>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. Two-Column Layout                                               */}
      {/* ================================================================= */}
      <section className={styles.twoColumnSection}>
        <div className={styles.twoColumnContainer}>
          <div className={styles.twoColumnGrid}>
            {/* LEFT COLUMN */}
            <div className={styles.leftColumn}>
              {/* A. About the Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.sectionHeader}>
                  <div className={`${styles.iconCircle} ${styles.iconCyan}`}>
                    <Briefcase size={24} />
                  </div>
                  <h2 className={styles.sectionHeading}>About the Role</h2>
                </div>
                <p className={`${styles.aboutText} ${styles.indentedContent}`}>
                  {descriptionText}
                </p>
              </motion.div>

              {/* B. The Challenges */}
              {challengeItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className={styles.sectionHeader}>
                    <div className={`${styles.iconCircle} ${styles.iconCoral}`}>
                      <Target size={24} />
                    </div>
                    <h2 className={styles.sectionHeading}>The Challenges</h2>
                  </div>
                  <ul className={styles.challengeList}>
                    {challengeItems.map((challenge, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={styles.challengeItem}
                      >
                        <span className={styles.challengeBullet}>&#x25CF;</span>
                        {challenge}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* C. Your Team */}
              {job.team_name && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className={styles.sectionHeaderLarge}>
                    <div className={`${styles.iconCircle} ${styles.iconPurple}`}>
                      <Users size={24} />
                    </div>
                    <h2 className={styles.sectionHeading}>Your Team</h2>
                  </div>
                  <div className={`${styles.teamCard} ${styles.indentedContent}`}>
                    <div className={styles.teamCardGrid}>
                      {/* Team Photo */}
                      <div className={styles.teamPhoto}>
                        <ImageWithFallback
                          src={job.team_photo || '/images/dobriana-1.jpg'}
                          alt={`${job.team_name} Team`}
                        />
                      </div>
                      {/* Team Info */}
                      <div className={styles.teamInfo}>
                        <p className={styles.teamLabel}>
                          <span className={styles.teamNameGradient}>{job.team_name}</span>
                          {job.team_size && <> &middot; {job.team_size}</>}
                        </p>
                        {job.team_lead && (
                          <p className={styles.teamLead}>Led by {job.team_lead}</p>
                        )}
                        {job.team_quote && (
                          <blockquote className={styles.teamQuote}>
                            &ldquo;{job.team_quote}&rdquo;
                          </blockquote>
                        )}
                        {techStackItems.length > 0 && (
                          <div className={styles.techTags}>
                            {techStackItems.map((tech) => (
                              <span key={tech} className={styles.techTag}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* D. What You'll Learn */}
              {job.what_youll_learn && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className={styles.sectionHeaderLarge}>
                    <div className={`${styles.iconCircle} ${styles.iconYellow}`}>
                      <GraduationCap size={24} />
                    </div>
                    <h2 className={styles.sectionHeading}>What You&apos;ll Learn</h2>
                  </div>
                  <div className={`${styles.learnBlock} ${styles.indentedContent}`}>
                    <p className={styles.learnText}>
                      {job.what_youll_learn}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* E. What We're Looking For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className={styles.sectionHeaderLarge}>
                  <div className={`${styles.iconCircle} ${styles.iconGreen}`}>
                    <CheckCircle size={24} />
                  </div>
                  <h2 className={styles.sectionHeading}>What We&apos;re Looking For</h2>
                </div>
                <div className={`${styles.indentedContent} ${styles.sectionContentSpaced}`}>
                  {/* Required */}
                  {requirementItems.length > 0 && (
                    <ul className={styles.requirementsList}>
                      {requirementItems.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={styles.requirementItem}
                        >
                          <span className={styles.checkMark}>&#10003;</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Nice to Have */}
                  {niceToHaveItems.length > 0 && (
                    <div>
                      <h3 className={styles.niceToHaveHeading}>Nice to Have</h3>
                      <ul className={styles.niceToHaveList}>
                        {niceToHaveItems.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={styles.requirementItem}
                          >
                            <span className={styles.niceToHaveMark}>+</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* F. What We Offer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className={styles.sectionHeaderLarge}>
                  <div className={`${styles.iconCircle} ${styles.iconCoral}`}>
                    <Gift size={24} />
                  </div>
                  <h2 className={styles.sectionHeading}>What We Offer</h2>
                </div>
                <div className={`${styles.indentedContent} ${styles.sectionContentSpaced}`}>
                  <p className={styles.benefitsIntro}>
                    {settings.benefits_intro_text ||
                      'Competitive compensation in the top 25th percentile for Sofia tech market, plus comprehensive benefits:'}
                  </p>
                  <div className={styles.benefitsGrid}>
                    {benefitsToShow.map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={styles.benefitCard}
                      >
                        <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                        {benefit.description && (
                          <p className={styles.benefitDescription}>{benefit.description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* G. Working Process Highlights */}
              {processSteps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className={styles.sectionHeaderLarge}>
                    <div className={`${styles.iconCircle} ${styles.iconPurple}`}>
                      <Zap size={24} />
                    </div>
                    <h2 className={styles.sectionHeading}>Working Process Highlights</h2>
                  </div>
                  <div className={`${styles.indentedContent} ${styles.sectionContentSpaced}`}>
                    <p className={styles.processIntro}>
                      {processTemplate?.intro_text || settings.process_intro_text ||
                        'We follow modern development practices that empower engineers to do their best work:'}
                    </p>
                    <div className={styles.processGrid}>
                      {processSteps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={styles.processCard}
                        >
                          <h4 className={styles.processLabel}>{step.label}</h4>
                          <p className={styles.processDetail}>{step.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* RIGHT COLUMN - Sidebar */}
            <div className={styles.sidebar}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={styles.sidebarCard}
              >
                <h3 className={styles.sidebarTitle}>Ready to Apply?</h3>
                <p className={styles.sidebarText}>
                  Join our team and help build infrastructure that 24M+ users depend on.
                </p>
                <div className={styles.sidebarButtons}>
                  <button className={styles.sidebarApply} onClick={() => setShowApplyModal(true)}>Apply Now</button>
                  <div className={styles.sidebarShareWrapper} ref={sidebarShareMenuRef}>
                    <button
                      className={styles.sidebarShare}
                      onClick={() => setShowSidebarShareMenu((prev) => !prev)}
                    >
                      Share This Role
                    </button>
                    <AnimatePresence>
                      {showSidebarShareMenu && (
                        <motion.div
                          className={styles.shareDropdownSidebar}
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                        >
                          <button
                            className={styles.shareDropdownItem}
                            onClick={() => { handleCopyLink(); setShowSidebarShareMenu(false); }}
                          >
                            {copiedLink ? <Check size={18} /> : <Link2 size={18} />}
                            {copiedLink ? 'Copied!' : 'Copy link'}
                          </button>
                          <button
                            className={styles.shareDropdownItem}
                            onClick={() => { handleShareLinkedIn(); setShowSidebarShareMenu(false); }}
                          >
                            <Linkedin size={18} />
                            LinkedIn
                          </button>
                          <button
                            className={styles.shareDropdownItem}
                            onClick={() => { handleShareTwitter(); setShowSidebarShareMenu(false); }}
                          >
                            <Twitter size={18} />
                            Twitter / X
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Interview Process (from template)                               */}
      {/* ================================================================= */}
      {interviewStages.length > 0 && (
        <section ref={processRef} className={styles.processSection}>
          <div className={styles.processSectionContainer}>
            <motion.div
              className={styles.processSectionHeader}
              initial={{ opacity: 0, y: 30 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.processSectionTitle}>
                Our {interviewStages.length}-Stage Process
              </h2>
              <p className={styles.processSectionSubtitle}>
                {interviewTemplate?.subtitle ||
                  'We believe in evaluating candidates fairly across multiple dimensions. Each stage builds on the previous one, giving both us and you a chance to assess fit.'}
              </p>
            </motion.div>

            <div className={styles.stagesGrid}>
              {interviewStages.map((stage, index) => {
                const IconComponent = ICON_MAP[stage.icon] || Phone;
                return (
                  <motion.div
                    key={stage.id}
                    className={styles.stageCard}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <div className={styles.stageNumber}>
                      {padStageNumber(stage.stage_number)}
                    </div>

                    <div className={styles.stageIconRow}>
                      <div className={styles.stageIconCircle}>
                        <IconComponent size={24} />
                      </div>
                      <h3 className={styles.stageTitle}>{stage.title}</h3>
                    </div>

                    <div className={styles.stageDuration}>
                      <Clock size={14} />
                      {stage.duration}
                    </div>

                    <p className={styles.stageDescription}>{stage.description}</p>

                    <div className={styles.stageFocus}>
                      <span className={styles.stageFocusLabel}>Focus:</span>
                      <p className={styles.stageFocusText}>{stage.focus}</p>
                    </div>

                    <div className={styles.stageTimeline}>
                      <span className={styles.stageTimelineLabel}>Timeline:</span>
                      <p className={styles.stageTimelineText}>{stage.timeline}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Overall Timeline */}
            {interviewTemplate && (
              <motion.div
                className={styles.overallTimeline}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isProcessInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <h3 className={styles.overallTitle}>Overall Timeline</h3>
                <div className={styles.overallContent}>
                  <div>
                    <div className={styles.overallWeeks}>
                      {interviewTemplate.overall_timeline}
                    </div>
                    <p className={styles.overallWeeksLabel}>
                      {interviewTemplate.overall_label}
                    </p>
                  </div>
                  <div className={styles.overallDivider} />
                  <div>
                    <div className={styles.overallFeedback}>&#10003; Feedback Provided</div>
                    <p className={styles.overallFeedbackLabel}>
                      {interviewTemplate.feedback_label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 4. What We Value in Candidates                                     */}
      {/* Removed: generic "What We Value" section — the pCloud Bar section  */}
      {/* below is more distinctive and covers the same purpose.             */}
      {/* Data flow (candidateValues prop) kept intact for re-enabling.      */}
      {/* ================================================================= */}

      {/* ================================================================= */}
      {/* 5. The pCloud Bar                                                  */}
      {/* ================================================================= */}
      {pcloudBarCriteria.length > 0 && (
        <section ref={pcloudBarRef} className={styles.pcloudBarSection}>
          <div className={styles.pcloudBarContainer}>
            <motion.div
              className={styles.pcloudBarHeader}
              initial={{ opacity: 0, y: 30 }}
              animate={isPCloudBarInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.pcloudBarTitle}>The pCloud Bar</h2>
              <p className={styles.pcloudBarSubtitle}>
                {settings.pcloud_bar_subtitle ||
                  "Standards we evaluate against, not a checklist. We're looking for top 1% talent, but we value diverse backgrounds and experiences."}
              </p>
            </motion.div>

            <div className={styles.pcloudBarGrid}>
              {pcloudBarCriteria.map((criterion, index) => (
                <motion.div
                  key={criterion.id}
                  className={styles.pcloudBarCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isPCloudBarInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className={styles.pcloudBarCardInner}>
                    <div className={styles.pcloudBarIcon}>
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h3 className={styles.pcloudBarCardTitle}>{criterion.title}</h3>
                      <p className={styles.pcloudBarCardDescription}>{criterion.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* Apply Modal                                                        */}
      {/* ================================================================= */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            className={styles.applyOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !applySubmitting && setShowApplyModal(false)}
          >
            <motion.div
              className={styles.applyModal}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.applyModalClose}
                onClick={() => setShowApplyModal(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Position info */}
              <div className={styles.applyModalHeader}>
                <h3 className={styles.applyModalTitle}>Apply for this position</h3>
                <div className={styles.applyModalJob}>
                  <strong>{job.title}</strong>
                  <span>{job.department} &middot; {job.product} &middot; {job.location || 'Sofia, Bulgaria'}</span>
                </div>
              </div>

              {!applySubmitted ? (
                <form onSubmit={handleApplySubmit} className={styles.applyModalForm}>
                  {applyError && (
                    <div className={styles.applyModalError}>{applyError}</div>
                  )}

                  <div className={styles.applyModalField}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={applyFullName}
                      onChange={(e) => setApplyFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.applyModalField}>
                    <label>Email *</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.applyModalField}>
                    <label>CV Link (pCloud) *</label>
                    <input
                      type="url"
                      placeholder="Paste your pCloud shared link with CV and documents"
                      value={applyPcloudLink}
                      onChange={(e) => setApplyPcloudLink(e.target.value)}
                      required
                    />
                    <span className={styles.applyModalHint}>
                      Upload your CV to pCloud and paste the shared link here
                    </span>
                  </div>

                  <div className={styles.applyModalField}>
                    <label>Message (optional)</label>
                    <textarea
                      placeholder="Tell us why you're interested in this role..."
                      value={applyMessage}
                      onChange={(e) => setApplyMessage(e.target.value.slice(0, 1000))}
                      rows={4}
                    />
                    {applyMessage.length > 0 && (
                      <span className={styles.applyModalCharCount}>{applyMessage.length}/1000</span>
                    )}
                  </div>

                  <label className={styles.applyModalConsent}>
                    <input
                      type="checkbox"
                      checked={applyConsent}
                      onChange={(e) => setApplyConsent(e.target.checked)}
                    />
                    <span>
                      I have read and agree to the{' '}
                      <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={styles.applyModalSubmit}
                    disabled={applySubmitting || !applyConsent || !applyPcloudLink}
                  >
                    {applySubmitting ? 'Sending...' : 'Submit Application'}
                  </button>
                </form>
              ) : (
                <div className={styles.applyModalSuccess}>
                  <div className={styles.applyModalSuccessIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={40} height={40}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4>Application Submitted!</h4>
                  <p>Thank you for applying. We&apos;ll review your application and get back to you.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
