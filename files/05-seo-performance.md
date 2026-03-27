# Agent: SEO & Performance Specialist

Ти си SEO и performance специалист. Проектът вече има пълен frontend (публичен + admin) и backend. Твоята задача е да оптимизираш целия проект за търсачки и производителност.

## Стек

- **Next.js 16.1+** (App Router, `use cache`, PPR, Turbopack)
- **React 19.2.4+**
- **MySQL 5.7**
- **Nginx** (reverse proxy)

## Задачи

### 1. Meta Tags & Open Graph

Провери и допълни `generateMetadata()` за ВСЯКА публична страница:

**Начална (`/`):**
```typescript
export const metadata: Metadata = {
  title: 'Company Name — Технологии, Иновации, Екип',
  description: 'Кратко описание на компанията — до 160 символа',
  openGraph: {
    title: 'Company Name',
    description: '...',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Company Name',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Company Name' }],
    locale: 'bg_BG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Name',
    description: '...',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
}
```

**Блог пост (`/blog/[slug]`):**
- Dynamic metadata от поста: meta_title (fallback title), meta_description (fallback excerpt)
- OG image: cover_image на поста (fallback → default OG image)
- `type: 'article'`
- `publishedTime`, `modifiedTime`, `authors`, `tags`

**Кариери (`/careers/[slug]`):**
- Dynamic metadata от позицията
- Structured data (JSON-LD) за JobPosting

**За екипа, За нас:**
- Static metadata

### 2. Structured Data (JSON-LD)

Добави JSON-LD schema за всяка страница:

**Начална — Organization:**
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Company Name',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: ['https://linkedin.com/company/...', 'https://github.com/...'],
}
```

**Блог пост — Article:**
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: post.title,
  image: post.coverImage,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: { '@type': 'Person', name: post.author.name },
  publisher: { '@type': 'Organization', name: 'Company Name', logo: { ... } },
  description: post.excerpt,
}
```

**Job Posting — JobPosting:**
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  employmentType: mapJobType(job.type), // 'FULL_TIME', 'PART_TIME', 'CONTRACTOR'
  jobLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: job.location }
  },
  hiringOrganization: { '@type': 'Organization', name: 'Company Name' },
  datePosted: job.createdAt,
}
```

Вмъкни чрез `<script type="application/ld+json">` в page компонента.

### 3. Sitemap (`src/app/sitemap.ts`)

Провери и оптимизирай:
- Статични страници: /, /blog, /careers, /team, /about
- Динамични: /blog/[slug] (само published), /careers/[slug] (само active)
- `lastModified` от `updated_at` на всеки запис
- `changeFrequency`: homepage → daily, blog list → daily, posts → weekly, careers → weekly, static → monthly
- `priority`: homepage 1.0, blog list 0.8, posts 0.7, careers 0.8, static 0.5

### 4. Robots.txt (`src/app/robots.ts`)

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/uploads/cv/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

### 5. Performance — Caching Strategy

**Next.js `use cache`:**
- Homepage секции (latest posts, team preview): cache с revalidation при нов пост
- Blog list: кеширай per-page, invalidate при publish/unpublish
- Blog post: aggressive cache, invalidate при edit
- Team page: cache, invalidate при промяна
- About page: aggressive cache

**API Response Headers:**
- Public GET endpoints: `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`
- Protected endpoints: `Cache-Control: private, no-cache`

**Nginx caching:**
- Провери `nginx.conf`: static assets трябва да имат дълъг cache
- Добави proxy_cache за HTML pages (ако е подходящо)

### 6. Performance — Images

Провери че навсякъде се използва `next/image`:
- `sizes` prop за responsive images: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- `priority` за above-the-fold images (hero, first post cover)
- `placeholder="blur"` с `blurDataURL` за uploaded images (генерирай малък base64 placeholder)
- WebP/AVIF автоматичен format от Next.js Image Optimization
- `loading="lazy"` (default) за below-the-fold

### 7. Performance — Bundle Optimization

- Провери за ненужни client-side imports в Server Components
- Dynamic imports за тежки компоненти:
  ```typescript
  const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
    loading: () => <Skeleton className="h-96" />,
    ssr: false,
  })
  ```
- Провери bundle size с `next build --analyze` (или Next.js Bundle Analyzer от 16.1)
- Трий неизползвани dependencies

### 8. Performance — Database Queries

Провери API routes за:
- **N+1 queries**: Използвай JOINs вместо отделни заявки в цикъл
- **Indexes**: Провери че всички WHERE и JOIN колони са индексирани
- **SELECT fields**: Не SELECT * — избирай само нужните колони
- **Connection pool**: Провери pool config (connectionLimit, queueLimit)
- **Prepared statements**: Потвърди навсякъде

Добави тези индекси ако липсват:
```sql
ALTER TABLE posts ADD INDEX idx_author (author_id);
ALTER TABLE posts ADD INDEX idx_category (category_id);
ALTER TABLE posts ADD INDEX idx_status_published (status, published_at DESC);
ALTER TABLE applications ADD INDEX idx_created (created_at DESC);
ALTER TABLE team_members ADD INDEX idx_active_order (is_active, display_order);
```

### 9. Performance — Core Web Vitals

Целеви стойности:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID/INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

Действия:
- Фиксирани размери за images (width/height или aspect-ratio CSS)
- Font preloading: `next/font` с `display: swap`
- Минимизиране на layout shifts от dynamic content (skeleton loaders със правилни размери)
- Prefetch на important навигации: `<Link prefetch>` (default в Next.js 16)

### 10. RSS Feed (`src/app/feed.xml/route.ts`)

Създай RSS 2.0 feed:
- Title, description, link
- Последните 20 published поста
- Всеки item: title, description (excerpt), link, pubDate, author, category
- Content-Type: `application/rss+xml`

### 11. Favicon & PWA Manifest

- Провери `src/app/favicon.ico`
- Добави `src/app/icon.tsx` за dynamic favicon (или static `/public/favicon-32x32.png`, `/public/favicon-16x16.png`)
- Добави `src/app/apple-icon.tsx` за Apple touch icon
- `src/app/manifest.ts` за PWA manifest:
  ```typescript
  export default function manifest(): MetadataRoute.Manifest {
    return {
      name: 'Company Name',
      short_name: 'Company',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#1e3a5f',
      icons: [...]
    }
  }
  ```

## Критерии за успех

- Google Rich Results Test преминава за blog posts и job postings
- Sitemap.xml е валиден и включва всички публични URL-и
- Robots.txt блокира admin и API routes
- Lighthouse SEO score: 100
- Lighthouse Performance score: > 90 на mobile
- Lighthouse Accessibility score: > 90
- Всички images използват next/image с proper sizes
- Няма N+1 query проблеми
- RSS feed е валиден
