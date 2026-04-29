# FastForward Logistics — Ops Dashboard
## Agentic Design + Code Brief (Claude Code / VS Code)

---

> **How to use this file:**
> Open VS Code with Claude Code active. Place this file in your project root as `PROJECT_BRIEF.md`.
> Then in your terminal run: `claude` and say:
> *"Read PROJECT_BRIEF.md and begin the design and build workflow as specified."*
> Claude Code will follow the phased instructions below, pausing for your approval between phases.

---

## 0. Engagement Context

**Client:** FastForward Logistics (fictional)
**Type:** Mid-size freight and supply chain company
**Stakeholder:** VP of Operations
**Objective:** A single internal web dashboard for leadership meetings — real-time visibility into how the business is running.

**Core Business Need:**
The ops team is drowning in spreadsheets. The VP needs one screen she can pull up in any leadership meeting to answer: *Are shipments moving? Are we on time? Where are we struggling? What needs attention right now?*

**Your role:** Designer, architect, and developer. Scope it, plan it, build it.

---

## 1. Agent Instructions — Phased Workflow

You are a senior full-stack product engineer and UX designer working on a real client engagement. Follow these phases **in order**, and **stop for explicit user approval** between Phase 1→2 and Phase 2→3.

---

### PHASE 1 — Discovery & Architecture (Output: Docs Only)

Do NOT write any application code in this phase.

**1A. Generate a `DISCOVERY.md` file** with the following sections:

#### Stakeholder Goals
- Primary user: VP of Operations (executive, non-technical)
- Secondary users: Ops managers, regional leads
- Usage context: Leadership meetings, daily stand-ups, exception triage

#### KPI Framework
Define the specific metrics that will appear on the dashboard. Make them feel like a real freight/logistics business. At minimum include:
- Shipment volume (daily, weekly, trending)
- On-time delivery rate (OTD%) — overall and by region
- Active shipments by status (in transit, pending pickup, delivered, delayed)
- Open exceptions (late, damaged, missing, customs hold)
- Regional performance breakdown (at least 4 US regions)
- Carrier/mode split (truckload, LTL, intermodal, air)
- Top lanes by volume (origin → destination city pairs)
- Exception aging (how long open exceptions have been open)

#### Data Model
Define a mock data schema as TypeScript interfaces:
- `Shipment` — id, origin, destination, carrier, mode, status, scheduledDelivery, actualDelivery, exception?, region, weight, value
- `Exception` — id, shipmentId, type, openedAt, severity, assignedTo?, notes?
- `RegionalPerformance` — region, otdPct, volume, exceptionCount, trend
- `DailyVolume` — date, created, delivered, inTransit, exceptions

#### Tech Stack Decision
Recommend and justify a stack appropriate for an internal dashboard prototype:
- Framework: React (Vite)
- Styling: Tailwind CSS
- Charts: Recharts
- State: React Context or Zustand (your call, justify it)
- Data: Mock data via `src/data/mockData.ts` — structured, realistic, seeded
- No backend required for prototype

---

**1B. Generate a `SITEMAP.md` file:**

Produce a complete site map for the application. Include:
- All top-level views/pages
- All sub-views or drill-down panels
- Navigation model (sidebar? top nav? tab bar?)
- Modal/drawer overlays and what triggers them
- Empty/error/loading states as explicit nodes

Format as a structured tree — do not use a diagram tool, just a clean nested markdown tree.

---

**1C. Generate a `WIREFRAMES.md` file:**

Produce **3 distinct layout options** for the main dashboard view. Each option must include:

**Option A — "Command Center"**: Dense, data-first. Every KPI visible above the fold. Grid of metric cards across the top. Map or regional heatmap in the center. Exception list and chart area below. Dark mode first. Designed for a 1920×1080 monitor in a meeting room.

**Option B — "Executive Digest"**: Minimal, scannable. Large headline numbers. One primary chart. Clear visual hierarchy. Light mode. Designed for rapid reading — the VP scans this in 15 seconds and knows if anything is wrong.

