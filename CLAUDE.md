# pCloud Employee Branding Site

Employee branding уебсайт на pCloud — блог, кариери, екип, за нас.

## Tech Stack

| Technology | Version    |
|-----------|-----------|
| Node.js   | 24        |
| Next.js   | latest (16+) |
| React     | latest (19+) |
| TypeScript| 5.x       |
| SQLite    | 3.x (via better-sqlite3) |
| Sass/SCSS | latest    |
| Docker    | Compose v2 |
| Nginx     | latest    |

## Project Structure

```
project/
├── frontend/              # Next.js App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/      # Публични страници (blog, careers, team, about)
│   │   │   ├── (admin)/admin/ # Admin panel
│   │   │   └── api/           # API routes
│   │   ├── components/
│   │   │   ├── admin/         # Admin компоненти
│   │   │   ├── public/        # Публични компоненти
│   │   │   └── ui/            # Shared UI компоненти
│   │   ├── lib/               # Utilities, DB, helpers
│   │   ├── types/             # TypeScript типове
│   │   └── i18n/              # Translations
│   ├── public/
│   │   └── uploads/           # Uploaded files
│   └── styles/                # Global SCSS файлове
├── nginx/                     # Reverse proxy config
├── data/                      # SQLite database file
├── docker-compose.yml
└── .env.example
```

## Key Decisions

- **SQLite** вместо MySQL — по-лесен deploy, без отделен DB сървър. Използвай `better-sqlite3` за синхронен достъп.
- **Sass/SCSS** за стилове — без Tailwind. Пиши SCSS модули (`*.module.scss`) за компоненти.
- **Node 24** — използвай native features (ESM, built-in test runner ако е нужно).

## Translations / i18n

### Правила за преводи

- Всеки език има собствен JSON файл в `frontend/src/i18n/`:
  ```
  i18n/
  ├── bg.json    # Български (основен)
  ├── en.json    # English
  └── index.ts   # Helper за зареждане
  ```
- Ключовете са nested по секция:
  ```json
  {
    "nav": {
      "home": "Начало",
      "blog": "Блог",
      "careers": "Кариери",
      "team": "Екип",
      "about": "За нас"
    },
    "blog": {
      "title": "Нашият блог",
      "readMore": "Прочети повече"
    }
  }
  ```
- Език по подразбиране: `bg` (български).
- Езикът се определя чрез URL prefix: `/bg/blog`, `/en/blog`.
- При добавяне на нов текст в UI — **винаги** добави ключ във **всички** езикови файлове.
- Никога не хардкодвай текст директно в компоненти — използвай translation функция `t('key')`.
- Admin панелът е само на английски — не се превежда.

## Coding Conventions

- Компоненти: PascalCase (`BlogCard.tsx`)
- Стилове: SCSS модули (`BlogCard.module.scss`)
- API routes: kebab-case пътища
- Database: snake_case за колони и таблици
- TypeScript: strict mode, no `any`
- Всички компоненти са Server Components по подразбиране. Използвай `'use client'` само когато е нужно.

## Agent Execution Order

| #  | Agent                | Role                 |
|----|---------------------|----------------------|
| 1  | `architect`          | Structure, Docker, SQLite schema, Next.js scaffold |
| 2  | `backend-api`        | API routes, auth, validations, file upload |
| 3  | `frontend-public`    | Public pages — blog, careers, team, about |
| 4  | `admin-panel`        | Admin dashboard, CRUD, rich text editor |
| 5  | `seo-performance`    | Meta tags, sitemap, OG, Core Web Vitals |
| 6  | `security-review`    | Full security audit |
| 7  | `testing-qa`         | Unit, integration, E2E tests |

Agents 6 и 7 могат да вървят паралелно. Всички останали — последователно.

## Database (SQLite)

- DB файл: `data/pcloud.db`
- Schema се дефинира в `frontend/src/lib/db.ts`
- Миграции: чрез SQL скриптове в `data/migrations/`
- Използвай prepared statements — никога string concatenation за SQL
