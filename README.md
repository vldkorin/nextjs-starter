# Next.js Starter

A production-oriented full-stack starter for building type-safe applications
with Next.js. It provides a modular project structure, a tRPC API, PostgreSQL
persistence, shared validation, and a complete user registration flow.

## Features

- Next.js App Router with React and TypeScript
- End-to-end type-safe API powered by tRPC
- PostgreSQL persistence with Drizzle ORM and versioned migrations
- Client-side server state management with TanStack Query
- Forms built with TanStack Form and shared Zod validation
- User registration with duplicate email protection
- Password hashing with bcrypt and JWT creation with JOSE
- Reusable client components styled with Tailwind CSS
- ESLint, Prettier, Knip, ls-lint, EditorConfig, Husky, and Commitlint

## Tech stack

| Area                     | Technology                                |
| ------------------------ | ----------------------------------------- |
| Framework                | Next.js 16, React 19, TypeScript          |
| API                      | tRPC 11, SuperJSON                        |
| Database                 | PostgreSQL, Drizzle ORM                   |
| Forms and validation     | TanStack Form, Zod                        |
| Data fetching            | TanStack Query                            |
| Authentication utilities | bcryptjs, JOSE                            |
| Styling                  | Tailwind CSS 4                            |
| Code quality             | ESLint, Prettier, Knip, Husky, Commitlint |

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm
- A running PostgreSQL instance

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

HASH_SALT_ROUNDS=10

JWT_ALGORITHM=HS256
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRATION_TIME=7d
```

All variables are validated at startup in `env.config.ts`. The application
will fail fast if a required value is missing or invalid.

> Do not commit `.env` files or use the example JWT secret in production.

### 3. Apply database migrations

Create the database specified by `DB_NAME`, then run:

```bash
npm run db:migrate
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The registration example
is available at [http://localhost:3000/register](http://localhost:3000/register).

## How registration works

1. TanStack Form validates the input with the shared Zod schema.
2. The client calls the `auth.register` tRPC mutation.
3. The users service checks whether the normalized email already exists.
4. The password is hashed with bcrypt and the user is saved to PostgreSQL.
5. The API returns the public user data and a signed JWT.

The demo registration page displays the returned token so the complete flow is
easy to verify. A production application should store and transmit tokens using
an authentication strategy appropriate to its threat model, such as secure,
HTTP-only cookies.

## Project structure

```text
app/
├── api/trpc/[trpc]/   # tRPC HTTP handler
├── register/          # Registration page
├── layout.tsx         # Root layout and providers
└── page.tsx           # Landing page
src/
├── client/
│   ├── common/        # Client utilities and enums
│   ├── components/    # Reusable UI components
│   └── trpc/          # tRPC and TanStack Query setup
├── server/
│   ├── db/            # Database client, schema, and migrations
│   ├── modules/       # Feature services, repositories, routers, and tables
│   ├── trpc/          # Server-side tRPC configuration
│   └── utils/         # Hashing and token utilities
└── shared/
    └── modules/       # Types, schemas, and enums shared across boundaries
```

The server follows a feature-oriented layered structure: tRPC routers handle
transport concerns, services contain business logic, and repositories own
database access. Shared request types and schemas keep validation consistent
between the browser and server.

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

Drizzle table definitions live alongside their server modules in
`src/server/modules/**/tables`. After changing a table definition, generate and
review a migration before applying it:

```bash
npm run db:generate
npm run db:migrate
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
