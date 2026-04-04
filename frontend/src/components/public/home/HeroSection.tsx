'use client';

import Link from 'next/link';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
  jobCount?: number;
}

export function HeroSection({ jobCount }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      {/* Multi-color animated gradient blobs */}
      <div className={styles.gradientCanvas} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blobTeal}`} />
        <div className={`${styles.blob} ${styles.blobPurple}`} />
        <div className={`${styles.blob} ${styles.blobAmber}`} />
        <div className={`${styles.blob} ${styles.blobGreen}`} />
        <div className={`${styles.blob} ${styles.blobRose}`} />
      </div>
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.heroInner}>
        {/* LEFT: Text */}
        <div className={styles.heroText}>
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            <span className={styles.badgeText}>We&apos;re hiring{jobCount ? ` — ${jobCount} open roles` : ''}</span>
          </div>

          <h1 className={styles.heroTitle}>
            24 million people trust us with their data. We need engineers who{' '}
            <span className={styles.hl}>take that personally.</span>
          </h1>

          <p className={styles.heroSub}>
            We ship code that 24 million people depend on every day. The bar is high. The work is real.
          </p>

          <div className={styles.heroActions}>
            <Link href="/careers" className={styles.btnPrimary}>
              See open roles
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5-5-5-5" />
              </svg>
            </Link>
            <Link href="/about" className={styles.btnSecondary}>
              Read our story
            </Link>
          </div>
        </div>

        {/* RIGHT: Terminal — C code */}
        <div className={styles.terminalWrap}>
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <div className={`${styles.td} ${styles.tdR}`} />
              <div className={`${styles.td} ${styles.tdY}`} />
              <div className={`${styles.td} ${styles.tdG}`} />
              <span className={styles.terminalTab}>infrastructure.c</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.tl}><span className={styles.cc}>{'/* What we protect every single day */'}</span></div>
              <div className={styles.tl}><span className={styles.cp}>#include</span> <span className={styles.cs}>{'<pcloud/core.h>'}</span></div>
              <div className={styles.tl}>&nbsp;</div>
              <div className={styles.tl}><span className={styles.ck}>typedef struct</span> <span className={styles.cu}>{'{'}</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.ct}>uint64_t</span>&nbsp;&nbsp;&nbsp;<span className={styles.cv}>users</span><span className={styles.cu}>;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cc}>{'// 24,000,000+'}</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.ct}>uint64_t</span>&nbsp;&nbsp;&nbsp;<span className={styles.cv}>bytes_stored</span><span className={styles.cu}>;</span>&nbsp;<span className={styles.cc}>{'// 500+ petabytes'}</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.ct}>double</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cv}>uptime</span><span className={styles.cu}>;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cc}>{'// 99.92%'}</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.ct}>uint8_t</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cv}>platforms</span><span className={styles.cu}>;</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cc}>{'// 6'}</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.ct}>uint32_t</span>&nbsp;&nbsp;&nbsp;<span className={styles.cv}>breaches</span><span className={styles.cu}>;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cc}>{'// 0. Always.'}</span></div>
              <div className={styles.tl}><span className={styles.cu}>{'}'}</span> <span className={styles.ct}>pcloud_platform_t</span><span className={styles.cu}>;</span></div>
              <div className={styles.tl}>&nbsp;</div>
              <div className={styles.tl}><span className={styles.ct}>pcloud_platform_t</span> <span className={styles.ct}>pcloud</span> <span className={styles.cu}>=</span> <span className={styles.cu}>{'{'}</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.cu}>.</span><span className={styles.cv}>users</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.cu}>=</span> <span className={styles.cn}>24000000</span><span className={styles.cu}>,</span></div>
              <div className={styles.tl}>&nbsp;&nbsp;<span className={styles.cu}>.</span><span className={styles.cv}>bytes_stored</span> <span className={styles.cu}>=</span> <span className={styles.cn}>500ULL</span> <span className={styles.cu}>*</span> <span className={styles.cn}>PB</span><span className={styles.cu}>,</span></div>
              <div className={styles.tl}><span className={styles.cu}>{'};'}</span> <span className={styles.cc}>{'// Ready to build with us?'}</span><span className={styles.cursor} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
