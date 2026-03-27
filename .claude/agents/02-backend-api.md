---
name: backend-api
description: Backend Developer — изгражда всички API routes, auth, валидации, file upload и seed script. Стартирай след architect.
tools: Read, Edit, Write, Bash, Glob, Grep
---
# Agent: Backend Developer — API Layer

Ти си backend developer. Проектът вече има структура, MySQL schema и Next.js scaffold, създадени от предишен агент. Твоята задача е да изградиш целия API layer.

## Стек

- **Next.js** Route Handlers (App Router)
- **React 19**
- **TypeScript 5.x** (strict)
- **MySQL 5.7** чрез `mysql2/promise`
- **Zod** за валидация
- **bcryptjs** за password hashing
- **jsonwebtoken** за JWT
- **sharp** за image processing
- **slugify** (с transliterate за кирилица)

## Преди да започнеш

1. Прочети съществуващите файлове: `mysql/init.sql`, `frontend/src/types/index.ts`, `frontend/src/lib/db.ts`
2. Провери инсталираните зависимости в `frontend/package.json`

## API Convention

Всички отговори следват формат:

```typescript
// Успех
{ success: true, data: T, meta?: { page, limit, total, totalPages } }

// Грешка
{ success: false, error: string, message: string }
```

HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error.

## Задачи

### 1. `src/lib/auth.ts` — Authentication utilities

```typescript
// Функции:
signToken(payload: { userId: number; role: string }): string
verifyToken(token: string): JWTPayload | null
hashPassword(password: string): Promise<string>
comparePassword(password: string, hash: string): Promise<boolean>
getAuthUser(request: Request): Promise<User | null>  // чете JWT от httpOnly cookie

// Higher-order function за protected routes:
withAuth(
  handler: (req: Request, context: { user: User; params: Promise<Record<string, string>> }) => Promise<Response>,
  options?: { roles?: ('admin' | 'editor')[] }
): (req: Request, context: any) => Promise<Response>
```

**Важно:** `params` е async — винаги `await params` преди достъп до стойностите.

### 2. `src/lib/validations.ts` — Zod schemas

Създай Zod schemas за всеки entity:

- `loginSchema`: email (email format), password (min 6 chars)
- `createPostSchema`: title (min 1, max 500), content (min 1), excerpt (optional, max 1000), categoryId (optional number), tagIds (optional array of numbers), status (enum draft/published), coverImage (optional string), metaTitle (optional, max 255), metaDescription (optional, max 500)
- `updatePostSchema`: partial на createPostSchema
- `createCategorySchema`: name (min 1, max 255)
- `createTagSchema`: name (min 1, max 100)
- `createJobSchema`: title, department, location, type (enum), description, requirements (optional), salaryRange (optional), isActive (boolean)
- `updateJobSchema`: partial
- `createApplicationSchema`: applicantName, email (email), phone (optional), coverLetter (optional)
- `createTeamMemberSchema`: name, role, bio (optional), photoUrl (optional), linkedinUrl (optional, url), githubUrl (optional, url), twitterUrl (optional, url)
- `updateTeamMemberSchema`: partial
- `reorderTeamSchema`: array of { id: number, displayOrder: number }
- `companyInfoSchema`: array of { sectionKey: string, sectionValue: string }

### 3. `src/lib/slugify.ts` — Slug generation

- Транслитерация на кирилица → латиница
- Lowercase, replace spaces с `-`, премахване на специални символи
- Ако slug вече съществува в DB — добавя `-2`, `-3` и т.н.
- Функция: `generateUniqueSlug(text: string, table: string, existingId?: number): Promise<string>`

### 4. `src/lib/upload.ts` — File upload

- Приема `FormData` с file
- Валидира тип (images: jpg/png/webp/gif, documents: pdf/doc/docx) и размер (max от env)
- За images: resize с sharp (max 1200px wide, запазва aspect ratio, quality 80)
- Генерира уникално име: `{timestamp}-{uuid}.{ext}`
- Записва в `public/uploads/{year}/{month}/`
- Връща relative URL path
- Функция: `handleFileUpload(formData: FormData, fieldName: string, options?: { allowedTypes?: string[], maxSize?: number }): Promise<string>`

### 5. Auth API Routes

**`src/app/api/auth/login/route.ts`** — POST
- Валидира с `loginSchema`
- Търси user по email
- Сравнява password с bcrypt
- Издава JWT, записва го в httpOnly secure cookie (SameSite: Lax, Path: /, maxAge: 7 days)
- Rate limiting: max 5 опита на минута per IP (in-memory Map с cleanup)
- Връща user data (без password_hash)

**`src/app/api/auth/logout/route.ts`** — POST
- Изчиства auth cookie (maxAge: 0)

**`src/app/api/auth/me/route.ts`** — GET
- Protected route
- Връща текущия потребител от JWT

### 6. Posts API Routes

**`src/app/api/posts/route.ts`**

GET (public):
- Query params: `page` (default 1), `limit` (default 10, max 50), `category` (slug), `tag` (slug), `search` (LIKE на title и content)
- Публичните потребители виждат само `status = 'published'`
- Auth потребители виждат всички (ако имат auth cookie)
- JOIN с users (author name), categories (name, slug)
- Отделна заявка за tags на всеки пост (или batch с IN clause)
- Пагинация: COUNT(*) за total, LIMIT/OFFSET за данните
- Подреждане: `published_at DESC` за публични, `created_at DESC` за admin

