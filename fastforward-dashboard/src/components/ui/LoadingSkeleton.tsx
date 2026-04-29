import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'metric' | 'chart' | 'table' | 'text';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  count = 1,
  className = '',
}) => {
  if (variant === 'metric') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow animate-pulse ${className}`}>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow animate-pulse ${className}`}>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      ))}
    </div>
  );
};
