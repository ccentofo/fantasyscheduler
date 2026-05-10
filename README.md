# Fantasy Football Scheduler — UI

A React + Tailwind frontend for the Fantasy Football Scheduler API.

## Run locally

Prereqs: **Node 18+** and **Yarn** (`npm i -g yarn` if you don't have it).

```bash
# from the folder extracted out of scheduler-ui.tar.gz
cd scheduler-ui
cp .env.example .env     # optional — override defaults (all optional)
yarn install
yarn start               # dev server on http://localhost:3000
```

The UI connects to the API endpoint specified by the `REACT_APP_DEFAULT_API_BASE`
environment variable. If you need to change the API URL, click **Settings** in the
top-right (desktop) or the **Settings** tab in the bottom nav (mobile) and
update the base URL. It's persisted in localStorage.

## Production build

```bash
yarn build               # outputs a static bundle to ./build/
```

Host `build/` behind any static server (nginx, Vercel, Netlify, S3, …).
The API base URL is resolved at runtime via the Settings dialog, not at
build time — unless you set `REACT_APP_DEFAULT_API_BASE` in `.env` before
building.

## Responsive layouts

The UI has two layouts that switch automatically at the **1024 px** breakpoint:

### Desktop (≥ 1024 px)
- Two-column grid: Schedule Builder on the left, results (or splash) on
  the right.
- Results pane has inner tabs: **Weekly Grid / By Team / Frequency Matrix**.
- `Settings` button lives in the top-right of the header.

### Mobile / tablet (< 1024 px)
- Single column; one view at a time.
- Fixed **bottom navigation** with 5 tabs:
  **Builder · Weeks · Teams · Heatmap · Settings**.
- Header condensed — app title shrinks to "FF Scheduler", subtitle hidden,
  Settings becomes a gear icon next to the ★ accent.
- First load opens the Builder tab directly (no splash).
- After a successful Generate, it auto-switches to **Weeks**.
- Opening Weeks/Teams/Heatmap before generating shows the same
  `COMMISSIONER. / SET THE / SCHEDULE.` hero (with an **Open Builder**
  button) that the desktop splash uses.

### Previewing the mobile layout from a desktop
Settings → toggle **View Mobile Layout** → Save. The UI flips to the
phone-style single-column view with the bottom nav, and a **MOBILE SIM**
badge appears in the header. The preference is saved to localStorage so
it persists across refreshes. Toggle it off the same way.

## Structure

```
scheduler-ui/
├── .env.example              # Copy to .env to override defaults (all optional)
├── README.md
├── package.json
├── craco.config.js           # Adds the "@/..." path alias
├── tailwind.config.js        # Color tokens: giants, eagles, danger, …
├── src/
│   ├── App.js                # Root component
│   ├── index.css             # Theme vars, fonts, utilities
│   ├── components/
│   │   ├── Scheduler.jsx           # Top-level layout + responsive switch
│   │   ├── ScheduleForm.jsx        # Schedule Builder form (left/mobile tab)
│   │   ├── RivalsBuilder.jsx       # Pair-by-pair rival editor
│   │   ├── ResultsView.jsx         # Desktop results panel w/ inner tabs
│   │   ├── ResultsSummary.jsx      # Stats strip, seed, rivals, actions
│   │   ├── WeeklyGrid.jsx          # "Weeks" view
│   │   ├── TeamsView.jsx           # "By Team" view
│   │   ├── Heatmap.jsx             # Frequency matrix view
│   │   ├── EmptyState.jsx          # Splash hero (desktop + mobile no-result)
│   │   ├── ConnectionStatus.jsx    # /health ping + OFFLINE/CONNECTED pill
│   │   ├── SettingsDialog.jsx      # API URL + Mobile Sim toggle
│   │   ├── BottomNav.jsx           # Mobile-only fixed bottom navigation
│   │   └── ui/                     # shadcn/ui primitives
│   └── lib/
│       ├── api.js            # axios client + /health, /schedule, /help
│       ├── format.js         # displayTeam / displayWeek / sortTeams / sortRivalPairs
│       └── constants.js
└── public/
```

## Color tokens (tailwind.config.js)

- `giants` / `giantsDim` / `giantsBright` — primary blue family (Giants-ish,
  explicitly NOT Cowboys navy)
- `eagles` / `eaglesBright` — kelly-green highlight / contrast color (rival
  markers, ★ accent)
- `danger` — red, **reserved for true errors only** (offline, API 4xx/5xx)
- `obsidian` / `carbon` — page + panel backgrounds

## Typography

- **Anton** (display) — headings, stat numbers
- **IBM Plex Sans** — body
- **IBM Plex Mono** — labels, seed, API paths, data cells

Imported via Google Fonts at the top of `src/index.css`.
=======
# fantasyscheduler
Site to generate schedules for fantasy leagues with various restrictions/options
