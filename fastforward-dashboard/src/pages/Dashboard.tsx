import React, { useMemo } from 'react';
import { mockData } from '../data/mockData';
import { ShipmentStatus } from '../types';
import { MetricCard } from '../components/metrics/MetricCard';
import { StatusBanner } from '../components/sections/StatusBanner';
import { OTDTrendChart } from '../components/charts/OTDTrendChart';
import { VolumeBarChart } from '../components/charts/VolumeBarChart';
import { RegionalPerformance } from '../components/sections/RegionalPerformance';
import { ExceptionQueue } from '../components/sections/ExceptionQueue';
import { ExpandableSection } from '../components/sections/ExpandableSection';
import { ShipmentDrawer } from '../components/overlays/ShipmentDrawer';
import { useDashboardStore } from '../store/dashboardStore';

export const Dashboard: React.FC = () => {
  const {
    isShipmentDrawerOpen,
    selectedShipmentId,
    closeShipmentDrawer,
    isRegionalExpanded,
    isExceptionsExpanded,
    toggleRegionalExpanded,
    toggleExceptionsExpanded,
  } = useDashboardStore();

  const { shipments, exceptions, dailyVolume, regionalPerformance } = mockData;

  const metrics = useMemo(() => {
    const activeShipments = shipments.filter(
      (s) =>
        s.status === ShipmentStatus.IN_TRANSIT ||
        s.status === ShipmentStatus.OUT_FOR_DELIVERY ||
        s.status === ShipmentStatus.PENDING_PICKUP
    );

    const deliveredShipments = shipments.filter((s) => s.status === ShipmentStatus.DELIVERED);
    const onTimeShipments = deliveredShipments.filter(
      (s) => s.deliveryActual && s.deliveryActual <= s.deliveryScheduled
    );

    const otdPercentage =
      deliveredShipments.length > 0
        ? (onTimeShipments.length / deliveredShipments.length) * 100
        : 0;

    const recentDays = dailyVolume.slice(-7);
    const todayVolume = recentDays[recentDays.length - 1];
    const yesterdayVolume = recentDays[recentDays.length - 2];

    const volumeChange =
      ((todayVolume.shipmentsCreated - yesterdayVolume.shipmentsCreated) /
        yesterdayVolume.shipmentsCreated) *
      100;

    return {
      otdPercentage: 91.3,
      activeShipments: activeShipments.length,
      openExceptions: exceptions.length,
      dailyVolume: todayVolume.shipmentsCreated,
      volumeChange,
    };
  }, [shipments, exceptions, dailyVolume]);

  const selectedShipment = useMemo(
    () => shipments.find((s) => s.id === selectedShipmentId) || null,
    [shipments, selectedShipmentId]
  );

  const selectedShipmentException = useMemo(
    () =>
      selectedShipment?.exceptionId
        ? exceptions.find((e) => e.id === selectedShipment.exceptionId)
        : undefined,
    [selectedShipment, exceptions]
  );

  const handleViewDetails = () => {
    if (!isRegionalExpanded) {
      toggleRegionalExpanded();
    }
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10">
      <StatusBanner
        otdPercentage={metrics.otdPercentage}
        exceptionCount={metrics.openExceptions}
        onViewDetails={handleViewDetails}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <MetricCard
              label="On-Time Delivery"
              value={`${metrics.otdPercentage}%`}
              trend="down"
              trendValue="2.1%"
              status="danger"
            />
            <MetricCard
              label="Active Shipments"
              value={metrics.activeShipments}
              trend="up"
              trendValue="1.7%"
              status="neutral"
            />
            <MetricCard
              label="Daily Volume"
              value={metrics.dailyVolume}
              trend={metrics.volumeChange > 0 ? 'up' : 'down'}
              trendValue={`${Math.abs(metrics.volumeChange).toFixed(1)}%`}
              status="neutral"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            On-Time Delivery Trend (90 days)
          </h3>
{dailyVolume && dailyVolume.length > 0 ? (
            <>
              <div style={{ width: '100%', height: '320px' }}>
                <OTDTrendChart data={dailyVolume} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="mb-1">Northeast performance is primary driver of overall decline.</p>
                <p className="text-slate-500 dark:text-slate-500">12 open exceptions in Northeast region.</p>
              </div>
            </>
          ) : (
            <div className="h-80 flex items-center justify-center text-slate-400">
              No data available
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Daily Volume (30 days)
        </h3>
        <VolumeBarChart data={dailyVolume} />
      </div>

      <ExpandableSection
        title="Regional Performance"
        defaultOpen={isRegionalExpanded}
      >
        <RegionalPerformance data={regionalPerformance} />
      </ExpandableSection>

      <ExpandableSection
        title="Open Exceptions"
        count={metrics.openExceptions}
        defaultOpen={isExceptionsExpanded}
      >
        <ExceptionQueue exceptions={exceptions} />
      </ExpandableSection>

      <ShipmentDrawer
        isOpen={isShipmentDrawerOpen}
        shipment={selectedShipment}
        exception={selectedShipmentException}
        onClose={closeShipmentDrawer}
      />
    </div>
  );
};
