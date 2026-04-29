# FastForward Logistics Dashboard — Site Map

## Navigation Model

**Primary Navigation:** Sidebar (persistent, collapsible)
**Secondary Navigation:** Filter bar (contextual, appears on dashboard view)
**Modal/Overlay Navigation:** Slide-in drawers (shipment detail, exception detail)

---

## Site Structure

```
FastForward Dashboard
│
├─ 📊 Dashboard (Default View)
│  │
│  ├─ Hero Metrics Row
│  │  ├─ OTD% Card
│  │  │  └─ [Click] → Filter all data to last 7 days
│  │  ├─ Active Shipments Card
│  │  │  └─ [Click] → Drawer: Shipment breakdown by status
│  │  ├─ Open Exceptions Card
│  │  │  └─ [Click] → Scroll to Exception Queue section
│  │  └─ Daily Volume Card
│  │     └─ [Click] → Drawer: Volume trend detail
│  │
│  ├─ Filter Bar (Sticky)
│  │  ├─ Date Range Picker (Last 7 days / 30 days / 90 days / Custom)
│  │  ├─ Region Filter (All / Northeast / Southeast / Midwest / Southwest / West)
│  │  ├─ Status Filter (All / In Transit / Delivered / Exception)
│  │  ├─ Carrier Filter (All / [List of carriers])
│  │  └─ [Clear All Filters Button]
│  │
│  ├─ Regional Performance Panel
│  │  ├─ Table: Region rows with OTD bar, volume, exceptions
│  │  ├─ [Click Region Row] → Filter entire dashboard to that region
│  │  └─ [Hover Region Bar] → Tooltip: Exact OTD%, target delta
│  │
│  ├─ Charts Grid
│  │  ├─ OTD Trend Line Chart (90 days)
│  │  │  ├─ [Hover Data Point] → Tooltip: Date, OTD%, shipment count
│  │  │  └─ [Toggle] → View by region (5 lines)
│  │  ├─ Volume Bar Chart (30 days)
│  │  │  ├─ Dual bars: Created vs. Delivered
│  │  │  └─ [Click Bar] → Filter to that date
│  │  └─ Mode Split Donut Chart
│  │     ├─ [Hover Segment] → Tooltip: Mode, %, count
│  │     └─ [Click Segment] → Filter to that mode
│  │
│  ├─ Exception Queue
│  │  ├─ Table: ID, Type, Severity, Age, Shipment, Assigned To, Actions
│  │  ├─ [Click Exception Row] → Drawer: Exception detail + linked shipment
│  │  ├─ [Sort By] → Age / Severity / Type
│  │  └─ [Filter By Severity] → Critical / High / Medium
│  │
│  └─ Top Lanes Table
│     ├─ Table: Origin → Destination, Volume, OTD%, Exception Rate
│     ├─ [Click Lane Row] → Filter to that origin-destination pair
│     └─ [Hover OTD%] → Tooltip: On-time count / total count
│
├─ 📦 Shipments (Future View — not in v1)
│  ├─ Searchable shipment list
│  ├─ Advanced filters
│  └─ Bulk actions
│
├─ 🚨 Exceptions (Future View — not in v1)
│  ├─ Full exception management
│  ├─ Assignment workflow
│  └─ Resolution tracking
│
├─ 📈 Analytics (Future View — not in v1)
│  ├─ Custom date range analysis
│  ├─ Carrier scorecards
│  └─ Cost analysis
│
└─ ⚙️ Settings (Future View — not in v1)
   ├─ User preferences
   ├─ Notification rules
   └─ Dashboard customization
```

---

## Overlay / Modal Components

### 1. Shipment Detail Drawer
**Trigger:** Click any shipment ID link in Exception Queue or Shipment lists  
**Type:** Slide-in from right (600px width)  
**Dismissal:** Click backdrop, press Escape, click X button

