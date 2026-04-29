import React, { useEffect } from 'react';
import { X, Package, MapPin, Truck, Calendar, DollarSign, Weight } from 'lucide-react';
import type { Shipment, Exception } from '../../types';
import { StatusBadge } from '../metrics/StatusBadge';
import { format } from 'date-fns';

interface ShipmentDrawerProps {
  isOpen: boolean;
  shipment: Shipment | null;
  exception?: Exception;
  onClose: () => void;
}

export const ShipmentDrawer: React.FC<ShipmentDrawerProps> = ({
  isOpen,
  shipment,
  exception,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !shipment) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl z-50 animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {shipment.id}
              </h2>
              <StatusBadge status={shipment.status} size="lg" />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Route</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Origin</div>
                  <div className="font-medium text-slate-700 dark:text-slate-300">
                    {shipment.origin.city}, {shipment.origin.state} {shipment.origin.zip}
                  </div>
                  {shipment.origin.facilityName && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {shipment.origin.facilityName}
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-0.5 bg-slate-300 dark:bg-slate-600 ml-2" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Destination</div>
                  <div className="font-medium text-slate-700 dark:text-slate-300">
                    {shipment.destination.city}, {shipment.destination.state} {shipment.destination.zip}
                  </div>
                  {shipment.destination.facilityName && (
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {shipment.destination.facilityName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Carrier</span>
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  {shipment.carrier}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                  {shipment.mode.toLowerCase().replace('_', ' ')}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Commodity</span>
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  {shipment.commodityType}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Timeline</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Created</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {format(shipment.createdAt, 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Pickup Scheduled</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {format(shipment.pickupScheduled, 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  {shipment.pickupActual && (
                    <div className="text-right">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Actual</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {format(shipment.pickupActual, 'MMM d, h:mm a')}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Delivery Scheduled</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {format(shipment.deliveryScheduled, 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  {shipment.deliveryActual && (
                    <div className="text-right">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Actual</div>
                      <div className={`text-sm font-medium ${
                        shipment.deliveryActual <= shipment.deliveryScheduled
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {format(shipment.deliveryActual, 'MMM d, h:mm a')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Weight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Weight</span>
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  {shipment.weight.toLocaleString()} lbs
                </div>
                {shipment.palletCount && (
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {shipment.palletCount} pallets
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Declared Value</span>
                </div>
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  ${shipment.declaredValue.toLocaleString()}
                </div>
              </div>
            </div>

            {exception && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <h3 className="font-semibold text-red-800 dark:text-red-300">Active Exception</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-red-700 dark:text-red-400">Type:</span>
                    <span className="text-sm font-medium text-red-900 dark:text-red-200">
                      {exception.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-red-700 dark:text-red-400">Severity:</span>
                    <span className="text-sm font-medium text-red-900 dark:text-red-200">
                      {exception.severity}
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-red-700 dark:text-red-400 mb-1">Description:</div>
                    <p className="text-sm text-red-900 dark:text-red-200">
                      {exception.description}
                    </p>
                  </div>
                  {exception.assignedTo && (
                    <div className="flex justify-between pt-2 border-t border-red-200 dark:border-red-800">
                      <span className="text-sm text-red-700 dark:text-red-400">Assigned to:</span>
                      <span className="text-sm font-medium text-red-900 dark:text-red-200">
                        {exception.assignedTo}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {shipment.customerRef && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Customer Reference:</span> {shipment.customerRef}
              </div>
            )}

            {shipment.internalNotes && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-xs text-blue-700 dark:text-blue-400 mb-1">Internal Notes</div>
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  {shipment.internalNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
