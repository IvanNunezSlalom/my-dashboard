# FastForward Logistics Dashboard — Discovery & Architecture

## Stakeholder Goals

### Primary User: VP of Operations
- **Profile:** Executive, non-technical, focused on strategic decision-making
- **Primary Need:** Single-screen visibility into business health for leadership meetings
- **Key Questions:** Are shipments moving? Are we on time? Where are we struggling? What needs attention?
- **Usage Pattern:** Quick scans (15-30 seconds), leadership meetings, board presentations
- **Decision Context:** Resource allocation, vendor performance, operational priorities

### Secondary Users
- **Ops Managers:** Daily monitoring, exception triage, regional performance tracking
- **Regional Leads:** Drill-down into specific geography performance
- **Account Managers:** Customer-specific issue visibility

### Usage Context
1. **Leadership Meetings** — Projector screen, 6+ people in room, need to read from distance
2. **Daily Stand-ups** — Quick status checks, trend identification
3. **Exception Triage** — Identifying and prioritizing operational problems
4. **Client Calls** — Real-time status when customers escalate issues

---

## KPI Framework

### Tier 1: At-a-Glance Health Metrics (Hero Cards)
These appear prominently and answer "Is everything OK?"

1. **On-Time Delivery Rate (OTD%)**
   - Target: ≥ 94%
   - Current: 91.3% (below target — primary concern)
   - 7-day trend indicator
   - Color-coded: Green ≥94%, Yellow 90-94%, Red <90%

2. **Active Shipments**
   - Total count in system
   - Breakdown: In Transit / Pending Pickup / Out for Delivery
   - Day-over-day change

3. **Open Exceptions**
   - Target: < 20 active
   - Current: 27 (elevated)
   - Average age: 31 hours (target: <24h)
   - Severity distribution: Critical / High / Medium

4. **Daily Volume**
   - Shipments created today
   - Shipments delivered today
   - 7-day moving average
   - Typical range: 340-420 shipments/day

### Tier 2: Operational Deep-Dive Metrics

5. **Regional Performance Breakdown**
   - 5 regions: Northeast, Southeast, Midwest, Southwest, West
   - Per region: OTD%, Volume, Exception Count, WoW Trend
   - Visual: Horizontal bar chart showing OTD% with target line
   - Sort by: worst-performing first (draws attention to problems)

6. **Carrier & Mode Split**
   - Modes: Truckload (TL), Less-than-Truckload (LTL), Intermodal, Air, Parcel
   - Distribution: LTL 44%, TL 31%, Intermodal 12%, Parcel 8%, Air 5%
   - Average cost per mode (reveals efficiency)
   - OTD% by mode (reveals reliability)

7. **Top Lanes by Volume**
   - Origin → Destination city pairs
   - Top 10 lanes with volume count
   - OTD% per lane
   - Exception rate per lane
   - Example lanes:
     - Los Angeles, CA → Dallas, TX (87 shipments/week)
     - Chicago, IL → Atlanta, GA (76 shipments/week)
     - Newark, NJ → Miami, FL (63 shipments/week)

8. **Exception Queue Detail**
   - Type breakdown: Late Delivery, Damaged Freight, Missing POD, Customs Hold, Address Issue, Carrier Delay, Weight Discrepancy
   - Age distribution: <24h, 24-48h, 48-72h, >72h
   - Severity levels: Critical (customer escalation), High (SLA risk), Medium (monitoring)
   - Assignment status: Assigned vs. Unassigned
   - Interactive: Click to view shipment details

### Tier 3: Trend Analysis (Context for Decisions)

9. **OTD% Trend (90 days)**
   - Line chart showing daily OTD%
   - Target line at 94%
   - Annotate significant drops (weather events, carrier issues)
   - Regional breakdown overlay option

10. **Volume Trend (30 days)**
   - Bar chart: Created vs. Delivered by day
   - Identifies capacity issues or delivery bottlenecks
   - Day-of-week patterns visible

11. **Exception Aging Distribution**
   - Histogram: How long have exceptions been open?
   - Target: 80% resolved within 24h
   - Current: 52% within 24h (gap to close)