**Content:**
```
Shipment Detail Drawer
│
├─ Header
│  ├─ Shipment ID (large)
│  ├─ Status Badge
│  └─ [Close Button]
│
├─ Timeline (Visual)
│  ├─ Created → Pickup → In Transit → Delivery
│  └─ Timestamps for each milestone
│
├─ Origin & Destination
│  ├─ Origin: City, State, Zip, Facility
│  └─ Destination: City, State, Zip, Facility
│
├─ Carrier & Mode
│  ├─ Carrier Name
│  ├─ Mode Badge
│  └─ Tracking Number (if applicable)
│
├─ Cargo Details
│  ├─ Weight, Pallet Count
│  ├─ Commodity Type
│  └─ Declared Value
│
├─ Exception Panel (if exists)
│  ├─ Exception Type Badge
│  ├─ Severity
│  ├─ Opened timestamp
│  ├─ Assigned To
│  ├─ Description
│  └─ [View Full Exception Details Button]
│
└─ Internal Notes (expandable)
```

---

### 2. Exception Detail Drawer
**Trigger:** Click exception row in Exception Queue  
**Type:** Slide-in from right (700px width)  
**Dismissal:** Click backdrop, press Escape, click X button

**Content:**
```
Exception Detail Drawer
│
├─ Header
│  ├─ Exception ID (large)
│  ├─ Severity Badge
│  ├─ Type Badge
│  └─ [Close Button]
│
├─ Timeline
│  ├─ Opened: Date + time
│  ├─ Age: X hours (color-coded if > 24h)
│  └─ Resolved: Date + time (if closed)
│
├─ Linked Shipment Summary Card
│  ├─ Shipment ID (clickable → opens Shipment Drawer)
│  ├─ Origin → Destination
│  ├─ Carrier, Mode
│  └─ Scheduled Delivery Date
│
├─ Exception Details
│  ├─ Description (free text)
│  ├─ Root Cause (if identified)
│  ├─ Customer Notified? Yes/No
│  └─ Impacted Delivery Date (if changed)
│
├─ Assignment
│  ├─ Assigned To: Name/Team
│  └─ Assignment Date
│
└─ Resolution Notes (if resolved)
   ├─ Resolution description
   └─ Resolved by + timestamp
```

---

### 3. Volume Trend Detail Drawer
**Trigger:** Click "Daily Volume" metric card  
**Type:** Slide-in from right (800px width)  
**Dismissal:** Click backdrop, press Escape, click X button

**Content:**
```
Volume Trend Detail Drawer
│
├─ Header
│  ├─ Title: "Shipment Volume Trends"
│  └─ [Close Button]
│
├─ Summary Stats (Last 30 Days)
│  ├─ Total Created
│  ├─ Total Delivered
│  ├─ Average Daily Volume
│  └─ Peak Day (date + count)
│
├─ Volume Line Chart (90 days)
│  ├─ Two lines: Created vs. Delivered
│  └─ Hover tooltips
│
└─ Day-of-Week Breakdown Table
   ├─ Mon-Sun average volumes
   └─ Identify capacity patterns
```

---

### 4. Shipment Status Breakdown Drawer
**Trigger:** Click "Active Shipments" metric card  
**Type:** Slide-in from right (600px width)  
**Dismissal:** Click backdrop, press Escape, click X button

**Content:**
```
Active Shipments Breakdown Drawer
│
├─ Header
│  ├─ Title: "Active Shipments by Status"
│  └─ [Close Button]
│
├─ Status Distribution
│  ├─ Pending Pickup: Count + %
│  ├─ In Transit: Count + %
│  ├─ Out for Delivery: Count + %
│  └─ Exception: Count + %
│
├─ Bar Chart
│  └─ Visual representation of above
│
└─ Quick Stats
   ├─ Oldest In-Transit Shipment (age)
   ├─ Average Transit Time (current active)
   └─ Shipments Due Today (count)
```

---

## State Types

### Empty States

#### Empty Exception Queue
**When:** Zero open exceptions  
**Content:**
```
🎉 No Active Exceptions
All shipments are running smoothly.
Last exception resolved: [timestamp]
```

#### Empty Filtered Results
**When:** User applies filters that return no results  
**Content:**
```
No shipments match your filters
Try adjusting the date range, region, or status filters.
[Clear All Filters Button]
```

#### No Data for Date Range
**When:** Selected date range has no shipment data  
**Content:**
```
No data available for this date range
FastForward Logistics dashboard data starts from [earliest date].
```

---

### Loading States

