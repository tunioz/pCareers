'use client';

import styles from '@/styles/admin.module.scss';

type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'gray' | 'teal' | 'orange' | 'pink' | 'gold';

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
}

const variantMap: Record<BadgeVariant, string> = {
  green: styles.badgeGreen,
  yellow: styles.badgeYellow,
  red: styles.badgeRed,
  blue: styles.badgeBlue,
  purple: styles.badgePurple,
  gray: styles.badgeGray,
  teal: styles.badgeTeal,
  orange: styles.badgeOrange,
  pink: styles.badgePink,
  gold: styles.badgeGold,
};

export default function StatusBadge({ label, variant }: StatusBadgeProps) {
  return <span className={variantMap[variant]}>{label}</span>;
}

export function getPublishBadge(isPublished: number) {
  return isPublished ? (
    <StatusBadge label="Published" variant="green" />
  ) : (
    <StatusBadge label="Draft" variant="yellow" />
  );
}

export function getApplicationStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    new: { label: 'New', variant: 'blue' },
    reviewed: { label: 'Reviewed', variant: 'yellow' },
    interview: { label: 'Interview', variant: 'purple' },
    rejected: { label: 'Rejected', variant: 'red' },
    accepted: { label: 'Accepted', variant: 'green' },
  };
  const info = map[status] || { label: status, variant: 'gray' as BadgeVariant };
  return <StatusBadge label={info.label} variant={info.variant} />;
}

// ATS candidate status mapping
export const CANDIDATE_STATUS_MAP: Record<string, { label: string; variant: BadgeVariant; color: string }> = {
  new: { label: 'New', variant: 'gray', color: '#6b7280' },
  screening: { label: 'Screening', variant: 'blue', color: '#3b82f6' },
  phone_screen: { label: 'Phone Screen', variant: 'teal', color: '#0d9488' },
  technical: { label: 'Technical', variant: 'purple', color: '#8b5cf6' },
  team_interview: { label: 'Team Interview', variant: 'orange', color: '#ea580c' },
  culture_chat: { label: 'Culture Chat', variant: 'pink', color: '#db2777' },
  offer: { label: 'Offer', variant: 'green', color: '#10b981' },
  hired: { label: 'Hired', variant: 'gold', color: '#b45309' },
  rejected: { label: 'Rejected', variant: 'red', color: '#ef4444' },
  on_hold: { label: 'On Hold', variant: 'yellow', color: '#f59e0b' },
  withdrawn: { label: 'Withdrawn', variant: 'gray', color: '#9ca3af' },
};

export function getCandidateStatusBadge(status: string) {
  const info = CANDIDATE_STATUS_MAP[status] || { label: status, variant: 'gray' as BadgeVariant };
  return <StatusBadge label={info.label} variant={info.variant} />;
}

export function getRecommendationBadge(recommendation: string | null) {
  if (!recommendation) return null;
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    strong_no: { label: 'Strong No', variant: 'red' },
    lean_no: { label: 'Lean No', variant: 'orange' },
    neutral: { label: 'Neutral', variant: 'gray' },
    lean_yes: { label: 'Lean Yes', variant: 'teal' },
    strong_yes: { label: 'Strong Yes', variant: 'green' },
  };
  const info = map[recommendation] || { label: recommendation, variant: 'gray' as BadgeVariant };
  return <StatusBadge label={info.label} variant={info.variant} />;
}

export function getReferenceStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    pending: { label: 'Pending', variant: 'gray' },
    sent: { label: 'Sent', variant: 'blue' },
    completed: { label: 'Completed', variant: 'green' },
    expired: { label: 'Expired', variant: 'red' },
  };
  const info = map[status] || { label: status, variant: 'gray' as BadgeVariant };
  return <StatusBadge label={info.label} variant={info.variant} />;
}