---

## Data Model

### Core Entities

```typescript
// Shipment — core operational unit
interface Shipment {
  id: string;                    // e.g., "SHP-2026-042501"
  status: ShipmentStatus;
  
  // Origin & Destination
  origin: Location;
  destination: Location;
  
  // Carrier & Mode
  carrier: string;               // e.g., "Swift Logistics", "XPO", "FedEx Freight"
  mode: ShipmentMode;
  
  // Timing
  createdAt: Date;
  pickupScheduled: Date;
  pickupActual?: Date;
  deliveryScheduled: Date;
  deliveryActual?: Date;
  
  // Classification
  region: Region;                // Based on destination state
  
  // Cargo Details
  weight: number;                // lbs
  palletCount?: number;
  commodityType: string;         // e.g., "Electronics", "Food & Beverage"
  declaredValue: number;         // USD
  
  // Exception Reference
  hasException: boolean;
  exceptionId?: string;
  
  // Metadata
  customerRef?: string;
  internalNotes?: string;
}

enum ShipmentStatus {
  PENDING_PICKUP = "PENDING_PICKUP",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  EXCEPTION = "EXCEPTION",
  CANCELLED = "CANCELLED"
}

enum ShipmentMode {
  TRUCKLOAD = "TRUCKLOAD",           // Full truck, point-to-point
  LTL = "LTL",                       // Less-than-truckload, multi-stop
  INTERMODAL = "INTERMODAL",         // Rail + truck
  AIR = "AIR",                       // Air freight
  PARCEL = "PARCEL"                  // Small package
}

interface Location {
  city: string;
  state: string;                 // 2-letter code
  zip: string;
  facilityName?: string;
}

enum Region {
  NORTHEAST = "NORTHEAST",       // NY, NJ, CT, MA, PA, VT, NH, ME
  SOUTHEAST = "SOUTHEAST",       // FL, GA, SC, NC, VA, TN, AL, MS
  MIDWEST = "MIDWEST",           // IL, OH, IN, MI, WI, MN, MO, IA
  SOUTHWEST = "SOUTHWEST",       // TX, AZ, NM, CO, NV, UT
  WEST = "WEST"                  // CA, OR, WA, ID, MT
}

// Exception — operational problem requiring resolution
interface Exception {
  id: string;                    // e.g., "EXC-2026-001827"
  shipmentId: string;
  type: ExceptionType;
  severity: ExceptionSeverity;
  
  // Timeline
  openedAt: Date;
  resolvedAt?: Date;
  
  // Ownership
  assignedTo?: string;           // User/team name
  
  // Details
  description: string;
  resolution?: string;
  rootCause?: string;
  
  // Metadata
  customerNotified: boolean;
  impactedDeliveryDate?: Date;
}

enum ExceptionType {
  LATE_DELIVERY = "LATE_DELIVERY",
  DAMAGED_FREIGHT = "DAMAGED_FREIGHT",
  MISSING_POD = "MISSING_POD",                 // Proof of Delivery
  CUSTOMS_HOLD = "CUSTOMS_HOLD",
  ADDRESS_ISSUE = "ADDRESS_ISSUE",
  CARRIER_DELAY = "CARRIER_DELAY",
  WEIGHT_DISCREPANCY = "WEIGHT_DISCREPANCY"
}

enum ExceptionSeverity {
  CRITICAL = "CRITICAL",         // Customer escalation, SLA breach imminent
  HIGH = "HIGH",                 // SLA at risk, requires immediate attention
  MEDIUM = "MEDIUM"              // Monitoring, plan in place
}

// RegionalPerformance — aggregated metrics per region
interface RegionalPerformance {
  region: Region;
  
  // Performance (last 7 days unless specified)
  otdPercentage: number;         // 0-100
  
  // Volume
  totalShipments: number;
  deliveredShipments: number;
  inTransitShipments: number;
  
  // Problems
  exceptionCount: number;
  criticalExceptions: number;
  
  // Trend
  otdTrend: "UP" | "DOWN" | "STABLE";  // WoW comparison
  trendDelta: number;            // Percentage points
}

// DailyVolume — time-series data for trend analysis
interface DailyVolume {
  date: Date;                    // Date at midnight UTC
  
  // Flow metrics
  shipmentsCreated: number;      // New shipments entered
  shipmentsDelivered: number;    // Completed deliveries
  shipmentsInTransit: number;    // Active at end of day
  
  // Quality
  onTimeDeliveries: number;
  lateDeliveries: number;
  otdPercentage: number;
  
  // Exceptions
  newExceptions: number;
  resolvedExceptions: number;
  openExceptions: number;        // Cumulative at end of day
}

// Lane — high-volume origin-destination pair
interface Lane {
  id: string;
  origin: Location;
  destination: Location;
  
  // Performance (last 30 days)
  shipmentCount: number;
  otdPercentage: number;
  exceptionRate: number;         // Exceptions per 100 shipments
  avgTransitDays: number;
  
  // Economics
  avgCost: number;
  preferredCarrier?: string;
}

// CarrierPerformance — vendor scorecard
interface CarrierPerformance {
  carrierName: string;
  mode: ShipmentMode;
  
  // Volume (last 30 days)
  shipmentCount: number;
  marketShare: number;           // Percentage of total
  
  // Quality
  otdPercentage: number;
  exceptionRate: number;
  avgTransitTime: number;        // Days
  
  // Trend
  performanceTrend: "IMPROVING" | "DECLINING" | "STABLE";
}
```

