import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  count,
  defaultOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <ChevronRight
            className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </span>
          {count !== undefined && (
            <span className="px-2 py-0.5 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
              {count}
            </span>
          )}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 pt-0 border-t border-slate-200 dark:border-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};
