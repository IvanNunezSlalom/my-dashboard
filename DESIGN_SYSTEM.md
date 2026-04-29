# FastForward Logistics — Design System

## Brand Identity

### Logo Concept
**"FastForward" Wordmark with Motion Element**

Concept: Clean, modern wordmark with "Fast" and "Forward" stacked or side-by-side. The double-F creates a natural visual rhythm. A subtle forward-facing arrow or chevron integrated into the letterforms suggests momentum and precision.

**Logo treatment for dashboard:**
- Primary: Full wordmark "FastForward Logistics" in navigation
- Secondary: "FF" monogram for compact spaces or favicon
- Color: Deep teal on light backgrounds, white on dark backgrounds

---

## Color System

### Primary Brand Color
**Deep Teal** - `#0d9488` (Tailwind: teal-600)

**Rationale:** Teal bridges the professionalism of blue with the energy of green. It evokes:
- **Trust & Reliability** (blue undertones)
- **Movement & Progress** (green undertones)  
- **Precision & Clarity** (saturated but not overwhelming)
- **Logistics industry-appropriate** (not the overused corporate blue)

**Usage:**
- Primary action buttons
- Links and interactive elements
- Active navigation states
- Accent elements (borders, icons)

### Neutral Palette (Tailwind Slate)
Foundation for all layouts, surfaces, and text hierarchy.

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| **Gray 50** | `#f8fafc` | slate-50 | Page background |
| **Gray 100** | `#f1f5f9` | slate-100 | Section backgrounds, subtle dividers |
| **Gray 200** | `#e2e8f0` | slate-200 | Borders, dividers |
| **Gray 300** | `#cbd5e1` | slate-300 | Disabled states, muted borders |
| **Gray 400** | `#94a3b8` | slate-400 | Placeholder text |
| **Gray 500** | `#64748b` | slate-500 | Secondary text, labels |
| **Gray 600** | `#475569` | slate-600 | Body text |
| **Gray 700** | `#334155` | slate-700 | Headings, emphasis |
| **Gray 800** | `#1e293b` | slate-800 | High-contrast text |
| **Gray 900** | `#0f172a` | slate-900 | Maximum contrast (use sparingly) |

**White:** `#ffffff` - Card backgrounds, pure white surfaces  
**Black:** `#000000` - Reserved for maximum contrast only (not for body text)

### Semantic Colors (Status & Feedback)

#### Success - Green
- **Primary:** `#059669` (green-600) - Delivered status, OTD met, positive trends
- **Light:** `#d1fae5` (green-100) - Success background
- **Dark:** `#047857` (green-700) - Success text on light background
- **Usage:** "Delivered" badges, ▲ positive trend indicators, OTD above target

#### Warning - Amber
- **Primary:** `#d97706` (amber-600) - At-risk status, approaching threshold
- **Light:** `#fef3c7` (amber-100) - Warning background
- **Dark:** `#b45309` (amber-700) - Warning text
- **Usage:** OTD 90-94% (below target but not critical), exceptions aging 24-48h

#### Danger - Red
- **Primary:** `#dc2626` (red-600) - Exception status, critical issues, late deliveries
- **Light:** `#fee2e2` (red-100) - Error background
- **Dark:** `#b91c1c` (red-700) - Error text
- **Usage:** "Exception" status, OTD <90%, critical severity, >48h open exceptions

#### Info - Blue
- **Primary:** `#3b82f6` (blue-600) - In-transit status, informational elements
- **Light:** `#dbeafe` (blue-100) - Info background
- **Dark:** `#1d4ed8` (blue-700) - Info text
- **Usage:** "In Transit" badges, informational tooltips, neutral data points

---

## Typography

### Font Families

#### Headings: **Inter**
**Rationale:** Modern, geometric sans-serif with excellent legibility. Strong at large sizes, professional without being corporate-stuffy. Wide character set, excellent number rendering.

**Weights used:**
- 600 (Semi-bold) — Section headings, metric labels
- 700 (Bold) — Page titles, emphasis

