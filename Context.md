# Fantasy Football Scheduler UI — Project Context

## Purpose

This is a **React frontend** for the Fantasy Football Scheduler API. It provides league commissioners with a visual interface to:

- Configure league parameters (team count, season length)
- Define rival matchups (manual entry or auto-assignment)
- Designate a specific "rival week" when rivals face each other
- Generate optimized schedules via a backend API
- View and analyze results in multiple formats

The UI communicates with a backend API (expected at `http://localhost:8000` by default) that handles the actual schedule generation logic.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Application                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ Scheduler   │  │ ResultsView │  │ SettingsDialog  │   │  │
│  │  │ (Layout)    │  │ (Display)   │  │ (Config)        │   │  │
│  │  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘   │  │
│  │         │                │                   │            │  │
│  │         └────────────────┼───────────────────┘            │  │
│  │                          │                                │  │
│  │                    ┌─────▼─────┐                          │  │
│  │                    │  lib/api  │  (Axios client)          │  │
│  │                    └─────┬─────┘                          │  │
│  └──────────────────────────┼────────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │ HTTP (REST)
                              ▼
                    ┌─────────────────┐
                    │  Scheduler API  │
                    │  (Docker)       │
                    │  :8000          │
                    └─────────────────┘
```

### Data Flow

1. User configures schedule parameters in `ScheduleForm`
2. Form submits payload to `/schedule` endpoint via `lib/api.ts`
3. API returns generated schedule data
4. Results displayed in `WeeklyGrid`, `TeamsView`, or `Heatmap` components
5. User can copy seed for reproducibility or adjust settings

---

## Core Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| **Framework**      | React 19 (Create React App + CRACO)             |
| **Styling**        | Tailwind CSS 3.4 with custom theme tokens       |
| **UI Components**  | shadcn/ui (built on Radix UI primitives)        |
| **HTTP Client**    | Axios                                           |
| **Icons**          | Lucide React                                    |
| **Build Tool**     | CRACO (Create React App Configuration Override) |
| **Package Manager**| Yarn                                            |

---

## Directory Structure

```
scheduler-ui/
├── public/                 # Static assets and HTML template
│   ├── index.html          # Root HTML file
│   └── favicon.svg         # App favicon
│
├── src/
│   ├── App.tsx             # Root component (renders Scheduler with ErrorBoundary)
│   ├── index.tsx           # React entry point
│   ├── index.css           # Global styles, CSS variables, fonts
│   ├── global.d.ts         # TypeScript declarations for assets
│   │
│   ├── components/         # React components
│   │   ├── Scheduler.tsx   # Main layout controller (responsive)
│   │   ├── ScheduleForm.tsx# Builder form (teams, weeks, rivals)
│   │   ├── RivalsBuilder.tsx# Rival pair editor
│   │   ├── ResultsView.tsx # Desktop results panel with tabs
│   │   ├── ResultsSummary.tsx# Stats strip and actions
│   │   ├── WeeklyGrid.tsx  # Week-by-week matchup display
│   │   ├── TeamsView.tsx   # Per-team schedule view
│   │   ├── Heatmap.tsx     # Matchup frequency matrix
│   │   ├── EmptyState.tsx  # Splash/placeholder when no results
│   │   ├── ConnectionStatus.tsx # API health indicator
│   │   ├── SettingsDialog.tsx   # API URL + mobile sim toggle
│   │   ├── BottomNav.tsx   # Mobile-only navigation
│   │   ├── ErrorBoundary.tsx # Error boundary for production
│   │   └── ui/             # shadcn/ui primitives
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── switch.tsx
│   │       └── tabs.tsx
│   │
│   └── lib/                # Utilities and services
│       ├── api.ts          # Axios client, API functions
│       ├── constants.ts    # Team sizes, NFL team names
│       ├── format.ts       # Display formatting helpers
│       └── utils.ts        # General utilities (cn, etc.)
│
├── .env.example            # Environment variable template
├── craco.config.js         # CRACO configuration (aliases, webpack)
├── tailwind.config.js      # Tailwind theme (colors, fonts)
├── components.json         # shadcn/ui configuration
└── package.json            # Dependencies and scripts
```

---

## Key Directories Explained

### `src/components/`
Contains all React components. The main application components live at the root level, while `ui/` contains reusable shadcn/ui primitives that should not be modified directly (they're generated by the shadcn CLI).

### `src/lib/`
Shared utilities and services:
- **api.ts**: Centralized API client with functions for health checks, schedule generation, and error parsing
- **constants.ts**: Application constants (team sizes, default team names)
- **format.ts**: Display formatting functions
- **utils.ts**: General utilities including the `cn()` function for Tailwind class merging

---

## Responsive Design

The application has two distinct layouts:

| Breakpoint | Layout | Navigation |
|------------|--------|------------|
| ≥ 1024px   | Desktop: Two-column grid | Settings button in header |
| < 1024px   | Mobile: Single column | Fixed bottom navigation bar |

A "Mobile Sim" mode allows testing the mobile layout on desktop screens.

---

## Environment Configuration

All environment variables are optional. Key variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `REACT_APP_DEFAULT_API_BASE` | `http://localhost:8000` | Default API endpoint |
| `PORT` | `3000` | Dev server port |
| `BROWSER` | (opens browser) | Set to `none` to prevent auto-open |

Users can override the API base URL at runtime via the Settings dialog (persisted to localStorage).

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start development server |
| `yarn build` | Create production build |
| `yarn test` | Run tests |
| `yarn typecheck` | Run TypeScript type checking |
