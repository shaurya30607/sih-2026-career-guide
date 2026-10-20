# SkillSaathi — FastAPI Backend & Family Consensus Engine

**Problem Statement:** SIH26241  
**Platform:** AI-Enabled Career Counselling & Family Decision-Support for Vocational Education  
**Milestone:** 1 (Working FastAPI Backend + Deterministic Family Consensus Engine)

---

## 1. Overview

The `backend` service provides a standalone, type-safe REST API powered by **FastAPI**, **Pydantic v2**, and **SQLAlchemy** with persistent local SQLite storage.

### Milestone 1 Status & Capabilities:
- **Active / Implemented**:
  - `GET /api/health` — System status, database health, and development mode indicator.
  - `POST /api/families` — Create persistent family counselling sessions.
  - `POST /api/families/{family_id}/student` — Intake student aspirations, education level, preferred duration, and trade interests.
  - `POST /api/families/{family_id}/parent` — Intake parental concerns (stability, financial ceiling, degree progression, location).
  - `GET /api/courses` — Structured demonstration vocational options with eligibility and fee filters.
  - `POST /api/families/{family_id}/analyze` — Deterministic **Family Consensus Intelligence** comparing student and parent priorities to identify shared values, explicit disagreements, multi-criteria ranked vocational pathways, trade-offs, and actionable family discussion steps.
  - `GET /api/families/{family_id}/summary` — Persistent summary retrieval.
- **Planned for Milestone 2**:
  - Live NCVET/NCS government API data synchronization.
  - Large language model (LLM) grounded dialogue and automated vernacular speech synthesis.
  - Real-time district-level wage survey feeds.

---

## 2. Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py              # Environment configuration & CORS
│   ├── database.py            # SQLAlchemy engine & session factory
│   ├── models.py              # SQLite ORM models (sessions, courses)
│   ├── schemas.py             # Pydantic v2 validation models
│   ├── demo_courses_data.py   # Curated demonstration vocational datasets
│   ├── consensus_engine.py    # Family Consensus Intelligence Engine
│   ├── routes.py              # REST API route handlers
│   └── main.py                # FastAPI app entry point & lifespan seeder
├── tests/
│   ├── __init__.py
│   └── test_api.py            # Automated pytest test suite
├── .env.example               # Environment variables template
├── requirements.txt           # Python dependencies
└── README.md                  # This documentation
```

---

## 3. Quickstart & Local Setup

### Prerequisites
- Python 3.10+ (Tested on Python 3.12)
- Virtual environment (`.venv`)

### Installation
From the project root:
```bash
# Install backend dependencies
.venv/bin/pip install -r backend/requirements.txt
```

### Running the Server
```bash
# Run FastAPI server on port 8000 with auto-reload
PYTHONPATH=. .venv/bin/uvicorn backend.app.main:app --reload --port 8000
```
Interactive Swagger API documentation will be available at:
`http://localhost:8000/docs`

---

## 4. Running Automated Tests

Run the full automated test suite covering session creation, profile intake, missing data guards, disagreement detection, trade-offs, and course filtering:

```bash
PYTHONPATH=. .venv/bin/pytest backend/tests/ -v
```

---

## 5. API Reference & Sample Flows

### 1. Health Check
```http
GET /api/health
```
**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "SkillSaathi Family Consensus API",
  "version": "0.1.0",
  "database": "connected",
  "mode": "development",
  "disclaimer": "Local prototype with demonstration datasets. Government API integration planned for Milestone 2."
}
```

### 2. Create Family Session
```http
POST /api/families
Content-Type: application/json

{
  "family_name": "Verma Family",
  "language": "en",
  "district": "Pune",
  "state": "Maharashtra"
}
```

### 3. Submit Student Profile
```http
POST /api/families/{family_id}/student
Content-Type: application/json

{
  "student_name": "Rahul Verma",
  "age": 17,
  "education_level": "10th_pass",
  "career_interests": ["renewable_energy", "automotive"],
  "hands_on_activities": ["building_fixing", "electricity_energy"],
  "preferred_duration_months": 6,
  "preferred_location": "Pune",
  "pre_confidence_score": 6.0
}
```

### 4. Submit Parent Profile
```http
POST /api/families/{family_id}/parent
Content-Type: application/json

{
  "parent_name": "Ramesh Verma",
  "primary_concerns": ["job_security", "social_respect", "degree_progression"],
  "max_total_fees_inr": 15000,
  "preferred_streams": ["manufacturing_engineering"],
  "location_preference": "Pune",
  "degree_continuation_important": true,
  "pre_confidence_score": 5.0
}
```

### 5. Run Family Consensus Analysis
```http
POST /api/families/{family_id}/analyze
```
**Returns:**
- `shared_strengths`: Areas where student and parent naturally align (e.g. government certification, practical skills launch).
- `identified_disagreements`: Explicit differences (e.g. IT/Renewable vs Manufacturing; course fees exceeding parent limit; degree equivalency worries) with constructive resolution pathways.
- `top_pathway_recommendations`: Ranked courses with dual-persona rationales and trade-offs.
- `discussion_guide`: Structured conversation steps for family dialogue.
- `disclaimer`: Clearly labels demonstration data.

### 6. Retrieve Summary
```http
GET /api/families/{family_id}/summary
```
Returns the stored consensus summary from persistent SQLite storage.
