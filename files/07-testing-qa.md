# Agent: QA Engineer — Testing

Ти си QA engineer. Проектът е пълен full-stack Next.js 16 application с MySQL 5.7. Твоята задача е да напишеш изчерпателни тестове.

## Стек

- **Next.js 16.1+** (App Router)
- **React 19.2.4+**
- **TypeScript 5.x**
- **MySQL 5.7**
- **Vitest** за unit и integration тестове
- **React Testing Library** за component тестове
- **Playwright** за E2E тестове

## Setup

Инсталирай test dependencies:

```bash
cd frontend

# Unit & Integration
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# E2E
npm install -D @playwright/test
npx playwright install chromium

# Mocking
npm install -D msw
```

Създай конфигурационни файлове:

**`vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/types/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**`src/__tests__/setup.ts`:**
```typescript
import '@testing-library/jest-dom/vitest'
```

**`playwright.config.ts`:**
```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

Добави scripts в `package.json`:
```json
{
  "test": "vitest",
  "test:coverage": "vitest --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

## Задачи

### 1. Unit Tests — Utilities (`src/lib/__tests__/`)

**`slugify.test.ts`:**
- Латиница → правилен slug ("Hello World" → "hello-world")
- Кирилица → транслитериран slug ("Привет Мир" → "privet-mir")
- Специални символи → премахнати
- Multiple spaces/dashes → единичен dash
- Leading/trailing dashes → премахнати
- Empty string → throws или default
- Unique slug generation (mock DB)

**`auth.test.ts`:**
- `hashPassword` → произвежда bcrypt hash
- `comparePassword` → вярна парола → true, грешна → false
- `signToken` → произвежда валиден JWT
- `verifyToken` → валиден token → payload, изтекъл → null, невалиден → null
- Token payload съдържа userId и role

**`validations.test.ts`:**
- За всяка Zod schema: валиден input → parse OK, невалиден → proper error messages
- Edge cases: empty strings, too long strings, invalid emails, negative numbers
- `createPostSchema`: title required, status enum validation
- `loginSchema`: email format, password min length
- `createApplicationSchema`: email required, name required
- `createJobSchema`: type enum validation

**`upload.test.ts`:**
- Валиден image file → success (mock fs и sharp)
- Invalid MIME type → rejection
- Oversized file → rejection
- Path traversal filename → sanitized
- Unique filename generation

### 2. Unit Tests — API Handlers (`src/app/api/__tests__/`)

Тестирай route handlers като функции. Mock-ни database и auth:

**`posts.test.ts`:**
- GET /api/posts → returns paginated published posts
- GET /api/posts?category=engineering → filters by category
- GET /api/posts?search=react → searches title and content
- GET /api/posts с auth → returns all posts including drafts
- POST /api/posts (no auth) → 401
- POST /api/posts (auth, editor) → creates post, returns 201
- POST /api/posts (invalid data) → 400 with validation errors
- POST /api/posts → auto-generates slug

**`auth.test.ts`:**
- POST /api/auth/login (valid credentials) → 200 + sets cookie
- POST /api/auth/login (invalid email) → 401
- POST /api/auth/login (invalid password) → 401
- POST /api/auth/login (missing fields) → 400
- POST /api/auth/logout → clears cookie
- GET /api/auth/me (with valid cookie) → returns user
- GET /api/auth/me (no cookie) → 401

**`jobs.test.ts`:**
- GET /api/jobs → returns only active jobs
- GET /api/jobs?department=Engineering → filters
- POST /api/jobs (no auth) → 401
- POST /api/jobs (auth) → creates job
- PUT /api/jobs/[id] (auth) → updates
- DELETE /api/jobs/[id] (editor) → 403
- DELETE /api/jobs/[id] (admin) → deletes

**`applications.test.ts`:**
- POST /api/jobs/[id]/apply → creates application
- POST /api/jobs/[id]/apply (invalid data) → 400
- GET /api/applications (no auth) → 401
- GET /api/applications (auth) → returns list
- PUT /api/applications/[id] (auth) → updates status

**`team.test.ts`:**
- GET /api/team → returns active members ordered
- POST /api/team (auth) → creates member
- PUT /api/team/reorder (auth) → updates order

### 3. Component Tests (`src/components/__tests__/`)

**UI Components:**

`Button.test.tsx`:
- Рендира с правилен text
- onClick handler се извиква
- Disabled state: не е clickable, visual disabled
- Loading state: показва spinner, не е clickable
- Variants: правилни CSS classes

`Pagination.test.tsx`:
- Показва правилен брой pages
- Current page е highlighted
- Prev/Next buttons: disabled на first/last page
- onClick на page number → извиква callback

`Badge.test.tsx`:
- Рендира text
- Variants имат правилни стилове

`FileUpload.test.tsx`:
- Рендира drop zone
- File selection → показва preview
- Invalid file type → показва error
- Oversized file → показва error

**Public Components:**

`PostCard.test.tsx`:
- Рендира title, excerpt, date, category
- Cover image използва next/image
- Link към /blog/[slug]

`JobCard.test.tsx`:
- Рендира title, department, location, type
- "Кандидатствай" бутон линква правилно

`TeamMemberCard.test.tsx`:
- Рендира name, role, photo
- Hover показва social links

### 4. Integration Tests (`src/__tests__/integration/`)

Тези тестове проверяват цели pages/flows:

**`blog-page.test.tsx`:**
- Рендира списък с постове (mock API response)
- Pagination работи
- Category filter филтрира
- Search box търси
- Empty state при липса на резултати

**`career-apply.test.tsx`:**
- Форма за кандидатстване рендира всички полета
- Валидация: submit без данни → показва errors
- Валидация: невалиден email → показва error
- Success: submit с валидни данни → success message

**`admin-login.test.tsx`:**
- Login форма рендира
- Submit с валидни данни → redirect
- Submit с грешни данни → error message

### 5. E2E Tests (`e2e/`)

**`e2e/public-navigation.spec.ts`:**
```typescript
test('навигация през публични страници', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Company Name/)

  // Blog
  await page.click('text=Блог')
  await expect(page).toHaveURL('/blog')
  await expect(page.locator('article')).toHaveCount.greaterThan(0)

  // Click first post
  await page.locator('article a').first().click()
  await expect(page.locator('h1')).toBeVisible()

  // Careers
  await page.click('text=Кариери')
  await expect(page).toHaveURL('/careers')

  // Team
  await page.click('text=Екип')
  await expect(page).toHaveURL('/team')

  // About
  await page.click('text=За нас')
  await expect(page).toHaveURL('/about')
})
```

**`e2e/blog.spec.ts`:**
- Blog list зарежда и показва постове
- Pagination: click page 2 → URL update + нови постове
- Category filter: click категория → филтриран списък
- Blog post: full content рендира, share buttons видими

**`e2e/careers.spec.ts`:**
- Job list зарежда
- Filter по department
- Click job → detail page
- Application form: fill and submit
- Success message след submit

**`e2e/admin-auth.spec.ts`:**
```typescript
test('admin login flow', async ({ page }) => {
  // Достъп до admin без login → redirect
  await page.goto('/admin')
  await expect(page).toHaveURL('/admin/login')

  // Login с грешни данни
  await page.fill('input[name="email"]', 'wrong@email.com')
  await page.fill('input[name="password"]', 'wrong')
  await page.click('button[type="submit"]')
  await expect(page.locator('.error')).toBeVisible()

  // Login с правилни данни
  await page.fill('input[name="email"]', 'admin@example.com')
  await page.fill('input[name="password"]', 'admin123')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/admin')
  await expect(page.locator('text=Dashboard')).toBeVisible()
})
```

**`e2e/admin-posts.spec.ts`:**
```typescript
test('CRUD операции за постове', async ({ page }) => {
  // Login first
  await loginAsAdmin(page)

  // Navigate to posts
  await page.click('text=Статии')
  await expect(page).toHaveURL('/admin/posts')

  // Create new post
  await page.click('text=Нова статия')
  await page.fill('input[name="title"]', 'Test Post Title')
  // Fill TipTap editor
  await page.locator('.tiptap').fill('Test content here')
  await page.click('text=Публикувай')
  await expect(page.locator('.toast-success')).toBeVisible()

  // Verify in list
  await page.click('text=Статии')
  await expect(page.locator('text=Test Post Title')).toBeVisible()

  // Edit post
  // ... click edit, change title, save

  // Delete post (admin only)
  // ... click delete, confirm, verify removed
})
```

**`e2e/admin-jobs.spec.ts`:**
- CRUD за позиции
- Active toggle
- View applications за позиция

**`e2e/admin-team.spec.ts`:**
- Add team member
- Edit member
- Reorder (drag and drop)
- Delete member

**`e2e/responsive.spec.ts`:**
- Test на mobile viewport (375px)
- Hamburger menu отваря/затваря
- Forms са usable на mobile
- Admin sidebar е drawer на mobile

### 6. Test Helpers (`src/__tests__/helpers/`)

**`db-mock.ts`:**
- Mock на mysql2/promise pool
- Factory functions за test data (createMockPost, createMockUser, etc.)

**`auth-mock.ts`:**
- Mock на auth middleware
- Helper за създаване на auth context

**`render-helpers.tsx`:**
- Custom render с providers (ThemeProvider, etc.)
- Helper за router mocking

**`e2e/helpers.ts`:**
- `loginAsAdmin(page)` — login helper
- `loginAsEditor(page)`
- `createTestPost(page, data)` — създаване на пост за тестове
- `cleanupTestData()` — изчистване след тестове

### 7. MSW (Mock Service Worker) Setup

`src/__tests__/mocks/handlers.ts`:
- Mock handlers за всички API endpoints
- Realistic response data
- Error scenarios

`src/__tests__/mocks/server.ts`:
- MSW server setup за Vitest

## Критерии за успех

- `npm test` — всички unit и integration тестове минават
- `npm run test:coverage` — coverage > 70% за lib/, > 50% за components/
- `npm run test:e2e` — всички E2E тестове минават
- Няма flaky тестове
- Тестовете покриват happy paths И error cases
- Auth flow е тестиран end-to-end
- CRUD операциите са тестирани за всеки entity
- Responsive behavior е тестиран
