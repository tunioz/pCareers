'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  UserCircle,
  FolderOpen,
  Tag,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Package,
  Cpu,
  Scale,
  Camera,
  BarChart3,
  Mail,
  ClipboardCheck,
  CalendarDays,
  UserPlus,
  BookOpen,
  Shield,
  Activity,
  TrendingUp,
} from 'lucide-react';
import { ToastProvider } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  section?: string;
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} />, section: 'Main' },
  { href: '/admin/posts', label: 'Posts', icon: <FileText size={20} />, section: 'Content' },
  { href: '/admin/categories', label: 'Categories', icon: <FolderOpen size={20} /> },
  { href: '/admin/tags', label: 'Tags', icon: <Tag size={20} /> },
  { href: '/admin/jobs', label: 'Jobs', icon: <Briefcase size={20} />, section: 'Careers' },
  { href: '/admin/products', label: 'Products', icon: <Package size={20} /> },
  { href: '/admin/candidates', label: 'Candidates', icon: <Users size={20} />, section: 'ATS' },
  { href: '/admin/interview-kits', label: 'Interview Kits', icon: <BookOpen size={20} /> },
  { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { href: '/admin/analytics/funnel', label: 'Hiring Funnel', icon: <TrendingUp size={20} /> },
  { href: '/admin/email-templates', label: 'Email Templates', icon: <Mail size={20} /> },
  { href: '/admin/tasks', label: 'Tasks', icon: <ClipboardCheck size={20} /> },
  { href: '/admin/calendar', label: 'Calendar', icon: <CalendarDays size={20} /> },
  { href: '/admin/talent-pool', label: 'Talent Pool', icon: <UserPlus size={20} /> },
  { href: '/admin/hiring-content', label: 'Hiring Content', icon: <ClipboardList size={20} /> },
  { href: '/admin/life-content', label: 'Life Content', icon: <Camera size={20} />, section: 'Pages' },
  { href: '/admin/team', label: 'Team', icon: <UserCircle size={20} />, section: 'Other' },
  { href: '/admin/tech-stacks', label: 'Tech Stacks', icon: <Cpu size={20} /> },
  { href: '/admin/legal', label: 'Legal Pages', icon: <Scale size={20} /> },
  { href: '/admin/users', label: 'Admin Users', icon: <Shield size={20} />, section: 'System' },
  { href: '/admin/audit-log', label: 'Audit Log', icon: <Activity size={20} /> },
  { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
];

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href?: string }[] = [];

  if (parts[0] === 'admin') {
    crumbs.push({ label: 'Admin', href: '/admin' });

    const labelMap: Record<string, string> = {
      posts: 'Posts',
      categories: 'Categories',
      tags: 'Tags',
      jobs: 'Jobs',
      applications: 'Applications',
      candidates: 'Candidates',
      'interview-kits': 'Interview Kits',
      analytics: 'Analytics',
      funnel: 'Hiring Funnel',
      'email-templates': 'Email Templates',
      tasks: 'Tasks',
      calendar: 'Calendar',
      'talent-pool': 'Talent Pool',
      compare: 'Compare',
      'hiring-content': 'Hiring Content',
      products: 'Products',
      'tech-stacks': 'Tech Stacks',
      team: 'Team',
      'life-content': 'Life Content',
      legal: 'Legal Pages',
      users: 'Admin Users',
      'audit-log': 'Audit Log',
      settings: 'Settings',
      new: 'New',
      edit: 'Edit',
    };

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const label = labelMap[part] || (part.match(/^\d+$/) ? `#${part}` : part);
      const href = '/' + parts.slice(0, i + 1).join('/');
      crumbs.push({ label, href: i < parts.length - 1 ? href : undefined });
    }
  }

  return crumbs;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Skip auth check on login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          router.replace('/admin/login');
        }
        setAuthChecked(true);
      })
      .catch(() => {
        router.replace('/admin/login');
        setAuthChecked(true);
      });
  }, [isLoginPage, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  }, [router]);

  if (!authChecked) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  // Login page renders without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) return null;

  const breadcrumbs = getBreadcrumbs(pathname);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const sidebarClasses = [
    styles.sidebar,
    collapsed ? styles.collapsed : '',
    mobileOpen ? styles.mobileOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mainClasses = [styles.mainArea, collapsed ? styles.sidebarCollapsed : '']
    .filter(Boolean)
    .join(' ');

  let currentSection = '';

  return (
    <ToastProvider>
      <div className={styles.adminLayout}>
        {/* Mobile overlay */}
        {mobileOpen && (
          <div className={styles.sidebarOverlay} onClick={() => setMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={sidebarClasses}>
          <div className={styles.sidebarBrand}>
            <img
              src="/images/pcloud-logo-full.svg"
              alt="pCloud"
              className={styles.sidebarLogo}
            />
            <span className={styles.sidebarBrandName}>Admin</span>
          </div>

          <nav className={styles.sidebarNav}>
            {navItems.map((item) => {
              let sectionEl = null;
              if (item.section && item.section !== currentSection) {
                currentSection = item.section;
                sectionEl = (
                  <div key={`section-${item.section}`} className={styles.sidebarSection}>
                    {item.section}
                  </div>
                );
              }

              return (
                <div key={item.href}>
                  {sectionEl}
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span>{user.username}</span>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={16} />
              <span className={styles.navLabel}>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className={mainClasses}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <button
                className={styles.hamburger}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle sidebar"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                className={styles.collapseBtn}
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Collapse sidebar"
              >
                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>

              <div className={styles.breadcrumbs}>
                {breadcrumbs.map((crumb, i) => (
                  <span key={i}>
                    {i > 0 && <span className={styles.breadcrumbSep}>/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.topbarRight}>
              <button className={styles.btnGhost} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </header>

          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