---

## Tech Stack Decision

### Frontend Framework: **React 19 with TypeScript + Vite**

**Rationale:**
- **React 19:** Latest stable, excellent TypeScript support, mature ecosystem
- **Vite:** Lightning-fast dev server, optimized production builds, minimal config
- **TypeScript:** Catch errors at compile-time, self-documenting interfaces, better IDE experience
- **Trade-off:** More setup than Create React App, but significantly faster iteration

### Styling: **Tailwind CSS 4.x**

**Rationale:**
- **Rapid UI iteration:** Utility-first classes = no context switching to CSS files
- **Design token system:** Configure once in `tailwind.config.ts`, use everywhere
- **Consistent spacing/sizing:** Design system enforcement built-in
- **Production optimization:** Automatic purging of unused styles
- **Trade-off:** Verbose className strings, but worth it for velocity

### Charts: **Recharts**

**Rationale:**
- **React-native:** Declarative components, not imperative D3 code
- **Customizable:** Full control over colors, labels, tooltips
- **Responsive:** Built-in responsive containers
- **Good enough:** Not as powerful as D3, but perfect for business dashboards
- **Alternative considered:** Chart.js (more features, but imperative API doesn't fit React patterns)

### State Management: **Zustand**

**Rationale:**
- **Minimal boilerplate:** No providers, no reducers, no actions
- **TypeScript-first:** Excellent type inference
- **Use case fit:** Dashboard filtering state (date range, region, status) needs global access
- **Lightweight:** 1KB gzipped, doesn't fight React
- **Why not Context?** Context causes re-renders on any change; Zustand lets components subscribe to slices
- **Why not Redux?** Overkill for this scope, too much ceremony

### Icons: **Lucide React**

**Rationale:**
- **Consistent design language:** All icons feel cohesive
- **Tree-shakeable:** Only bundle icons you use
- **Stroke-based:** Easy to theme, scales well
- **Logistics-appropriate icons:** TruckIcon, PackageIcon, AlertTriangleIcon, etc.

### Data Layer: **Mock Data (`src/data/mockData.ts`)**

**Structure:**
```
src/data/
├── mockData.ts              # 200+ shipments, 25+ exceptions, 90 days volume
├── generators.ts            # Realistic data generation helpers
└── queries.ts               # getShipmentsByRegion(), getOTDTrend(), etc.
```

**Rationale:**
- **No backend needed:** Prototype can run entirely client-side
- **Realistic testing:** Seeded data reveals UI edge cases (long city names, zero exceptions, etc.)
- **Demo-ready:** Runs without API keys, database, or network
- **Migration path:** Replace query functions with API calls later, no component changes

### No Backend (For Now)

**Rationale:**
- **Speed to value:** VP can see working dashboard in days, not weeks
- **Iteration freedom:** Change data structure without migrations
- **Deployment simplicity:** Static site hosting (Vercel, Netlify)
- **Future path:** When real data integration needed, add Next.js API routes or separate backend

---

## File Structure

```
fastforward-dashboard/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx         # Main layout container
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── metrics/
│   │   │   ├── MetricCard.tsx       # KPI display component
│   │   │   ├── TrendIndicator.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── tables/
│   │   │   ├── ExceptionQueue.tsx
│   │   │   ├── TopLanes.tsx
│   │   │   └── RegionalPerformance.tsx
│   │   ├── charts/
│   │   │   ├── OTDTrendChart.tsx
│   │   │   ├── VolumeBarChart.tsx
│   │   │   ├── ModeDonutChart.tsx
│   │   │   └── Sparkline.tsx
│   │   ├── overlays/
│   │   │   ├── ShipmentDrawer.tsx   # Slide-in detail panel
│   │   │   └── FilterBar.tsx
│   │   └── ui/
│   │       ├── EmptyState.tsx
│   │       └── LoadingSkeleton.tsx
│   ├── data/
│   │   ├── mockData.ts
│   │   ├── generators.ts
│   │   └── queries.ts
│   ├── store/
│   │   └── dashboardStore.ts        # Zustand global state
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── utils/
│   │   ├── formatters.ts            # Date, number, currency formatting
│   │   └── constants.ts             # Status colors, region mappings
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Non-Functional Requirements

### Performance
- **Initial load:** < 2 seconds on 4G connection
- **Interaction responsiveness:** < 100ms for filter changes
- **Chart rendering:** < 500ms for 90 days of data

### Browser Support
- **Primary:** Chrome 120+, Edge 120+ (meeting room displays often run Chrome)
- **Secondary:** Safari 17+, Firefox 120+
- **Mobile:** Not prioritized (leadership meetings use large displays)

### Accessibility
- **WCAG 2.1 AA compliance** (baseline)
- **Keyboard navigation:** All interactive elements accessible via keyboard
- **Screen reader support:** Semantic HTML, ARIA labels on icon buttons
- **Color contrast:** 4.5:1 minimum for text, 3:1 for large text and UI components
- **Not required:** Full screen reader optimization (primary user is sighted VP)

### Responsiveness
- **Primary breakpoint:** 1920×1080 (meeting room displays)
- **Minimum supported:** 1280×720 (laptop displays)
- **Mobile:** Graceful degradation, not full mobile UX

---

## Risks & Assumptions

### Assumptions
1. **Data freshness:** Mock data is acceptable for prototype; real-time not required yet
2. **Single tenant:** All users see same data (no per-user filtering or permissions)
3. **Read-only:** No create/update/delete operations in v1
4. **US-only:** No international shipments, all times in local timezones

### Technical Risks
1. **Performance with large datasets:** 200 shipments is manageable; 20,000 may need virtualization
2. **Chart performance:** Recharts can struggle with 1000+ data points; may need downsampling
3. **State management scaling:** If filtering becomes complex, Zustand may need refactor

### Product Risks
1. **Metric definition ambiguity:** "On-time" may mean different things to different stakeholders
2. **Regional boundaries:** State assignments may not match operational team structure
3. **Exception severity scoring:** Subjective; may need calibration with ops team

---

## Success Metrics (How We'll Know This Works)

### Immediate (After Prototype Demo)
- VP can answer "Are we on time?" in < 10 seconds
- VP identifies worst-performing region without asking questions
- Ops manager can find critical exceptions in < 5 seconds

### Short-term (After 2 Weeks in Production)
- Leadership meetings reference dashboard metrics (vs. verbal reports)
- Reduction in "What's our OTD?" Slack messages
- Exception resolution time decreases (visibility drives action)

### Long-term (3+ Months)
- Dashboard becomes "single source of truth" for operational metrics
- Regional leads request drill-down features (proof of adoption)
- Executive team requests similar dashboards for other functions

---

*Discovery complete. Awaiting user review before proceeding to sitemap and wireframes.*
