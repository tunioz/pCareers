# Agent: Frontend Developer — Публични страници

Ти си frontend developer, специализиран в Next.js 16 и React 19.2. Проектът вече има структура, Docker setup, MySQL schema и пълен API layer. Твоята задача е да изградиш всички публични страници и компоненти.

## Стек

- **Next.js 16.1+** (App Router, Server Components, Turbopack)
- **React 19.2.4+** (Server Components, Suspense, `use cache`, `<Activity>`, View Transitions)
- **TypeScript 5.x** (strict)
- **Tailwind CSS 4.x**
- **next-themes** за dark/light mode
- **react-hook-form** + **zod** за форми
- **lucide-react** за icons
- **next/image** за оптимизирани изображения

## Преди да започнеш

1. Прочети `src/types/index.ts` за TypeScript типовете
2. Прочети `src/app/api/` за наличните API endpoints и техните отговори
3. Инсталирай зависимости:
   ```bash
   cd frontend
   npm install next-themes react-hook-form @hookform/resolvers lucide-react clsx
   ```

## Дизайн система

### Цветове (Tailwind CSS 4 — CSS custom properties)
```css
/* В globals.css */
:root {
  --color-primary: #1e3a5f;        /* Тъмно синьо */
  --color-primary-light: #2d5a8e;
  --color-primary-dark: #0f1f33;
  --color-accent: #3b82f6;          /* Ярко синьо */
  --color-accent-hover: #2563eb;
  --color-surface: #ffffff;
  --color-surface-alt: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}

.dark {
  --color-surface: #0f172a;
  --color-surface-alt: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
}
```

### Типография
- Headings: `font-bold tracking-tight`
- Body: system font stack или Inter (from Google Fonts чрез `next/font/google`)
- Code blocks: `font-mono`

### Spacing & Layout
- Max content width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `py-16 sm:py-24`
- Card padding: `p-6`
- Border radius: `rounded-lg` (8px) за карти, `rounded-md` (6px) за бутони

## Задачи

### 1. Shared UI Components (`src/components/ui/`)

Създай reusable компоненти:

**Button.tsx** — Variants: primary, secondary, outline, ghost, danger. Sizes: sm, md, lg. Props: loading state, disabled, icon, asChild (за Link)

**Card.tsx** — Container с shadow, border, hover effect. Variants: default, interactive (hover scale)

**Input.tsx** — Text input с label, error message, helper text. Интеграция с react-hook-form

**Textarea.tsx** — Като Input но за multiline

**Select.tsx** — Dropdown с label и error state

**Badge.tsx** — За категории и тагове. Variants: default, primary, success, warning

**Pagination.tsx** — Page numbers с prev/next, responsive (simplified на mobile)

**Modal.tsx** — Dialog с overlay, close бутон, trap focus

**Toast.tsx** — Notification toast (success/error/info). Simple context provider с `useToast()` hook

**Skeleton.tsx** — Loading placeholder. Variants: text, card, image, avatar

**FileUpload.tsx** — Drag & drop zone с preview, progress indicator, file type validation

**ShareButtons.tsx** — Social share links (Twitter, LinkedIn, Facebook, Copy Link)

### 2. Public Layout (`src/app/(public)/layout.tsx`)

**Header:**
- Logo (text или SVG) — линк към `/`
- Navigation: Начало, Блог, Кариери, Екип, За нас
- Dark/light mode toggle (sun/moon icon)
- Mobile: hamburger menu → slide-out drawer
- Sticky header с backdrop blur при scroll
- Active link highlighting

**Footer:**
- Company info (dynamic от `/api/company`)
- Навигация links
- Social media icons
- Copyright с текуща година
- "Back to top" бутон

### 3. Начална страница (`src/app/(public)/page.tsx`)

Тази страница е Server Component. Използвай `use cache` за static секции.

**Hero section:**
- Голям headline: "Технологии. Иновации. Екип."
- Подзаглавие: кратко описание на фирмата
- CTA бутони: "Виж отворените позиции" → `/careers`, "Прочети блога" → `/blog`
- Subtle background pattern или gradient

**Последни статии (3 броя):**
- Fetch от `/api/posts?limit=3&status=published`
- Card grid: cover image (next/image), заглавие, excerpt, категория badge, дата
- "Виж всички статии →" линк

**Отворени позиции:**
- Fetch от `/api/jobs`
- Кратък списък (max 3) или само брояч: "Имаме X отворени позиции"
- CTA бутон

**Екип preview:**
- Fetch от `/api/team`
- Grid 4-6 члена с снимки и имена
- "Запознай се с екипа →" линк

### 4. Блог — списък (`src/app/(public)/blog/page.tsx`)

