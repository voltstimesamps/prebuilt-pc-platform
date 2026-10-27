# Prebuilt PC Platform

A full-stack web application that helps users find a suitable prebuilt PC through a guided questionnaire and recommendation engine.

The project is organized as a Next.js frontend and a Hono-powered backend, with PostgreSQL and Prisma providing persistent storage.

## Live Demo

[Open the deployed application](https://prebuilt-pc-platform.vercel.app)

## Features

- Guided questionnaire for collecting a user's PC requirements
- Prebuilt PC recommendations based on questionnaire responses
- Backend recommendation engine for matching and ranking systems
- PostgreSQL database integration through Prisma
- API routes for managing PC data and recommendations
- Admin-protected write operations using a bearer token
- Separate frontend and backend services configured for Vercel
- Automated tests for the recommendation engine

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- TypeScript
- Tailwind CSS 4
- ESLint

### Backend

- [Hono](https://hono.dev/)
- Node.js 22 or newer
- TypeScript
- [Prisma](https://www.prisma.io/)
- PostgreSQL
- Vitest
- esbuild

## Project Structure

```text
.
├── backend/
│   ├── prisma/          # Prisma schema, migrations, seeds, and import utilities
│   └── src/             # API server, routes, authentication, and recommendation engine
├── frontend/
│   └── src/
│       ├── app/         # Next.js routes and pages
│       ├── components/  # Shared UI components
│       └── lib/         # Frontend utilities and API helpers
├── docs/                # Project documentation
└── vercel.json          # Vercel multi-service deployment configuration
```

## Prerequisites

- Node.js 22 or newer
- npm
- A PostgreSQL database
- An admin API token for protected backend operations

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/voltstimesamps/prebuilt-pc-platform.git
cd prebuilt-pc-platform
```

### 2. Install dependencies

Install dependencies for both services:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Configure environment variables

Create a local environment file for the backend. The backend includes an example configuration at `backend/.env.example`.

```bash
cp backend/.env.example backend/.env.local
```

Configure the following values:

```dotenv
DATABASE_URL=your-postgresql-connection-string
ADMIN_API_TOKEN=your-admin-token
ALLOWED_ORIGINS=http://localhost:3000
```

`ADMIN_API_TOKEN` should be at least 32 characters long and must never be exposed to the frontend.

### 4. Set up the database

From the `backend` directory, apply migrations and optionally seed the database:

```bash
npm run migrate:deploy
npm run db:seed
```

### 5. Start the development servers

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The root route redirects users to the questionnaire.

## Available Scripts

### Frontend

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

### Backend

Run these commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API server in development mode |
| `npm run build` | Generate Prisma client and build the backend |
| `npm run start` | Start the production API server |
| `npm test` | Run the Vitest test suite |
| `npm run migrate:deploy` | Apply pending Prisma migrations |
| `npm run db:seed` | Seed the database |
| `npm run db:xlsx` | Convert spreadsheet data for import |
| `npm run db:import` | Import PC data into the database |
| `npm run db:import:dry` | Preview an import without changing the database |

## API and Deployment

Vercel is configured to run the project as two services:

- `frontend/` is deployed as a Next.js application.
- `backend/` is deployed as a Hono service.
- Requests to `/api/*` are rewritten to the backend.
- Other application routes are served by the frontend.

For production deployments, configure `DATABASE_URL`, `ADMIN_API_TOKEN`, and `ALLOWED_ORIGINS` in the deployment environment. When using Neon or another hosted PostgreSQL provider, use the pooled connection host where appropriate.

## Testing

Run the backend tests with:

```bash
cd backend
npm test
```

The recommendation engine tests cover the logic used to evaluate and rank prebuilt PC systems.

## Contributing

1. Create a feature branch.
2. Make your changes in the relevant frontend or backend directory.
3. Run linting, tests, and production builds before submitting changes.
4. Open a pull request with a clear description of the change.

## Security

- Do not commit `.env` files, database credentials, or admin tokens.
- Keep `ADMIN_API_TOKEN` exclusively on the backend.
- Use restrictive values for `ALLOWED_ORIGINS` in production.
- Review database imports and migrations before applying them to production.

## License

This project does not currently declare a repository license.
