import { create } from 'zustand';
import type { Region, ShipmentStatus } from '../types';

interface DashboardState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Filters
  dateRange: '7d' | '30d' | '90d' | 'custom';
  selectedRegion: Region | 'all';
  selectedStatus: ShipmentStatus | 'all';
  selectedCarrier: string | 'all';

  setDateRange: (range: '7d' | '30d' | '90d' | 'custom') => void;
  setSelectedRegion: (region: Region | 'all') => void;
  setSelectedStatus: (status: ShipmentStatus | 'all') => void;
  setSelectedCarrier: (carrier: string | 'all') => void;
  clearFilters: () => void;

  // Drawer state
  selectedShipmentId: string | null;
  isShipmentDrawerOpen: boolean;
  openShipmentDrawer: (shipmentId: string) => void;
  closeShipmentDrawer: () => void;

  // Expandable sections
  isRegionalExpanded: boolean;
  isExceptionsExpanded: boolean;
  toggleRegionalExpanded: () => void;
  toggleExceptionsExpanded: () => void;
}

// Initialize theme from system preference or localStorage
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem('ff-theme');
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useDashboardStore = create<DashboardState>((set) => ({
  // Theme
  theme: getInitialTheme(),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('ff-theme', newTheme);

    // Update document class for Tailwind dark mode
    if (typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    return { theme: newTheme };
  }),

  // Filters
  dateRange: '7d',
  selectedRegion: 'all',
  selectedStatus: 'all',
  selectedCarrier: 'all',

  setDateRange: (range) => set({ dateRange: range }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setSelectedCarrier: (carrier) => set({ selectedCarrier: carrier }),
  clearFilters: () => set({
    dateRange: '7d',
    selectedRegion: 'all',
    selectedStatus: 'all',
    selectedCarrier: 'all',
  }),

  // Drawer
  selectedShipmentId: null,
  isShipmentDrawerOpen: false,
  openShipmentDrawer: (shipmentId) => set({
    selectedShipmentId: shipmentId,
    isShipmentDrawerOpen: true,
  }),
  closeShipmentDrawer: () => set({
    selectedShipmentId: null,
    isShipmentDrawerOpen: false,
  }),

  // Expandable sections (Option B starts with these collapsed)
  isRegionalExpanded: false,
  isExceptionsExpanded: false,
  toggleRegionalExpanded: () => set((state) => ({
    isRegionalExpanded: !state.isRegionalExpanded,
  })),
  toggleExceptionsExpanded: () => set((state) => ({
    isExceptionsExpanded: !state.isExceptionsExpanded,
  })),
}));
