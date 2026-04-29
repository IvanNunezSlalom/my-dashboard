import React from 'react';
import type { RegionalPerformance as RegionalPerformanceType } from '../../types';
import { Region } from '../../types';
import { TrendIndicator } from '../metrics/TrendIndicator';

interface RegionalPerformanceProps {
  data: RegionalPerformanceType[];
}

const REGION_LABELS: Record<Region, string> = {
  [Region.NORTHEAST]: 'Northeast',
  [Region.SOUTHEAST]: 'Southeast',
  [Region.MIDWEST]: 'Midwest',
  [Region.SOUTHWEST]: 'Southwest',
  [Region.WEST]: 'West',
};

export const RegionalPerformance: React.FC<RegionalPerformanceProps> = ({ data }) => {
  const getOTDColor = (otd: number) => {
    if (otd >= 94) return 'bg-green-500';
    if (otd >= 90) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-3">
      {data.map((region) => {
        const barWidth = Math.max(0, Math.min(100, region.otdPercentage));

        return (
          <div
            key={region.region}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
          >
            <div className="w-32 flex-shrink-0">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {REGION_LABELS[region.region]}
              </span>
            </div>

            <div className="flex-1">
              <div className="relative h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${getOTDColor(
                    region.otdPercentage
                  )} transition-all duration-300 rounded-full`}
                  style={{ width: `${barWidth}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 drop-shadow">
                    {region.otdPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="absolute left-[94%] top-0 bottom-0 w-0.5 bg-slate-400 dark:bg-slate-500 opacity-50" />
            </div>

            <div className="w-28 flex-shrink-0 text-right">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {region.totalShipments} shipments
              </span>
            </div>

            <div className="w-24 flex-shrink-0 text-right">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {region.exceptionCount} exceptions
              </span>
            </div>

            <div className="w-20 flex-shrink-0 text-right">
              <TrendIndicator
                direction={region.otdTrend === 'UP' ? 'up' : region.otdTrend === 'DOWN' ? 'down' : 'stable'}
                value={`${Math.abs(region.trendDelta).toFixed(1)}%`}
                sentiment={region.otdTrend === 'UP' ? 'good' : region.otdTrend === 'DOWN' ? 'bad' : 'neutral'}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