**Google Fonts import:**
```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

#### Body & Data: **Inter** (same family)
**Rationale:** Using a single font family creates visual cohesion and reduces load time. Inter is designed for UI, making it perfect for both headings and data-dense tables.

**Weights used:**
- 400 (Regular) — Body text, table cells
- 500 (Medium) — Labels, emphasized body text
- 600 (Semi-bold) — Metric cards, important numbers

**Number rendering:** Use `font-variant-numeric: tabular-nums` for all numeric values to ensure consistent width and alignment.

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Example |
|---------|------|--------|-------------|----------------|---------|
| **Display (Hero)** | 56px | 700 | 1.1 | -0.02em | Metric card values |
| **H1** | 32px | 600 | 1.2 | -0.01em | Status banner headline |
| **H2** | 24px | 600 | 1.3 | -0.01em | Chart titles |
| **H3** | 20px | 600 | 1.4 | 0 | Section headers |
| **H4** | 18px | 600 | 1.4 | 0 | Subsection headers |
| **Body Large** | 18px | 400 | 1.6 | 0 | Insight text, key descriptions |
| **Body** | 16px | 400 | 1.5 | 0 | Standard body text |
| **Body Small** | 14px | 400 | 1.5 | 0 | Table cells, secondary text |
| **Caption** | 12px | 500 | 1.4 | 0.02em | Chart labels, footnotes |
| **Overline** | 12px | 600 | 1.3 | 0.08em | Uppercase labels, categories |

### Text Colors
- **Primary:** slate-700 (#334155) - Body text
- **Secondary:** slate-500 (#64748b) - Labels, less important text
- **Muted:** slate-400 (#94a3b8) - Placeholder, disabled
- **High Contrast:** slate-800 (#1e293b) - Headings

---

## Spacing System

### Base Unit: 4px
All spacing follows a 4px grid for visual consistency.

**Tailwind spacing tokens:**
- 1 = 4px
- 2 = 8px
- 3 = 12px
- 4 = 16px
- 5 = 20px
- 6 = 24px
- 8 = 32px
- 10 = 40px
- 12 = 48px
- 16 = 64px
- 20 = 80px

### Spacing Usage Guidelines

**Component Internal Padding:**
- Small elements (badges, pills): `px-3 py-1` (12px × 4px)
- Medium elements (buttons, inputs): `px-4 py-2` (16px × 8px)
- Large elements (cards): `p-6` (24px)
- Extra-large containers: `p-8` (32px)

**Component Spacing (Gaps Between Elements):**
- Tight grouping (related items): `gap-2` (8px)
- Standard grouping: `gap-4` (16px)
- Section separation: `gap-6` (24px)
- Major section separation: `gap-10` (40px)

**Layout Spacing:**
- Content max-width: `1400px`
- Page horizontal padding: `px-10` (40px)
- Section vertical padding: `py-10` (40px)

---

## Border Radius

| Element | Radius | Tailwind | Usage |
|---------|--------|----------|-------|
| **Small** | 4px | `rounded` | Badges, pills |
| **Medium** | 8px | `rounded-lg` | Buttons, inputs, small cards |
| **Large** | 12px | `rounded-xl` | Metric cards, chart containers |
| **Extra Large** | 16px | `rounded-2xl` | Major content containers |
| **Full** | 9999px | `rounded-full` | Avatar, circular indicators |

**Philosophy:** Generous but not excessive. 12px is the default for most cards — friendly and modern without being toy-like.

---

## Shadows

Shadows create depth hierarchy. Use sparingly to avoid a "floaty" interface.

### Shadow Scale

| Level | Tailwind | Usage | Example |
|-------|----------|-------|---------|
| **None** | `shadow-none` | Flush surfaces | Inline text elements |
| **Subtle** | `shadow-sm` | Slight elevation | Input fields |
| **Default** | `shadow` | Cards at rest | Metric cards, tables |
| **Medium** | `shadow-md` | Hover states | Interactive cards on hover |
| **Large** | `shadow-lg` | Modals, drawers | Shipment detail drawer |
| **Extra Large** | `shadow-xl` | Overlays | Full-screen overlays |

**Custom shadow for cards:**
```css
.card-shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.03), 0 1px 2px -1px rgb(0 0 0 / 0.03);
}

