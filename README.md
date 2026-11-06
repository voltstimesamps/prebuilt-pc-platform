# Prebuilt PC Platform
A website (and maybe more) to help people find their next computer.

## Features
- Buzzfeed-style questionnaire that outputs computer recommendations
- Direct spec search for computers

## Tech Stack
| Tool | Layer |
| ------ | ----- |
| Next.js | React Frontend Framework | 
| Tailwind CSS | Style |
| Hono | Backend Framework |
| Neon | Database Hosting |
| Prisma | Database Schema + ORM |
| Vitest | Tests |
| Vercel | Hosting |
| TypeScript | Language |

## Project Structure
```
├── backend
│  ├── .env.example
│  ├── package.json
│  ├── prisma
│  │  ├── import.ts
│  │  ├── migrations
│  │  ├── schema.prisma
│  │  └── seed.ts
│  ├── prisma.config.ts
│  └── src
│     ├── auth.ts
│     ├── database.ts
│     ├── engine.test.ts
│     ├── engine.ts
│     ├── index.ts
│     ├── params.ts
│     └── routes            # API endpoints
├── docs 
│  ├── prebuilt-pc-platform-plan.md
│  ├── ERD.md
│  └── tree.txt
├── frontend
│  ├── package.json
│  └── src
│     ├── app               # website pages
│     │  ├── globals.css
│     │  ├── layout.tsx
│     │  ├── page.tsx
│     │  ├── questionnaire 
│     │  ├── results
│     │  ├── filter
│     │  └── systems
│     │    ├── [id]
│     │    │  ├── error.tsx
│     │    │  ├── loading.tsx
│     │    │  ├── not-found.tsx
│     │    │  └── page.tsx
│     │    └── ImageCarousel.tsx
│     ├── components
│     │  └── questionnaire  # one component per questionnaire page
│     └── lib               # types, shared helpers, frontend to backend converters
│       ├── aggregation.ts
│       ├── api.ts
│       ├── Guidance.tsx    # formatting for guided questionnaire
│       ├── steps.ts
│       ├── tiles.ts
│       └── types.ts
├── README.md
└── vercel.json
```

## Database Schema
See the [database tree](docs/ERD.md)