**Option C — "Ops War Room"**: Split-pane. Left: live shipment feed + exception queue. Right: charts and regional breakdown. Color-coded severity. Tabbed sub-navigation within panes. Designed for an ops manager who lives in this screen all day.

For each option, describe:
- Layout grid structure (columns, rows, breakpoints)
- Which KPIs appear above the fold
- Primary chart type and placement
- Color palette and tone (dark/light, accent color, status colors)
- Navigation placement
- Exception/alert treatment
- What makes this option distinct and when you'd recommend it

---

**1D. Pause and present to user:**

Output this message verbatim:

```
✅ Phase 1 complete. I've generated:
   - DISCOVERY.md (KPIs, data model, tech stack)
   - SITEMAP.md (all views and navigation)
   - WIREFRAMES.md (3 layout options: Command Center, Executive Digest, Ops War Room)

👉 Please review these files and tell me:
   1. Which wireframe layout you'd like to build (A, B, or C — or a hybrid)
   2. Any KPIs or features you want to add, remove, or change
   3. Any branding direction (colors, tone) or "leave it to you"

I will not write any code until you confirm.
```

---

### PHASE 2 — Design System & Component Spec (Output: Docs + Tokens Only)

Do NOT scaffold the application yet.

**2A. Generate `DESIGN_SYSTEM.md`** with:

#### Brand Identity for FastForward Logistics
Invent a coherent visual identity:
- Logo mark concept (describe it — a wordmark or icon concept)
- Primary color: a bold, confident accent (not generic blue — think logistics: movement, precision, scale)
- Neutral palette: 6–8 grays for backgrounds, borders, text
- Semantic colors: success (OTD met), warning (at risk), danger (exception/late), info
- Typography: choose 2 Google Fonts — one for headings (strong, modern), one for data/body (legible at small sizes, monospace-friendly for numbers)
- Spacing scale: 4px base grid
- Border radius convention
- Shadow convention (use sparingly)

#### Component Inventory
List every UI component needed for the dashboard:
- KPI Metric Card (value, label, delta, trend indicator)
- Status Badge (delivered, in transit, delayed, exception — color-coded)
- Regional Performance Row (region name, OTD bar, volume, exception count)
- Exception Table Row (id, type, severity, age, shipment link)
- Sparkline Chart (for trend data in metric cards)
- Donut/Ring Chart (for mode split)
- Bar Chart (for daily volume)
- Area/Line Chart (for OTD trend over time)
- Top Lanes Table
- Shipment Drawer (slide-in detail panel)
- Filter Bar (date range, region, carrier, status)
- Navigation Sidebar or Top Bar
- Alert Banner (for critical exceptions)
- Empty State component
- Loading Skeleton

#### Interaction Spec
Define click/hover behaviors:
- Clicking a metric card → drill down or filter
- Clicking a region → filter all charts to that region
- Clicking an exception row → open shipment drawer
- Date range picker behavior
- Filter state persistence

---

**2B. Pause and present to user:**

```
✅ Phase 2 complete. Design system and component inventory defined.

👉 Quick decisions before I build:
   1. Dark mode only, light mode only, or toggle?
   2. Any component changes or additions?
   3. Ready for me to start coding? (say "build it")
```

---

### PHASE 3 — Build (Application Code)

Only begin this phase after explicit user approval.

**3A. Scaffold the project:**
```bash
npm create vite@latest fastforward-dashboard -- --template react-ts
cd fastforward-dashboard
npm install tailwindcss @tailwindcss/vite recharts zustand lucide-react
```

Configure Tailwind with the custom design tokens from DESIGN_SYSTEM.md.

