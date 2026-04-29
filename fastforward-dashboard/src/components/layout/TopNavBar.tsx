import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const TopNavBar: React.FC = () => {
  const { theme, toggleTheme } = useDashboardStore();

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-content mx-auto px-10 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-teal-600 rounded-lg">
              <span className="text-white font-bold text-xl">FF</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                FastForward Logistics
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operations Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
