THIS IS AN AI GENERATED PROJECT PLAN THAT WAS USED TO START THIS PROJECT - NOT UPDATED OR RELEVANT.

# Prebuilt PC Recommendation Platform — Project Plan

---

## Concept

Users complete a conversational questionnaire. Answers are translated into a RequirementsProfile — a structured set of minimum specs. That profile is run against a database of real prebuilt systems, filtered hard against requirements, then ranked by weighted scoring. The result is a short list of real, purchasable machines that fit the user's needs.

Parts (CPUs, GPUs, RAM, storage) live in the database to enrich system records — not to be recommended directly. This allows filtering systems by specs like "has at least 24GB VRAM" by referencing what GPU is inside that system.

CPU passmark scores are obtained from passmark.com
---

## Stack

| Layer | Tool |
|---|---|
| Backend framework | Hono |
| ORM + Migrations | Prisma |
| Database | PostgreSQL (Neon) |
| Language | TypeScript |
| Frontend | Next.js |
| Frontend hosting | Vercel |
| Backend hosting | Railway or Render |

---

## Database Schema

### Lean Philosophy
Every field must serve one of two purposes:
1. The recommendation engine filters or ranks by it, OR
2. The user sees it on a results/detail page

If neither, leave it out until there is a concrete reason to add it.

---

### Reference Tables (Parts Catalog)

#### manufacturers ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key, auto-increment |
| name | String | Unique |
| website | String? | Optional |
| createdAt | DateTime | Auto-set |

#### cpus ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| manufacturerId | Int | Foreign key → manufacturers |
| name | String | |
| passmarkScore | Int? | Primary performance signal |
| eccSupport | Boolean | Default false |
| integratedGraphics | Boolean | Default false |
| tdpWatts | Int? | Relevant for laptops |
| createdAt | DateTime | Auto-set |

#### gpus ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| manufacturerId | Int | Foreign key → manufacturers |
| name | String | |
| vramGb | Int | Critical for AI workloads |
| passmarkScore | Int? | Performance signal |
| tdpWatts | Int? | |
| isIntegrated | Boolean | Default false |
| createdAt | DateTime | Auto-set |

#### ram_configs ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| capacityGb | Int | |
| type | String | DDR4, DDR5, LPDDR5, etc |
| eccSupport | Boolean | Default false |
| createdAt | DateTime | Auto-set |

#### storage_configs ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| capacityGb | Int | |
| type | String | NVMe, SSD, HDD |
| createdAt | DateTime | Auto-set |

---

### System Tables (Actual Products)

#### systems ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| manufacturerId | Int | Foreign key → manufacturers |
| name | String | Product name |
| category | String | desktop, laptop, mini_pc, workstation |
| priceUsd | Float | Current price |
| releaseYear | Int? | |
| url | String? | Product page link |
| active | Boolean | Default true, false if discontinued |
| createdAt | DateTime | Auto-set |

#### system_cpus ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| systemId | Int | Foreign key → systems |
| cpuId | Int | Foreign key → cpus |

#### system_gpus ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| systemId | Int | Foreign key → systems |
| gpuId | Int | Foreign key → gpus |

#### system_ram ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| systemId | Int | Foreign key → systems |
| ramConfigId | Int | Foreign key → ram_configs |

#### system_storage ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| systemId | Int | Foreign key → systems |
| storageConfigId | Int | Foreign key → storage_configs |

---

### Score Tables

#### cpu_scores ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| cpuId | Int | Foreign key → cpus |
| gamingScore | Int? | Opinionated, derived |
| productivityScore | Int? | |
| developmentScore | Int? | |
| cadScore | Int? | |

#### gpu_scores ✅ Built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| gpuId | Int | Foreign key → gpus |
| gamingScore | Int? | |
| aiComputeScore | Int? | |

---

### Questionnaire Tables (Design Now, Build Later)

#### questions ⬜ Not built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| displayText | String | What the user sees |
| requirementsField | String | Which RequirementsProfile field this maps to |
| order | Int | Display order |

#### question_options ⬜ Not built
| Field | Type | Notes |
|---|---|---|
| id | Int | Primary key |
| questionId | Int | Foreign key → questions |
| displayText | String | Answer option label |
| value | String | The value contributed to RequirementsProfile |

---

## RequirementsProfile Structure

```typescript
{
  category: "desktop" | "laptop" | "mini_pc" | "workstation" | null,
  minRamGb: number | null,
  minVramGb: number | null,
  minCpuScore: number | null,
  minStorageGb: number | null,
  eccRequired: boolean,
  integratedGraphicsOk: boolean,
  maxPriceUsd: number | null,
  portabilityImportant: boolean,
  localAiWorkloads: boolean,
  longevityYears: number | null
}
```

---

✅ Built

## Recommendation Engine Logic

1. Hard filters — eliminate any system that fails a minimum requirement
2. Weighted scoring — rank remaining systems by performance relative to requirements
3. Return top N results sorted by score

The engine is implemented as pure TypeScript functions — data in, ranked results out. No database calls inside the engine itself, making it independently testable.

---

## CSS

### Colors
  - Background: #1C1F24
  - Panel: #262A31
  - Hairline: #383D46
  - Text Primary: #EDEBE6
  - Text Muted: #9AA0AA
  - Accent Copper: #B8663A
  - Accent Teal: #4FA8A6

### Fonts
  - Space Grotesk (Headings)
  - IBM Plex Sans (Body)
  - IBM Plex Mono (PC Specs)


## Phased Roadmap

### Phase 1 — Complete Database Schema
- [x] manufacturers table
- [x] cpus table
- [x] gpus table
- [x] ram_configs table
- [x] storage_configs table
- [x] systems table
- [x] system_cpus join table
- [x] system_gpus join table
- [x] system_ram join table
- [x] system_storage join table
- [x] cpu_scores table
- [x] gpu_scores table
- [x] questions table
- [x] question_options table
- [x] Run migration on Neon

### Phase 2 — Seed Data
- [x] Enter 20–30 real prebuilt systems with accurate specs
- [x] Cover all categories: desktop, laptop, mini PC, workstation
- [x] Enough data to make recommendation engine testable

### Phase 3 — Hono API
- [x] GET /systems — filtered list based on query params
- [x] POST /recommend — accepts RequirementsProfile, returns ranxed systems
- [x] GET /systems/:id — full detail on one system
- [x] Basic CRUD routes for manufacturers, CPUs, GPUs (for data entry)

### Phase 4 — Recommendation Engine
- [x] Hard filter logic
- [x] Weighted scoring logic
- [x] Unit tests for engine functions

### Phase 5 — Next.js Frontend
- [x] Buzzfeed-style questionnaire flow (one question at a time)
- [x] RequirementsProfile assembly from answers
- [x] API integration
- [x] Results page with matched systems
- [x] System detail page

### Phase 6 — Polish and Deployment
- [ ] Vercel deployment (frontend)
- [ ] Railway or Render deployment (backend)
- [ ] Affiliate / product links (optional, future)
- [ ] Web scraping or third-party API for data (optional, future)

---

## Current Status

Currently at: **Phase 5.5 — completing CSS/Design pass**

