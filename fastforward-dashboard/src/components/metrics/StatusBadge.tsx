import React from 'react';
import { ShipmentStatus } from '../../types';

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const statusConfig: Record<ShipmentStatus, { label: string; bgClass: string; textClass: string }> = {
    [ShipmentStatus.DELIVERED]: {
      label: 'Delivered',
      bgClass: 'bg-green-100 dark:bg-green-900/30',
      textClass: 'text-green-700 dark:text-green-400',
    },
    [ShipmentStatus.IN_TRANSIT]: {
      label: 'In Transit',
      bgClass: 'bg-blue-100 dark:bg-blue-900/30',
      textClass: 'text-blue-700 dark:text-blue-400',
    },
    [ShipmentStatus.OUT_FOR_DELIVERY]: {
      label: 'Out for Delivery',
      bgClass: 'bg-blue-100 dark:bg-blue-900/30',
      textClass: 'text-blue-700 dark:text-blue-400',
    },
    [ShipmentStatus.PENDING_PICKUP]: {
      label: 'Pending Pickup',
      bgClass: 'bg-slate-100 dark:bg-slate-700',
      textClass: 'text-slate-700 dark:text-slate-300',
    },
    [ShipmentStatus.EXCEPTION]: {
      label: 'Exception',
      bgClass: 'bg-red-100 dark:bg-red-900/30',
      textClass: 'text-red-700 dark:text-red-400',
    },
    [ShipmentStatus.CANCELLED]: {
      label: 'Cancelled',
      bgClass: 'bg-slate-100 dark:bg-slate-700',
      textClass: 'text-slate-700 dark:text-slate-300',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${config.bgClass} ${config.textClass}`}
    >
      {config.label}
    </span>
  );
};
