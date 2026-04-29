import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { DailyVolume } from '../../types';
import { format } from 'date-fns';

interface OTDTrendChartProps {
  data: DailyVolume[];
}

export const OTDTrendChart: React.FC<OTDTrendChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    date: format(d.date, 'MMM d'),
    otd: Number(d.otdPercentage.toFixed(1)),
    fullDate: format(d.date, 'MMM d, yyyy'),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <XAxis
          dataKey="date"
          tick={{ className: 'fill-slate-600 dark:fill-slate-400 text-xs' }}
          tickLine={{ className: 'stroke-slate-300 dark:stroke-slate-600' }}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[80, 100]}
          tick={{ className: 'fill-slate-600 dark:fill-slate-400 text-xs' }}
          tickLine={{ className: 'stroke-slate-300 dark:stroke-slate-600' }}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: '#334155', fontWeight: 600 }}
          formatter={(value) => [`${value}%`, 'OTD%']}
          labelFormatter={(label, payload) => payload[0]?.payload?.fullDate || label}
        />
        <ReferenceLine
          y={94}
          stroke="#d97706"
          strokeDasharray="5 5"
          label={{
            value: 'Target 94%',
            position: 'right',
            className: 'fill-amber-600 dark:fill-amber-500 text-xs font-medium',
          }}
        />
        <Line
          type="monotone"
          dataKey="otd"
          stroke="#0d9488"
          strokeWidth={3}
          dot={{ fill: '#0d9488', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