.card-shadow-hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
}
```

**Interaction:** Cards lift on hover by transitioning from `shadow` to `shadow-md`.

---

## Component Inventory

### 1. MetricCard
**Purpose:** Display single KPI value with trend indicator

**Anatomy:**
```
┌─────────────────────────┐
│ Label (caption style)   │
│                         │
│ 91.3%  ▼ 2.1%          │
│ (huge) (trend + delta) │
│                         │
│ [Sparkline - optional]  │
└─────────────────────────┘
```

**Props:**
- `label: string` - "On-Time Delivery"
- `value: string | number` - 91.3 or "91.3%"
- `trend?: "up" | "down" | "stable"` - Determines icon
- `trendValue?: string` - "2.1%" (appears next to trend icon)
- `status?: "success" | "warning" | "danger" | "neutral"` - Colors the value and trend
- `sparklineData?: number[]` - Optional mini chart
- `onClick?: () => void` - Optional click handler

**Styling:**
- Background: white
- Padding: `p-6`
- Border radius: `rounded-xl`
- Shadow: `shadow` default, `shadow-md` on hover
- Transition: all 200ms

---

### 2. StatusBadge
**Purpose:** Color-coded status indicator

**Variants:**
- **Delivered** - Green background (`green-100`), green text (`green-700`)
- **In Transit** - Blue background (`blue-100`), blue text (`blue-700`)
- **Pending Pickup** - Gray background (`gray-100`), gray text (`gray-700`)
- **Exception** - Red background (`red-100`), red text (`red-700`)
- **Delayed** - Red (same as Exception)
- **Out for Delivery** - Blue (same as In Transit)

**Styling:**
- Padding: `px-3 py-1`
- Border radius: `rounded-full`
- Font: 12px, medium weight
- Text transform: capitalize

**Props:**
- `status: ShipmentStatus`
- `size?: "sm" | "md" | "lg"`

---

### 3. TrendIndicator
**Purpose:** Show directional change with icon + value

**Variants:**
- **Up (Positive)** - Green, ▲ icon, "▲ 2.1%"
- **Down (Negative)** - Red, ▼ icon, "▼ 2.1%"
- **Stable** - Gray, ─ icon, "─ 0.0%"

**Props:**
- `direction: "up" | "down" | "stable"`
- `value: string` - "2.1%"
- `sentiment?: "good" | "bad" | "neutral"` - Sometimes "up" is bad (exceptions increasing)

**Styling:**
- Inline flex with icon + text
- Font: 14px, medium weight
- Icon size: 16px

---

### 4. RegionalPerformanceRow
**Purpose:** Single row showing region performance with horizontal OTD bar

**Anatomy:**
```
Northeast    ████░░░░░░ 88.2%    214 shipments    12 exceptions   ▼ 3.1%
[Label]      [Progress Bar]      [Volume]         [Exception]     [Trend]
```

**Props:**
- `region: Region`
- `otdPercentage: number`
- `volume: number`
- `exceptionCount: number`
- `trend: TrendData`
- `onClick?: () => void` - Filter to this region

**Styling:**
- Hover: background changes to `slate-50`, cursor pointer
- Bar: 10px height, `rounded-full`
  - Fill color: Green if ≥94%, amber if 90-94%, red if <90%
  - Background: `slate-200`
- Target line overlay at 94% position (dashed)

---

### 5. Sparkline
**Purpose:** Tiny inline chart showing trend in metric card

**Props:**
- `data: number[]` - Array of values (last 7 or 30 days)
- `color?: string` - Line color, defaults to teal
- `width: number` - 80-120px typical
- `height: number` - 30-40px typical

**Styling:**
- No axes, no labels
- Thin line (2px stroke)
- Subtle `stroke-opacity: 0.7`

**Implementation:** Recharts `<LineChart>` with minimal config

---

### 6. OTDTrendChart
**Purpose:** Primary line chart showing 90-day OTD% trend

**Features:**
- X-axis: Date labels (weekly intervals)
- Y-axis: Percentage (80-100% range)
- Target line: Dashed horizontal line at 94%
- Current value annotation
- Hover tooltips with date, OTD%, delta from target

**Props:**
- `data: DailyVolume[]`
- `showRegions?: boolean` - Toggle to show 5 regional lines

**Styling:**
- Height: 500px
- Line color: Teal (`#0d9488`)
- Target line: Gray dashed (`slate-400`)
- Grid lines: Subtle (`slate-200`)
- Tooltip: White background, `shadow-lg`, `rounded-lg`

