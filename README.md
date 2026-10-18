# SkillSaathi Frontend

> **AI-Powered Vocational Career Counselling Platform for Students and Parents in India**

SkillSaathi is a career guidance platform designed to bridge the awareness and aspiration gap between Indian secondary/higher secondary students, parents, and vocational/technical careers. By facilitating joint family counselling, clarifying accredited NSQF/NCVET pathways, and highlighting tangible economic outcomes, SkillSaathi empowers families to make confident, informed career decisions beyond traditional rote academics.

---

## Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool & Dev Server**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode configured)
- **Code Quality & Linting**: [ESLint](https://eslint.org/) (Flat config with `@eslint/js`, `typescript-eslint`, and React hooks rules)
- **Styling**: Standard Vanilla CSS with custom design tokens and CSS variables
- **Package Manager**: [npm](https://www.npmjs.com/)

---

## Architecture & Project Structure

The codebase is organized modularly to enable seamless future feature expansion, separation of concerns, and clean transition from mock data to live backend services:

```text
src/
├── app/                      # Application entry, core layout, routing definitions
│   ├── App.tsx               # Root application component
│   └── routes.ts             # Central route constants and definitions
├── components/               # Reusable UI component library
│   ├── common/               # Shared atomic components (buttons, badges, inputs)
│   └── layout/               # App layout components (header, sidebar, footer)
├── features/                 # Domain-driven feature modules
│   ├── onboarding/           # Student and parent profile setup
│   ├── courses/              # Vocational course discovery and search
│   ├── counselling/          # AI-assisted joint counselling chat interface
│   ├── career-pathways/      # Visual career progression maps and NCrF credit bridges
│   ├── counsellor-support/   # Human counselor escalation and booking
│   └── admin-dashboard/      # Analytics, partner institute management, insights
├── services/                 # Data layer and external services
│   ├── api/
│   │   ├── client.ts         # Lightweight, type-safe API client foundation
│   │   └── endpoints.ts      # Centralized REST API endpoint definitions
│   ├── counselling/          # Counselling service adapters
│   ├── courses/              # Course listing and query services
│   └── mocks/                # Local demonstration data
│       ├── courses.ts        # Sample vocational training courses across India
│       ├── counselling.ts    # Realistic family counselling dialogue and suggestions
│       └── analytics.ts      # Platform metrics and consensus tracking data
├── types/                    # Shared TypeScript interfaces and contracts
│   ├── common.ts             # Standard API envelopes and shared primitives
│   ├── course.ts             # Course, eligibility, and vocational stream definitions
│   ├── counselling.ts        # Chat messages, family profiles, recommendations
│   └── analytics.ts          # Aggregate performance and concern metrics
├── hooks/                    # Reusable React custom hooks
├── utils/                    # Helper functions and formatters
├── styles/                   # Global style definitions and design system variables
│   └── globals.css           # Global reset, typography, and theme tokens
├── main.tsx                  # Application bootstrap / DOM mounting
└── vite-env.d.ts             # Vite client and environment type definitions
public/
└── images/                   # Static media assets and imagery
```

---

## Current Phase: Mock Data & Future Backend Integration

> [!NOTE]
> **Application Status**: The platform is currently configured with local mock data located in `src/services/mocks/`. No external network requests, databases, or third-party AI services are active in this foundation stage.

### Future Backend & AI Integration
The data access layer has been pre-architected with `src/services/api/client.ts` and `src/services/api/endpoints.ts`. When backend APIs (FastAPI/Node.js) and AI services (counselling assistants, recommendation models) are deployed, the service modules can switch from mock imports to `apiClient` requests without rewriting UI components or data schemas.

---

## Environment Variables & Security Notice

The application uses Vite environment variables for configuration.

### Setup Local Environment
Copy the `.env.example` template to `.env.local`:

```bash
cp .env.example .env.local
```

### Critical Security Rule
> [!CAUTION]
> In Vite, all environment variables prefixed with `VITE_` (such as `VITE_API_BASE_URL`) are embedded directly into the public client-side JavaScript bundle during build.
> **Never store private API keys, database credentials, server secrets, or private tokens in frontend `.env` files.**

---

## Prerequisites

- **Node.js**: v18.0.0 or later (v20+ / v22+ / v24+ recommended)
- **npm**: v9.0.0 or later

Verify your local versions:
```bash
node -v
npm -v
```

---

## Installation & Setup

1. **Clone the repository** (if not already local):
   ```bash
   git clone <repository-url>
   cd sih-2026-career-guide
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```

---

## Available Scripts

### Development Server
Starts the Vite local development server with hot-module replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting
Checks code style and TypeScript rules using ESLint:
```bash
npm run lint
```

### Production Build
Type-checks the application via TypeScript (`tsc -b`) and bundles production-ready static assets to `dist/`:
```bash
npm run build
```

### Preview Production Build
Starts a local static web server to preview the contents of `dist/`:
```bash
npm run preview
```

---

## Code Quality & Standards

- **Strict TypeScript**: `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters` are strictly enforced.
- **Separation of Concerns**: UI components remain pure and decouple presentation from network/mock data logic.
- **Accessibility & Responsiveness**: Mobile-first, semantic HTML designed for inclusive access across varied devices in Indian urban and rural contexts.