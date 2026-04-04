'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Briefcase, Users, UserCircle, Plus, Star, TrendingUp } from 'lucide-react';
import { getPublishBadge, getCandidateStatusBadge } from '@/components/admin/StatusBadge';
import styles from '@/styles/admin.module.scss';
import type { PostWithTags, Job, CandidateWithJob, TeamMember } from '@/types';

interface DashboardData {
  posts: { total: number; published: number; draft: number };
  jobs: { total: number; published: number; draft: number };
  candidates: { total: number; inPipeline: number; newCount: number; avgScore: number | null };
  team: { total: number };
  recentPosts: PostWithTags[];
  recentCandidates: CandidateWithJob[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [postsRes, postsPublishedRes, jobsRes, jobsPublishedRes, candidatesRes, teamRes, statsRes] = await Promise.all([
          fetch('/api/posts?perPage=5'),
          fetch('/api/posts?perPage=1&published=true'),
          fetch('/api/jobs?perPage=5'),
          fetch('/api/jobs?perPage=1&published=true'),
          fetch('/api/candidates?perPage=5'),
          fetch('/api/team'),
          fetch('/api/candidates/stats'),
        ]);

        const [postsData, postsPublishedData, jobsData, jobsPublishedData, candidatesData, teamData, statsData] = await Promise.all([
          postsRes.json(),
          postsPublishedRes.json(),
          jobsRes.json(),
          jobsPublishedRes.json(),
          candidatesRes.json(),
          teamRes.json(),
          statsRes.json(),
        ]);

        const posts = (postsData.data || []) as PostWithTags[];
        const postsMeta = postsData.meta || {};
        const jobs = (jobsData.data || []) as Job[];
        const jobsMeta = jobsData.meta || {};
        const recentCandidates = (candidatesData.data || []) as CandidateWithJob[];
        const team = (teamData.data || []) as TeamMember[];

        const publishedPosts = postsPublishedData.meta?.total ?? posts.filter((p) => p.is_published).length;
        const publishedJobs = jobsPublishedData.meta?.total ?? jobs.filter((j) => j.is_published).length;

        // Parse stats from /api/candidates/stats
        const statsPayload = statsData.success ? statsData.data : null;
        const totalCandidates = statsPayload?.totals?.active || 0;
        const inPipeline = (statsPayload?.byStatus || [])
          .filter((s: { status: string; count: number }) =>
            !['rejected', 'on_hold', 'withdrawn', 'hired'].includes(s.status)
          )
          .reduce((sum: number, s: { count: number }) => sum + s.count, 0);
        const newCount = (statsPayload?.byStatus || [])
          .find((s: { status: string }) => s.status === 'new')?.count || 0;
        const avgScore = statsPayload?.totals?.avgCompositeScore || null;

        setData({
          posts: {
            total: postsMeta.total || posts.length,
            published: publishedPosts,
            draft: (postsMeta.total || posts.length) - publishedPosts,
          },
          jobs: {
            total: jobsMeta.total || jobs.length,
            published: publishedJobs,
            draft: (jobsMeta.total || jobs.length) - publishedJobs,
          },
          candidates: {
            total: totalCandidates,
            inPipeline,
            newCount,
            avgScore,
          },
          team: { total: team.length },
          recentPosts: posts.slice(0, 5),
          recentCandidates: recentCandidates.slice(0, 5),
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!data) {
    return <p>Failed to load dashboard data.</p>;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link href="/admin/posts/new" className={styles.btnPrimary}>
          <Plus size={16} />
          New Post
        </Link>
        <Link href="/admin/jobs/new" className={styles.btnSecondary}>
          <Plus size={16} />
          New Job
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
            <FileText />
          </div>
          <div className={styles.statContent}>
            <h3>{data.posts.total}</h3>
            <p>Total Posts</p>
            <div className={styles.statSub}>
              {data.posts.published} published / {data.posts.draft} draft
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
            <Briefcase />
          </div>
          <div className={styles.statContent}>
            <h3>{data.jobs.total}</h3>
            <p>Total Jobs</p>
            <div className={styles.statSub}>
              {data.jobs.published} published / {data.jobs.draft} draft
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
            <Users />
          </div>
          <div className={styles.statContent}>
            <h3>{data.candidates.total}</h3>
            <p>Candidates</p>
            <div className={styles.statSub}>
              {data.candidates.newCount} new / {data.candidates.inPipeline} in pipeline
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconCyan}`}>
            <UserCircle />
          </div>
          <div className={styles.statContent}>
            <h3>{data.team.total}</h3>
            <p>Team Members</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Recent Posts</h2>
            <Link href="/admin/posts" className={styles.btnGhost} style={{ fontSize: '13px' }}>
              View All
            </Link>
          </div>
          {data.recentPosts.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#6c757d' }}>No posts yet.</p>
          ) : (
            <ul className={styles.recentList}>
              {data.recentPosts.map((post) => (
                <li key={post.id} className={styles.recentItem}>
                  <div className={styles.recentItemInfo}>
                    <strong>
                      <Link href={`/admin/posts/${post.id}/edit`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    </strong>
                    <span>
                      {post.category} &middot;{' '}
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {getPublishBadge(post.is_published)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Recent Candidates</h2>
            <Link href="/admin/candidates" className={styles.btnGhost} style={{ fontSize: '13px' }}>
              View All
            </Link>
          </div>
          {data.recentCandidates.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#6c757d' }}>No candidates yet.</p>
          ) : (
            <ul className={styles.recentList}>
              {data.recentCandidates.map((c) => (
                <li key={c.id} className={styles.recentItem}>
                  <div className={styles.recentItemInfo}>
                    <strong>
                      <Link href={`/admin/candidates/${c.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {c.full_name}
                      </Link>
                    </strong>
                    <span>
                      {c.job_title || 'General'} &middot;{' '}
                      {new Date(c.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {getCandidateStatusBadge(c.status)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
