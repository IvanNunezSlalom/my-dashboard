import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DailyVolume } from '../../types';
import { format } from 'date-fns';

interface VolumeBarChartProps {
  data: DailyVolume[];
}

export const VolumeBarChart: React.FC<VolumeBarChartProps> = ({ data }) => {
  const chartData = data.slice(-30).map(d => ({
    date: format(d.date, 'MMM d'),
    created: d.shipmentsCreated,
    delivered: d.shipmentsDelivered,
    fullDate: format(d.date, 'MMM d, yyyy'),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <XAxis
          dataKey="date"
          tick={{ className: 'fill-slate-600 dark:fill-slate-400 text-xs' }}
          tickLine={{ className: 'stroke-slate-300 dark:stroke-slate-600' }}
          interval={4}
        />
        <YAxis
          tick={{ className: 'fill-slate-600 dark:fill-slate-400 text-xs' }}
          tickLine={{ className: 'stroke-slate-300 dark:stroke-slate-600' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: '#334155', fontWeight: 600 }}
          labelFormatter={(label, payload) => payload[0]?.payload?.fullDate || label}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="rect"
        />
        <Bar
          dataKey="created"
          fill="#0d9488"
          name="Created"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="delivered"
          fill="#059669"
          name="Delivered"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