#### Initial Page Load
**When:** App first loads, fetching all data  
**Content:**
- Skeleton loaders for all metric cards (gray pulse animation)
- Skeleton chart outlines
- Skeleton table rows (5 rows)
- No interactive elements visible during load

#### Filter Application Loading
**When:** User changes filter, data is recalculating  
**Content:**
- Overlay with 50% opacity over charts/tables
- Spinner in center
- Metric cards update immediately (no overlay)

#### Chart Interaction Loading
**When:** User toggles chart view (e.g., regional breakdown)  
**Content:**
- Chart fades to 40% opacity
- Small spinner in top-right of chart area
- No full-screen block

---

### Error States

#### Data Load Failure
**When:** Mock data fails to load (file missing, parse error)  
**Content:**
```
⚠️ Unable to load dashboard data
There was a problem loading the shipment data.
[Retry Button]

Technical details: [Error message]
```

#### Chart Render Failure
**When:** Recharts throws error (malformed data)  
**Content:**
```
⚠️ Chart unavailable
This chart could not be displayed.
Other dashboard sections are still available.
```

---

## Navigation Flow Examples

### Scenario 1: VP Investigating Low OTD%
1. **Lands on Dashboard** → Sees OTD% at 91.3% (red)
2. **Scans Regional Performance Panel** → Sees Northeast at 88.2% (worst)
3. **Clicks Northeast Row** → All dashboard data filters to Northeast region
4. **Scrolls to Exception Queue** → Sees 12 open exceptions in Northeast
5. **Clicks top exception row** → Exception Detail Drawer opens
6. **Reads exception description** → Identifies carrier delay pattern
7. **Clicks linked shipment ID** → Shipment Detail Drawer opens (Exception drawer closes)
8. **Reviews shipment details** → Notes carrier and lane
9. **Closes drawer** → Returns to filtered dashboard view
10. **Clicks "Clear All Filters"** → Returns to full view

---

### Scenario 2: Ops Manager Triaging Morning Exceptions
1. **Lands on Dashboard** → Sees 27 open exceptions (elevated)
2. **Scrolls to Exception Queue**
3. **Clicks "Sort by Severity"** → Critical exceptions rise to top
4. **Clicks first critical exception** → Exception Detail Drawer opens
5. **Reads details** → Customer escalation, customs hold
6. **Notes assigned team** → Checks if assigned
7. **Closes drawer** → Opens next critical exception
8. **Repeats** for all critical items
9. **Filters by "Unassigned"** → Identifies exceptions needing assignment
10. **Takes action** outside dashboard (in TMS system)

---

### Scenario 3: Regional Lead Reviewing Southwest Performance
1. **Lands on Dashboard**
2. **Clicks "Southwest" in Region Filter dropdown** → All data filters
3. **Reviews OTD%** → 96.1% (green, best region)
4. **Scrolls to Top Lanes Table** → Sees LA→Dallas as top lane
5. **Clicks LA→Dallas row** → All data filters to that lane + Southwest region
6. **Reviews Volume Bar Chart** → Sees consistent daily volume
7. **Reviews Exception Queue** → Sees only 2 exceptions for this lane
8. **Clicks "Clear All Filters"** → Returns to full view
9. **Compares Southwest to Northeast** (mental comparison, no UI action yet)

---

## Keyboard Navigation

### Global Shortcuts
- `Escape` — Close any open drawer/modal
- `Ctrl/Cmd + K` — Focus search/filter bar
- `/` — Focus region filter
- `?` — Show keyboard shortcuts help modal (future)

### Tab Order (Accessibility)
1. Skip to main content link (hidden, visible on focus)
2. Sidebar navigation items
3. Filter bar controls (date, region, status, carrier, clear)
4. Hero metric cards (4 cards, left to right)
5. Regional performance table rows
6. Chart interactive elements (legend toggles)
7. Exception queue table rows
8. Top lanes table rows
9. Footer links (if any)

### Focus States
All interactive elements (cards, buttons, table rows, chart segments) must have visible focus indicators:
- 2px solid focus ring, using primary brand color
- 4px offset from element edge
- Sufficient contrast against all backgrounds

---

*Sitemap complete. Proceeding to wireframe options.*
