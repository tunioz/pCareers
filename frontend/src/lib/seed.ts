import { execute, queryOne, queryAll, transaction, getDb } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { createSlug } from '@/lib/slugify';

/**
 * Seed the database with pCloud careers data.
 * All 9 job positions sourced from the official pCloud job descriptions document.
 * Safe to run multiple times -- clears existing data first.
 */
export async function seed() {
  console.log('Seeding database...');

  const passwordHash = await hashPassword('admin123');

  transaction(() => {
    // -----------------------------------------------------------------------
    // Clear existing data (order matters due to foreign keys)
    // -----------------------------------------------------------------------
    execute('DELETE FROM post_tags');
    execute('DELETE FROM job_benefits');
    execute('DELETE FROM custom_scores');
    execute('DELETE FROM candidate_task_submissions');
    execute('DELETE FROM candidate_attachments');
    execute('DELETE FROM candidate_history');
    execute('DELETE FROM candidate_scores');
    execute('DELETE FROM candidate_notes');
    execute('DELETE FROM candidate_references');
    execute('DELETE FROM candidates');
    execute('DELETE FROM position_criteria');
    execute('DELETE FROM technical_tasks');
    execute('DELETE FROM email_templates');
    execute('DELETE FROM posts');
    execute('DELETE FROM tags');
    execute('DELETE FROM categories');
    execute('DELETE FROM interview_stages');
    execute('DELETE FROM process_steps');
    execute('DELETE FROM jobs');
    execute('DELETE FROM interview_templates');
    execute('DELETE FROM process_templates');
    execute('DELETE FROM candidate_values');
    execute('DELETE FROM pcloud_bar_criteria');
    execute('DELETE FROM process_highlights');
    execute('DELETE FROM default_benefits');
    execute('DELETE FROM team_members');
    execute('DELETE FROM company_settings');
    execute('DELETE FROM products');
    execute('DELETE FROM tech_stacks');
    execute('DELETE FROM gallery_photos');
    execute('DELETE FROM gallery_categories');
    execute('DELETE FROM team_stories');
    execute('DELETE FROM legal_pages');
    execute('DELETE FROM admin_users');

    // Reset autoincrement counters
    const db = getDb();
    db.exec("DELETE FROM sqlite_sequence");

    // -----------------------------------------------------------------------
    // Admin user
    // -----------------------------------------------------------------------
    execute(
      'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
      ['admin', passwordHash]
    );
    console.log('  Created admin user: admin / admin123');

    // -----------------------------------------------------------------------
    // Products (matching pCloud job descriptions document)
    // -----------------------------------------------------------------------
    const products = [
      { name: 'pCloud Drive (Core Library)', sort_order: 0 },
      { name: 'pCloud Drive (Windows)', sort_order: 1 },
      { name: 'pCloud Drive (macOS)', sort_order: 2 },
      { name: 'pCloud Drive (Linux)', sort_order: 3 },
      { name: 'pCloud Drive (iOS)', sort_order: 4 },
      { name: 'pCloud Drive (Windows, macOS, Linux)', sort_order: 5 },
      { name: 'pCloud (Global Growth)', sort_order: 6 },
      { name: 'pCloud (Regional Growth)', sort_order: 7 },
    ];

    for (const p of products) {
      execute(
        'INSERT INTO products (name, sort_order) VALUES (?, ?)',
        [p.name, p.sort_order]
      );
    }
    console.log(`  Created ${products.length} products`);

    // -----------------------------------------------------------------------
    // Tech Stacks (all technologies from the 9 job descriptions)
    // -----------------------------------------------------------------------
    const techStackNames = [
      // C Library Developer
      'ANSI C', 'pthreads', 'FUSE', 'CBFS', 'CMake', 'gdb', 'lldb', 'AddressSanitizer', 'AES encryption',
      // Windows Developer
      'C#', '.NET 9', 'WPF', 'XAML', 'MVVM', 'C/C++ interop (P/Invoke)', 'WiX Toolset', 'Visual Studio', 'WinDbg',
      // macOS Developer
      'Swift', 'Objective-C', 'AppKit', 'SwiftUI', 'macFUSE', 'XPC', 'Instruments', 'DMG/notarisation',
      // Linux Developer
      'TypeScript 5+', 'React 18', 'Electron', 'Node.js 22+', 'Webpack 5', 'SASS', 'Koffi/FFI', 'electron-builder', 'Sentry',
      // iOS Developer
      'UIKit', 'Combine', 'async/await', 'XCTest', 'Core Data/SQLite', 'SPM/CocoaPods',
      // QA Engineer
      'Playwright', 'Cypress', 'Selenium', 'Appium', 'Python',
      // PPC Specialist
      'Meta Ads', 'Google Ads', 'Microsoft Ads', 'Google Analytics', 'A/B testing',
      // Content Marketing
      'SEO/SEM tools', 'CMS platforms', 'AI content models', 'editorial calendars', 'analytics dashboards',
      // Regional Marketing
      'Facebook Ads', 'affiliate networks', 'translation/localisation tools',
    ];

    // Deduplicate
    const uniqueTechStacks = [...new Set(techStackNames)];
    for (const name of uniqueTechStacks) {
      execute('INSERT INTO tech_stacks (name) VALUES (?)', [name]);
    }
    console.log(`  Created ${uniqueTechStacks.length} tech stacks`);

    // -----------------------------------------------------------------------
    // Categories
    // -----------------------------------------------------------------------
    const categories = [
      { name: 'Infrastructure', slug: 'infrastructure' },
      { name: 'Security', slug: 'security' },
      { name: 'Performance', slug: 'performance' },
      { name: 'Mobile', slug: 'mobile' },
      { name: 'Product Eng', slug: 'product-eng' },
      { name: 'Culture', slug: 'culture' },
    ];

    for (const cat of categories) {
      execute(
        'INSERT INTO categories (name, slug) VALUES (?, ?)',
        [cat.name, cat.slug]
      );
    }
    console.log(`  Created ${categories.length} categories`);

    // -----------------------------------------------------------------------
    // Tags (matching pCloud job descriptions document)
    // -----------------------------------------------------------------------
    const tagNames = [
      'ANSI C', 'C#', '.NET', 'WPF', 'Swift', 'Objective-C', 'SwiftUI',
      'TypeScript', 'React', 'Electron', 'Node.js', 'iOS', 'macOS', 'Linux',
      'Windows', 'QA', 'Playwright', 'Cypress', 'PPC', 'SEO',
      'Content Marketing', 'FUSE', 'Desktop', 'Mobile', 'Marketing',
    ];

    for (const name of tagNames) {
      execute('INSERT INTO tags (name) VALUES (?)', [name]);
    }
    console.log(`  Created ${tagNames.length} tags`);

    // -----------------------------------------------------------------------
    // Blog posts (12 articles from the Figma design)
    // -----------------------------------------------------------------------
    const posts = [
      {
        title: 'How We Scaled to 500 Petabytes',
        category: 'infrastructure',
        author: 'Georgi Ivanov',
        author_title: 'VP of Engineering',
        read_time: '8 min',
        created_at: '2025-10-15T10:00:00',
        tags: ['ANSI C', 'Linux'],
        excerpt: 'The journey of scaling pCloud\'s storage infrastructure from a few petabytes to over 500PB, covering architecture decisions, hardware evolution, and the lessons we learned along the way.',
        content: '<h2>The Challenge</h2><p>When pCloud started, we had a modest storage infrastructure. As our user base grew exponentially, we faced the monumental challenge of scaling to hundreds of petabytes while maintaining performance and reliability.</p><h2>Architecture Decisions</h2><p>We chose a distributed architecture with custom-built storage nodes. Each node handles a portion of the data, with built-in redundancy and automatic failover. Our C-based storage engine was designed from the ground up for high throughput and low latency.</p><h2>Hardware Evolution</h2><p>Over the years, we transitioned from traditional spinning disks to a hybrid approach combining NVMe SSDs for hot data and high-density HDDs for cold storage. This allowed us to optimize both performance and cost.</p><h2>Key Learnings</h2><p>The most important lesson was to design for failure. In a system this large, hardware failures are not exceptions -- they are the norm. Our self-healing infrastructure automatically detects and recovers from failures without any user-visible impact.</p>',
        is_featured: 1,
      },
      {
        title: 'The C Engine That Powers Every Desktop Client',
        category: 'infrastructure',
        author: 'Nikolay Dimitrov',
        author_title: 'Principal Engineer',
        read_time: '10 min',
        created_at: '2025-11-02T10:00:00',
        tags: ['ANSI C', 'FUSE', 'Desktop'],
        excerpt: 'Deep dive into the cross-platform C library at the heart of pCloud Drive -- how we handle virtual drive emulation, real-time sync, encryption, and conflict resolution across Windows, macOS, and Linux.',
        content: '<h2>One Library, Three Platforms</h2><p>Somewhere underneath every pCloud desktop app there is a single C library. It handles virtual drive emulation, real-time file sync, encryption, and conflict resolution. It mounts terabytes of cloud storage as native filesystems using FUSE and CBFS.</p><h2>Why ANSI C?</h2><p>Performance, portability, and control. When you are building software that 24 million users depend on, you need every byte to count. ANSI C gives us the ability to write code that runs identically on Windows, macOS, and Linux with minimal platform-specific adaptation.</p><h2>Debugging at Scale</h2><p>Debugging multithreaded C in production is an art form. We use gdb, lldb, AddressSanitizer, and hours of core dump analysis. When a race condition only reproduces under specific load patterns across specific OS versions, you learn patience and precision.</p><h2>The API Contract</h2><p>Three separate desktop teams depend on our API. Every breaking change has consequences. We design clean, stable interfaces and communicate changes well in advance.</p>',
        is_featured: 1,
      },
      {
        title: 'Building pCloud Drive for Windows with WPF',
        category: 'product-eng',
        author: 'Petar Stoyanov',
        author_title: 'Desktop Lead',
        read_time: '7 min',
        created_at: '2025-11-18T10:00:00',
        tags: ['C#', '.NET', 'WPF', 'Windows', 'Desktop'],
        excerpt: 'How we build a native Windows experience that makes cloud storage feel like a local drive, using WPF, C# interop, and our high-performance C engine.',
        content: '<h2>Not Just Another Tray App</h2><p>pCloud Drive on Windows is a virtual filesystem that makes 500+ petabytes of cloud storage feel like a local drive. Built on WPF with a high-performance C/C++ native engine underneath, it handles encryption, conflict resolution, and cross-device syncing at speed.</p><h2>Bridging Managed and Native</h2><p>One of our biggest technical challenges is the boundary between managed .NET code and our native C/C++ engine. We use P/Invoke extensively, with careful marshalling to ensure data integrity and performance.</p><h2>The Installer Challenge</h2><p>Using WiX Toolset, we build installers that handle flawless first-run setups, seamless upgrades, and secure device onboarding. Getting this right is critical -- the first impression matters.</p><h2>Stability at Scale</h2><p>When millions of users depend on your software, debugging elusive issues at the managed/unmanaged boundary under heavy file loads becomes your daily reality. Stability is non-negotiable.</p>',
        is_featured: 0,
      },
      {
        title: 'macOS Native: Why We Chose AppKit + SwiftUI',
        category: 'mobile',
        author: 'Petar Stoyanov',
        author_title: 'Desktop Lead',
        read_time: '8 min',
        created_at: '2025-12-05T10:00:00',
        tags: ['Swift', 'Objective-C', 'SwiftUI', 'macOS', 'Desktop'],
        excerpt: 'Our approach to building a truly native macOS cloud storage client with deep Finder integration, macFUSE virtual filesystem, and the polished experience Mac users expect.',
        content: '<h2>Not a Web Wrapper</h2><p>pCloud on Mac is not a web wrapper. It is a native macOS application that presents cloud storage in Finder as a mounted volume via macFUSE, with seamless file sync, zero-knowledge encryption, and the polished experience Mac users expect.</p><h2>Three Things That Rarely Come Together</h2><p>This role combines beautiful SwiftUI/AppKit interfaces, deep macOS systems integration (daemons, XPC, Finder extensions), and C/C++ interoperability with our high-performance sync library.</p><h2>Finder Integration</h2><p>Making cloud storage feel like it belongs in Finder requires deep understanding of macOS internals -- launch agents, XPC services, sandboxing, and the nuances of APFS behaviour.</p>',
        is_featured: 0,
      },
      {
        title: 'Rewriting the Linux Client from Scratch',
        category: 'product-eng',
        author: 'Martin Petkov',
        author_title: 'Senior Engineer',
        read_time: '9 min',
        created_at: '2025-12-20T10:00:00',
        tags: ['TypeScript', 'React', 'Electron', 'Node.js', 'Linux', 'Desktop'],
        excerpt: 'Why we decided to build the Linux desktop client from scratch using Electron, React, and TypeScript -- and how we integrate with the native C sync engine.',
        content: '<h2>Not a Port, Not a Wrapper</h2><p>We are building the Linux desktop client from scratch. A complete, modern rewrite: 50+ TypeScript modules, 70+ React components, complex state management, native C/C++ sync engine integration, and a FUSE-mounted virtual drive.</p><h2>Linux Users Deserve First-Class</h2><p>Linux users have always deserved a first-class cloud storage experience. This is an Electron app done right -- deep integration with GNOME, KDE, XFCE, system trays, file managers, XDG standards, and the full spectrum of Linux desktop environments.</p><h2>Native Bindings</h2><p>We integrate the proprietary native sync engine through Koffi/FFI bindings to shared .so libraries. The challenge is bridging JavaScript and native C code reliably in production across multiple Linux distributions.</p><h2>Distribution</h2><p>AppImage, Snap packaging, and in-app updates. Supporting the Linux ecosystem means testing on Ubuntu, Fedora, Arch, and more.</p>',
        is_featured: 1,
      },
      {
        title: 'Zero-Knowledge Encryption',
        category: 'security',
        author: 'Elena Todorova',
        author_title: 'Security Lead',
        read_time: '10 min',
        created_at: '2026-01-10T10:00:00',
        tags: ['ANSI C', 'Desktop'],
        excerpt: 'An in-depth look at how pCloud Encryption implements zero-knowledge encryption, ensuring that only you can access your encrypted files.',
        content: '<h2>What is Zero-Knowledge Encryption?</h2><p>Zero-knowledge encryption means that the service provider (pCloud) has no ability to decrypt your data. The encryption and decryption happen entirely on the client side, and the encryption keys never leave your device.</p><h2>Our Implementation</h2><p>pCloud Crypto uses AES-256 for file encryption and RSA-4096 for key exchange. When you create a Crypto folder, a unique key pair is generated on your device. Files are encrypted before being uploaded, and the private key is protected by your passphrase using PBKDF2.</p><h2>Security Guarantees</h2><p>Even if our servers were compromised, the attacker would only see encrypted data with no way to decrypt it. This is the strongest form of cloud storage security available.</p>',
        is_featured: 0,
      },
      {
        title: 'Optimizing File Sync',
        category: 'performance',
        author: 'Nikolay Dimitrov',
        author_title: 'Principal Engineer',
        read_time: '9 min',
        created_at: '2026-01-25T10:00:00',
        tags: ['ANSI C', 'FUSE', 'Desktop'],
        excerpt: 'The engineering behind pCloud Drive\'s file sync engine -- how we achieve near-instant sync while minimizing bandwidth and CPU usage.',
        content: '<h2>The Sync Challenge</h2><p>File synchronization seems simple on the surface: detect changes and upload them. But at scale, with millions of files and complex folder hierarchies, it becomes a fascinating engineering problem.</p><h2>Delta Sync</h2><p>Instead of uploading entire files on every change, we use a block-level delta sync algorithm. We divide files into variable-size blocks using a rolling hash, and only upload the blocks that have changed. For a 1GB file with a small edit, this can reduce the upload to just a few kilobytes.</p><h2>Conflict Resolution</h2><p>When the same file is modified on multiple devices simultaneously, we use a last-writer-wins strategy with automatic conflict copy creation, ensuring no data is ever lost.</p>',
        is_featured: 0,
      },
      {
        title: 'Quality at Scale: Testing Desktop Apps Across Three OSes',
        category: 'product-eng',
        author: 'Ivaylo Stoyanov',
        author_title: 'QA Lead',
        read_time: '7 min',
        created_at: '2026-02-08T10:00:00',
        tags: ['QA', 'Playwright', 'Cypress', 'Desktop', 'Windows', 'macOS', 'Linux'],
        excerpt: 'How our QA team ensures pCloud Drive works flawlessly on Windows, macOS, and Linux -- from automated testing to edge case hunting.',
        content: '<h2>Quality Is Not a Department</h2><p>When 24 million users depend on the software you validate, quality is not a department. It is a standard. Our QA team owns quality for desktop applications across three operating systems.</p><h2>Automation First</h2><p>We use Playwright, Cypress, and Selenium to automate testing across platforms. End-to-end test scenarios cover real-world usage: large file operations, network interruptions, conflicts, and offline/online transitions.</p><h2>The Edge Cases</h2><p>Virtual drive behaviour must be validated on each platform -- drive letters, mounts, permissions, file operations. Some bugs only appear on one platform with one filesystem under one specific edge case. Finding and reproducing these is an art.</p><h2>85%+ Coverage</h2><p>Automated tests are a first-class citizen. We maintain 85%+ coverage for critical paths and integrate automated test suites into our CI pipeline.</p>',
        is_featured: 0,
      },
      {
        title: 'iOS at pCloud: Shipping to Millions',
        category: 'mobile',
        author: 'Maria Todorova',
        author_title: 'Mobile Lead',
        read_time: '8 min',
        created_at: '2026-02-22T10:00:00',
        tags: ['Swift', 'iOS', 'SwiftUI', 'Mobile'],
        excerpt: 'Inside the pCloud iOS app -- background sync, photo backup, offline access, zero-knowledge encryption, and what it takes to ship to millions of users.',
        content: '<h2>More Than a File Browser</h2><p>The pCloud iOS app handles background sync, photo backup, offline access, zero-knowledge encryption, and a file management experience that must feel effortless. It is not a simple file browser.</p><h2>Ownership Culture</h2><p>As a Senior iOS Developer at pCloud, you own complex features end-to-end -- from technical discovery and architecture through implementation, testing, App Store release, and production monitoring.</p><h2>Architecture at Scale</h2><p>We use MVVM and Clean Architecture patterns with Swift, Combine, and async/await concurrency. The architecture must be modular, testable, and built to scale.</p><h2>Performance</h2><p>Memory leaks, crashes, and performance issues are diagnosed using Instruments, Xcode debugger, and time profiler. When your app is used by millions, every millisecond counts.</p>',
        is_featured: 0,
      },
      {
        title: 'Global PPC: Driving Growth Across 175+ Countries',
        category: 'culture',
        author: 'Daniela Ivanova',
        author_title: 'Head of Marketing',
        read_time: '6 min',
        created_at: '2026-03-05T10:00:00',
        tags: ['PPC', 'Marketing'],
        excerpt: 'How pCloud runs performance marketing campaigns across Meta, Google, and Microsoft Ads to drive user acquisition in 175+ countries.',
        content: '<h2>Data Drives Every Decision</h2><p>pCloud serves 24 million users across 175+ countries. Behind that growth is a performance marketing engine that runs campaigns across Meta, Google, Microsoft, and emerging platforms -- in multiple languages, multiple markets, simultaneously.</p><h2>Thinking in Metrics</h2><p>We think in ROAS, CPL, and conversion rates. But we also understand that behind every click is a person deciding whether to trust us with their data.</p><h2>Test and Iterate</h2><p>We propose and test new audiences, creatives, campaign structures, and platforms. Reddit, TikTok, X -- if there is growth to be unlocked, we find it.</p>',
        is_featured: 0,
      },
      {
        title: 'Content Strategy for a Global Product',
        category: 'culture',
        author: 'Daniela Ivanova',
        author_title: 'Head of Marketing',
        read_time: '5 min',
        created_at: '2026-03-15T10:00:00',
        tags: ['SEO', 'Content Marketing', 'Marketing'],
        excerpt: 'How we craft content that helps millions of people discover pCloud, understand why it matters, and decide to trust us with their data.',
        content: '<h2>Content Is a Growth Engine</h2><p>At pCloud, content is not filler. It is a growth engine. Our blog, social media, email campaigns, and website content reach millions of people across 175+ countries.</p><h2>Writing for Humans</h2><p>We understand SEO, but we write for humans first. Every piece of content either helps someone discover pCloud, understand why it matters, or decide to trust us with their data.</p><h2>Data-Driven</h2><p>We analyse performance monthly, identify what works, and adjust strategy based on data -- not gut feelings. If it cannot be measured, we do not do it.</p>',
        is_featured: 0,
      },
      {
        title: 'How We Run Hackathons',
        category: 'culture',
        author: 'Nikolay Dimitrov',
        author_title: 'Principal Engineer',
        read_time: '5 min',
        created_at: '2026-03-22T10:00:00',
        tags: ['TypeScript', 'React', 'Desktop'],
        excerpt: 'Inside pCloud\'s quarterly hackathons -- how we foster innovation, build team bonds, and turn hack projects into real product features.',
        content: '<h2>The Format</h2><p>Every quarter, we hold a two-day hackathon where engineers can work on any project they are passionate about. Teams are formed organically, often crossing departmental boundaries. The only rule: build something that could benefit pCloud or its users.</p><h2>Past Wins</h2><p>Several major features started as hackathon projects, including our file versioning system, the public folder feature, and our internal deployment dashboard. The hackathon provides a safe space for experimentation that might be too risky for normal development cycles.</p><h2>Building Culture</h2><p>Beyond the technical output, hackathons are a powerful team-building tool. Engineers who normally work in separate teams get to collaborate, share knowledge, and build lasting relationships.</p>',
        is_featured: 0,
      },
    ];

    // Build a tag name-to-id map
    const tagMap: Record<string, number> = {};
    for (const name of tagNames) {
      const row = queryOne<{ id: number }>('SELECT id FROM tags WHERE name = ?', [name]);
      if (row) tagMap[name] = row.id;
    }

    for (const post of posts) {
      const slug = createSlug(post.title);
      const coverImages: Record<string, string> = {
        'How We Scaled to 500 Petabytes': 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?w=1080&fit=crop',
        'The C Engine That Powers Every Desktop Client': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1080&fit=crop',
        'Building pCloud Drive for Windows with WPF': 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=1080&fit=crop',
        'macOS Native: Why We Chose AppKit + SwiftUI': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&fit=crop',
        'Rewriting the Linux Client from Scratch': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1080&fit=crop',
        'Zero-Knowledge Encryption': 'https://images.unsplash.com/photo-1762340916350-ad30f91023b52?w=1080&fit=crop',
        'Optimizing File Sync': 'https://images.unsplash.com/photo-1758577675588-c5bbbbbf8e97?w=1080&fit=crop',
        'Quality at Scale: Testing Desktop Apps Across Three OSes': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1080&fit=crop',
        'iOS at pCloud: Shipping to Millions': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1080&fit=crop',
        'Global PPC: Driving Growth Across 175+ Countries': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&fit=crop',
        'Content Strategy for a Global Product': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1080&fit=crop',
        'How We Run Hackathons': 'https://images.unsplash.com/photo-1638029202288-451a89e0d55f?w=1080&fit=crop',
      };

      const result = execute(
        `INSERT INTO posts (title, slug, content, excerpt, category, author, author_title, author_image, cover_image, read_time, is_featured, is_published, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          post.title,
          slug,
          post.content,
          post.excerpt || null,
          post.category,
          post.author,
          post.author_title || null,
          null,
          coverImages[post.title] || null,
          post.read_time || null,
          post.is_featured || 0,
          1,
          post.created_at,
          post.created_at,
        ]
      );

      const postId = result.lastInsertRowid;

      // Link tags
      for (const tagName of post.tags) {
        const tagId = tagMap[tagName];
        if (tagId) {
          execute('INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)', [postId, tagId]);
        }
      }
    }
    console.log(`  Created ${posts.length} blog posts`);

    // -----------------------------------------------------------------------
    // Jobs (9 positions from the official pCloud job descriptions document)
    // -----------------------------------------------------------------------

    const jobs = [
      // 1. Senior Cross-Platform C Library Developer
      {
        title: 'Senior Cross-Platform C Library Developer',
        department: 'Engineering -- Desktop',
        product: 'pCloud Drive (Core Library)',
        seniority: 'Senior',
        location: 'Sofia, Bulgaria',
        employment_type: 'Full-time',
        tags: 'ANSI C,FUSE,Desktop',
        is_new: 0,
        is_high_priority: 0,
        description: 'The C engine that powers every pCloud desktop client. Every optimisation you make is felt by 24 million users.\n\nSomewhere underneath every pCloud desktop app -- Windows, macOS, Linux -- there is a single C library. It handles virtual drive emulation, real-time file sync, encryption, and conflict resolution. It mounts terabytes of cloud storage as native filesystems using FUSE and CBFS. It is the heartbeat of pCloud Drive.\n\nWe need someone who can keep that heart beating -- and make it faster. This is deep systems programming. Not web APIs. Not microservices. Pure ANSI C, pthreads, and the kind of debugging where you stare at core dumps until the race condition reveals itself.',
        challenges: 'Maintain and extend the ANSI C core library for cross-platform file synchronisation, virtual filesystem mounting (FUSE/CBFS), encryption, and conflict resolution\nDebug intricate multithreaded race conditions, deadlocks, and memory corruption using gdb, lldb, AddressSanitizer, and core dump analysis\nEnhance stability across three operating systems simultaneously, adding features like selective sync, versioning, and offline caching\nDesign clean APIs that three separate desktop teams (Windows, macOS, Linux) depend on -- every breaking change has consequences',
        team_name: 'Core Library Team',
        team_size: '6 engineers',
        team_lead: 'Nikolay Dimitrov, Principal Engineer',
        team_quote: 'Every desktop client is only as good as the C engine underneath. We build the part nobody sees and everybody depends on.',
        tech_stack: 'ANSI C, pthreads, FUSE, CBFS, CMake, gdb/lldb, AddressSanitizer, AES encryption',
        what_youll_learn: 'You will work at a level of systems programming that most developers never reach. You will master multithreaded C in production environments where a single bug can corrupt data for millions of users. You will understand how virtual filesystems work at the kernel level, learn cross-platform I/O optimisation, and develop the kind of debugging intuition that only comes from working on code this critical.',
        requirements: 'Deep expertise in ANSI C -- pointers, memory management, low-level optimisation are second nature\nProduction-proven multithreading (pthreads, mutexes, condition variables, thread pools)\nExpert debugging of complex multithreaded applications -- you have found race conditions that took weeks to reproduce\nCross-platform experience: Windows/Linux/macOS differences in filesystems, threading, and networking\nBuild systems proficiency (CMake, Make, Autotools) and static analysis tools',
        nice_to_have: 'Filesystem internals (FUSE, CBFS, NTFS/APFS/ext4 quirks)\nCryptography (AES, secure key handling)\nPerformance profiling (perf, Instruments) for I/O-heavy workloads\nUnit testing in C (CMock, Unity) with CI/CD integration',
        cover_image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1080&fit=crop',
      },
      // 2. Senior Windows Desktop Developer
      {
        title: 'Senior Windows Desktop Developer',
        department: 'Engineering -- Desktop',
        product: 'pCloud Drive (Windows)',
        seniority: 'Senior',
        location: 'Sofia, Bulgaria',
        employment_type: 'Full-time',
        tags: 'C#,.NET,WPF,Windows,Desktop',
        is_new: 0,
        is_high_priority: 0,
        description: 'Make cloud storage feel magical on Windows. WPF + native C/C++ engine. Millions of real users.\n\npCloud Drive on Windows is not just another app in the tray. It is a virtual filesystem that makes 500+ petabytes of cloud storage feel like a local drive. Built on WPF with a high-performance C/C++ native engine underneath, it handles encryption, conflict resolution, and cross-device syncing at speed.\n\nYou will work on a small, high-impact team that ships polished software to millions of real users. From intuitive file explorers to real-time sync status and secure sharing UIs -- every feature you build is used daily by people who trust us with their most important data.',
        challenges: 'Build and refine WPF features -- file explorers, real-time sync status, secure sharing UIs -- that feel native and fast\nBridge managed .NET and native C/C++ code for high-speed encryption, conflict resolution, and cross-device syncing\nOwn the WiX installer: flawless first-run setups, seamless upgrades, and secure device onboarding\nDebug elusive issues at the managed/unmanaged boundary under heavy file loads -- stability is non-negotiable',
        team_name: 'Windows Desktop Team',
        team_size: '4 engineers',
        team_lead: 'Petar Stoyanov, Desktop Lead',
        team_quote: 'Cloud storage should feel instant and invisible on Windows. That is the bar we set, and we hit it.',
        tech_stack: 'C#, .NET 9, WPF/XAML, MVVM, C/C++ interop (P/Invoke), WiX Toolset, Visual Studio, WinDbg',
        what_youll_learn: 'You will master the art of bridging managed and native code in production. You will learn how to optimise sync performance to feel instant even with massive file libraries, gain deep expertise in Windows installer technologies, and understand what it takes to ship rock-solid desktop software to millions.',
        requirements: 'Deep C#/.NET experience (Core/6+) with a track record of shipping WPF applications\nWPF mastery: MVVM, XAML, data binding, custom controls, responsive UIs\nHands-on C/C++ interop (P/Invoke, marshalling) -- you have bridged managed and native code before\nWiX Toolset expertise for production-grade Windows installers\nStrong debugging across managed/native boundaries with Visual Studio and WinDbg',
        nice_to_have: 'C++/CLI for smoother native bridges\nCI/CD for desktop builds, signing, and releases\nWindows code signing and upgrade handling\nDesktop testing automation and performance profiling',
        cover_image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=1080&fit=crop',
      },
      // 3. Senior macOS Desktop Developer
      {
        title: 'Senior macOS Desktop Developer',
        department: 'Engineering -- Desktop',
        product: 'pCloud Drive (macOS)',
        seniority: 'Senior',
        location: 'Sofia, Bulgaria',
        employment_type: 'Full-time',
        tags: 'Swift,Objective-C,SwiftUI,macOS,Desktop',
        is_new: 0,
        is_high_priority: 0,
        description: 'Cloud storage in Finder. Native macOS + macFUSE + C/C++ sync engine. The Mac experience, done right.\n\npCloud on Mac is not a web wrapper. It is a native macOS application that presents cloud storage in Finder as a mounted volume via macFUSE, with seamless file sync, zero-knowledge encryption, and the polished experience Mac users expect.\n\nThis role combines three things that rarely come together: beautiful SwiftUI/AppKit interfaces, deep macOS systems integration (daemons, XPC, Finder extensions), and C/C++ interoperability with our high-performance sync library. If you enjoy building software that feels like it belongs on macOS, this is where you do it.',
        challenges: 'Develop a native macOS client using the latest Apple technologies with deep Finder and filesystem integration\nMaintain and evolve the macFUSE-backed virtual filesystem -- cloud storage must feel like a local volume\nIntegrate the C/C++ sync library using Swift bridging or Objective-C++ interoperability\nInvestigate and resolve complex filesystem edge cases, performance bottlenecks, and multi-device sync issues across real-world macOS environments',
        team_name: 'macOS Desktop Team',
        team_size: '4 engineers',
        team_lead: 'Petar Stoyanov, Desktop Lead',
        team_quote: 'We build Mac software the way Apple would -- native, polished, and deeply integrated. Cloud storage should feel like it belongs in Finder.',
        tech_stack: 'Swift, Objective-C, C, AppKit, SwiftUI, macFUSE, XPC, Instruments, lldb, DMG/notarisation',
        what_youll_learn: 'You will gain rare expertise in macOS systems programming -- virtual filesystems, launch agents, XPC services, and Finder integration. You will master Swift/C interoperability and Apple deployment workflows. This is the kind of deep macOS knowledge that sets you apart.',
        requirements: 'Expert-level Objective-C and Swift with significant production experience\nFluency in C and proven C/Objective-C/Swift interoperability skills\nStrong experience with AppKit and SwiftUI for native macOS UIs\nExperience with daemons, launch agents, XPC, and deep macOS internals (filesystem behaviour, process lifecycle, sandboxing)\nmacOS deployment: code signing, notarisation, DMG packaging\nProficiency with Instruments, Console.app, lldb, and crash report analysis\nExperience with macFUSE/FUSE and Finder integration',
        nice_to_have: 'Virtual filesystem experience (FUSE, Dokany, or similar)\nmacOS accessibility (VoiceOver)\nTest automation with XCTest and XCUITest\nAPI design and secure data handling',
        cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&fit=crop',
      },
      // 4. Senior Linux Desktop Developer (NEW)
      {
        title: 'Senior Linux Desktop Developer',
        department: 'Engineering -- Desktop',
        product: 'pCloud Drive (Linux)',
        seniority: 'Senior',
        location: 'Sofia, Bulgaria',
        employment_type: 'Full-time',
        tags: 'TypeScript,React,Electron,Node.js,Linux,Desktop',
        is_new: 1,
        is_high_priority: 0,
        description: 'A complete rewrite. Electron + React + FUSE. Make cloud storage feel truly native on Linux.\n\nWe are building the Linux desktop client from scratch. Not a port. Not a wrapper. A complete, modern rewrite: 50+ TypeScript modules, 70+ React components, complex state management, native C/C++ sync engine integration, and a FUSE-mounted virtual drive that makes cloud files feel local.\n\nLinux users have always deserved a first-class cloud storage experience. We are finally building it. This is an Electron app done right -- deep integration with GNOME, KDE, XFCE, system trays, file managers, XDG standards, and the full spectrum of Linux desktop environments.',
        challenges: 'Lead development of a production Electron app built with React, TypeScript 5+, Node.js 22+, and Webpack 5\nIntegrate the proprietary native sync engine through Koffi/FFI bindings to shared .so libraries\nDeliver polished integration with Nemo, Nautilus, Dolphin, Caja, Thunar -- tray, notifications, autostart, protocol handlers, and file manager context menus\nBuild and maintain Linux release flows: electron-builder, AppImage, Snap packaging, and in-app updates',
        team_name: 'Linux Desktop Team',
        team_size: '3 engineers',
        team_lead: 'Martin Petkov, Senior Engineer',
        team_quote: 'We are building the Linux cloud storage client that we always wanted to use ourselves. From scratch. No compromises.',
        tech_stack: 'TypeScript 5+, React 18, Electron, Node.js 22+, Webpack 5, SASS, Koffi/FFI, FUSE, electron-builder, Sentry',
        what_youll_learn: 'You will master the full spectrum of Linux desktop development. From React components to native C/C++ bindings, from FUSE filesystems to AppImage distribution. You will ship production desktop software across multiple Linux distributions and learn to debug across JavaScript, native code, and OS integration layers simultaneously.',
        requirements: 'Strong senior-level TypeScript, React, Electron, and modern Node.js experience\nDeep Linux desktop knowledge: GNOME/KDE/XFCE, XDG/freedesktop standards, desktop entries, permissions, symlinks\nExperience integrating native C/C++ libraries into JavaScript applications (FFI, memory management, error handling)\nConfidence with Webpack, electron-builder, and shipping production desktop software on Linux',
        nice_to_have: 'Sync clients, virtual filesystems, or encrypted storage experience\nAppImage/Snap distribution and Linux packaging (DEB, RPM)\nBash scripting, Jest/Testing Library, performance profiling\nSentry, Aptabase analytics, i18n localisation',
        cover_image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1080&fit=crop',
      },
      // 5. Senior iOS Developer
      {
        title: 'Senior iOS Developer',
        department: 'Engineering -- Mobile',
        product: 'pCloud Drive (iOS)',
        seniority: 'Senior',
        location: 'Sofia, Bulgaria',
        employment_type: 'Full-time',
        tags: 'Swift,iOS,SwiftUI,Mobile',
        is_new: 0,
        is_high_priority: 0,
        description: 'The pCloud app on iOS. Millions of users. Complex features end-to-end. Your code, their data.\n\nThe pCloud iOS app is where millions of people access their most important files, photos, and documents. It is not a simple file browser. It handles background sync, photo backup, offline access, zero-knowledge encryption, and a file management experience that must feel effortless.\n\nAs a Senior iOS Developer, you will own complex features end-to-end -- from technical discovery and architecture through implementation, testing, release, and production monitoring. You will set engineering standards, mentor developers, perform architecture reviews, and drive continuous improvements. This is not a ticket-closing role. This is an ownership role.',
        challenges: 'Own complex features end-to-end: from technical discovery and architecture through App Store release and production monitoring\nDesign and implement modular, testable architectures (MVVM, VIPER, Clean Architecture) that scale\nDiagnose and fix memory leaks, crashes, and performance issues using Instruments, Xcode debugger, and time profiler\nMentor other developers, enforce coding standards through code review, and drive continuous improvement across the team',
        team_name: 'Mobile Team',
        team_size: '10 engineers (iOS + Android)',
        team_lead: 'Maria Todorova, Mobile Lead',
        team_quote: 'Our mobile apps are the most personal touchpoint with pCloud. We obsess over every detail because our users trust us with their digital lives.',
        tech_stack: 'Swift, Objective-C, UIKit, SwiftUI, Combine, async/await, XCTest, Core Data/SQLite, SPM/CocoaPods',
        what_youll_learn: 'You will gain deep expertise in shipping complex iOS apps at scale. You will master reactive and declarative patterns, CI/CD for mobile, App Store Connect processes, and the discipline of iterating on an app with millions of active users. You will learn how to balance pragmatic delivery with long-term technical health in a codebase that matters.',
        requirements: 'Expert-level Swift and Objective-C with extensive professional iOS development experience\nDeep knowledge of iOS SDKs, frameworks, and the full mobile development lifecycle\nHands-on experience with modular app architectures (MVC, MVVM, VIPER, Clean Architecture)\nStrong grasp of SOLID principles, dependency injection, and testable design\nExperience with reactive/declarative patterns (Combine, async/await concurrency)\nProficiency with Instruments, Xcode debugger, memory graph, and time profiler',
        nice_to_have: 'C language experience for low-level integrations or performance-critical modules\nExperience releasing and iterating on apps with a meaningful user base\nAnalytics and user feedback-driven development',
        cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1080&fit=crop',
      },
      // 6. Senior QA Engineer -- Desktop Applications
      {
        title: 'Senior QA Engineer -- Desktop Applications',
        department: 'Quality Assurance',
        product: 'pCloud Drive (Windows, macOS, Linux)',
        seniority: 'Senior',
        location: 'Sofia, Bulgaria',
        employment_type: 'Full-time',
        tags: 'QA,Playwright,Cypress,Windows,macOS,Linux,Desktop',
        is_new: 0,
        is_high_priority: 0,
        description: 'Sole QA owner of desktop apps across three operating systems. 24M+ users depend on your standards.\n\nThis is not a "write more tests" role. This is a "you own quality for desktop applications across three operating systems" role. You will be the sole QA owner -- responsible for the testing process, product quality, and release readiness from design through deployment.\n\npCloud Drive must work flawlessly on Windows, macOS, and Linux. Sync must be reliable. The virtual drive must behave like a native filesystem. Large file operations, network interruptions, offline/online transitions -- all must be tested, automated, and bulletproof. When 24 million users depend on the software you validate, quality is not a department. It is a standard.',
        challenges: 'Design and implement automated tests for Windows, macOS, and Linux desktop clients covering sync, virtual drive behaviour, and core workflows\nCreate end-to-end test scenarios for real-world usage: large file operations, network interruptions, conflicts, offline/online transitions\nValidate virtual drive behaviour on each platform (drive letters, mounts, permissions, file operations) to ensure native filesystem feel\nInvestigate and reproduce complex cross-OS issues -- the kind of bugs that only happen on one platform with one filesystem under one edge case',
        team_name: 'Quality Engineering Team',
        team_size: '7 engineers',
        team_lead: 'Ivaylo Stoyanov, QA Lead',
        team_quote: 'Quality at pCloud means 99.9% uptime for 24M+ users. We are the last line of defence before every release.',
        tech_stack: 'Playwright, Cypress, Selenium, Appium, Python, TypeScript, C#, platform debuggers',
        what_youll_learn: 'You will become the go-to expert in desktop application quality across three operating systems. You will learn how virtual filesystems, sync engines, and native installers work under the hood. You will develop cross-platform debugging skills that very few QA engineers in the world possess.',
        requirements: 'Solid QA experience for desktop applications on at least two of: Windows, macOS, Linux\nHands-on test automation experience (Playwright, Cypress, Selenium, Appium, or similar)\nStrong scripting/programming in at least one language (Python, TypeScript, or C#)\nDeep understanding of filesystems and file operations (permissions, symlinks, large files, mounts)\nExperience testing installers, updates, and application startup behaviour\nComfortable with platform-specific debugging tools (logs, system monitors, debuggers)',
        nice_to_have: 'Experience testing virtual drives or FUSE/Dokan/macFUSE technologies\nCloud storage or sync product testing (conflict handling, versioning, selective sync)\nPerformance and reliability testing for I/O-heavy applications\nCI integration for automated test suites',
        cover_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1080&fit=crop',
      },
      // 7. PPC Specialist
      {
        title: 'PPC Specialist',
        department: 'Marketing',
        product: 'pCloud (Global Growth)',
        seniority: 'Mid-level',
        location: 'Sofia, Bulgaria (hybrid)',
        employment_type: 'Full-time',
        tags: 'PPC,Marketing',
        is_new: 0,
        is_high_priority: 0,
        description: 'Global campaigns. Real budgets. Direct impact on growth for 24M+ users across 175+ countries.\n\npCloud serves 24 million users across 175+ countries. We did not get here by accident. Behind that growth is a performance marketing engine that runs campaigns across Meta, Google, Microsoft, and emerging platforms -- in multiple languages, multiple markets, simultaneously.\n\nWe need a PPC Specialist who does not just execute tasks. We need someone who takes ownership of platforms and campaigns, analyses performance obsessively, and proposes ideas that move the needle. Someone who thinks in ROAS, CPL, and conversion rates, but also understands that behind every click is a person deciding whether to trust us with their data.',
        challenges: 'Plan, launch, and optimise paid campaigns for user acquisition across Meta Ads, Google Ads, and Microsoft Ads -- globally\nManage evergreen and promotional campaigns (seasonal sales, product launches) across multiple international markets\nMonitor performance daily and analyse ROAS, CPL, CPA, and conversion rates to continuously improve results\nPropose and test new audiences, creatives, campaign structures, and platforms (Reddit, TikTok, X) to unlock growth',
        team_name: 'Performance Marketing Team',
        team_size: '5 specialists',
        team_lead: 'Daniela Ivanova, Head of Marketing',
        team_quote: 'Data drives every decision. We test, measure, and optimise relentlessly. If it cannot be measured, we do not do it.',
        tech_stack: 'Meta Ads, Google Ads, Microsoft Ads, Google Analytics, reporting dashboards, A/B testing',
        what_youll_learn: 'You will manage paid media across countries and platforms that most marketers only read about. You will develop the analytical instincts to optimise campaigns in real time, learn to balance acquisition cost with lifetime value, and gain the confidence to make data-driven decisions at global scale.',
        requirements: '4+ years managing paid media campaigns with proven performance track record\nStrong experience with Meta Ads (Facebook & Instagram) campaign management\nStrong experience with Google Ads (Search, Display, YouTube)\nExperience with Microsoft Ads or willingness to learn quickly\nStrong analytical and data interpretation skills -- you think in metrics\nAttention to detail and structured approach to campaign management\nFluent English (required -- daily team communication)',
        nice_to_have: 'Reddit Ads, X Ads, TikTok Ads experience\nGlobal multi-market campaign management\nSaaS, tech, or digital products background\nReporting tools and dashboard creation',
        cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&fit=crop',
      },
      // 8. Content Marketing Specialist
      {
        title: 'Content Marketing Specialist',
        department: 'Marketing',
        product: 'pCloud (Global Growth)',
        seniority: 'Mid-level',
        location: 'Sofia, Bulgaria (hybrid)',
        employment_type: 'Full-time',
        tags: 'SEO,Content Marketing,Marketing',
        is_new: 0,
        is_high_priority: 0,
        description: 'Words that drive growth. Content strategy for a product used by 24M+ people in 175+ countries.\n\nAt pCloud, content is not filler. It is a growth engine. Our blog, social media, email campaigns, and website content reach millions of people across 175+ countries. Every piece of content we publish either helps someone discover pCloud, understand why it matters, or decide to trust us with their data.\n\nWe need a Content Marketing Specialist who can craft compelling copy, develop data-informed strategies, and manage multi-channel content across international markets. Someone who understands SEO, knows how to write for humans (not just algorithms), and takes ownership of performance.',
        challenges: 'Develop and execute a content strategy aligned with pCloud\'s global business goals across blog, social, email, and website\nConduct keyword research and uncover long-tail, use-case-specific queries that drive organic growth\nCreate compelling content that boosts brand awareness and fuels demand -- across multiple markets and languages\nAnalyse performance monthly, identify what works, and adjust strategy based on data -- not gut feelings',
        team_name: 'Content & Brand Team',
        team_size: '4 specialists',
        team_lead: 'Daniela Ivanova, Head of Marketing',
        team_quote: 'Great content earns trust. And trust is the only currency that matters when people choose where to store their data.',
        tech_stack: 'SEO/SEM tools, CMS platforms, AI content models, editorial calendars, analytics dashboards, social media platforms',
        what_youll_learn: 'You will learn to run content campaigns at global scale -- across countries, languages, and platforms. You will master the intersection of SEO, storytelling, and data analysis. And you will develop the ability to craft messages that resonate with diverse audiences, from tech enthusiasts to privacy-conscious families.',
        requirements: '2+ years creating and managing digital content or copywriting\nStrong proficiency in SEO/SEM, CMS, and AI content tools\nExceptional writing and storytelling skills in English\nSolid understanding of content marketing metrics and analytics\nAbility to understand consumer behaviour and craft effective messages\nProactive mindset and ownership mentality -- you do not wait to be told what to write\nFluent English (required)',
        nice_to_have: 'Global campaign experience across multiple markets\nSaaS, tech, or digital products background\nVideo script writing\nReporting tools and dashboards',
        cover_image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1080&fit=crop',
      },
      // 9. Marketing Specialist with [Language]
      {
        title: 'Marketing Specialist with [Language]',
        department: 'Marketing',
        product: 'pCloud (Regional Growth)',
        seniority: 'Mid-level',
        location: 'Sofia, Bulgaria (hybrid)',
        employment_type: 'Full-time',
        tags: 'PPC,Marketing',
        is_new: 0,
        is_high_priority: 0,
        description: 'Own a market. Build partnerships. Launch campaigns that make pCloud a household name in your region.\n\npCloud is in 175+ countries, but every market is different. What works in Germany does not work in Japan. What resonates in Spain falls flat in Brazil. We need marketing specialists who do not just translate -- they localise, they understand the culture, they build real partnerships, and they own their market end-to-end.\n\nThis role is for someone deeply familiar with their target market\'s online culture, platforms, and user behaviour. You will research opportunities, build lasting partnerships with affiliates and influencers, launch campaigns that truly resonate, and help make pCloud the go-to cloud storage name in your region.',
        challenges: 'Lead the development and expansion of pCloud\'s presence in your target language market -- this is your territory\nResearch local trends, holidays, festivals, and cultural moments to identify campaign opportunities that genuinely connect\nBuild and maintain relationships with affiliates, partners, influencers, and regional services (bundling, VPNs, etc.)\nCoordinate end-to-end campaign execution -- from planning and content creation to launch, A/B testing, and monitoring',
        team_name: 'Regional Marketing Team',
        team_size: '6 specialists',
        team_lead: 'Daniela Ivanova, Head of Marketing',
        team_quote: 'pCloud serves 175+ countries. Every market deserves campaigns that feel local, not translated. That is your job.',
        tech_stack: 'Facebook Ads, Google Ads, regional platforms, affiliate networks, CMS, translation/localisation tools',
        what_youll_learn: 'You will learn what it means to own a market. From research to partnerships to campaign execution -- the entire growth funnel for your region is yours. You will develop skills in affiliate marketing, influencer outreach, regional paid media, and the art of making a global brand feel local.',
        requirements: 'Native or fluent proficiency in the target language with excellent written communication\nGood command of English for internal team communication\nSolid experience in digital marketing, campaign planning, and execution\nStrong understanding of the target market\'s online culture, platforms, and user behaviour\nExperience with affiliate marketing, outreach, and building long-term partnerships\nIndependent, highly organised, and able to manage multiple projects simultaneously',
        nice_to_have: 'Facebook Ads, Google Ads, and regional advertising channel experience\nContent translation and localisation experience\nCustomer support experience in the target language\nAdditional language skills',
        cover_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1080&fit=crop',
      },
    ];

    for (const job of jobs) {
      const slug = createSlug(job.title);
      execute(
        `INSERT INTO jobs (title, slug, department, product, seniority, location, salary_range, employment_type, description, requirements, nice_to_have, benefits, cover_image, is_new, is_high_priority, is_published, tags, challenges, team_name, team_size, team_lead, team_quote, team_photo, tech_stack, what_youll_learn, interview_template_id, process_template_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.title,
          slug,
          job.department,
          job.product,
          job.seniority,
          job.location,
          null, // salary_range
          job.employment_type,
          job.description,
          job.requirements,
          job.nice_to_have,
          null, // benefits (uses default_benefits via junction table)
          job.cover_image,
          job.is_new,
          job.is_high_priority,
          1, // is_published
          job.tags,
          job.challenges,
          job.team_name,
          job.team_size,
          job.team_lead,
          job.team_quote,
          null, // team_photo
          job.tech_stack,
          job.what_youll_learn,
          null, // interview_template_id -- linked after template is created
          null, // process_template_id -- linked after template is created
        ]
      );
    }
    console.log(`  Created ${jobs.length} job positions`);

    // -----------------------------------------------------------------------
    // Team members
    // -----------------------------------------------------------------------
    const teamMembers = [
      {
        name: 'Tunio Zarev',
        role: 'Co-founder & CTO',
        bio: 'Tunio is the co-founder of pCloud and has been leading the engineering teams since the company\'s inception. With over 15 years of experience in distributed systems.',
        department: 'Engineering',
        sort_order: 0,
      },
      {
        name: 'Nikolay Dimitrov',
        role: 'Principal Engineer',
        bio: 'Nikolay leads the Core Library Team that builds the C engine powering every pCloud desktop client. He is responsible for virtual filesystem mounting, sync, and encryption at the lowest level.',
        department: 'Engineering -- Desktop',
        sort_order: 1,
      },
      {
        name: 'Petar Stoyanov',
        role: 'Desktop Lead',
        bio: 'Petar leads both the Windows and macOS desktop teams. He ensures cloud storage feels instant and invisible across desktop platforms.',
        department: 'Engineering -- Desktop',
        sort_order: 2,
      },
      {
        name: 'Martin Petkov',
        role: 'Senior Engineer',
        bio: 'Martin leads the Linux Desktop Team, building the new Linux client from scratch with Electron, React, and TypeScript.',
        department: 'Engineering -- Desktop',
        sort_order: 3,
      },
      {
        name: 'Maria Todorova',
        role: 'Mobile Lead',
        bio: 'Maria leads the Mobile Team of 10 engineers building the pCloud iOS and Android apps used by millions.',
        department: 'Engineering -- Mobile',
        sort_order: 4,
      },
      {
        name: 'Ivaylo Stoyanov',
        role: 'QA Lead',
        bio: 'Ivaylo leads the Quality Engineering Team, ensuring 99.9% uptime for 24M+ users across all desktop platforms.',
        department: 'Quality Assurance',
        sort_order: 5,
      },
      {
        name: 'Daniela Ivanova',
        role: 'Head of Marketing',
        bio: 'Daniela leads all marketing efforts at pCloud -- from performance marketing and content strategy to regional growth across 175+ countries.',
        department: 'Marketing',
        sort_order: 6,
      },
      {
        name: 'Elena Todorova',
        role: 'Security Lead',
        bio: 'Elena heads the security and encryption team. She is the architect of pCloud Crypto and leads the development of pCloud Pass.',
        department: 'Security',
        sort_order: 7,
      },
    ];

    for (const member of teamMembers) {
      execute(
        `INSERT INTO team_members (name, role, bio, photo, department, sort_order, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          member.name,
          member.role,
          member.bio,
          null,
          member.department,
          member.sort_order,
          1,
        ]
      );
    }
    console.log(`  Created ${teamMembers.length} team members`);

    // -----------------------------------------------------------------------
    // Company settings
    // -----------------------------------------------------------------------
    const settings = [
      { key: 'company_name', value: 'pCloud' },
      { key: 'company_description', value: 'pCloud is a Swiss-based cloud storage platform trusted by 24 million users across 175+ countries. We store over 500 petabytes of data with 99.9% uptime -- and we have been doing it for over 10 years.' },
      { key: 'contact_email', value: 'careers@pcloud.com' },
      { key: 'social_linkedin', value: 'https://www.linkedin.com/company/pcloud/' },
      { key: 'social_twitter', value: 'https://twitter.com/paborcloud' },
      { key: 'social_github', value: 'https://github.com/pcloud' },
      { key: 'social_instagram', value: 'https://www.instagram.com/pcloud/' },
      { key: 'pcloud_bar_subtitle', value: 'Before we hire anyone, we ask: Would you want this person building the product that protects your family\'s data? If the answer is not an emphatic yes -- we do not hire.' },
      { key: 'benefits_intro_text', value: 'We believe in taking care of our people so they can focus on building extraordinary products.' },
      { key: 'process_intro_text', value: 'Here is how we work day-to-day to deliver world-class products.' },
    ];

    for (const setting of settings) {
      execute(
        `INSERT INTO company_settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
        [setting.key, setting.value]
      );
    }
    console.log(`  Created ${settings.length} company settings`);

    // -----------------------------------------------------------------------
    // Interview Template (from pCloud document)
    // -----------------------------------------------------------------------
    const templateResult = execute(
      `INSERT INTO interview_templates (name, description, overall_timeline, overall_label, feedback_label, subtitle, is_default, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'pCloud Hiring Process',
        'Transparent. Respectful. Fast. Maximum 25 business days from application to offer.',
        '25 business days',
        'From application to offer',
        'Feedback at every stage -- we never ghost',
        'Transparent. Respectful. Fast. Maximum 25 business days from application to offer.',
        1,
        1,
      ]
    );
    const templateId = templateResult.lastInsertRowid;
    console.log('  Created 1 interview template');

    // -----------------------------------------------------------------------
    // Interview Stages (6 stages from the document)
    // -----------------------------------------------------------------------
    const stages = [
      {
        stage_number: 1,
        title: 'Screening',
        duration: '15 min',
        description: 'Quick call. We want to know what drives you. You want to know if we are worth your time. No trick questions.',
        focus: 'Motivation, background, mutual fit',
        timeline: 'Within 3 business days',
        icon: 'Phone',
      },
      {
        stage_number: 2,
        title: 'Technical Conversation',
        duration: '30 min',
        description: 'A real conversation about your experience, how you solve problems, and what excites you technically.',
        focus: 'Technical depth, problem-solving approach, communication',
        timeline: 'Within 5 business days',
        icon: 'FileText',
      },
      {
        stage_number: 3,
        title: 'Technical Challenge',
        duration: '60 min',
        description: 'A hands-on assessment with problems similar to what you would actually work on here. Live coding OR take-home -- your choice.',
        focus: 'Coding ability, practical problem-solving, real-world skills',
        timeline: 'Within 10 business days',
        icon: 'Code',
      },
      {
        stage_number: 4,
        title: 'System Design',
        duration: '60 min',
        description: 'Collaborative architecture discussion. We work through a problem together. No gotchas, no whiteboard hazing.',
        focus: 'Architecture, trade-offs, scalability thinking',
        timeline: 'Within 15 business days',
        icon: 'Layers',
      },
      {
        stage_number: 5,
        title: 'Culture Fit',
        duration: '60 min',
        description: 'Meet the team. Ask us anything. This is as much your interview of us as ours of you.',
        focus: 'Values alignment, team dynamics, collaboration',
        timeline: 'Within 20 business days',
        icon: 'Heart',
      },
      {
        stage_number: 6,
        title: 'Decision',
        duration: '2 days',
        description: 'We respect your time. Decision within 2 business days. Feedback at every stage -- we never ghost.',
        focus: 'Final evaluation, team consensus, offer preparation',
        timeline: 'Within 25 business days',
        icon: 'Award',
      },
    ];

    for (const stage of stages) {
      execute(
        `INSERT INTO interview_stages (template_id, stage_number, title, duration, description, focus, timeline, icon, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          templateId,
          stage.stage_number,
          stage.title,
          stage.duration,
          stage.description,
          stage.focus,
          stage.timeline,
          stage.icon,
          1,
        ]
      );
    }
    console.log(`  Created ${stages.length} interview stages`);

    // Update all jobs to reference the default template
    execute(
      'UPDATE jobs SET interview_template_id = ?',
      [templateId]
    );
    console.log('  Linked all jobs to default interview template');

    // -----------------------------------------------------------------------
    // Process Template (Working Process Highlights -- template-based)
    // -----------------------------------------------------------------------
    const processTemplateResult = execute(
      `INSERT INTO process_templates (name, description, intro_text, is_default, is_published)
       VALUES (?, ?, ?, ?, ?)`,
      [
        'Engineering Process',
        'Standard engineering working process for all technical positions.',
        'Here is how we work day-to-day to deliver world-class products.',
        1,
        1,
      ]
    );
    const processTemplateId = Number(processTemplateResult.lastInsertRowid);
    console.log(`  Created process template: Engineering Process (id=${processTemplateId})`);

    const processSteps = [
      { step_number: 1, label: 'Sprint Cycle', detail: '2-week sprints. Clear goals. Real ownership. No status meetings for the sake of meetings.' },
      { step_number: 2, label: 'Code Review', detail: 'Thorough, constructive peer reviews. We learn from each other\'s code.' },
      { step_number: 3, label: 'Tech Debt Time', detail: '20% of every sprint is reserved for refactoring, tooling, and improvements. Non-negotiable.' },
      { step_number: 4, label: 'Documentation', detail: 'Strong documentation culture. If it is not documented, it does not exist.' },
      { step_number: 5, label: 'Testing Standards', detail: '85%+ coverage for critical paths. Automated tests are a first-class citizen.' },
      { step_number: 6, label: 'Async-First', detail: 'Daily standups are 15 min, async-friendly. Deep work is protected.' },
    ];

    for (const step of processSteps) {
      execute(
        'INSERT INTO process_steps (template_id, step_number, label, detail, is_published) VALUES (?, ?, ?, ?, ?)',
        [processTemplateId, step.step_number, step.label, step.detail, 1]
      );
    }
    console.log(`  Created ${processSteps.length} process steps`);

    // Link all jobs to default process template
    execute(
      'UPDATE jobs SET process_template_id = ?',
      [processTemplateId]
    );
    console.log('  Linked all jobs to default process template');

    // -----------------------------------------------------------------------
    // Candidate Values
    // -----------------------------------------------------------------------
    const candidateValues = [
      {
        title: 'Problem-Solving Ability',
        description: 'We value engineers who can break down complex problems into manageable pieces and find elegant, practical solutions.',
        sort_order: 0,
      },
      {
        title: 'Communication & Collaboration',
        description: 'Great engineers communicate clearly, listen actively, and work effectively with teammates across disciplines.',
        sort_order: 1,
      },
      {
        title: 'Growth Mindset',
        description: 'We look for people who are curious, eager to learn, and continuously improving their skills and knowledge.',
        sort_order: 2,
      },
      {
        title: 'Attention to Detail',
        description: 'Quality matters. We appreciate engineers who sweat the details and take pride in shipping polished, well-tested work.',
        sort_order: 3,
      },
      {
        title: 'Passion for Quality',
        description: 'We believe in doing things right. Our team members care deeply about code quality, user experience, and technical excellence.',
        sort_order: 4,
      },
    ];

    for (const cv of candidateValues) {
      execute(
        'INSERT INTO candidate_values (title, description, sort_order, is_published) VALUES (?, ?, ?, ?)',
        [cv.title, cv.description, cv.sort_order, 1]
      );
    }
    console.log(`  Created ${candidateValues.length} candidate values`);

    // -----------------------------------------------------------------------
    // pCloud Bar Criteria
    // -----------------------------------------------------------------------
    const pcloudBarCriteria = [
      {
        title: 'Technical Excellence',
        description: 'Deep expertise in your domain with a track record of building reliable, performant systems.',
        sort_order: 0,
      },
      {
        title: 'Product Thinking',
        description: 'Understanding the why behind what you build. Connecting technical decisions to user impact and business value.',
        sort_order: 1,
      },
      {
        title: 'Ownership & Initiative',
        description: 'Taking responsibility for outcomes, not just outputs. Proactively identifying and solving problems.',
        sort_order: 2,
      },
      {
        title: 'Communication Clarity',
        description: 'Expressing complex ideas simply, documenting decisions, and keeping stakeholders informed.',
        sort_order: 3,
      },
      {
        title: 'Collaborative Impact',
        description: 'Making those around you better. Mentoring, reviewing code thoughtfully, and contributing to team culture.',
        sort_order: 4,
      },
      {
        title: 'Values Alignment',
        description: 'Embodying our core values of transparency, user focus, and continuous improvement in daily work.',
        sort_order: 5,
      },
    ];

    for (const criterion of pcloudBarCriteria) {
      execute(
        'INSERT INTO pcloud_bar_criteria (title, description, sort_order, is_published) VALUES (?, ?, ?, ?)',
        [criterion.title, criterion.description, criterion.sort_order, 1]
      );
    }
    console.log(`  Created ${pcloudBarCriteria.length} pCloud bar criteria`);

    // -----------------------------------------------------------------------
    // Process Highlights (from "How We Work" section in the document)
    // -----------------------------------------------------------------------
    const processHighlights = [
      { label: 'Sprint Cycle', detail: '2-week sprints. Clear goals. Real ownership. No status meetings for the sake of meetings.', sort_order: 0 },
      { label: 'Code Review', detail: 'Thorough, constructive peer reviews. We learn from each other\'s code.', sort_order: 1 },
      { label: 'Tech Debt Time', detail: '20% of every sprint is reserved for refactoring, tooling, and improvements. Non-negotiable.', sort_order: 2 },
      { label: 'Documentation', detail: 'Strong documentation culture. If it is not documented, it does not exist.', sort_order: 3 },
      { label: 'Testing Standards', detail: '85%+ coverage for critical paths. Automated tests are a first-class citizen.', sort_order: 4 },
      { label: 'Async-First', detail: 'Daily standups are 15 min, async-friendly. Deep work is protected.', sort_order: 5 },
    ];

    for (const highlight of processHighlights) {
      execute(
        'INSERT INTO process_highlights (label, detail, sort_order, is_published) VALUES (?, ?, ?, ?)',
        [highlight.label, highlight.detail, highlight.sort_order, 1]
      );
    }
    console.log(`  Created ${processHighlights.length} process highlights`);

    // -----------------------------------------------------------------------
    // Default Benefits (from "What We Offer" section in the document)
    // -----------------------------------------------------------------------
    const defaultBenefits = [
      { title: 'Remote Flexibility', description: 'Work from Sofia or remote. One sync week per month in the office. Flexible hours \u2014 we trust outcomes, not hours logged.', sort_order: 0 },
      { title: 'Health & Wellness', description: 'Full private health insurance with dental and optical. Gym membership. Mental health support through licensed professionals.', sort_order: 1 },
      { title: 'Learning Budget', description: '\u20AC3,000 per year for conferences, courses, books, and certifications. No approval hoops \u2014 spend it on what makes you better.', sort_order: 2 },
      { title: 'Equipment & Tools', description: 'Latest MacBook Pro or custom PC build. \u20AC2,000 equipment budget. Premium software licenses. Ergonomic standing desk setup.', sort_order: 3 },
      { title: 'Team & Culture', description: 'Quarterly hackathons, monthly knowledge-sharing sessions, annual company retreat. An engineering culture that celebrates craft, not politics.', sort_order: 4 },
      { title: 'PTO & Sabbatical', description: '25 days paid leave + public holidays. Sabbatical option after 5 years. Unlimited sick leave \u2014 health comes first, always.', sort_order: 5 },
    ];

    for (const benefit of defaultBenefits) {
      execute(
        'INSERT INTO default_benefits (title, description, sort_order, is_published) VALUES (?, ?, ?, ?)',
        [benefit.title, benefit.description, benefit.sort_order, 1]
      );
    }
    console.log(`  Created ${defaultBenefits.length} default benefits`);

    // -----------------------------------------------------------------------
    // Gallery Categories
    // -----------------------------------------------------------------------
    const galleryCategories = [
      { name: 'Office Life', slug: 'office', sort_order: 0 },
      { name: 'Team Building', slug: 'team-building', sort_order: 1 },
      { name: 'Birthdays', slug: 'birthdays', sort_order: 2 },
      { name: 'Training', slug: 'training', sort_order: 3 },
      { name: 'Off-sites', slug: 'off-sites', sort_order: 4 },
    ];

    const galleryCategoryMap: Record<string, number> = {};
    for (const cat of galleryCategories) {
      const catResult = execute(
        'INSERT INTO gallery_categories (name, slug, sort_order) VALUES (?, ?, ?)',
        [cat.name, cat.slug, cat.sort_order]
      );
      galleryCategoryMap[cat.slug] = Number(catResult.lastInsertRowid);
    }
    console.log(`  Created ${galleryCategories.length} gallery categories`);

    // -----------------------------------------------------------------------
    // Gallery Photos (24 photos from the current hardcoded PhotoGallery)
    // -----------------------------------------------------------------------
    const galleryPhotos = [
      { category: 'office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', sort_order: 0 },
      { category: 'team-building', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', sort_order: 0 },
      { category: 'office', image: 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?w=600', sort_order: 1 },
      { category: 'birthdays', image: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?w=600', sort_order: 0 },
      { category: 'training', image: 'https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?w=600', sort_order: 0 },
      { category: 'team-building', image: 'https://images.unsplash.com/photo-1515355252367-42ae86cb92f9?w=600', sort_order: 1 },
      { category: 'office', image: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?w=600', sort_order: 2 },
      { category: 'off-sites', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600', sort_order: 0 },
      { category: 'training', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600', sort_order: 1 },
      { category: 'team-building', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600', sort_order: 2 },
      { category: 'office', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', sort_order: 3 },
      { category: 'birthdays', image: 'https://images.unsplash.com/photo-1638029202288-451a89e0d55f?w=600', sort_order: 1 },
      { category: 'off-sites', image: 'https://images.unsplash.com/photo-1552846573-47e482355fa7?w=600', sort_order: 1 },
      { category: 'office', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600', sort_order: 4 },
      { category: 'team-building', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', sort_order: 3 },
      { category: 'training', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600', sort_order: 2 },
      { category: 'birthdays', image: 'https://images.unsplash.com/photo-1558670460-cad0c19b1840?w=600', sort_order: 2 },
      { category: 'off-sites', image: 'https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?w=600', sort_order: 2 },
      { category: 'office', image: 'https://images.unsplash.com/photo-1590649681928-4b179f773bd5?w=600', sort_order: 5 },
      { category: 'team-building', image: 'https://images.unsplash.com/photo-1617225504130-fb45ba79da56?w=600', sort_order: 4 },
      { category: 'training', image: 'https://images.unsplash.com/photo-1628270023331-231293242b75?w=600', sort_order: 3 },
      { category: 'office', image: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?w=600', sort_order: 6 },
      { category: 'off-sites', image: 'https://images.unsplash.com/photo-1694967450668-9055a350b73f?w=600', sort_order: 3 },
      { category: 'birthdays', image: 'https://images.unsplash.com/photo-1765582782217-bd6e17a17d9a?w=600', sort_order: 3 },
    ];

    for (const photo of galleryPhotos) {
      const categoryId = galleryCategoryMap[photo.category];
      if (categoryId) {
        execute(
          'INSERT INTO gallery_photos (category_id, image, alt_text, sort_order, is_published) VALUES (?, ?, ?, ?, ?)',
          [categoryId, photo.image, null, photo.sort_order, 1]
        );
      }
    }
    console.log(`  Created ${galleryPhotos.length} gallery photos`);

    // -----------------------------------------------------------------------
    // Team Stories (from the current hardcoded TeamStories component)
    // -----------------------------------------------------------------------
    const teamStories = [
      {
        name: 'Maria Santos',
        role: 'Senior Backend Engineer',
        photo: 'https://images.unsplash.com/photo-1712174766230-cb7304feaafe?w=200',
        quote: 'The autonomy I have here to architect solutions and the trust the team places in me has been transformative for my career. Every day brings new challenges that push me to grow.',
        sort_order: 0,
      },
      {
        name: 'David Chen',
        role: 'DevOps Engineer',
        photo: 'https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?w=200',
        quote: "Working at pCloud means being part of a mission that matters. We're not just building features\u2014we're protecting people's privacy and that drives everything we do.",
        sort_order: 1,
      },
      {
        name: 'Sarah Anderson',
        role: 'Product Designer',
        photo: 'https://images.unsplash.com/photo-1771072428050-1492abb58f4a?w=200',
        quote: 'The design culture here is incredible. We have the freedom to experiment, the support to learn from failures, and the resources to create experiences that truly delight users.',
        sort_order: 2,
      },
      {
        name: 'James Wilson',
        role: 'Engineering Manager',
        photo: 'https://images.unsplash.com/photo-1713946598467-fcf9332c56ea?w=200',
        quote: "Leading a team at pCloud has taught me that great engineering culture isn't built\u2014it's cultivated. The support from leadership and the passion from the team makes all the difference.",
        sort_order: 3,
      },
    ];

    for (const story of teamStories) {
      execute(
        'INSERT INTO team_stories (name, role, photo, quote, sort_order, is_published) VALUES (?, ?, ?, ?, ?, ?)',
        [story.name, story.role, story.photo, story.quote, story.sort_order, 1]
      );
    }
    console.log(`  Created ${teamStories.length} team stories`);

    // -----------------------------------------------------------------------
    // Job Benefits -- link ALL 9 jobs to ALL 6 benefits
    // -----------------------------------------------------------------------
    const allBenefitRows = queryAll<{ id: number }>('SELECT id FROM default_benefits ORDER BY sort_order ASC');
    const allBenefitIds = allBenefitRows.map((r) => r.id);

    const allJobRows = queryAll<{ id: number }>('SELECT id FROM jobs ORDER BY id ASC');
    let linkedCount = 0;
    for (const jobRow of allJobRows) {
      for (const benefitId of allBenefitIds) {
        execute(
          'INSERT OR IGNORE INTO job_benefits (job_id, benefit_id) VALUES (?, ?)',
          [jobRow.id, benefitId]
        );
        linkedCount++;
      }
    }
    console.log(`  Linked ${allJobRows.length} jobs to ${allBenefitIds.length} benefits (${linkedCount} rows)`);

    // -----------------------------------------------------------------------
    // ATS: Sample Candidates
    // -----------------------------------------------------------------------
    const allJobsForCandidates = queryAll<{ id: number; title: string }>('SELECT id, title FROM jobs ORDER BY id ASC');
    const jobIdMap: Record<string, number> = {};
    for (const j of allJobsForCandidates) {
      jobIdMap[j.title] = j.id;
    }

    const sampleCandidates = [
      {
        full_name: 'Alexander Petrov',
        email: 'alexander.petrov@example.com',
        phone: '+359 888 111 222',
        job_title: 'Senior Cross-Platform C Library Developer',
        cover_message: 'I have 10 years of C systems programming and want to contribute to pCloud\'s cross-platform sync engine.',
        linkedin_url: 'https://linkedin.com/in/alexander-petrov',
        github_url: 'https://github.com/apetrov',
        source: 'LinkedIn',
        status: 'screening',
        salary_min: 5000,
        salary_max: 7000,
        work_model: 'On-site Sofia',
      },
      {
        full_name: 'Maria Kowalski',
        email: 'maria.kowalski@example.com',
        phone: '+48 600 123 456',
        job_title: 'Senior Windows Desktop Developer',
        cover_message: 'Experienced WPF developer passionate about building native Windows applications.',
        linkedin_url: 'https://linkedin.com/in/maria-kowalski',
        source: 'Job Board',
        status: 'technical',
        salary_min: 4500,
        salary_max: 6500,
        work_model: 'Hybrid',
      },
      {
        full_name: 'James Chen',
        email: 'james.chen@example.com',
        phone: '+1 415 555 0123',
        job_title: 'Senior macOS Desktop Developer',
        cover_message: 'Swift and Objective-C expert with deep macOS experience including FUSE integration.',
        github_url: 'https://github.com/jameschen',
        portfolio_url: 'https://jameschen.dev',
        source: 'Direct',
        status: 'team_interview',
        salary_min: 6000,
        salary_max: 8000,
        work_model: 'Remote',
      },
      {
        full_name: 'Elena Vassileva',
        email: 'elena.v@example.com',
        phone: '+359 877 333 444',
        job_title: 'Senior Linux Desktop Developer',
        cover_message: 'Full-stack TypeScript developer with Linux expertise. Excited about building the new client from scratch.',
        linkedin_url: 'https://linkedin.com/in/elena-vassileva',
        github_url: 'https://github.com/evassileva',
        source: 'Referral',
        referrer_name: 'Martin Petkov',
        referrer_email: 'martin.p@pcloud.com',
        is_internal_referral: 1,
        status: 'offer',
        salary_min: 5500,
        salary_max: 7500,
        work_model: 'On-site Sofia',
      },
      {
        full_name: 'Dimitar Hristov',
        email: 'dimitar.h@example.com',
        phone: '+359 899 555 666',
        job_title: 'Senior iOS Developer',
        cover_message: 'Senior iOS developer with 7 years experience, specializing in Swift and clean architecture.',
        linkedin_url: 'https://linkedin.com/in/dimitar-hristov',
        source: 'LinkedIn',
        status: 'rejected',
        rejection_reason: 'Technical mismatch',
        rejection_notes: 'Candidate showed strong UI skills but lacked required depth in background sync and Core Data.',
        keep_in_talent_pool: 1,
      },
      {
        full_name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        job_title: 'Senior QA Engineer -- Desktop Applications',
        cover_message: 'QA automation lead with cross-platform testing experience.',
        linkedin_url: 'https://linkedin.com/in/sarah-williams-qa',
        source: 'Conference',
        status: 'phone_screen',
        work_model: 'Hybrid',
      },
      {
        full_name: 'Georgi Todorov',
        email: 'georgi.t@example.com',
        phone: '+359 888 777 999',
        job_title: 'PPC Specialist',
        cover_message: 'Experienced PPC manager with global campaign experience across Meta and Google.',
        source: 'Direct',
        status: 'new',
        salary_min: 3000,
        salary_max: 4500,
        salary_currency: 'EUR',
        work_model: 'On-site Sofia',
      },
      {
        full_name: 'Anya Ivanova',
        email: 'anya.i@example.com',
        phone: '+359 877 222 333',
        job_title: 'Content Marketing Specialist',
        cover_message: 'Content strategist with SaaS background and strong SEO skills.',
        linkedin_url: 'https://linkedin.com/in/anya-ivanova',
        portfolio_url: 'https://anyawrites.com',
        source: 'Job Board',
        status: 'culture_chat',
        work_model: 'Hybrid',
      },
      {
        full_name: 'Luca Rossi',
        email: 'luca.rossi@example.com',
        phone: '+39 333 444 5555',
        job_title: 'Marketing Specialist with [Language]',
        cover_message: 'Native Italian speaker with digital marketing expertise. Ready to own the Italian market.',
        source: 'Referral',
        referrer_name: 'External Partner',
        referrer_company: 'PartnerCo',
        status: 'hired',
        work_model: 'On-site Sofia',
      },
      {
        full_name: 'Nikoleta Georgieva',
        email: 'nikoleta.g@example.com',
        phone: '+359 888 000 111',
        job_title: 'Senior Cross-Platform C Library Developer',
        cover_message: 'Systems programmer with experience in filesystems and encryption.',
        github_url: 'https://github.com/ngeorgieva',
        source: 'Direct',
        status: 'on_hold',
        work_model: 'On-site Sofia',
      },
    ];

    for (const c of sampleCandidates) {
      const candidateJobId = c.job_title ? jobIdMap[c.job_title] || null : null;

      const candidateResult = execute(
        `INSERT INTO candidates (
          full_name, email, phone, job_id, cover_message, linkedin_url, github_url,
          portfolio_url, source, referrer_name, referrer_email, referrer_company,
          is_internal_referral, salary_min, salary_max, salary_currency,
          work_model, status, rejection_reason, rejection_notes, keep_in_talent_pool
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          c.full_name,
          c.email,
          c.phone || null,
          candidateJobId,
          c.cover_message || null,
          c.linkedin_url || null,
          c.github_url || null,
          c.portfolio_url || null,
          c.source || 'Direct',
          c.referrer_name || null,
          c.referrer_email || null,
          c.referrer_company || null,
          c.is_internal_referral || 0,
          c.salary_min || null,
          c.salary_max || null,
          c.salary_currency || 'EUR',
          c.work_model || 'On-site Sofia',
          c.status,
          c.rejection_reason || null,
          c.rejection_notes || null,
          c.keep_in_talent_pool || 0,
        ]
      );

      const candId = Number(candidateResult.lastInsertRowid);

      // Add initial history entry
      execute(
        `INSERT INTO candidate_history (candidate_id, action, to_status, performed_by, notes)
         VALUES (?, ?, ?, ?, ?)`,
        [candId, 'application_submitted', 'new', 'system', 'Seeded candidate']
      );

      // If status is not 'new', add a status change history entry
      if (c.status !== 'new') {
        execute(
          `INSERT INTO candidate_history (candidate_id, action, from_status, to_status, performed_by, notes)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [candId, 'status_changed', 'new', c.status, 'admin', `Moved to ${c.status}`]
        );
      }
    }
    console.log(`  Created ${sampleCandidates.length} candidates`);

    // Add sample scores for candidates in later pipeline stages
    const scoredCandidates = queryAll<{ id: number; full_name: string; status: string }>(
      `SELECT id, full_name, status FROM candidates WHERE status IN ('technical', 'team_interview', 'culture_chat', 'offer', 'hired', 'rejected') ORDER BY id ASC`
    );

    for (const sc of scoredCandidates) {
      // Add at least one scorecard
      execute(
        `INSERT INTO candidate_scores (
          candidate_id, interviewer_name, interview_stage,
          technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential,
          recommendation, general_notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sc.id,
          'Nikolay Dimitrov',
          'Technical Conversation',
          Math.floor(Math.random() * 3) + 3,  // 3-5
          Math.floor(Math.random() * 3) + 3,
          Math.floor(Math.random() * 3) + 3,
          Math.floor(Math.random() * 3) + 3,
          Math.floor(Math.random() * 3) + 3,
          Math.floor(Math.random() * 3) + 3,
          ['lean_yes', 'strong_yes', 'neutral'][Math.floor(Math.random() * 3)],
          `Strong candidate with good fundamentals. ${sc.full_name} demonstrated solid understanding.`,
        ]
      );
    }
    console.log(`  Created ${scoredCandidates.length} candidate scorecards`);

    // Update composite scores for scored candidates
    for (const sc of scoredCandidates) {
      const scores = queryAll<{ technical_depth: number | null; problem_solving: number | null; ownership: number | null; communication: number | null; cultural_add: number | null; growth_potential: number | null }>(
        'SELECT technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential FROM candidate_scores WHERE candidate_id = ?',
        [sc.id]
      );
      if (scores.length > 0) {
        let totalWeighted = 0;
        let totalWeight = 0;
        const weights: Record<string, number> = {
          technical_depth: 0.25,
          problem_solving: 0.20,
          ownership: 0.20,
          communication: 0.15,
          cultural_add: 0.10,
          growth_potential: 0.10,
        };
        for (const s of scores) {
          for (const [dim, w] of Object.entries(weights)) {
            const val = s[dim as keyof typeof s];
            if (val !== null && val !== undefined) {
              totalWeighted += val * w;
              totalWeight += w;
            }
          }
        }
        const composite = totalWeight > 0 ? Math.round((totalWeighted / totalWeight) * 100) / 100 : null;
        execute('UPDATE candidates SET composite_score = ? WHERE id = ?', [composite, sc.id]);
      }
    }

    // Add sample notes for a few candidates
    const candidatesForNotes = queryAll<{ id: number; full_name: string }>(
      'SELECT id, full_name FROM candidates ORDER BY id ASC LIMIT 5'
    );
    for (const cn of candidatesForNotes) {
      execute(
        `INSERT INTO candidate_notes (candidate_id, author, content, note_type)
         VALUES (?, ?, ?, ?)`,
        [cn.id, 'admin', `Initial review of ${cn.full_name}'s application. Strong profile, proceeding with screening.`, 'general']
      );
    }
    console.log(`  Created ${candidatesForNotes.length} candidate notes`);

    // -----------------------------------------------------------------------
    // Email Templates
    // -----------------------------------------------------------------------
    const emailTemplates = [
      {
        name: 'Application Confirmation',
        slug: 'application-confirmation',
        subject: 'Thank you for applying to {{position_title}} at {{company_name}}',
        body: '<p>Dear {{candidate_name}},</p><p>Thank you for your interest in the <strong>{{position_title}}</strong> position at {{company_name}}. We have received your application and it is currently being reviewed by our hiring team.</p><p>We aim to provide an update on your application within 5 business days. In the meantime, if you have any questions, please do not hesitate to reach out.</p><p>Best regards,<br>The {{company_name}} Hiring Team</p>',
        template_type: 'application_confirmation',
      },
      {
        name: 'Rejection',
        slug: 'rejection',
        subject: 'Update on your application to {{company_name}}',
        body: '<p>Dear {{candidate_name}},</p><p>Thank you for taking the time to apply for the <strong>{{position_title}}</strong> position at {{company_name}} and for your interest in joining our team.</p><p>After careful review and consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.</p><p>We genuinely appreciate the time and effort you invested in the application process. We encourage you to keep an eye on our careers page for future opportunities that may be a better fit.</p><p>We wish you all the best in your career journey.</p><p>Warm regards,<br>The {{company_name}} Hiring Team</p>',
        template_type: 'rejection',
      },
      {
        name: 'Offer',
        slug: 'offer',
        subject: 'Exciting news: Offer for {{position_title}} at {{company_name}}',
        body: '<p>Dear {{candidate_name}},</p><p>We are pleased to inform you that after a thorough evaluation process, we would like to extend an offer for the <strong>{{position_title}}</strong> position at {{company_name}}.</p><p>We were impressed by your skills, experience, and the passion you demonstrated throughout our conversations. We believe you would be a fantastic addition to our team.</p><p>Please find the formal offer details attached. We would love to discuss the terms at your earliest convenience.</p><p>Looking forward to hearing from you!</p><p>Best regards,<br>The {{company_name}} Hiring Team</p>',
        template_type: 'offer',
      },
      {
        name: 'Reference Request',
        slug: 'reference-request',
        subject: 'Reference request for {{candidate_name}} -- {{company_name}}',
        body: '<p>Dear Referee,</p><p>You have been listed as a professional reference by <strong>{{candidate_name}}</strong>, who is being considered for a position at {{company_name}}.</p><p>We would greatly appreciate it if you could take approximately 10 minutes to complete our structured reference form. Your feedback is confidential and will help us make a well-informed hiring decision.</p><p>Please click the link below to access the form:</p><p><a href="{{reference_link}}">Complete Reference Form</a></p><p>Thank you for your time and support.</p><p>Best regards,<br>The {{company_name}} Hiring Team</p>',
        template_type: 'reference_request',
      },
      {
        name: 'Interview Invitation',
        slug: 'interview-invitation',
        subject: 'Interview invitation: {{position_title}} at {{company_name}}',
        body: '<p>Dear {{candidate_name}},</p><p>We are delighted to invite you to the next stage of our hiring process for the <strong>{{position_title}}</strong> position.</p><p><strong>Date:</strong> {{interview_date}}<br><strong>Time:</strong> {{interview_time}}</p><p>Please confirm your availability by replying to this email. If the proposed time does not work for you, let us know your preferred alternatives and we will do our best to accommodate.</p><p>We look forward to speaking with you!</p><p>Best regards,<br>The {{company_name}} Hiring Team</p>',
        template_type: 'interview_invitation',
      },
      {
        name: 'Status Update',
        slug: 'status-update',
        subject: 'Application update: {{position_title}} at {{company_name}}',
        body: '<p>Dear {{candidate_name}},</p><p>We wanted to provide you with an update on your application for the <strong>{{position_title}}</strong> position at {{company_name}}.</p><p>Your application status has been updated to: <strong>{{status}}</strong></p><p>If you have any questions about the next steps, please do not hesitate to reach out to us.</p><p>Best regards,<br>The {{company_name}} Hiring Team</p>',
        template_type: 'status_update',
      },
    ];

    for (const tpl of emailTemplates) {
      execute(
        'INSERT INTO email_templates (name, slug, subject, body, template_type, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [tpl.name, tpl.slug, tpl.subject, tpl.body, tpl.template_type, 1]
      );
    }
    console.log(`  Created ${emailTemplates.length} email templates`);

    // -----------------------------------------------------------------------
    // Technical Tasks (sample task templates)
    // -----------------------------------------------------------------------
    const firstJobId = queryOne<{ id: number }>('SELECT id FROM jobs ORDER BY id ASC LIMIT 1');
    const technicalTasks = [
      {
        job_id: firstJobId?.id || null,
        title: 'Cross-Platform File Sync Algorithm',
        description: 'Design and implement a simplified file synchronization algorithm that handles conflict resolution between two filesystem states.',
        instructions: '1. Read the problem statement carefully.\n2. Implement a sync function that takes two filesystem snapshots and produces a list of operations (create, update, delete) needed to synchronize them.\n3. Handle conflict resolution: when the same file is modified on both sides, implement a strategy (e.g., last-write-wins, rename-and-keep-both).\n4. Write unit tests for your solution.\n5. Include a brief README explaining your approach and trade-offs.\n\nSubmit as a zip file containing your source code, tests, and README.',
        deadline_days: 7,
      },
      {
        job_id: null,
        title: 'REST API Design Challenge',
        description: 'Design a RESTful API for a simple task management system with teams, projects, and tasks.',
        instructions: '1. Design the API endpoints, request/response formats, and error handling.\n2. Document at least 10 endpoints covering CRUD operations for teams, projects, and tasks.\n3. Include authentication/authorization considerations.\n4. Write example requests and responses for each endpoint.\n5. Bonus: implement a working prototype in your preferred language/framework.\n\nSubmit your API documentation (Markdown or PDF) and optional code.',
        deadline_days: 5,
      },
    ];

    for (const task of technicalTasks) {
      execute(
        'INSERT INTO technical_tasks (job_id, title, description, instructions, deadline_days, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [task.job_id, task.title, task.description, task.instructions, task.deadline_days, 1]
      );
    }
    console.log(`  Created ${technicalTasks.length} technical tasks`);

    // -----------------------------------------------------------------------
    // Position-Specific Scoring Criteria (Feature 2)
    // -----------------------------------------------------------------------
    const allJobsForCriteria = queryAll<{ id: number; title: string }>('SELECT id, title FROM jobs ORDER BY id ASC LIMIT 3');

    if (allJobsForCriteria.length >= 1) {
      // C Library Developer criteria
      const cJob = allJobsForCriteria[0];
      const cCriteria = [
        { name: 'C/Systems Programming Depth', description: 'ANSI C, memory management, low-level optimization', weight: 25, sort_order: 0 },
        { name: 'Multithreading Expertise', description: 'pthreads, mutexes, race condition debugging', weight: 20, sort_order: 1 },
        { name: 'Cross-Platform Knowledge', description: 'Windows/Linux/macOS filesystem and threading differences', weight: 15, sort_order: 2 },
        { name: 'Debugging Skills', description: 'gdb, lldb, AddressSanitizer, core dump analysis', weight: 15, sort_order: 3 },
      ];
      for (const c of cCriteria) {
        execute(
          'INSERT INTO position_criteria (job_id, name, description, weight, sort_order) VALUES (?, ?, ?, ?, ?)',
          [cJob.id, c.name, c.description, c.weight, c.sort_order]
        );
      }
      console.log(`  Created ${cCriteria.length} criteria for "${cJob.title}"`);
    }

    if (allJobsForCriteria.length >= 2) {
      // Windows Developer criteria
      const winJob = allJobsForCriteria[1];
      const winCriteria = [
        { name: 'WPF/XAML Mastery', description: 'MVVM, data binding, custom controls', weight: 25, sort_order: 0 },
        { name: 'C/C++ Interop', description: 'P/Invoke, marshalling, managed/native boundary', weight: 20, sort_order: 1 },
        { name: 'Installer Knowledge', description: 'WiX Toolset, upgrade handling', weight: 15, sort_order: 2 },
      ];
      for (const c of winCriteria) {
        execute(
          'INSERT INTO position_criteria (job_id, name, description, weight, sort_order) VALUES (?, ?, ?, ?, ?)',
          [winJob.id, c.name, c.description, c.weight, c.sort_order]
        );
      }
      console.log(`  Created ${winCriteria.length} criteria for "${winJob.title}"`);
    }

    if (allJobsForCriteria.length >= 3) {
      // macOS Developer criteria
      const macJob = allJobsForCriteria[2];
      const macCriteria = [
        { name: 'Swift/Objective-C Depth', description: 'Expert-level Swift with production experience', weight: 25, sort_order: 0 },
        { name: 'macOS Systems Integration', description: 'XPC, launch agents, Finder extensions, sandboxing', weight: 20, sort_order: 1 },
        { name: 'FUSE/Filesystem Knowledge', description: 'macFUSE, virtual filesystem experience', weight: 15, sort_order: 2 },
      ];
      for (const c of macCriteria) {
        execute(
          'INSERT INTO position_criteria (job_id, name, description, weight, sort_order) VALUES (?, ?, ?, ?, ?)',
          [macJob.id, c.name, c.description, c.weight, c.sort_order]
        );
      }
      console.log(`  Created ${macCriteria.length} criteria for "${macJob.title}"`);
    }

    // -----------------------------------------------------------------------
    // Legal Pages
    // -----------------------------------------------------------------------
    const legalPages = [
      {
        slug: 'privacy-policy',
        title: 'Privacy Policy -- Candidate Privacy Notice',
        content: `<h2>1. Data Controller</h2>
<p>The data controller responsible for the processing of your personal data is:</p>
<p><strong>pCloud International AG</strong><br>74 Zugerstrasse Str<br>6340 Baar, Switzerland</p>
<p>Bulgarian office: Sofia, Bulgaria</p>
<p>For any privacy-related inquiries, please contact us at <a href="mailto:privacy@pcloud.com">privacy@pcloud.com</a>.</p>

<h2>2. What Personal Data We Collect</h2>
<p>When you apply for a position at pCloud or interact with our careers website, we may collect the following categories of personal data:</p>
<ul>
<li><strong>Identity and contact data:</strong> Your full name, email address, phone number, and postal address.</li>
<li><strong>Application materials:</strong> CV/resume files, cover letters, portfolios, and any other documents you choose to submit.</li>
<li><strong>Professional data:</strong> Work history, education history, qualifications, certifications, and professional references.</li>
<li><strong>Technical data:</strong> IP address, browser type and version, operating system, device identifiers, and general location data derived from your IP address.</li>
</ul>

<h2>3. Purposes of Processing</h2>
<p>We process your personal data for the following purposes:</p>
<ul>
<li><strong>Evaluating your application:</strong> Reviewing your qualifications, experience, and suitability for the role you have applied for or other relevant positions.</li>
<li><strong>Communication:</strong> Contacting you to discuss your application, schedule interviews, request additional information, or provide updates on your application status.</li>
<li><strong>Interviews and assessments:</strong> Conducting interviews (in-person, phone, or video), technical assessments, and other evaluation activities.</li>
<li><strong>Verification:</strong> Verifying the accuracy of information you have provided, including employment history, qualifications, and references where applicable.</li>
<li><strong>Talent pool:</strong> With your explicit consent, retaining your data to consider you for future openings at pCloud.</li>
<li><strong>Website analytics:</strong> Understanding how visitors use our careers website to improve its functionality and content.</li>
</ul>

<h2>4. Legal Bases for Processing</h2>
<p>We process your personal data on the following legal bases under the General Data Protection Regulation (GDPR):</p>
<ul>
<li><strong>Article 6(1)(b) -- Pre-contractual steps:</strong> Processing your application is necessary in order to take steps at your request prior to entering into an employment contract.</li>
<li><strong>Article 6(1)(f) -- Legitimate interests:</strong> We have a legitimate interest in evaluating candidates, improving our recruitment process, ensuring the security of our systems, and verifying the accuracy of application data.</li>
<li><strong>Article 6(1)(a) -- Consent:</strong> Where you have given us explicit consent, for example to retain your data in our talent pool for consideration for future roles. You may withdraw your consent at any time.</li>
</ul>

<h2>5. Recipients of Your Data</h2>
<p>Your personal data may be shared with the following categories of recipients:</p>
<ul>
<li><strong>Internal HR and hiring teams:</strong> Relevant managers, interviewers, and HR personnel involved in the recruitment process for the position you applied for.</li>
<li><strong>Applicant Tracking System (ATS) providers:</strong> We use an ATS to manage applications. Your data is processed within this system in accordance with our data processing agreements.</li>
<li><strong>Cloud storage:</strong> Application documents may be stored using pCloud's own secure cloud storage infrastructure.</li>
<li><strong>Background check providers:</strong> If applicable and with appropriate notice, we may engage third-party providers to verify employment history or qualifications.</li>
</ul>

<h2>6. International Transfers</h2>
<p>Your personal data may be transferred between our offices in Switzerland and Bulgaria. Switzerland benefits from an adequacy decision by the European Commission, meaning that Swiss data protection standards are recognized as providing an adequate level of protection equivalent to the GDPR. Transfers between our Swiss and Bulgarian offices are covered by the GDPR framework as Bulgaria is an EU member state.</p>

<h2>7. Data Retention</h2>
<p>We retain your personal data in accordance with the following retention periods:</p>
<ul>
<li><strong>Unsuccessful candidates:</strong> Application data is retained for 6 months following the conclusion of the recruitment process, in compliance with Bulgarian labor law requirements and to defend against potential legal claims.</li>
<li><strong>Talent pool (with consent):</strong> If you have consented to being included in our talent pool, your data will be retained for up to 24 months. You will be contacted periodically to confirm whether you wish to remain in the talent pool.</li>
<li><strong>Successful candidates:</strong> If your application results in employment, your application data will become part of your employee personnel file and will be retained in accordance with our employee privacy notice.</li>
</ul>

<h2>8. Your Rights</h2>
<p>Under the GDPR, you have the following rights regarding your personal data:</p>
<ul>
<li><strong>Right of access:</strong> You have the right to obtain confirmation as to whether we process your personal data and, if so, to request a copy of that data.</li>
<li><strong>Right to rectification:</strong> You have the right to request correction of inaccurate personal data or completion of incomplete data.</li>
<li><strong>Right to erasure:</strong> You have the right to request deletion of your personal data where there is no compelling reason for its continued processing.</li>
<li><strong>Right to restriction:</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances.</li>
<li><strong>Right to data portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format.</li>
<li><strong>Right to object:</strong> You have the right to object to processing of your personal data based on legitimate interests.</li>
<li><strong>Right to withdraw consent:</strong> Where processing is based on your consent, you have the right to withdraw that consent at any time without affecting the lawfulness of processing carried out before the withdrawal.</li>
</ul>

<h2>9. How to Exercise Your Rights</h2>
<p>To exercise any of the rights described above, please contact us by email at <a href="mailto:privacy@pcloud.com">privacy@pcloud.com</a>. We will respond to your request within 30 days of receipt. If your request is particularly complex, we may extend this period by a further 60 days, in which case we will inform you of the extension and the reasons for it.</p>

<h2>10. Supervisory Authorities</h2>
<p>If you believe that our processing of your personal data infringes applicable data protection law, you have the right to lodge a complaint with a supervisory authority. The relevant authorities are:</p>
<ul>
<li><strong>Bulgaria:</strong> Commission for Personal Data Protection (CPDP), 2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria.</li>
<li><strong>Switzerland:</strong> Federal Data Protection and Information Commissioner (FDPIC), Feldeggweg 1, 3003 Bern, Switzerland.</li>
</ul>

<h2>11. Automated Decision-Making</h2>
<p>We do not use automated decision-making, including profiling, in our recruitment process. All hiring decisions are made by human reviewers.</p>

<h2>12. Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your personal data, including:</p>
<ul>
<li>Encryption of data in transit and at rest</li>
<li>Access controls limiting data access to authorized personnel only</li>
<li>Regular security audits and vulnerability assessments</li>
<li>Employee training on data protection and security practices</li>
</ul>

<h2>13. Children</h2>
<p>Our careers website and recruitment process are not directed at persons under the age of 18. We do not knowingly collect personal data from individuals under 18 years of age.</p>

<h2>14. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The "Last Updated" date at the top of this page indicates when this policy was last revised. We encourage you to review this page periodically.</p>

<h2>15. Contact</h2>
<p>If you have any questions or concerns about this Privacy Policy or our data protection practices, please contact us at:<br><a href="mailto:privacy@pcloud.com">privacy@pcloud.com</a></p>`,
      },
      {
        slug: 'cookie-policy',
        title: 'Cookie Policy',
        content: `<h2>1. What Are Cookies</h2>
<p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, to provide a better browsing experience, and to provide information to the website operators. Cookies may be set by the website you are visiting ("first-party cookies") or by third parties ("third-party cookies").</p>

<h2>2. Cookie Categories</h2>
<p>We use the following categories of cookies on our careers website:</p>

<h3>Strictly Necessary Cookies</h3>
<p>These cookies are essential for the website to function properly. They enable core functionality such as session management, security features, and remembering your cookie consent preferences. The website cannot operate correctly without these cookies, and they cannot be disabled.</p>

<h3>Functional Cookies</h3>
<p>Functional cookies allow the website to remember choices you make, such as your preferred language or region. They provide enhanced functionality and personalization. If you do not allow these cookies, some features of the website may not function as intended.</p>

<h3>Analytics Cookies</h3>
<p>Analytics cookies help us understand how visitors interact with our website by collecting and reporting information about page views, usage patterns, and visitor behavior. All data collected by these cookies is aggregated and anonymous. We use this information solely to improve how our website works.</p>

<h3>Marketing and Advertising Cookies</h3>
<p>We do <strong>not</strong> use marketing or advertising cookies on our careers website. We do not track you for advertising purposes or share your browsing data with advertising networks.</p>

<h2>3. Cookie Details</h2>
<p>The following table lists the cookies used on our website:</p>
<table>
<thead>
<tr><th>Cookie Name</th><th>Category</th><th>Purpose</th><th>Duration</th></tr>
</thead>
<tbody>
<tr><td>auth_token</td><td>Strictly Necessary</td><td>Maintains your authenticated session for the admin area</td><td>7 days</td></tr>
<tr><td>cookie_consent</td><td>Strictly Necessary</td><td>Records your cookie consent preferences</td><td>1 year</td></tr>
<tr><td>lang_pref</td><td>Functional</td><td>Stores your preferred language setting</td><td>1 year</td></tr>
<tr><td>_analytics_id</td><td>Analytics</td><td>Generates anonymous usage statistics to help us improve the website</td><td>90 days</td></tr>
<tr><td>_analytics_session</td><td>Analytics</td><td>Tracks anonymous page views within a single browsing session</td><td>Session</td></tr>
</tbody>
</table>

<h2>4. How to Control Cookies</h2>
<p>You can manage your cookie preferences in the following ways:</p>
<ul>
<li><strong>Cookie settings:</strong> When you first visit our website, a cookie consent banner will be displayed, allowing you to accept or decline non-essential cookies. You can update your preferences at any time by clicking the "Cookie Settings" link in the website footer.</li>
<li><strong>Browser controls:</strong> Most web browsers allow you to control cookies through their settings. You can typically set your browser to block all cookies, accept all cookies, or notify you when a cookie is being set. Please note that disabling cookies may impact the functionality of our website.</li>
</ul>
<p>For instructions on managing cookies in popular browsers, visit:</p>
<ul>
<li><a href="https://support.google.com/chrome/answer/95647" rel="noopener noreferrer">Google Chrome</a></li>
<li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" rel="noopener noreferrer">Mozilla Firefox</a></li>
<li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" rel="noopener noreferrer">Apple Safari</a></li>
<li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d" rel="noopener noreferrer">Microsoft Edge</a></li>
</ul>

<h2>5. Third-Party Cookies</h2>
<p>Our careers website does not use third-party cookies. We do not embed third-party tracking scripts, social media pixels, or advertising beacons. All cookies set on our website are first-party cookies controlled by pCloud.</p>

<h2>6. Legal Basis</h2>
<p>For strictly necessary cookies, the legal basis for processing is our legitimate interest in operating a functional and secure website. For all non-essential cookies (functional and analytics), we rely on your consent, which you provide through our cookie consent mechanism. You may withdraw your consent at any time.</p>

<h2>7. Changes to This Policy</h2>
<p>We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically to stay informed about our use of cookies.</p>

<h2>8. Contact</h2>
<p>If you have any questions about our use of cookies, please contact us at <a href="mailto:privacy@pcloud.com">privacy@pcloud.com</a>.</p>`,
      },
      {
        slug: 'terms-of-use',
        title: 'Terms of Use',
        content: `<h2>1. Acceptance of Terms</h2>
<p>By accessing and using the pCloud careers website (the "Website"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, you must not access or use the Website. These Terms constitute a legally binding agreement between you and pCloud International AG ("pCloud", "we", "us", or "our").</p>

<h2>2. Description of Service</h2>
<p>The Website provides information about career opportunities at pCloud, including:</p>
<ul>
<li>Current job listings and position descriptions</li>
<li>Information about our company culture, teams, and engineering practices</li>
<li>The ability to submit job applications and supporting materials</li>
<li>Blog articles and insights from our engineering team</li>
</ul>
<p>The Website is provided for informational and recruitment purposes only. Nothing on this Website constitutes an offer of employment or a guarantee that any position will be filled.</p>

<h2>3. User Eligibility</h2>
<p>You must be at least 18 years of age or the legal working age in your jurisdiction (whichever is greater) to use this Website and submit job applications. By using the Website, you represent and warrant that you meet these age requirements.</p>

<h2>4. User Conduct</h2>
<p>When using the Website, you agree to:</p>
<ul>
<li>Provide accurate, truthful, and complete information in any application or communication</li>
<li>Not submit fraudulent, misleading, or fabricated applications</li>
<li>Not use automated tools, bots, scrapers, or similar technology to access, crawl, or extract data from the Website</li>
<li>Not upload files containing viruses, malware, or other malicious code</li>
<li>Not attempt to gain unauthorized access to any part of the Website, its servers, or connected systems</li>
<li>Not interfere with or disrupt the Website's operation or infrastructure</li>
<li>Not use the Website for any purpose that is unlawful or prohibited by these Terms</li>
</ul>

<h2>5. Intellectual Property</h2>
<p>All content on this Website, including but not limited to text, graphics, logos, images, photographs, videos, software, and the overall design and layout, is the property of pCloud International AG or its licensors and is protected by Swiss and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any content from this Website without our prior written consent.</p>

<h2>6. Application Submissions</h2>
<p>By submitting a job application through this Website, you represent and warrant that:</p>
<ul>
<li>All information provided is accurate, complete, and not misleading</li>
<li>You have the right to share any documents, materials, or information included in your application</li>
<li>Your application does not infringe upon the intellectual property rights or other rights of any third party</li>
</ul>
<p>pCloud will process your application data solely for recruitment purposes, as described in our <a href="/legal/privacy-policy">Privacy Policy</a>.</p>

<h2>7. Privacy</h2>
<p>Your use of the Website is also governed by our <a href="/legal/privacy-policy">Privacy Policy</a>, which explains how we collect, use, and protect your personal data. By using the Website, you acknowledge that you have read and understood our Privacy Policy.</p>

<h2>8. Disclaimers</h2>
<p>The Website and all content, materials, and services provided through it are offered on an "as is" and "as available" basis, without warranties of any kind, whether express or implied. To the fullest extent permitted by applicable law, pCloud disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
<p>pCloud does not guarantee that:</p>
<ul>
<li>The Website will be available at all times without interruption</li>
<li>Any job listing will remain open or that any position will be filled</li>
<li>Submitting an application will result in employment</li>
<li>The information on the Website is always complete, accurate, or up-to-date</li>
</ul>

<h2>9. Limitation of Liability</h2>
<p>To the maximum extent permitted by applicable law, pCloud International AG, its directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising out of or in connection with your use of or inability to use the Website, even if pCloud has been advised of the possibility of such damages.</p>

<h2>10. Third-Party Links</h2>
<p>The Website may contain links to third-party websites or services that are not owned or controlled by pCloud. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that pCloud shall not be liable for any damage or loss caused by your use of any third-party website or service.</p>

<h2>11. Modifications to Terms</h2>
<p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this Website. The "Last Updated" date at the top of this page indicates when these Terms were last revised. Your continued use of the Website after any changes constitutes your acceptance of the revised Terms.</p>

<h2>12. Governing Law and Jurisdiction</h2>
<p>These Terms shall be governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the Canton of Zug, Switzerland, except where mandatory consumer protection laws of your country of residence provide otherwise.</p>

<h2>13. Severability</h2>
<p>If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms shall remain in full force and effect.</p>

<h2>14. Contact</h2>
<p>If you have any questions about these Terms of Use, please contact us at:<br><a href="mailto:legal@pcloud.com">legal@pcloud.com</a></p>`,
      },
      {
        slug: 'legal-notice',
        title: 'Legal Notice (Impressum)',
        content: `<h2>Company Information</h2>
<p><strong>pCloud International AG</strong></p>
<p>74 Zugerstrasse Str<br>6340 Baar<br>Switzerland</p>

<h3>Bulgarian Office</h3>
<p>Sofia, Bulgaria</p>

<h2>Registration</h2>
<p>Registered in the Swiss Commercial Register, Canton of Zug.</p>

<h2>Contact</h2>
<p>General inquiries: <a href="mailto:legal@pcloud.com">legal@pcloud.com</a></p>
<p>Privacy inquiries: <a href="mailto:privacy@pcloud.com">privacy@pcloud.com</a></p>
<p>Website: <a href="https://www.pcloud.com" rel="noopener noreferrer">www.pcloud.com</a></p>

<h2>Supervisory Authorities</h2>
<p>For data protection matters, the relevant supervisory authorities are:</p>
<ul>
<li><strong>Switzerland:</strong> Federal Data Protection and Information Commissioner (FDPIC), Feldeggweg 1, 3003 Bern, Switzerland. Website: <a href="https://www.edoeb.admin.ch" rel="noopener noreferrer">www.edoeb.admin.ch</a></li>
<li><strong>Bulgaria:</strong> Commission for Personal Data Protection (CPDP), 2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria. Website: <a href="https://www.cpdp.bg" rel="noopener noreferrer">www.cpdp.bg</a></li>
</ul>

<h2>Responsible for Content</h2>
<p>pCloud International AG is responsible for all content published on this website in accordance with applicable Swiss law and EU regulations.</p>

<h2>Disclaimer of Liability for External Links</h2>
<p>This website may contain links to external third-party websites. pCloud International AG has no influence on the content of these external websites and therefore accepts no liability for their content. The respective provider or operator of the linked pages is always responsible for the content of those pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not apparent at the time of linking. However, permanent monitoring of the content of linked pages is not reasonable without concrete indications of a legal violation. If we become aware of any legal infringements, we will remove such links immediately.</p>

<h2>Copyright</h2>
<p>All content and works on this website created by pCloud International AG are subject to Swiss and international copyright law. Reproduction, editing, distribution, or any kind of use beyond the limits of copyright law requires the prior written consent of pCloud International AG. Downloads and copies of this website are permitted for private, non-commercial use only.</p>

<h2>Data Protection</h2>
<p>For comprehensive information about how we handle your personal data, please refer to our <a href="/legal/privacy-policy">Privacy Policy</a> and our <a href="/legal/cookie-policy">Cookie Policy</a>.</p>`,
      },
    ];

    for (const page of legalPages) {
      execute(
        `INSERT INTO legal_pages (slug, title, content, last_updated) VALUES (?, ?, ?, datetime('now'))`,
        [page.slug, page.title, page.content]
      );
    }
    console.log(`  Created ${legalPages.length} legal pages`);
  });

  console.log('Seeding complete!');
}

// Auto-run when executed directly via tsx
seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
