import React from 'react';
import { TrendIndicator } from './TrendIndicator';
import type { MetricCardProps } from '../../types';

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendValue,
  status = 'neutral',
  onClick,
}) => {
  const statusColors = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    neutral: 'text-slate-800 dark:text-slate-100',
  };

  const getTrendSentiment = () => {
    if (status === 'success') return 'good';
    if (status === 'danger' || status === 'warning') return 'bad';
    return 'neutral';
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
      onClick={onClick}
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
        {label}
      </div>
      <div className={`text-display font-bold tabular-nums mb-2 ${statusColors[status]}`}>
        {value}
      </div>
      {trend && trendValue && (
        <TrendIndicator
          direction={trend}
          value={trendValue}
          sentiment={getTrendSentiment()}
        />
      )}
    </div>
  );
};
