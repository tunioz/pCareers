# Agent: Architect — Структура и инфраструктура

Ти си системен архитект за full-stack уеб проект. Твоята задача е да създадеш пълната фундаментална структура на проекта — без UI имплементация.

## Стек

- **Next.js 16.1+** (App Router, Turbopack, React 19.2+)
- **React 19.2.4+** (Server Components, `use cache`, `useEffectEvent`)
- **TypeScript 5.x** (strict mode)
- **MySQL 5.7** (InnoDB, utf8mb4_unicode_ci)
- **Nginx** (reverse proxy, gzip, static caching, SSL-ready)
- **Docker Compose v2**
- **Tailwind CSS 4.x**

## Проектът

Корпоративен сайт с:

- **Блог** за технически статии (CRUD, категории, тагове, markdown/rich text)
- **Отворени позиции** (CRUD, филтриране по отдел/локация/тип заетост)
- **За екипа** (членове с роли, снимки, social links)
- **За компанията** (история, мисия, партньори)
- **Admin panel** с authentication (JWT + httpOnly cookies), role-based access (admin/editor)
- **SEO** оптимизация (SSR/SSG, meta tags, Open Graph, sitemap.xml)

## Задачи

### 1. Docker Compose (`docker-compose.yml`)

Създай services:

- **frontend**: Next.js 16, port 3000, зависи от db, volume mounts за код и uploads
- **db**: `mysql:5.7`, port 3306, utf8mb4 charset и collation, volume за persistent data, healthcheck с `mysqladmin ping`
- **nginx**: latest, ports 80/443, зависи от frontend, volume за конфигурация и SSL certs

Добави `.dockerignore` и `frontend/Dockerfile` (multi-stage: deps → build → runner с `node:20-alpine`).

### 2. Nginx конфигурация (`nginx/nginx.conf`)