---

### 7. VolumeBarChart
**Purpose:** Dual-bar chart showing Created vs Delivered by day

**Features:**
- X-axis: Date labels (last 30 days)
- Y-axis: Shipment count
- Two bars per day: Created (teal), Delivered (green)
- Hover tooltips with counts

**Props:**
- `data: DailyVolume[]`

**Styling:**
- Height: 300px (smaller than OTD trend)
- Bar colors: Created `teal-500`, Delivered `green-500`
- Bar radius: `rounded-t` (top corners only)

---

### 8. ModeDonutChart
**Purpose:** Show shipment mode distribution

**Props:**
- `data: { mode: string, count: number, percentage: number }[]`

**Styling:**
- Height: 300px
- Colors: Distinct colors per mode from teal/blue/green/amber palette
- Center label: Total count
- Legend: Right-aligned, shows mode name, percentage, count

---

### 9. ExceptionTable
**Purpose:** Tabular list of open exceptions (for future expansion panel)

**Columns:**
- Exception ID (monospace)
- Type (badge)
- Severity (colored dot + text)
- Age (color-coded by threshold)
- Shipment ID (link)
- Assigned To

**Props:**
- `exceptions: Exception[]`
- `onRowClick: (exception) => void`

**Styling:**
- Zebra striping: Alternate rows `slate-50` background
- Hover: `slate-100` background
- Header: `slate-700` text, `slate-200` bottom border
- Row height: 56px (comfortable click target)

---

### 10. ShipmentDrawer
**Purpose:** Slide-in panel with full shipment details

**Anatomy:**
- Header: Shipment ID, status badge, close button
- Timeline: Visual milestones
- Origin/Destination cards
- Carrier & mode info
- Cargo details table
- Exception panel (if exists)
- Internal notes (expandable)

**Props:**
- `shipmentId: string`
- `isOpen: boolean`
- `onClose: () => void`

**Styling:**
- Width: 600px
- Slide-in from right: 300ms ease-out
- Backdrop: `bg-black/30` with `backdrop-blur-sm`
- Shadow: `shadow-2xl`
- Padding: `p-8`

---

### 11. FilterBar
**Purpose:** Sticky filter controls for dashboard

**Anatomy:**
```
[Date Range ▾] [Region ▾] [Status ▾] [Carrier ▾] [Clear All]
```

**Props:**
- Connected to Zustand store

**Styling:**
- Sticky positioning: `top-0 z-10`
- Background: `white` with `backdrop-blur` when scrolled
- Height: 60px
- Shadow appears on scroll: `shadow-sm`

---

### 12. ExpandableSection
**Purpose:** Collapsible section for Regional/Exception detail

**Anatomy:**
```
┌────────────────────────────────────────────┐
│ [▶ View 27 Open Exceptions]               │
└────────────────────────────────────────────┘

(When expanded:)
┌────────────────────────────────────────────┐
│ [▼ View 27 Open Exceptions]               │
│                                            │
│ [Exception table content...]              │
│                                            │
└────────────────────────────────────────────┘
```

**Props:**
- `title: string`
- `count?: number`
- `defaultOpen?: boolean`
- `children: ReactNode`

**Styling:**
- Header: Clickable, full-width button
- Icon: Rotates 90° on expand (transition 200ms)
- Content: Expands with `max-height` animation (500ms ease)
- Border: `slate-200` top and bottom

---

### 13. EmptyState
**Purpose:** Friendly message when no data exists

