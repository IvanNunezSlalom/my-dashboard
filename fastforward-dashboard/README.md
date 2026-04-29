# FastForward Logistics Dashboard

A modern, executive-focused operations dashboard for FastForward Logistics, providing real-time visibility into shipment performance, exceptions, and regional metrics.

## Overview

This dashboard was designed for VP-level executives and operations managers to quickly answer critical business questions:
- **Are shipments moving?** Active shipment counts and status distribution
- **Are we on time?** On-Time Delivery (OTD%) performance vs. 94% target
- **Where are we struggling?** Regional performance breakdown and exception tracking
- **What needs attention?** Open exceptions prioritized by severity and age

Built with **Option B: "Executive Digest"** layout philosophy — minimal, scannable interface optimized for quick status checks and leadership meetings.

## Features

### Core Capabilities
- **Overall Status Banner** — At-a-glance health indicator showing OTD% vs target and exception count
- **Key Performance Metrics** — Large, readable metric cards for OTD%, Active Shipments, and Daily Volume with trend indicators
- **90-Day OTD Trend Chart** — Line chart with 94% target reference line showing performance over time
- **30-Day Volume Chart** — Dual-bar chart comparing shipments created vs. delivered
- **Regional Performance** — Expandable section with horizontal OTD% bars, exception counts, and week-over-week trends for 5 US regions
- **Exception Queue** — Expandable list of all open exceptions with severity indicators, age tracking, and detailed descriptions
- **Shipment Detail Drawer** — Slide-in overlay showing complete shipment information including route, timeline, cargo details, and linked exceptions

