# SkillSaathi

> **AI-Powered Vocational Career Counselling & Family Decision-Support Platform for Students and Parents in India**  
> **Smart India Hackathon (SIH 2026) — Problem Statement SIH26241**

SkillSaathi is a career guidance platform designed to bridge the awareness and aspiration gap between Indian secondary/higher-secondary students, parents, and vocational/technical careers. By facilitating joint family counselling, clarifying accredited NSQF/NCVET pathways, detecting parent-student expectation mismatches, and highlighting tangible economic outcomes, SkillSaathi empowers families to make confident, informed career decisions beyond traditional rote academics.

---

## Technology Stack

### Frontend
- **Framework**: [React 18](https://react.dev/)
- **Build Tool & Dev Server**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode configured)
- **Styling**: Vanilla CSS with custom design tokens and CSS variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **i18n**: Built-in Trilingual Support (**English**, **हिंदी**, **मराठी**)
- **Linting**: [ESLint](https://eslint.org/) (Flat config with `@eslint/js`, `typescript-eslint`, React hooks rules)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Data Validation & Schemas**: [Pydantic v2](https://docs.pydantic.dev/)
- **Database & ORM**: [SQLAlchemy](https://www.sqlalchemy.org/) with persistent SQLite (`skillsaathi.db`)
- **Intelligence Engine**: Custom deterministic **Family Consensus Intelligence Engine**
- **AI Integration**: Grounded Google Gemini LLM adapter with safe automatic fallback to deterministic rules
- **Server**: [Uvicorn](https://www.uvicorn.org/) ASGI server
- **Testing**: [pytest](https://docs.pytest.org/) & HTTPX `TestClient`

---

## Repository Structure

```text
.
├── backend/                  # FastAPI REST API & Consensus Intelligence Service
│   ├── app/
│   │   ├── main.py           # FastAPI application entry, CORS, lifespan & seeder
│   │   ├── routes.py         # REST API routes (/api and /api/v1)
│   │   ├── config.py         # App configuration & environment settings
│   │   ├── database.py       # SQLAlchemy engine & session factory
│   │   ├── models.py         # ORM database models (Family, Student, Parent, Course)
│   │   ├── schemas.py        # Pydantic v2 request/response schemas
│   │   ├── consensus_engine.py # Deterministic Family Consensus Intelligence Engine
│   │   ├── ai_counsellor.py  # Grounded Gemini LLM adapter with safe fallback
│   │   └── demo_courses_data.py # Curated Maharashtra district ITI/vocational dataset
│   ├── tests/                # Automated pytest test suites (20+ test scenarios)
│   │   ├── conftest.py       # Test fixtures and SQLite in-memory test engine
│   │   ├── test_api.py       # API endpoints, session creation & intake tests
│   │   ├── test_consensus_ai.py # Consensus scoring, trade-off & fallback tests
│   │   └── test_hyperlocal_and_analytics.py # District filtering & privacy tests
│   ├── requirements.txt      # Python backend dependencies
│   ├── run.py                # Local server runner
│   └── README.md             # Dedicated backend documentation
│
├── src/                      # React 18 / TypeScript Frontend Application
│   ├── app/                  # Application bootstrap, navigation, routing & layout
│   │   ├── App.tsx           # Root UI component
│   │   ├── HomeScreen.tsx    # Landing page & core feature gateways
│   │   └── routes.ts         # Central route definitions
│   ├── components/           # Reusable UI component library (atomic & layout)
│   ├── features/             # Domain-driven feature modules
│   │   ├── onboarding/       # Student and parent profile intake
│   │   ├── courses/          # Hyperlocal vocational course explorer & filters
│   │   ├── counselling/      # Family Consensus assessment & side-by-side trade-offs
│   │   ├── career-pathways/  # Visual NSQF/NCrF progression pathways
│   │   ├── counsellor-support/ # Human counselor escalation & triage forms
│   │   └── admin-dashboard/  # Telemetry, resistance analytics & privacy suppression
│   ├── i18n/                 # Localization dictionaries (EN, HI, MR)
│   ├── services/             # API client, course queries & family consensus adapters
│   │   ├── api/              # Type-safe client.ts and REST endpoints.ts
│   │   └── mocks/            # Fallback local demonstration datasets
│   ├── styles/               # Global CSS tokens and design system variables
│   └── types/                # Shared TypeScript contracts and interfaces
│
├── docs/                     # Architectural documentation
│   └── PPT_WEBSITE_ALIGNMENT.md # Pitch deck claim-to-code verification matrix
└── public/                   # Static assets & images
```

---

## Key Backend Capabilities

1. **Family Consensus Intelligence Engine (`consensus_engine.py`)**:
   - Compares student career aspirations against parental concerns (job security, social respect, financial ceilings, degree progression, relocation).
   - Identifies shared priorities, explicitly flags disagreements, and computes a readiness score.
   - Generates side-by-side pathway comparisons (Pathway A vs Pathway B) with plain-language household affordability explanations and unknown-value disclaimers.

2. **Grounded AI Adapter with Fallback (`ai_counsellor.py`)**:
   - Dual-mode architecture: When `GEMINI_API_KEY` is provided, enhances counseling explanations via Google Gemini.
   - When key is absent or on network timeout, seamlessly falls back to deterministic rule-based analysis without degrading user experience.

3. **Hyperlocal District Course Catalog (`demo_courses_data.py`)**:
   - Seeded with verified vocational courses across Maharashtra districts (Pune, Nashik, Chhatrapati Sambhajinagar, Nagpur, Mumbai Suburban).
   - Filterable by district, state, stream, minimum education, and fee caps.

4. **Privacy-Preserving Telemetry & Triage**:
   - Small-group privacy masking ($n < 5$ suppressed) on parental resistance telemetry to comply with data protection principles.
   - Counselor escalation ticketing assigning persistent IDs for offline ITI guidance staff follow-ups.

---

## REST API Overview

All routes are available under both `/api` and `/api/v1`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & system status |
| `POST` | `/api/families` | Initialize persistent family counseling session |
| `POST` | `/api/families/{id}/student` | Submit student profile & pre-counseling confidence |
| `POST` | `/api/families/{id}/parent` | Submit parent concerns & budget ceiling |
| `POST` | `/api/families/{id}/analyze` | Run consensus engine and generate pathway trade-offs |
| `GET` | `/api/families/{id}/summary` | Retrieve persistent joint decision summary |
| `POST` | `/api/families/{id}/confidence` | Record post-counseling confidence & compute genuine delta |
| `GET` | `/api/courses` | Hyperlocal course search with district, stream & fee filters |
| `POST` | `/api/counsellor/request` | Submit human counselor triage escalation ticket |
| `GET` | `/api/analytics/overview` | Platform telemetry & session metrics |
| `GET` | `/api/analytics/resistance` | Aggregated parental resistance root causes (privacy-masked) |

Interactive Swagger documentation is accessible at `http://localhost:8000/docs`.

---

## Quickstart: Running the Complete Project

### Prerequisites
- **Node.js**: v18+ (tested with npm)
- **Python**: 3.10+ (tested with Python 3.10–3.12)

---

### 1. Start the Backend Server (Terminal 1)

```bash
# 1. Create and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 2. Install backend dependencies
pip install -r backend/requirements.txt

# 3. (Optional) Configure environment variables
cp backend/.env.example backend/.env
# Optionally set GEMINI_API_KEY=your_key_here in backend/.env

# 4. Start the FastAPI server
python backend/run.py
```
- Server starts at: `http://127.0.0.1:8000`
- Swagger UI: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/api/health`

---

### 2. Start the Frontend App (Terminal 2)

```bash
# 1. Install frontend dependencies
npm install

# 2. Start the Vite development server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## Testing & Quality Assurance

### Run Frontend Typecheck & Build
```bash
npm run build
```

### Run Frontend Linter
```bash
npm run lint
```

### Run Backend Automated Test Suite
From the repository root with virtual environment activated:
```bash
PYTHONPATH=. pytest backend/tests/ -v
```

The automated test suite verifies:
- `test_api.py`: Session creation, profile intake, missing data validation, course catalog queries, and counselor escalation.
- `test_consensus_ai.py`: Multi-criteria scoring, explicit disagreement detection, fallback safety, and trade-off comparisons.
- `test_hyperlocal_and_analytics.py`: District-level filtering, fee ceiling compliance, and small-cohort privacy suppression.

---

## Environment Variables & Security

### Backend (`backend/.env`)
- `DATABASE_URL`: Database connection string (defaults to `sqlite:///./skillsaathi.db`).
- `CORS_ORIGINS`: Allowed origins (e.g. `http://localhost:5173,http://localhost:3000`).
- `GEMINI_API_KEY`: *(Optional)* API key for live Gemini AI counselling enhancements.
- `LLM_TIMEOUT_SECONDS`: Maximum timeout for external LLM calls (defaults to `5.0`s).

### Frontend (`.env.local`)
- `VITE_API_BASE_URL`: Base URL for backend API calls (e.g. `http://localhost:8000/api/v1`).

> [!CAUTION]
> In Vite, variables prefixed with `VITE_` are bundled into client-side JavaScript. Never put secret keys or server credentials in frontend `.env` files. Private keys like `GEMINI_API_KEY` belong strictly in `backend/.env`.