**Variants:**
- No exceptions: Celebratory tone
- No filtered results: Helpful suggestion
- No data for date range: Informative boundary

**Styling:**
- Center-aligned
- Icon: 48px, `slate-300`
- Heading: `slate-700`, 20px
- Description: `slate-500`, 16px
- Optional action button

---

### 14. LoadingSkeleton
**Purpose:** Animated placeholder during data load

**Usage:**
- Metric cards: Gray rounded rectangles with pulse animation
- Charts: Gray outlined container with pulse
- Table rows: 5 rows of gray bars

**Styling:**
- Background: `slate-200`
- Animation: `animate-pulse` (Tailwind built-in)
- Preserve layout dimensions (no content shift)

---

### 15. StatusBanner
**Purpose:** Hero banner at top of dashboard showing overall health

**Variants:**
- **All Good:** Green background, "✓ All Systems Operating Normally"
- **Below Target:** Yellow background, "⚠️ Performance Below Target"
- **Critical:** Red background, "🚨 Critical Issues Require Attention"

**Props:**
- `status: "good" | "warning" | "critical"`
- `metrics: { otd: number, exceptions: number }`
- `onViewDetails?: () => void`

**Styling:**
- Height: 140px
- Border radius: `rounded-2xl`
- Padding: `p-8`
- Shadow: `shadow-md`
- Status-specific background colors with sufficient contrast for text

---

## Interaction Specifications

### Click Behaviors

**MetricCard Click:**
1. Card scales down to 98% (100ms)
2. Card scales back to 100% (200ms with ease-out)
3. Drawer slides in from right (300ms)
4. Content fades in (200ms, starts at 100ms)

**RegionalPerformanceRow Click:**
1. Row background changes to `teal-50` (100ms)
2. All dashboard content fades to 70% opacity (200ms)
3. Filter applied to store
4. Content re-renders with filtered data
5. Content fades back to 100% (300ms)
6. Filter bar updates to show active filter (highlight in teal)

**Exception Row Click (Future):**
1. Row lifts with shadow (100ms)
2. Drawer opens from right (300ms)
3. Exception detail loads and fades in (200ms)

**Chart Data Point Hover:**
1. Cursor point appears after 150ms delay
2. Tooltip fades in (100ms) at cursor position
3. Vertical line appears from point to X-axis (subtle, `slate-300`)
4. Data point enlarges by 20%

**Filter Dropdown Click:**
1. Dropdown opens below trigger (150ms slide-down)
2. Backdrop darkens (200ms fade)
3. Options list with subtle shadow
4. Clicking option: highlight flash (teal), closes dropdown (200ms)

### Hover States

**Interactive Cards (MetricCard, etc.):**
- Transition: `transition-all duration-200 ease-out`
- Shadow: `shadow` → `shadow-md`
- Transform: `translate-y-[-2px]` (lift 2px)

**Buttons:**
- Primary (teal): Darken by 10% (`hover:bg-teal-700`)
- Secondary (gray): Background appears `hover:bg-slate-100`
- Text buttons: Underline appears `hover:underline`

**Table Rows:**
- Background: `transparent` → `slate-50`
- Cursor: `cursor-pointer`
- Transition: `transition-colors duration-150`

**Chart Elements:**
- Bars: Opacity 100% → 80% for non-hovered bars
- Lines: Stroke width 2px → 3px on hover
- Legend items: Bold on hover, dim other items to 50% opacity

### Focus States (Keyboard Navigation)

**All interactive elements:**
- Outline: `ring-2 ring-teal-500 ring-offset-2`
- Transition: `transition-shadow duration-150`
- No `outline-none` without replacement focus style

**Skip link (accessibility):**
- Hidden off-screen by default
- On focus: Appears at top-left, high z-index, teal background
- Text: "Skip to main content"

### Loading States

**Initial page load:**
1. Skeleton loaders appear immediately (no white flash)
2. Components fade in as data loads (300ms stagger, 100ms between each)
3. Hero metrics load first (priority)
4. Charts load second
5. Tables load last