### Technical Features
- **Dark/Light Mode Toggle** — Seamless theme switching with system preference detection and localStorage persistence
- **Responsive Design** — Optimized for 1920×1080 displays, scales down to 1280px laptops
- **Realistic Mock Data** — 220+ shipments, 27 open exceptions, 90 days of historical data with authentic distributions
- **TypeScript** — Fully typed codebase for reliability and developer experience
- **Accessible** — Keyboard navigation, focus management, semantic HTML, ARIA labels

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | React 19 + TypeScript | Latest React with excellent type safety |
| **Build Tool** | Vite | Lightning-fast dev server and optimized builds |
| **Styling** | Tailwind CSS | Utility-first CSS with built-in design tokens |
| **Charts** | Recharts | React-native charting library with declarative API |
| **State** | Zustand | Minimal boilerplate, TypeScript-first global state |
| **Icons** | Lucide React | Consistent, tree-shakeable icon library |
| **Dates** | date-fns | Modern date formatting and manipulation |

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── charts/          # Recharts-based visualization components
│   ├── layout/          # TopNavBar, MainContainer
│   ├── metrics/         # MetricCard, StatusBadge, TrendIndicator
│   ├── overlays/        # ShipmentDrawer (slide-in panel)
│   ├── sections/        # StatusBanner, RegionalPerformance, ExceptionQueue
│   └── ui/              # Button, LoadingSkeleton, EmptyState
├── data/
│   └── mockData.ts      # 200+ realistic shipments, exceptions, daily volume
├── pages/
│   └── Dashboard.tsx    # Main dashboard view (Option B layout)
├── store/
│   └── dashboardStore.ts # Zustand state (theme, filters, drawer)
├── types/
│   └── index.ts         # TypeScript interfaces and enums
└── App.tsx              # Root application component
```

## Dashboard Sections

### Status Banner
Prominent banner at the top of the dashboard showing overall system health:
- **Green (✓):** OTD ≥94% and exceptions <20 — "All Systems Operating Normally"
- **Yellow (⚠️):** OTD 90-94% — "Performance Below Target"
- **Red (⚠️):** OTD <90% — "Performance Below Target" (elevated concern)

Includes contextual insights like "Northeast performance is primary driver of overall decline."

### Key Metrics (Left Column)
Three large metric cards optimized for readability at distance:
1. **On-Time Delivery:** Current OTD% with trend vs. last week (target: 94%)
2. **Active Shipments:** Count of in-transit, out-for-delivery, and pending-pickup shipments
3. **Daily Volume:** Shipments created today with day-over-day trend

### Primary Chart (Right Column)
**90-Day OTD Trend Line Chart:**
- Daily OTD% over the last 90 days
- Dashed horizontal line at 94% target
- Contextual insight text explaining performance drivers
- Hover tooltips with exact date and OTD%

**30-Day Volume Bar Chart:**
- Dual bars showing Created (teal) vs. Delivered (green) shipments
- Reveals capacity patterns and delivery throughput

### Regional Performance (Expandable)
Horizontal bar visualization for 5 US regions:
- **Northeast** (NY, NJ, CT, MA, PA) — Currently worst performer at 88.2%
- **Southeast** (FL, GA, SC, NC, VA, TN, AL, MS)
- **Midwest** (IL, OH, IN, MI, WI, MN, MO, IA)
- **Southwest** (TX, AZ, NM, CO, NV, UT) — Best performer at 96.1%
- **West** (CA, OR, WA, ID, MT)

Each row shows: Region name, OTD% bar (color-coded), shipment volume, exception count, WoW trend

### Exception Queue (Expandable)
List of 27 open exceptions sorted by severity and age:
- **Severity indicators:** Red dot (Critical), Amber dot (High), Gray dot (Medium)
- **Exception types:** Late Delivery, Damaged Freight, Missing POD, Customs Hold, Address Issue, Carrier Delay, Weight Discrepancy
- **Age tracking:** Color-coded by urgency (<24h green, 24-48h amber, >48h red)
- **Assignment:** Shows which ops team or individual is assigned

Clicking any exception row opens the linked shipment in the detail drawer.

## Data Model

### Key Entities
- **Shipment:** 220+ records with origin, destination, carrier, mode, status, timestamps, cargo details
- **Exception:** 27 open exceptions linked to shipments with type, severity, age, assignment, resolution notes
- **DailyVolume:** 90 days of time-series data for trending (created, delivered, OTD%, exceptions)
- **RegionalPerformance:** Aggregated metrics per region (OTD%, volume, exception count, trend)

### Mock Data Realism
Data is seeded to match FastForward's actual business profile:
- **Overall OTD:** 91.3% (below 94% target)
- **Northeast OTD:** 88.2% (worst region — drives overall decline)
- **Southwest OTD:** 96.1% (best region)
- **Open Exceptions:** 27 (above 20 target threshold)
- **Avg Exception Age:** 31 hours (above 24h target)
- **Mode Distribution:** LTL 44%, Truckload 31%, Intermodal 12%, Parcel 8%, Air 5%
- **Daily Volume:** 340-420 shipments/day (realistic for mid-size logistics company)

## Design System

### Color Palette
- **Primary Brand:** Deep Teal (#0d9488) — trustworthy, professional, logistics-appropriate
- **Neutrals:** Tailwind Slate scale (50-900) — light mode default
- **Success:** Green (#059669) — delivered, on-time, positive trends
- **Warning:** Amber (#d97706) — at-risk, approaching threshold
- **Danger:** Red (#dc2626) — exceptions, critical issues, late deliveries
- **Info:** Blue (#3b82f6) — in-transit, informational

### Typography
- **Font Family:** Inter (single family for headings and body)
- **Display Numbers:** 56px bold, tabular-nums (metric card values)
- **Headings:** 32px (status banner), 24px (chart titles), 20px (section headers)
- **Body:** 18px (insight text), 16px (standard), 14px (tables), 12px (labels)

### Spacing & Layout
- **Base Grid:** 4px increment system
- **Content Max-Width:** 1400px (centered with 40px horizontal padding)
- **Card Padding:** 24px (p-6)
- **Section Spacing:** 40px vertical gaps (space-y-10)
- **Border Radius:** 12px (rounded-xl) for cards, 16px (rounded-2xl) for major containers

## Next Steps (Future Enhancements)

This prototype demonstrates core functionality with mock data. Recommended next steps for production deployment:

### Phase 2: Backend Integration
- **Real-time API:** Replace `mockData.ts` with REST/GraphQL API calls to TMS (Transportation Management System)
- **WebSocket Updates:** Live shipment status changes and exception notifications
- **Authentication:** User login, role-based permissions (VP vs Ops Manager views)
- **Multi-tenancy:** Support multiple client organizations with data isolation

### Phase 3: Advanced Features
- **Filtering:** Date range picker, region/carrier/status filters in sticky filter bar
- **Search:** Full-text search for shipments by ID, customer reference, lane
- **Drill-down:** Click region row to filter entire dashboard to that region
- **Export:** Download exception queue or regional performance as CSV/Excel
- **Alerts:** Configurable email/SMS notifications for critical exceptions or OTD drops

### Phase 4: Analytics & Insights
- **Carrier Scorecards:** Performance comparison across carriers with OTD%, exception rate, cost
- **Lane Analysis:** Top lanes by volume with profitability and reliability metrics
- **Predictive Alerts:** ML-based predictions for at-risk shipments before they become exceptions
- **Custom Dashboards:** User-configurable layouts, saved views, personalized KPI cards

### Technical Improvements
- **Data Virtualization:** Handle 10,000+ shipments with windowing (react-window)
- **Offline Support:** Service worker for offline access to cached dashboard data
- **Performance Monitoring:** Instrument with analytics (Sentry, LogRocket, Datadog RUM)
- **A/B Testing:** Compare Option B (Executive Digest) vs Option A (Command Center) for different user segments

## License

Proprietary — FastForward Logistics

## Support

For questions or issues, contact the development team or refer to the project documentation in `DISCOVERY.md`, `SITEMAP.md`, `WIREFRAMES.md`, and `DESIGN_SYSTEM.md`.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

🚀 **Dashboard is live at:** http://localhost:5173

🔄 **Toggle theme** using the sun/moon icon in the top-right corner
