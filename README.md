# Next.js Starter

A production-oriented full-stack starter for building type-safe applications
with Next.js. It provides a modular project structure, a tRPC API, PostgreSQL
persistence, shared validation, and a complete authentication flow powered by
better-auth.

## Features

- Next.js App Router with React and TypeScript
- End-to-end type-safe API powered by tRPC
- PostgreSQL persistence with Drizzle ORM and versioned migrations
- Authentication with better-auth: email/password and Google sign-in
- Client-side server state management with TanStack Query
- Forms built with TanStack Form and shared Zod validation
- Reusable client components styled with Tailwind CSS
- ESLint, Prettier, Knip, ls-lint, EditorConfig, Husky, and Commitlint

## Tech stack

| Area                 | Technology                                 |
| -------------------- | ------------------------------------------ |
| Framework            | Next.js 16, React 19, TypeScript           |
| API                  | tRPC 11, SuperJSON                         |
| Database             | PostgreSQL, Drizzle ORM                    |
| Authentication       | better-auth (email/password, Google OAuth) |
| Forms and validation | TanStack Form, Zod                         |
| Data fetching        | TanStack Query                             |
| Styling              | Tailwind CSS 4                             |
| Code quality         | ESLint, Prettier, Knip, Husky, Commitlint  |

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm
- A running PostgreSQL instance
- A Google OAuth client (for Google sign-in)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Create a `.env` file in the project root:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=nextjs_starter

BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=replace-with-google-client-id
GOOGLE_CLIENT_SECRET=replace-with-google-client-secret
```

All variables are validated at startup in `env.config.ts`. The application
will fail fast if a required value is missing or invalid.

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` come from a Google OAuth client
(Google Cloud Console → APIs & Services → Credentials). Add
`{BETTER_AUTH_URL}/api/auth/callback/google` as an authorized redirect URI.

> Do not commit `.env` files or use example secrets in production.

### 3. Apply database migrations

Create the database specified by `DB_NAME`, then run:

```bash
npm run db:migrate
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Registration is
available at [http://localhost:3000/register](http://localhost:3000/register)
and sign-in at [http://localhost:3000/login](http://localhost:3000/login).

## How authentication works

Authentication is handled entirely by
[better-auth](https://www.better-auth.com/), configured in
`src/server/modules/auth/auth.ts` and exposed to the app through the catch-all
route handler at `app/api/auth/[...all]/route.ts`.

1. TanStack Form validates registration and login input with shared Zod
   schemas.
2. The client calls `authClient` (`src/client/auth/auth-client.ts`), a
   better-auth React client, to sign up or sign in with email and password.
3. The register and login pages also render a "Continue with Google" button
   that starts the better-auth Google OAuth flow.
4. better-auth persists users, sessions, accounts, and verification tokens
   directly to PostgreSQL through the Drizzle adapter, and issues a
   session cookie on success.

There is no custom password hashing, token signing, or user-registration
business logic left in the app — better-auth owns that surface entirely.

The `/users` page and the `users.list` tRPC procedure remain as a minimal,
unstyled example of reading application data (in this case, the users
better-auth persisted) through the existing tRPC setup.

## Project structure

```text
app/
├── api/
│   ├── auth/[...all]/ # better-auth catch-all route handler
│   └── trpc/[trpc]/   # tRPC HTTP handler
├── login/              # Login page
├── register/           # Registration page
├── users/               # Plain list of registered users (tRPC demo)
├── layout.tsx           # Root layout and providers
└── page.tsx             # Landing page
src/
├── client/
│   ├── auth/         # better-auth React client
│   ├── common/       # Client utilities and enums
│   ├── components/   # Reusable UI components (atoms/molecules/organisms)
│   └── trpc/         # tRPC and TanStack Query setup
├── server/
│   ├── db/
│   │   ├── client.ts    # Drizzle/postgres client
│   │   ├── schema.ts    # Combined Drizzle schema
│   │   ├── tables/      # All Drizzle table definitions
│   │   └── migrations/  # Versioned SQL migrations
│   ├── modules/  # Feature services, repositories, and routers
│   ├── trpc/     # Server-side tRPC configuration
│   └── utils/    # Server-side utilities
└── shared/
    └── modules/  # Types, schemas, and enums shared across boundaries
```

The server follows a feature-oriented layered structure: tRPC routers handle
transport concerns, services contain business logic, and repositories own
database access. Shared request types and schemas keep validation consistent
between the browser and server. All Drizzle table definitions live in
`src/server/db/tables` so the full database shape is discoverable from one
place instead of being scattered across feature modules.

## Available scripts

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Start the development server                 |
| `npm run build`       | Create a production build                    |
| `npm run start`       | Start the production server                  |
| `npm run lint`        | Run ESLint                                   |
| `npm run lint:fix`    | Fix automatically resolvable ESLint issues   |
| `npm run lint:editor` | Check EditorConfig compliance                |
| `npm run lint:files`  | Check file and directory naming              |
| `npm run lint:unused` | Find unused files, exports, and dependencies |
| `npm run lint:format` | Check formatting with Prettier               |
| `npm run db:generate` | Generate a migration from schema changes     |
| `npm run db:migrate`  | Apply pending database migrations            |
| `npm run db:studio`   | Open Drizzle Studio                          |

## Database workflow

Drizzle table definitions live in `src/server/db/tables`. After changing a
table definition, generate and review a migration before applying it:

```bash
npm run db:generate
npm run db:migrate
```

Generate migrations with a descriptive name so history stays readable:

```bash
npx drizzle-kit generate --name=add_something_table
```

Generated SQL and migration metadata are stored in `src/server/db/migrations`.

## Code quality and commits

The pre-commit hook runs the configured checks against staged changes. Commit
messages are validated against Conventional Commits and must include an allowed
scope and an issue reference. For example:

```text
feat(auth): add login mutation IP-7
```

Allowed types, scopes, and issue prefixes are defined in `project.config.mjs`.

Before opening a pull request, run at least:

```bash
npm run lint
npm run lint:format
npm run lint:unused
npm run build
```

## License

Distributed under the [MIT License](LICENSE).