- Reverse proxy към `http://frontend:3000`
- gzip compression (text/html, application/json, text/css, application/javascript, image/svg+xml)
- Static asset caching: `/_next/static/` с `Cache-Control: public, max-age=31536000, immutable`
- Upload size limit: `client_max_body_size 20M`
- Security headers: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Content-Security-Policy
- SSL-ready server block (закоментиран, с placeholder за Let's Encrypt)
- Rate limiting зона за API endpoints

### 3. MySQL Schema (`mysql/init.sql`)

Създай таблици с InnoDB engine и `DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`:

```sql
users:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - email VARCHAR(255) UNIQUE NOT NULL
  - password_hash VARCHAR(255) NOT NULL
  - name VARCHAR(255) NOT NULL
  - role ENUM('admin', 'editor') NOT NULL DEFAULT 'editor'
  - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  - updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

posts:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - title VARCHAR(500) NOT NULL
  - slug VARCHAR(500) UNIQUE NOT NULL
  - content LONGTEXT NOT NULL
  - excerpt TEXT
  - cover_image VARCHAR(500)
  - author_id INT UNSIGNED NOT NULL (FK → users.id, ON DELETE RESTRICT)
  - category_id INT UNSIGNED (FK → categories.id, ON DELETE SET NULL)
  - status ENUM('draft', 'published') NOT NULL DEFAULT 'draft'
  - published_at TIMESTAMP NULL
  - meta_title VARCHAR(255)
  - meta_description VARCHAR(500)
  - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  - updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  - INDEX idx_status_published (status, published_at)
  - INDEX idx_slug (slug)

categories:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - name VARCHAR(255) NOT NULL
  - slug VARCHAR(255) UNIQUE NOT NULL
  - description TEXT

tags:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - name VARCHAR(100) NOT NULL
  - slug VARCHAR(100) UNIQUE NOT NULL

post_tags:
  - post_id INT UNSIGNED (FK → posts.id, ON DELETE CASCADE)
  - tag_id INT UNSIGNED (FK → tags.id, ON DELETE CASCADE)
  - PRIMARY KEY (post_id, tag_id)

job_positions:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - title VARCHAR(500) NOT NULL
  - slug VARCHAR(500) UNIQUE NOT NULL
  - department VARCHAR(255) NOT NULL
  - location VARCHAR(255) NOT NULL
  - type ENUM('full-time', 'part-time', 'contract', 'remote') NOT NULL
  - description LONGTEXT NOT NULL
  - requirements LONGTEXT
  - salary_range VARCHAR(255)
  - is_active TINYINT(1) NOT NULL DEFAULT 1
  - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  - updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  - INDEX idx_active (is_active)

team_members:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - name VARCHAR(255) NOT NULL
  - role VARCHAR(255) NOT NULL
  - bio TEXT
  - photo_url VARCHAR(500)
  - linkedin_url VARCHAR(500)
  - github_url VARCHAR(500)
  - twitter_url VARCHAR(500)
  - display_order INT UNSIGNED NOT NULL DEFAULT 0
  - is_active TINYINT(1) NOT NULL DEFAULT 1

company_info:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - section_key VARCHAR(100) UNIQUE NOT NULL
  - section_value TEXT NOT NULL
  - updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

applications:
  - id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - job_id INT UNSIGNED NOT NULL (FK → job_positions.id, ON DELETE CASCADE)
  - applicant_name VARCHAR(255) NOT NULL
  - email VARCHAR(255) NOT NULL
  - phone VARCHAR(50)
  - cv_url VARCHAR(500) NOT NULL
  - cover_letter TEXT
  - status ENUM('new', 'reviewed', 'interview', 'rejected', 'accepted') NOT NULL DEFAULT 'new'
  - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  - INDEX idx_job_status (job_id, status)
```

**Важно за MySQL 5.7:**
- НЕ използвай `JSON` тип за критични колони — няма пълна поддръжка за JSON индекси
- НЕ използвай `DEFAULT` за `TIMESTAMP` с израз — използвай `CURRENT_TIMESTAMP`
- НЕ използвай `ROW_NUMBER()` или `LATERAL` joins — не са поддържани
- Използвай `TINYINT(1)` вместо `BOOLEAN`
- Задължително задай `sql_mode` в docker-compose за да избегнеш `ONLY_FULL_GROUP_BY` проблеми

### 4. Next.js проект (`frontend/`)

Инициализирай с:
```bash
npx create-next-app@latest frontend --typescript --tailwind --app --turbopack --src-dir
```

Структура на `src/`:

```
src/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx          # Public layout с Header + Footer
│   │   ├── page.tsx            # Начална страница (placeholder)
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── careers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── team/page.tsx
│   │   └── about/page.tsx
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx      # Admin layout с sidebar navigation
│   │       ├── page.tsx        # Dashboard
│   │       ├── login/page.tsx
│   │       ├── posts/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/edit/page.tsx
│   │       ├── categories/page.tsx
│   │       ├── tags/page.tsx
│   │       ├── jobs/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/edit/page.tsx
│   │       ├── applications/page.tsx
│   │       ├── team/page.tsx
│   │       └── settings/page.tsx
│   ├── api/                    # Route handlers (placeholder файлове)
│   │   ├── auth/
│   │   ├── posts/
│   │   ├── categories/
│   │   ├── tags/
│   │   ├── jobs/
│   │   ├── applications/
│   │   ├── team/
│   │   ├── company/
│   │   └── upload/
│   ├── layout.tsx              # Root layout
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                     # Shared UI components (празни placeholder файлове)
│   ├── public/                 # Public-specific components
│   └── admin/                  # Admin-specific components
├── lib/
│   ├── db.ts                   # MySQL connection pool (mysql2/promise)
│   ├── auth.ts                 # JWT helpers (sign, verify, middleware)
│   ├── validations.ts          # Zod schemas
│   ├── upload.ts               # File upload utilities
│   ├── slugify.ts              # Slug generation с кирилица поддръжка
│   └── utils.ts                # Shared helpers
├── types/
│   └── index.ts                # TypeScript type definitions за всички entities
└── middleware.ts                # Next.js middleware — auth check за /admin routes
```

### 5. Environment (`frontend/.env.example`)

```env
# Database
DB_HOST=db
DB_PORT=3306
DB_USER=app_user
DB_PASSWORD=secure_password_here
DB_NAME=company_site

# Auth
JWT_SECRET=change-this-to-a-random-64-char-string
JWT_EXPIRES_IN=7d

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Company Name
UPLOAD_DIR=./public/uploads
MAX_UPLOAD_SIZE=10485760

# MySQL Root (за Docker init)
MYSQL_ROOT_PASSWORD=root_password_here
```

### 6. lib/db.ts — MySQL connection pool

Имплементирай с `mysql2/promise`:
- Connection pool с `connectionLimit: 10`
- Автоматичен reconnect
- `waitForConnections: true`
- `charset: 'utf8mb4'`
- Helper функция `query<T>(sql: string, params?: unknown[]): Promise<T>`
- Типизиран wrapper за `RowDataPacket` и `ResultSetHeader`

### 7. types/index.ts

Създай TypeScript интерфейси за всички entities: `User`, `Post`, `Category`, `Tag`, `JobPosition`, `TeamMember`, `CompanyInfo`, `Application`. Всеки интерфейс трябва да отразява точно MySQL schema-та.

### 8. README.md

Инструкции за:
- Prerequisites (Docker, Node 20+)
- `docker compose up -d` за стартиране
- Достъп до приложението (http://localhost)
- Достъп до MySQL (localhost:3306)
- Environment setup
- Development workflow

## Какво НЕ правиш

- НЕ имплементирай UI компоненти (само placeholder файлове с коментари)
- НЕ имплементирай API route handlers (само празни файлове)
- НЕ добавяй styling
- НЕ добавяй seed данни (това е за следващия агент)

## Критерии за успех

- `docker compose up -d` стартира без грешки
- MySQL приема connections и schema е създадена
- Next.js dev server стартира без грешки
- Nginx проксира коректно към Next.js
- Всички файлове са на правилните места
- TypeScript компилира без грешки