**Filter change:**
1. Content opacity: 100% → 40% (200ms)
2. Spinner appears in center (small, teal)
3. Data updates
4. Content opacity: 40% → 100% (300ms)

**Chart interaction (toggle regions):**
1. Chart fades to 60% (150ms)
2. Small spinner in top-right corner
3. Re-render with new data
4. Fade back to 100% (200ms)

### Animations

**Micro-interactions:**
- Button click: Scale 98% for 100ms
- Toggle switch: Slide 200ms ease-out
- Checkbox: Checkmark draws in (path animation, 150ms)

**Page transitions (future multi-page):**
- Fade out old content (200ms)
- Fade in new content (300ms, starts at 100ms)
- Total transition: 400ms

**Drawer animations:**
- Open: Slide from right, `translateX(100%)` → `translateX(0)`, 300ms ease-out
- Close: Slide to right, 250ms ease-in (faster exit)
- Backdrop fade: 200ms in, 150ms out

**Expandable sections:**
- Max-height animation with `ease-in-out`, 500ms
- Icon rotation: 200ms `ease-out`
- Content fade-in: 300ms, starts at 200ms (after height begins expanding)

### Error States

**Toast notifications (future):**
- Slide in from top-right
- 4-second display
- Dismiss on click or auto-dismiss
- Color-coded by severity

**Inline errors:**
- Red border appears on input (150ms)
- Error text fades in below (200ms)
- Icon appears next to text (alert-circle)

---

## Accessibility Standards

### Color Contrast
- **Body text (16px):** Minimum 4.5:1 contrast ratio
  - `slate-700` on white background = 9.1:1 ✓
- **Large text (24px+):** Minimum 3:1 contrast ratio
  - All heading combinations tested and compliant ✓
- **UI components:** Minimum 3:1 contrast ratio
  - Status badges: All variants meet 4.5:1+ ✓

### Keyboard Navigation
- All interactive elements reachable via Tab
- Tab order follows visual hierarchy (top-to-bottom, left-to-right)
- Escape key closes all modals/drawers
- Enter/Space activates buttons and toggles
- Arrow keys navigate within dropdowns and selects

### Screen Reader Support
- All images have `alt` text
- Icon-only buttons have `aria-label`
- Status badges have `aria-label` with full context ("Delivered status")
- Charts have `role="img"` and descriptive `aria-label`
- Live regions for dynamic content updates (`aria-live="polite"`)

### Focus Management
- Opening drawer: Focus moves to drawer header
- Closing drawer: Focus returns to trigger element
- Form submission: Focus moves to first error or success message
- Tab trapping in modals (focus doesn't escape to background)

### ARIA Landmarks
- `<nav>` for navigation bar
- `<main>` for dashboard content
- `<aside>` for drawers
- `role="status"` for live metric updates

---

## Implementation Notes

### Tailwind Config
```javascript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0d9488',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        'content': '1400px',
      },
      animation: {
        'slide-in-right': 'slideInRight 300ms ease-out',
        'slide-out-right': 'slideOutRight 250ms ease-in',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
```

### CSS Custom Properties
```css
:root {
  --header-height: 80px;
  --filter-bar-height: 60px;
  --content-max-width: 1400px;
  --drawer-width: 600px;
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
}
```

### Component File Organization
```
src/components/
├── layout/
│   ├── TopNavBar.tsx
│   └── MainContainer.tsx
├── metrics/
│   ├── MetricCard.tsx
│   ├── TrendIndicator.tsx
│   └── StatusBadge.tsx
├── charts/
│   ├── OTDTrendChart.tsx
│   ├── VolumeBarChart.tsx
│   └── Sparkline.tsx
├── sections/
│   ├── StatusBanner.tsx
│   ├── KeyMetrics.tsx
│   ├── RegionalPerformance.tsx
│   └── ExpandableSection.tsx
├── overlays/
│   ├── ShipmentDrawer.tsx
│   └── Drawer.tsx (base component)
└── ui/
    ├── EmptyState.tsx
    ├── LoadingSkeleton.tsx
    └── Button.tsx
```

---

*Design system complete. Ready for build approval.*
