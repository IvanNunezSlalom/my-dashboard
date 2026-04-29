import React from 'react';
import { PackageOpen, Filter } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  variant?: 'no-exceptions' | 'no-results' | 'no-data';
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'no-results',
  onAction,
  actionLabel,
}) => {
  const content = {
    'no-exceptions': {
      icon: PackageOpen,
      title: 'No Active Exceptions',
      description: 'All shipments are running smoothly.',
      subtitle: 'Great job maintaining high service levels!',
    },
    'no-results': {
      icon: Filter,
      title: 'No shipments match your filters',
      description: 'Try adjusting the date range, region, or status filters.',
      subtitle: null,
    },
    'no-data': {
      icon: PackageOpen,
      title: 'No data available for this date range',
      description: 'FastForward Logistics dashboard data may not be available for the selected period.',
      subtitle: null,
    },
  };

  const { icon: Icon, title, description, subtitle } = content[variant];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Icon className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-1 max-w-md">
        {description}
      </p>
      {subtitle && (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      )}
      {onAction && actionLabel && (
        <Button variant="secondary" onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
