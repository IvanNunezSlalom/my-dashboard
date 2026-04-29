import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { TrendDirection, TrendSentiment } from '../../types';

interface TrendIndicatorProps {
  direction: TrendDirection;
  value: string;
  sentiment?: TrendSentiment;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  direction,
  value,
  sentiment = 'neutral',
}) => {
  const getColorClass = () => {
    if (sentiment === 'good') {
      return 'text-green-600 dark:text-green-400';
    } else if (sentiment === 'bad') {
      return 'text-red-600 dark:text-red-400';
    }
    return 'text-slate-500 dark:text-slate-400';
  };

  const renderIcon = () => {
    if (direction === 'up') {
      return <TrendingUp className="w-4 h-4" />;
    } else if (direction === 'down') {
      return <TrendingDown className="w-4 h-4" />;
    }
    return <Minus className="w-4 h-4" />;
  };

  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium ${getColorClass()}`}>
      {renderIcon()}
      {value}
    </span>
  );
};
