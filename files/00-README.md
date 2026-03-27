# Claude Code Agent Team — Blog & Company Platform

## Стек

| Технология      | Версия       |
|-----------------|-------------|
| Next.js         | 16.1+       |
| React           | 19.2.4+     |
| TypeScript      | 5.x         |
| MySQL           | 5.7         |
| Nginx           | latest      |
| Docker          | Compose v2  |
| Tailwind CSS    | 4.x         |

## Структура на проекта

```
project/
├── frontend/              # Next.js 16 (App Router)
│   ├── app/
│   │   ├── (public)/      # Публични страници
│   │   └── (admin)/admin/ # Admin panel
│   ├── components/
│   ├── lib/
│   └── ...
├── nginx/                 # Reverse proxy конфигурация
│   └── nginx.conf
├── mysql/                 # Schema, migrations, seeds
│   ├── init.sql
│   └── seed.sql
├── docker-compose.yml
├── .env.example
└── README.md
```

## Агенти — ред на изпълнение

| #  | Файл                           | Роля                    | Описание                                                    |
|----|--------------------------------|-------------------------|-------------------------------------------------------------|
| 1  | `01-architect.md`              | Архитект                | Структура, Docker, Nginx, MySQL schema, Next.js scaffold    |
| 2  | `02-backend-api.md`            | Backend Developer       | Всички API routes, auth, validations, file upload           |
| 3  | `03-frontend-public.md`        | Frontend Developer      | Публични страници — блог, кариери, екип, за нас             |
| 4  | `04-admin-panel.md`            | Admin Panel Developer   | Admin dashboard, CRUD интерфейси, rich text editor          |
| 5  | `05-seo-performance.md`        | SEO & Performance       | Meta tags, sitemap, Open Graph, Core Web Vitals, caching    |
| 6  | `06-security-review.md`        | Security Auditor        | Пълен security audit на целия проект                        |
| 7  | `07-testing-qa.md`             | QA Engineer             | Unit, integration, E2E тестове                              |

## Как да използваш промптовете

### Вариант A: Последователно (препоръчителен)

Пускай всеки prompt последователно в **Claude Code** (`claude` CLI):

```bash
# 1. Започни нов проект
mkdir my-company-site && cd my-company-site

# 2. Пусни архитекта
claude --prompt-file ./prompts/01-architect.md

# 3. След като приключи — пусни backend
claude --prompt-file ./prompts/02-backend-api.md

# 4. И така нататък...
```

### Вариант B: С Claude Code Agent Teams (ако е налично)

Можеш да конфигурираш агентите като team в `.claude/teams.yml`.

### Важни бележки

- Всеки агент надгражда работата на предишния
- Не прескачай стъпки — зависимостите са последователни
- Преди всеки prompt провери дали предишната стъпка е завършила успешно
- Агент 6 (Security) и 7 (Testing) могат да вървят паралелно
