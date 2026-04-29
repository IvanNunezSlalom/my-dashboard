# FastForward Logistics Dashboard — Wireframe Options

## Overview

Three distinct layout approaches, each optimized for different use cases and user preferences. All designs are for 1920×1080 primary viewport (meeting room displays), with responsive considerations down to 1280px.

---

## Option A: "Command Center"

**Philosophy:** Maximum data density. Every KPI visible without scrolling. Designed for war room environments and ops managers who live in this dashboard 8 hours a day.

### Visual Identity
- **Mode:** Dark mode (reduces eye strain for prolonged use)
- **Background:** Near-black (#0a0f1a)
- **Card backgrounds:** Dark slate (#1a2332)
- **Accent color:** Electric blue (#00a3ff) — evokes movement, logistics, precision
- **Status colors:**
  - Green: #10b981 (delivered, on-time)
  - Yellow: #f59e0b (warning, at-risk)
  - Red: #ef4444 (critical, exception)
  - Gray: #6b7280 (neutral, in-transit)

### Layout Structure

```
┌────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)               MAIN CONTENT (1680px)                        │
│ ┌──────────┐  ┌──────────────────────────────────────────────────────────┐│
│ │          │  │ FILTER BAR (sticky, 60px height)                          ││
│ │ FastFwd  │  │ Date: [Last 7 Days ▾] Region: [All ▾] Status: [All ▾]   ││
│ │ Logo     │  └──────────────────────────────────────────────────────────┘│
│ │          │  ┌──────────────────────────────────────────────────────────┐│
│ ├──────────┤  │ HERO METRICS ROW (120px height, 4 cards)                 ││
│ │          │  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      ││
│ │ Dashboard│  │ │ OTD% │ │Active│ │ Excep│ │Volume│                      ││
│ │ ●        │  │ │91.3% │ │ 847  │ │  27  │ │ 392  │                      ││
│ │          │  │ │ ▼ 2.1│ │▲ 14  │ │▲ 5   │ │▼ 18  │  (Large numbers,    ││
│ │Shipments │  │ └──────┘ └──────┘ └──────┘ └──────┘   trend indicators)  ││
│ │          │  └──────────────────────────────────────────────────────────┘│
│ │          │  ┌──────────────────────────────────────────────────────────┐│
│ │Exceptions│  │ REGIONAL PERFORMANCE (280px height)                      ││
│ │          │  │ Region          OTD%          Volume    Exceptions       ││
│ │Analytics │  │ Northeast  ████░░░░░░ 88.2%    214        12  ▼ 3.1%    ││
│ │          │  │ Southeast  █████████░ 93.7%    189         4  ▲ 1.2%    ││
│ │Settings  │  │ Midwest    ████████░░ 90.4%    203         6  ▼ 0.8%    ││
│ │          │  │ Southwest  ██████████ 96.1%    156         2  ▲ 2.4%    ││
│ │          │  │ West       █████████░ 92.8%    185         3  ─ 0.0%    ││
│ └──────────┘  └──────────────────────────────────────────────────────────┘│
│               ┌─────────────────────────┬────────────────────────────────┐│
│               │ OTD TREND (360px h)     │ VOLUME CHART (360px h)         ││
│               │ ┌─────────────────────┐ │ ┌────────────────────────────┐││
│               │ │     94% target ─ ─ ─│ │ │ 500│  ▆                    │││
│               │ │                  ╱ ╲│ │ │ 400│ ▆█▆ Created           │││
│               │ │  ╱╲    ╱╲   ╱╲ ╱   ╲│ │ │ 300│ ███ Delivered        │││
│               │ │ ╱  ╲  ╱  ╲_╱  ╲     │ │ │ 200│ ███▆                  │││
│               │ │              90 days│ │ │     └──────────────30 days │││
│               │ └─────────────────────┘ │ └────────────────────────────┘││
│               ├─────────────────────────┴────────────────────────────────┤│
│               │ EXCEPTION QUEUE (340px height)                            ││
│               │ ID         Type           Sev  Age    Shipment   Assigned ││
│               │ EXC-1827   Late Delivery  🔴  42h    SHP-04251   Ops-NE  ││
│               │ EXC-1829   Customs Hold   🔴  38h    SHP-04263   Customs ││
│               │ EXC-1831   Damaged Frt    🟠  12h    SHP-04272   Claims  ││
│               │ EXC-1832   Missing POD    🟡   8h    SHP-04280   Ops-SE  ││
│               │ ... (scrollable, 10 visible rows)                         ││
│               └──────────────────────────────────────────────────────────┘│
│               ┌─────────────────────────┬────────────────────────────────┐│
│               │ MODE SPLIT DONUT        │ TOP LANES                      ││
│               │ ┌─────────────────────┐ │ LA→Dallas    87   94.2%  2.3% ││
│               │ │       ╱───╲         │ │ Chicago→ATL  76   91.8%  3.9% ││
│               │ │     ╱   LTL ╲       │ │ Newark→Miami 63   87.1%  6.3% ││
│               │ │    │  44%    │      │ │ Dallas→LA    58   96.5%  1.7% ││
│               │ │    │ TL ╲Air │      │ │ ATL→NYC      54   89.3%  5.6% ││
│               │ │     ╲_____╱  │      │ │ ... (scrollable)              ││
│               │ └─────────────────────┘ │                                ││
│               └─────────────────────────┴────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────────────┘
```

### Grid Breakdown
- **Sidebar:** 240px fixed width, full height
- **Main content:** 1680px, 12-column grid (140px per column)
- **Hero metrics row:** 4 cards, 3 columns each
- **Regional performance:** Full width, 12 columns
- **Charts row:** Two charts side-by-side, 6 columns each
- **Exception queue:** Full width, 12 columns
- **Bottom row:** 6 columns each (donut + lanes)

### Above the Fold (1080px viewport height)
- Full filter bar
- All 4 hero metrics
- Complete regional performance table (all 5 regions)
- Top 60% of OTD trend chart and Volume chart
- First 3 exception queue rows

**Visibility:** 70% of total content above fold. Scroll required to see full charts, full exception queue, mode split, and top lanes.

### Responsive Breakpoints
- **1680px:** Sidebar collapses to icons only (60px)
- **1440px:** Charts stack vertically (full width each)
- **1280px:** Hero metrics become 2×2 grid, regional performance shows only top 3 regions + "View All" button

### Interaction Patterns
- **Hover states:** Cards lift with subtle shadow, background lightens 5%
- **Click metric card:** Card pulses, relevant section scrolls into view with highlight animation
- **Click region row:** Instant filter applied, all charts fade out 300ms, fade in with new data 200ms
- **Exception row hover:** Entire row background changes, cursor becomes pointer
- **Chart hover:** Tooltip appears with delay 150ms, follows cursor

### Typography
- **Hero metric values:** 48px, bold, tabular numbers
- **Hero metric labels:** 14px, uppercase, letter-spacing 0.05em
- **Section headers:** 20px, semi-bold
- **Table data:** 14px, medium weight
- **Chart labels:** 12px, regular

### What Makes This Option Distinct
**Strengths:**
- Maximum information density — everything important is visible
- Dark mode reduces eye strain for prolonged monitoring
- Horizontal bars in regional performance allow quick visual comparison
- Exception queue prominence matches its operational importance
- Color coding (red/yellow/green) instantly communicates status
- Feels professional, technical, control-room aesthetic

**Ideal For:**
- Ops managers who monitor continuously
- War room/NOC environments
- Users comfortable with data-heavy interfaces
- Situations where scrolling is undesirable

**Weaknesses:**
- Can feel overwhelming to non-technical executives
- Requires user to know where to look for specific info
- Dark mode may not suit all meeting room lighting
- Dense layout may not scan quickly in 15-second glances

---

## Option B: "Executive Digest"

**Philosophy:** Radical simplification. One question answered in 15 seconds: "Is everything OK?" Designed for executive glances, board meetings, and non-technical stakeholders.

### Visual Identity
- **Mode:** Light mode (professional, presentation-friendly)
- **Background:** Off-white (#f8fafc)
- **Card backgrounds:** Pure white (#ffffff)
- **Accent color:** Deep teal (#0d9488) — trustworthy, professional, logistics-appropriate
- **Status colors:**
  - Green: #059669 (muted, professional)
  - Yellow: #d97706 (amber, cautionary)
  - Red: #dc2626 (serious, not alarming)
  - Gray: #64748b (neutral)

### Layout Structure

```
┌────────────────────────────────────────────────────────────────────────────┐
│ TOP NAV BAR (80px height, white background, shadow)                        │
│ FastForward Logistics  |  Dashboard  Shipments  Exceptions     [Settings] │
└────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────┐
│                        MAIN CONTENT (centered, 1400px max)                 │
│                                                                            │
│   ┌────────────────────────────────────────────────────────────────────┐  │
│   │  OVERALL STATUS BANNER (140px height)                              │  │
│   │                                                                     │  │
│   │              ⚠️  Performance Below Target                          │  │
│   │                                                                     │  │
│   │     On-Time Delivery: 91.3%  (Target: 94%)  |  27 Open Exceptions │  │
│   │                                                                     │  │
│   │              [View Details ↓]                                      │  │
│   └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│   ┌──────────────────────────┐  ┌──────────────────────────────────────┐ │
│   │  KEY METRICS (300px h)   │  │  PRIMARY CHART (500px height)        │ │
│   │                          │  │                                       │ │
│   │  ┌────────────────────┐  │  │  On-Time Delivery Trend (90 days)   │ │
│   │  │  Active Shipments  │  │  │  ┌─────────────────────────────────┐│ │
│   │  │                    │  │  │  │ 100%                             ││ │
│   │  │        847         │  │  │  │  95% ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    ││ │
│   │  │      ▲ 1.7%        │  │  │  │  94% target ──────────────────── ││ │
│   │  └────────────────────┘  │  │  │  90% ╱╲    ╱╲   ╱╲             ││ │
│   │                          │  │  │  85%╱  ╲  ╱  ╲ ╱  ╲ Current    ││ │
│   │  ┌────────────────────┐  │  │  │  80%      ╲╱    ╲╱             ││ │
│   │  │  Daily Volume      │  │  │  └─────────────────────────────────┘│ │
│   │  │                    │  │  │                                       │ │
│   │  │        392         │  │  │  Northeast performance is primary    │ │
│   │  │      ▼ 4.4%        │  │  │  driver of overall decline.          │ │
│   │  └────────────────────┘  │  │                                       │ │
│   │                          │  │  12 open exceptions in Northeast.     │ │
│   │  ┌────────────────────┐  │  │                                       │ │
│   │  │  Avg Transit Time  │  │  │                                       │ │
│   │  │                    │  │  └──────────────────────────────────────┘ │
│   │  │      3.2 days      │                                               │
│   │  │      ─ 0.0%        │                                               │
│   │  └────────────────────┘                                               │
│   └──────────────────────────┘                                            │
│                                                                            │
│   ┌────────────────────────────────────────────────────────────────────┐  │
│   │  REGIONAL BREAKDOWN (Expandable, collapsed by default)             │  │
│   │  [▶ View Regional Performance]                                     │  │
│   └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│   ┌────────────────────────────────────────────────────────────────────┐  │
│   │  EXCEPTION SUMMARY (Expandable, collapsed by default)              │  │
│   │  [▶ View 27 Open Exceptions]                                       │  │
│   └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Grid Breakdown
- **Max content width:** 1400px, centered, 40px horizontal padding
- **Two-column layout:** Left sidebar 400px (metrics), Right main 940px (chart + insights)
- **Vertical rhythm:** 40px spacing between sections
- **Cards:** 20px padding, 8px border radius, subtle shadow

### Above the Fold (1080px viewport height)
- Full status banner
- All 3 key metrics (left column)
- Complete OTD trend chart + contextual insights (right column)
- Top of expandable sections (Regional, Exceptions)

**Visibility:** 90% of critical information above fold. Expandable sections provide drill-down without cluttering initial view.

### Responsive Breakpoints
- **1400px:** Content uses full width minus 20px margins
- **1280px:** Two-column layout becomes single column, metrics stack above chart
- **1024px:** Chart height reduces to 400px

### Interaction Patterns
- **Status banner:** If all metrics green, shows "✓ All Systems Operating Normally" in muted green
- **[View Details ↓] button:** Smooth scroll to regional breakdown + auto-expands
- **Hover metric card:** Subtle lift, shadow deepens
- **Click metric card:** Drawer opens with detailed trend data
- **Expandable sections:** Click to expand in-place with smooth animation (500ms)
- **Chart data point hover:** Large tooltip with date, OTD%, delta from target

### Typography
- **Status banner headline:** 32px, semi-bold
- **Metric values:** 56px, bold, tabular numbers (huge, readable from distance)
- **Metric labels:** 16px, medium, subtle color
- **Chart title:** 24px, semi-bold
- **Insight text:** 18px, regular (large enough to be readable, small enough to scan)

### What Makes This Option Distinct
**Strengths:**
- Answers "Is everything OK?" in 5 seconds
- Minimal cognitive load — only essential information shown
- Light mode perfect for projectors and bright meeting rooms
- Large numbers readable from 10+ feet away
- Insights text provides context ("Northeast is the problem area") — no interpretation needed
- Expandable sections keep interface clean while preserving access to detail
- Professional, boardroom-appropriate aesthetic

**Ideal For:**
- VP of Operations in leadership meetings
- Board presentations
- Quick daily check-ins
- Non-technical executives
- Projected displays in bright rooms

**Weaknesses:**
- Ops managers need to expand sections for actionable detail
- Less information density — requires scrolling/expanding for full picture
- Not suitable for continuous monitoring (too much hidden)
- Light mode may cause eye strain for prolonged use

---

## Option C: "Ops War Room"

**Philosophy:** Live feed mentality. Constant activity visibility. Designed for operational teams who need real-time awareness of shipment flow and exception triage.

### Visual Identity
- **Mode:** Dark mode with color accents
- **Background:** Charcoal (#18181b)
- **Card backgrounds:** Slightly lighter charcoal (#27272a)
- **Accent color:** Bright orange (#f97316) — urgent, attention-grabbing, action-oriented
- **Status colors:**
  - Green: #22c55e (bright, optimistic)
  - Yellow: #facc15 (high contrast, warning)
  - Red: #f43f5e (urgent, demands action)
  - Blue: #3b82f6 (in-transit, active)

### Layout Structure

```
┌────────────────────────────────────────────────────────────────────────────┐
│ HEADER BAR (60px, with live clock, last updated timestamp)                │
│ FastForward Ops Dashboard  |  🟢 Live  |  Updated: 2 min ago  |  14:32 PT │
└────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────┬─────────────────────────────────────────┐
│ LEFT PANE (800px)                │ RIGHT PANE (1120px)                     │
│                                  │                                         │
│ ┌─── TABS ──────────────────┐   │ ┌─── TABS ──────────────────────────┐  │
│ │ [Feed] [Queue] [Search]   │   │ │ [Charts] [Regions] [Carriers]     │  │
│ └──────────────────────────────┘   │ └──────────────────────────────────────┘  │
│                                  │                                         │
│ EXCEPTION QUEUE (Active Tab)     │ CHARTS (Active Tab)                    │
│ ┌──────────────────────────────┐ │ ┌───────────────────────────────────┐ │
│ │ 🔴 EXC-1827  Late Delivery   │ │ │ KPI CARDS (100px height)          │ │
│ │    SHP-04251 | 42h old       │ │ │ ┌──────┐ ┌──────┐ ┌──────┐       │ │
│ │    Newark→Miami | Ops-NE     │ │ │ │ OTD% │ │Active│ │Excep │       │ │
│ ├──────────────────────────────┤ │ │ │91.3% │ │ 847  │ │ 27  │       │ │
│ │ 🔴 EXC-1829  Customs Hold    │ │ │ └──────┘ └──────┘ └──────┘       │ │
│ │    SHP-04263 | 38h old       │ │ └───────────────────────────────────┘ │
│ │    LA→Dallas | Customs       │ │ ┌───────────────────────────────────┐ │
│ ├──────────────────────────────┤ │ │ OTD TREND (300px height)          │ │
│ │ 🟠 EXC-1831  Damaged Freight │ │ │                                   │ │
│ │    SHP-04272 | 12h old       │ │ │  100% ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄       │ │
│ │    Chicago→ATL | Claims      │ │ │   95%                             │ │
│ ├──────────────────────────────┤ │ │   94% target ─────────────────    │ │
│ │ 🟡 EXC-1832  Missing POD     │ │ │   90% ╱╲    ╱╲   ╱╲             │ │
│ │    SHP-04280 | 8h old        │ │ │   85%╱  ╲  ╱  ╲ ╱  ╲            │ │
│ │    Dallas→LA | Ops-SE        │ │ │       30d   60d   90d           │ │
│ ├──────────────────────────────┤ │ └───────────────────────────────────┘ │
│ │ 🟡 EXC-1834  Address Issue   │ │ ┌───────────────────────────────────┐ │
│ │    SHP-04289 | 4h old        │ │ │ VOLUME BAR CHART (300px h)        │ │
│ │    ATL→NYC | Ops-NE          │ │ │  500│ ▆▆▆                         │ │
│ ├──────────────────────────────┤ │ │  400│ ███ Created                 │ │
│ │ ... (scrollable, 20+ rows)   │ │ │  300│ ███ Delivered               │ │
│ └──────────────────────────────┘ │ │  200│ ███▆                        │ │
│                                  │ │      └────────────── 30 days      │ │
│                                  │ └───────────────────────────────────┘ │
│                                  │ ┌───────────────────────────────────┐ │
│                                  │ │ REGIONAL PERFORMANCE (280px h)    │ │
│                                  │ │ Northeast  ████░░ 88.2%  214  12  │ │
│                                  │ │ Southeast  █████░ 93.7%  189   4  │ │
│                                  │ │ Midwest    ████░░ 90.4%  203   6  │ │
│                                  │ │ Southwest  ██████ 96.1%  156   2  │ │
│                                  │ │ West       █████░ 92.8%  185   3  │ │
│                                  │ └───────────────────────────────────┘ │
│                                  │                                         │
└──────────────────────────────────┴─────────────────────────────────────────┘
```

### Grid Breakdown
- **Split-pane layout:** 800px left (exception feed), 1120px right (analytics)
- **Left pane:** Scrollable list, 30px padding, each card 80px height
- **Right pane:** 4-column grid (280px each), 24px gutters
- **Tabs:** 48px height, full-width

### Above the Fold (1080px viewport height)
- Header bar
- Both tab bars
- Left pane: Top 10 exception cards (out of 27)
- Right pane: All KPI cards, full OTD trend, full volume chart, partial regional performance

**Visibility:** 100% of right pane above fold (all analytics), 37% of left pane (requires scroll for full queue)

### Responsive Breakpoints
- **1600px:** Left pane 700px, right pane 900px
- **1400px:** Split becomes 60/40 ratio
- **1280px:** Panes stack vertically, exception queue on top (400px max-height), charts below

### Interaction Patterns
- **Live indicator:** Pulses green every 5 seconds (simulated real-time)
- **New exception:** Appears at top of queue with slide-down animation + brief highlight (3s)
- **Exception card hover:** Entire card background changes to slightly lighter, left border thickens to 4px in severity color
- **Click exception card:** Card expands in-place (accordion) showing full details, linked shipment info, assign button
- **Tab switching:** Content fades out 200ms, new content fades in 300ms
- **Chart tooltips:** Larger than typical, include contextual info ("12% below target")
- **Severity badges:** Animate with pulse when age > 48h

### Typography
- **Exception ID:** 16px, monospace, bold
- **Exception type:** 14px, uppercase, medium, colored by severity
- **Shipment ID / lane:** 13px, regular, muted color
- **Age timestamp:** 12px, bold, colored by age (<24h green, 24-48h yellow, >48h red)
- **KPI values:** 36px, bold, tabular
- **Chart labels:** 11px, uppercase, letter-spacing

### What Makes This Option Distinct
**Strengths:**
- Exception queue is first-class — largest screen real estate
- Live feed metaphor matches ops team mental model (constant activity)
- Tabbed navigation allows focus switching without losing context
- Split-pane layout maximizes use of wide monitors
- Color-coded severity + age creates instant visual triage hierarchy
- Dark mode suitable for 24/7 monitoring
- Expandable exception cards reduce need for drawer overlays
- "Live" indicator and timestamps build trust in data freshness

**Ideal For:**
- Operations managers monitoring all day
- Exception triage teams
- 24/7 NOC/war room environments
- Users who need to act on exceptions immediately
- Multi-monitor setups (can show charts on second display)

**Weaknesses:**
- Split-pane may feel claustrophobic on laptop screens
- Less emphasis on high-level health (have to scan multiple metrics)
- Tabs hide information — requires clicking to see all data
- Can feel overwhelming for executives (too much detail)
- Dark mode not ideal for projected presentations

---

## Comparison Matrix

| Aspect | Command Center | Executive Digest | Ops War Room |
|--------|----------------|------------------|--------------|
| **Data Density** | Very High | Low | High |
| **Scroll Required** | Moderate | Minimal | Minimal (vertical split) |
| **Primary User** | Ops Manager | VP / Executive | Triage Team |
| **Use Case** | Monitoring + Analysis | Quick Status Checks | Real-time Response |
| **Meeting Room** | ✓ Good | ✓✓ Excellent | ○ Acceptable |
| **Daily Ops** | ✓✓ Excellent | ○ Limited | ✓✓✓ Ideal |
| **Mode** | Dark | Light | Dark |
| **Learning Curve** | Moderate | Low | Moderate |
| **Information Architecture** | Flat (all visible) | Hierarchical (expand) | Tabbed (switch) |
| **Action Orientation** | Analysis-first | Awareness-first | Action-first |
| **Visual Hierarchy** | Balanced | Clear (top to bottom) | Split (left=action, right=context) |

---

## Recommendation Logic

**Choose Option A (Command Center) if:**
- Users are technically savvy ops managers
- Dashboard is for continuous monitoring (8+ hours)
- All data needs to be scannable without interaction
- Environment is dimly lit or 24/7 ops center
- Scrolling is undesirable

**Choose Option B (Executive Digest) if:**
- Primary user is VP or executive leadership
- Dashboard is for quick glances (< 1 minute)
- Bright meeting room or presentation setting
- Simplicity and clarity trump data density
- Users are non-technical

**Choose Option C (Ops War Room) if:**
- Exceptions are the primary workflow driver
- Users need to triage and act on items immediately
- "Live" feed mentality matches team culture
- Wide monitor setups (1920px+)
- Operations team uses dashboard collaboratively in war room

---

## Hybrid Possibilities

**Hybrid 1: "Command Center" layout + "Executive Digest" color scheme**
- Use Option A's dense layout in light mode
- Soften data density slightly by using Option B's white cards
- **Result:** Professional, presentation-friendly, but still data-rich

**Hybrid 2: "Ops War Room" split-pane + "Command Center" content**
- Left pane: Exception queue (from C)
- Right pane: Full analytics from A (metrics, regional, charts)
- **Result:** Action-oriented left, comprehensive analysis right

**Hybrid 3: "Executive Digest" with expandable "Command Center" detail**
- Start with Option B's simple view
- Add "View Detailed Dashboard" toggle that transforms into Option A
- **Result:** Best of both worlds, mode-switching based on user need

---

*Phase 1 wireframes complete. Awaiting user feedback.*