**3B. Create mock data layer:**
Generate `src/data/mockData.ts` with:
- At least 200 realistic shipments (use realistic US city pairs, carrier names, realistic status distributions)
- At least 25 open exceptions of various types and severities
- 90 days of daily volume history
- 4 regional performance records with realistic OTD percentages (85–96% range — realistic, not perfect)
- Helper functions: `getShipmentsByRegion()`, `getOpenExceptions()`, `getOTDTrend()`, `getDailyVolume()`

All data must feel like a real mid-size logistics company — not toy numbers.

**3C. Build components in this order:**
1. Design tokens → `tailwind.config.ts`
2. Layout shell (nav + main content area)
3. KPI Metric Cards (top row)
4. Regional Performance panel
5. Exception Queue
6. Charts (daily volume bar chart, OTD trend line chart, mode split donut)
7. Top Lanes table
8. Shipment Drawer (detail overlay)
9. Filter bar + state management
10. Responsive breakpoints (down to 1280px)
11. Polish: loading skeletons, empty states, hover states, transitions

**3D. After build, generate `README.md`** with:
- Project overview
- How to run (`npm run dev`)
- Dashboard feature summary
- Screenshot descriptions (describe what each section shows)
- Potential next steps (real API integration, auth, alerting)

---

## 2. Design Principles (Enforce Throughout)

- **Data density without clutter.** The VP needs everything at a glance — but confusion is worse than missing data.
- **Status is always visible.** At any time, the user should know: is everything OK? If not, where?
- **Numbers must be legible at 6 feet.** This is a meeting room screen.
- **No placeholder lorem ipsum.** All text content should be realistic logistics language.
- **Exceptions are first-class citizens.** The exception queue is not an afterthought — it's a core use case.
- **Color is semantic, not decorative.** Red means problem. Green means good. Yellow means watch it.

---

## 3. Sample KPI Targets (Seed Your Mock Data Around These)

| Metric | Target | Mock Value |
|---|---|---|
| Overall OTD % | ≥ 94% | 91.3% (slightly under — creates tension) |
| Open Exceptions | < 20 | 27 (elevated — drives urgency) |
| Daily Shipment Volume | — | 340–420/day (realistic mid-size) |
| Avg Exception Age | < 24h | 31h (problem area) |
| Northeast OTD | — | 88.2% (worst region — story hook) |
| Southwest OTD | — | 96.1% (best region) |
| LTL Mode Share | — | 44% |
| Air Mode Share | — | 8% |

---

## 4. Exception Types to Include

- `LATE_DELIVERY` — shipment past scheduled delivery date
- `DAMAGED_FREIGHT` — carrier reported damage
- `MISSING_POD` — proof of delivery not received
- `CUSTOMS_HOLD` — held at border crossing
- `ADDRESS_ISSUE` — delivery address undeliverable
- `CARRIER_DELAY` — carrier-reported service disruption
- `WEIGHT_DISCREPANCY` — manifest weight doesn't match actual

---

## 5. Suggested Regional Breakdown

| Region | States | Color |
|---|---|---|
| Northeast | NY, NJ, CT, MA, PA, VT, NH, ME | Use your design system |
| Southeast | FL, GA, SC, NC, VA, TN, AL, MS | — |
| Midwest | IL, OH, IN, MI, WI, MN, MO, IA | — |
| Southwest | TX, AZ, NM, CO, NV, UT | — |
| West | CA, OR, WA, ID, MT | — |

---

## 6. Slalom Delivery Standards

This engagement is held to Slalom delivery quality:
- **Code is production-intent, not prototype-messy.** Clean component boundaries, typed props, no `any`.
- **Comments where it matters.** Data transforms and business logic get comments. Layout code does not.
- **Accessibility baseline.** Semantic HTML, ARIA labels on icon-only buttons, sufficient color contrast.
- **No hardcoded magic numbers.** All spacing, colors, and breakpoints come from the design token system.
- **Git-ready.** Clean file structure, no debug console.logs, no commented-out blocks.

---

*End of project brief. Begin with Phase 1 and await user approval before proceeding.*
