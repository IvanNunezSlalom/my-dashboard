import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface StatusBannerProps {
  otdPercentage: number;
  exceptionCount: number;
  onViewDetails?: () => void;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  otdPercentage,
  exceptionCount,
  onViewDetails,
}) => {
  const isGood = otdPercentage >= 94 && exceptionCount < 20;
  const isWarning = otdPercentage >= 90 && otdPercentage < 94;

  const config = isGood
    ? {
        bgClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        icon: CheckCircle2,
        iconClass: 'text-green-600 dark:text-green-400',
        title: '✓ All Systems Operating Normally',
        description: `On-Time Delivery: ${otdPercentage.toFixed(1)}% | ${exceptionCount} Open Exceptions`,
      }
    : {
        bgClass: isWarning
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        icon: AlertTriangle,
        iconClass: isWarning
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-red-600 dark:text-red-400',
        title: '⚠️ Performance Below Target',
        description: `On-Time Delivery: ${otdPercentage.toFixed(1)}% (Target: 94%) | ${exceptionCount} Open Exceptions`,
      };

  const Icon = config.icon;

  return (
    <div
      className={`rounded-2xl border p-8 shadow-md transition-all duration-200 ${config.bgClass}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon className={`w-8 h-8 ${config.iconClass}`} />
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-1">
              {config.title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {config.description}
            </p>
            {!isGood && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Northeast performance is primary driver of overall decline.
              </p>
            )}
          </div>
        </div>
        {onViewDetails && !isGood && (
          <Button variant="secondary" onClick={onViewDetails}>
            View Details ↓
          </Button>
        )}
      </div>
    </div>
  );
};