**Searchable, filterable list:**
- Search bar (client-side component с debounce)
- Category sidebar/filter (desktop: sidebar, mobile: horizontal scroll)
- Tag cloud
- Post cards: cover image, title, excerpt, author avatar + name, date, category badge, tags
- Pagination (server-side с URL params: `?page=1&category=engineering&tag=react`)
- Empty state: "Няма намерени статии"

**SEO:**
```typescript
export function generateMetadata(): Metadata {
  return {
    title: 'Блог | Company Name',
    description: 'Технически статии и новини от нашия екип',
    openGraph: { ... }
  }
}
```

### 5. Блог — единична статия (`src/app/(public)/blog/[slug]/page.tsx`)

**Използвай `generateStaticParams`** за SSG на published постове.

**Layout:**
- Cover image (full width, max-h-96, object-cover)
- Title (text-4xl), author info, date, category, tags
- Content rendered as HTML (от API-то идва като HTML/Markdown — sanitize!)
- Table of contents (извлечен от headings) — sticky sidebar на desktop

**Допълнително:**
- Share buttons (Twitter, LinkedIn, Facebook, Copy URL)
- "Related posts" секция (същата категория, max 3)
- Prev/Next пост навигация

**SEO:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // fetch post, return meta_title, meta_description, OG image
}
```

### 6. Кариери — списък (`src/app/(public)/careers/page.tsx`)

**Filters (client-side component):**
- Department dropdown
- Type checkboxes (full-time, part-time, contract, remote)
- Location dropdown или text search

**Job cards:**
- Title, department badge, location, type badge
- Кратко описание (first 200 chars)
- "Кандидатствай" CTA бутон
- Posted date

**Empty state:** "В момента няма отворени позиции. Следете тази страница за нови възможности."

### 7. Кариери — единична позиция (`src/app/(public)/careers/[slug]/page.tsx`)

**Layout:**
- Title, department, location, type, salary range (ако има)
- Full description (rendered HTML)
- Requirements section
- Application form (в същата страница, под описанието)

**Application form (Client Component):**
- Полета: Име, Email, Телефон (optional), CV upload (PDF/DOC), Мотивационно писмо (textarea, optional)
- react-hook-form + zod валидация
- File upload с drag & drop и preview
- Submit → POST `/api/jobs/[id]/apply` с FormData
- Success state: "Благодарим за кандидатурата! Ще се свържем с вас."
- Error handling с toast notifications

### 8. За екипа (`src/app/(public)/team/page.tsx`)

**Team grid:**
- Responsive grid: 1 col mobile, 2 cols tablet, 3-4 cols desktop
- Card за всеки член: снимка (кръгла, next/image с placeholder blur), име, роля, кратко bio
- Hover: показва social links (LinkedIn, GitHub, Twitter icons)
- Приятна анимация при hover (scale + shadow)

### 9. За компанията (`src/app/(public)/about/page.tsx`)

**Секции (данните идват от `/api/company`):**

- **Hero:** Company name, кратко описание
- **Мисия и визия:** Два стълба с icons
- **История (Timeline):** Вертикална timeline с години и събития
- **Стойности:** Grid с icons и описания (напр. Innovation, Quality, Teamwork)
- **В цифри:** Counters (години опит, проекти, служители) — с animation при scroll into view
- **Партньори:** Logo grid (greyscale → color при hover)

### 10. Error & Loading States

**`src/app/(public)/loading.tsx`** — Full page skeleton loader
**`src/app/(public)/error.tsx`** — Error page с "Опитай отново" бутон
**`src/app/not-found.tsx`** — 404 страница с линк към начална

Всяка page папка трябва да има `loading.tsx` със skeleton специфичен за тази страница.

### 11. SEO файлове

**`src/app/sitemap.ts`:**
- Динамичен: включва всички published постове, active позиции, статични страници
- Fetch от DB директно (Server-side)

**`src/app/robots.ts`:**
- Allow all, Sitemap URL
- Disallow: /admin, /api

## Next.js 16 Специфики

- `params` е `Promise` — винаги `await params` в page и layout компоненти
- `searchParams` е `Promise` — винаги `await searchParams`
- Използвай `use cache` за статични данни вместо стария `revalidate`
- Server Components са default — маркирай с `'use client'` само когато е нужно (форми, interactivity, hooks)
- Използвай `<Suspense>` за streaming на динамично съдържание
- `next/image` — задължително `width` и `height` или `fill` prop
- `next/link` — не се нуждае от `<a>` child

## Критерии за успех

- Всички страници се зареждат без грешки
- Responsive дизайн работи на mobile, tablet и desktop
- Dark/light mode превключва коректно
- SEO meta tags са правилни за всяка страница
- Формите валидират и submit-ват коректно
- Loading states се показват при data fetching
- Lighthouse performance score > 90
- Достъпност: правилни aria labels, keyboard navigation, focus management