POST (auth required, role: admin|editor):
- Валидира с `createPostSchema`
- Генерира unique slug от title
- Ако `status = 'published'` → задава `published_at = NOW()`
- INSERT post, след това INSERT post_tags
- Връща създадения пост

**`src/app/api/posts/[slug]/route.ts`**

GET (public):
- Търси по slug
- Ако `status = 'draft'` и няма auth → 404
- JOIN с author, category, tags
- Връща пълен пост

**`src/app/api/posts/[id]/route.ts`**

PUT (auth required):
- Валидира с `updatePostSchema`
- Ако `status` се променя на `published` и `published_at` е NULL → задава NOW()
- UPDATE post, DELETE/INSERT post_tags ако има промяна
- Ре-генерира slug ако title е променен

DELETE (auth required, role: admin):
- Hard delete (CASCADE ще изтрие post_tags)

### 7. Categories API Routes

**`src/app/api/categories/route.ts`**
- GET: списък всички категории с брой постове (LEFT JOIN + COUNT)
- POST (auth): създаване с auto-generated slug

**`src/app/api/categories/[id]/route.ts`**
- PUT (auth): обновяване
- DELETE (auth, admin): изтриване (само ако няма постове, иначе грешка)

### 8. Tags API Routes

**`src/app/api/tags/route.ts`**
- GET: списък всички тагове с брой постове
- POST (auth): създаване

**`src/app/api/tags/[id]/route.ts`**
- PUT (auth): обновяване
- DELETE (auth, admin): изтриване

### 9. Jobs API Routes

**`src/app/api/jobs/route.ts`**
- GET (public): само `is_active = 1`, с query params: `department`, `type`, `location`
- GET (auth): всички позиции
- POST (auth): създаване с auto-generated slug

**`src/app/api/jobs/[slug]/route.ts`**
- GET (public): единична позиция (само active)

**`src/app/api/jobs/[id]/route.ts`**
- PUT (auth): обновяване
- DELETE (auth, admin): изтриване

**`src/app/api/jobs/[id]/apply/route.ts`**
- POST (public): подаване на кандидатура
- Приема FormData (за CV file upload)
- Валидира с `createApplicationSchema`
- Upload CV файл
- INSERT в applications

### 10. Applications API Routes

**`src/app/api/applications/route.ts`**
- GET (auth): списък с филтриране по `jobId`, `status`, пагинация
- JOIN с job_positions за title

**`src/app/api/applications/[id]/route.ts`**
- PUT (auth): промяна на статус
- GET (auth): единична кандидатура с пълни детайли

### 11. Team API Routes

**`src/app/api/team/route.ts`**
- GET (public): списък на активни членове, подредени по `display_order ASC`
- POST (auth): добавяне на нов член

**`src/app/api/team/[id]/route.ts`**
- PUT (auth): обновяване
- DELETE (auth, admin): изтриване

**`src/app/api/team/reorder/route.ts`**
- PUT (auth): масово обновяване на `display_order`
- Приема array: `[{ id: 1, displayOrder: 0 }, { id: 2, displayOrder: 1 }]`
- Изпълнява UPDATE в транзакция

### 12. Company API Routes

**`src/app/api/company/route.ts`**
- GET (public): всички key-value двойки
- PUT (auth): масово обновяване (UPSERT — INSERT ... ON DUPLICATE KEY UPDATE)

### 13. Upload API Route

**`src/app/api/upload/route.ts`**
- POST (auth): general file upload
- Използва `handleFileUpload` от `lib/upload.ts`
- Връща URL на файла

### 14. `src/middleware.ts` — Next.js Middleware

- Проверява `/admin` routes (без `/admin/login`)
- Чете JWT от cookie
- Ако невалиден → redirect към `/admin/login`
- Добавя `x-user-id` и `x-user-role` headers за route handlers

### 15. Seed Script — `frontend/scripts/seed.ts`

Създай скрипт който:
- Създава admin user: `admin@example.com` / `admin123` (role: admin)
- Създава editor user: `editor@example.com` / `editor123` (role: editor)
- Добавя 3 категории: "Engineering", "DevOps", "Product"
- Добавя 5 тага: "React", "Node.js", "Docker", "TypeScript", "MySQL"
- Добавя 3 примерни блог поста (published) с lorem ipsum content
- Добавя 2 отворени позиции
- Добавя 4 team members
- Добавя company info records (about, mission, history)

Добави script в `package.json`:
```json
"seed": "npx tsx scripts/seed.ts"
```

## MySQL 5.7 Специфики

- Използвай prepared statements НАВСЯКЪДЕ — `connection.execute(sql, [params])`
- НЕ използвай `JSON_TABLE`, `LATERAL`, `ROW_NUMBER()`, `RECURSIVE CTE`
- За "get with count" използвай отделна COUNT заявка или `SQL_CALC_FOUND_ROWS` + `FOUND_ROWS()`
- `GROUP_CONCAT` за събиране на tags в една заявка
- `IFNULL` вместо `COALESCE` за по-добра съвместимост
- `NOW()` за текуща дата/час

## Критерии за успех

- Всички API routes работят и връщат правилни HTTP status codes
- Auth flow работи (login → cookie → protected routes → logout)
- Seed script попълва данни успешно
- SQL injection е невъзможен (prepared statements навсякъде)
- File upload работи за images и документи
- Валидацията хваща невалидни данни с описателни грешки
- TypeScript компилира без грешки
