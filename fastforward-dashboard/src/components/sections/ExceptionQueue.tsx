import React from 'react';
import type { Exception } from '../../types';
import { ExceptionSeverity, ExceptionType } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Clock } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

interface ExceptionQueueProps {
  exceptions: Exception[];
  onExceptionClick?: (exception: Exception) => void;
}

const SEVERITY_CONFIG: Record<ExceptionSeverity, { label: string; color: string; dotColor: string }> = {
  [ExceptionSeverity.CRITICAL]: {
    label: 'Critical',
    color: 'text-red-700 dark:text-red-400',
    dotColor: 'bg-red-500',
  },
  [ExceptionSeverity.HIGH]: {
    label: 'High',
    color: 'text-amber-700 dark:text-amber-400',
    dotColor: 'bg-amber-500',
  },
  [ExceptionSeverity.MEDIUM]: {
    label: 'Medium',
    color: 'text-slate-700 dark:text-slate-400',
    dotColor: 'bg-slate-400',
  },
};

const EXCEPTION_TYPE_LABELS: Record<ExceptionType, string> = {
  [ExceptionType.LATE_DELIVERY]: 'Late Delivery',
  [ExceptionType.DAMAGED_FREIGHT]: 'Damaged Freight',
  [ExceptionType.MISSING_POD]: 'Missing POD',
  [ExceptionType.CUSTOMS_HOLD]: 'Customs Hold',
  [ExceptionType.ADDRESS_ISSUE]: 'Address Issue',
  [ExceptionType.CARRIER_DELAY]: 'Carrier Delay',
  [ExceptionType.WEIGHT_DISCREPANCY]: 'Weight Discrepancy',
};

export const ExceptionQueue: React.FC<ExceptionQueueProps> = ({
  exceptions,
  onExceptionClick,
}) => {
  if (exceptions.length === 0) {
    return <EmptyState variant="no-exceptions" />;
  }

  const getAgeColor = (openedAt: Date) => {
    const hoursAgo = (Date.now() - openedAt.getTime()) / (1000 * 60 * 60);
    if (hoursAgo > 48) return 'text-red-600 dark:text-red-400';
    if (hoursAgo > 24) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="space-y-2">
      {exceptions.map((exception) => {
        const severityConfig = SEVERITY_CONFIG[exception.severity];
        const ageText = formatDistanceToNow(exception.openedAt, { addSuffix: true });

        return (
          <div
            key={exception.id}
            onClick={() => onExceptionClick?.(exception)}
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <div className={`w-3 h-3 rounded-full ${severityConfig.dotColor}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {exception.id}
                </span>
                <span className={`text-xs font-medium ${severityConfig.color}`}>
                  {severityConfig.label}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">
                  {EXCEPTION_TYPE_LABELS[exception.type]}
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="font-mono text-xs">
                  {exception.shipmentId}
                </span>
                {exception.assignedTo && (
                  <>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-xs">
                      {exception.assignedTo}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className={`text-sm font-medium tabular-nums ${getAgeColor(exception.openedAt)}`}>
                {ageText.replace('about ', '')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
