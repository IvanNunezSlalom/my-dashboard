import type {
  Shipment,
  Exception,
  DailyVolume,
  RegionalPerformance,
  Lane,
  Location
} from '../types';
import {
  ShipmentStatus,
  ShipmentMode,
  Region,
  ExceptionType,
  ExceptionSeverity
} from '../types';

// Realistic US cities by region
const CITIES: Record<Region, Location[]> = {
  [Region.NORTHEAST]: [
    { city: 'New York', state: 'NY', zip: '10001' },
    { city: 'Newark', state: 'NJ', zip: '07102' },
    { city: 'Boston', state: 'MA', zip: '02108' },
    { city: 'Philadelphia', state: 'PA', zip: '19019' },
    { city: 'Pittsburgh', state: 'PA', zip: '15222' },
    { city: 'Hartford', state: 'CT', zip: '06103' },
  ],
  [Region.SOUTHEAST]: [
    { city: 'Miami', state: 'FL', zip: '33101' },
    { city: 'Atlanta', state: 'GA', zip: '30303' },
    { city: 'Charlotte', state: 'NC', zip: '28202' },
    { city: 'Jacksonville', state: 'FL', zip: '32099' },
    { city: 'Nashville', state: 'TN', zip: '37201' },
    { city: 'Birmingham', state: 'AL', zip: '35203' },
  ],
  [Region.MIDWEST]: [
    { city: 'Chicago', state: 'IL', zip: '60601' },
    { city: 'Cleveland', state: 'OH', zip: '44101' },
    { city: 'Detroit', state: 'MI', zip: '48201' },
    { city: 'Indianapolis', state: 'IN', zip: '46201' },
    { city: 'Milwaukee', state: 'WI', zip: '53201' },
    { city: 'Minneapolis', state: 'MN', zip: '55401' },
  ],
  [Region.SOUTHWEST]: [
    { city: 'Dallas', state: 'TX', zip: '75201' },
    { city: 'Houston', state: 'TX', zip: '77001' },
    { city: 'Phoenix', state: 'AZ', zip: '85001' },
    { city: 'Denver', state: 'CO', zip: '80201' },
    { city: 'Albuquerque', state: 'NM', zip: '87101' },
    { city: 'Las Vegas', state: 'NV', zip: '89101' },
  ],
  [Region.WEST]: [
    { city: 'Los Angeles', state: 'CA', zip: '90001' },
    { city: 'San Francisco', state: 'CA', zip: '94101' },
    { city: 'Seattle', state: 'WA', zip: '98101' },
    { city: 'Portland', state: 'OR', zip: '97201' },
    { city: 'San Diego', state: 'CA', zip: '92101' },
    { city: 'Sacramento', state: 'CA', zip: '95814' },
  ],
};

const CARRIERS = [
  'Swift Logistics', 'XPO Freight', 'FedEx Freight', 'Old Dominion',
  'Estes Express', 'YRC Worldwide', 'ABF Freight', 'Southeastern Freight',
  'Saia LTL', 'R+L Carriers'
];

const COMMODITY_TYPES = [
  'Electronics', 'Food & Beverage', 'Automotive Parts', 'Furniture',
  'Machinery', 'Textiles', 'Consumer Goods', 'Building Materials',
  'Medical Supplies', 'Paper Products'
];

// Helper to get random item from array
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper to generate random date within range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate shipment ID
const generateShipmentId = (index: number): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const seq = String(index).padStart(2, '0');
  return `SHP-${year}-${month}${day}${seq}`;
};

// Generate exception ID
const generateExceptionId = (index: number): string => {
  const year = new Date().getFullYear();
  const seq = String(index + 1800).padStart(4, '0');
  return `EXC-${year}-${seq}`;
};

// Get region from destination
const getRegionFromState = (state: string): Region => {
  const northeastStates = ['NY', 'NJ', 'CT', 'MA', 'PA', 'VT', 'NH', 'ME'];
  const southeastStates = ['FL', 'GA', 'SC', 'NC', 'VA', 'TN', 'AL', 'MS'];
  const midwestStates = ['IL', 'OH', 'IN', 'MI', 'WI', 'MN', 'MO', 'IA'];
  const southwestStates = ['TX', 'AZ', 'NM', 'CO', 'NV', 'UT'];

  if (northeastStates.includes(state)) return Region.NORTHEAST;
  if (southeastStates.includes(state)) return Region.SOUTHEAST;
  if (midwestStates.includes(state)) return Region.MIDWEST;
  if (southwestStates.includes(state)) return Region.SOUTHWEST;
  return Region.WEST;
};

// Generate mock shipments (biased toward realistic distributions)
export const generateShipments = (count: number = 200): Shipment[] => {
  const shipments: Shipment[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    // Create date 0-30 days ago
    const createdAt = new Date(now);
    createdAt.setDate(now.getDate() - Math.floor(Math.random() * 30));

    const origin = random(Object.values(CITIES).flat());
    const destination = random(Object.values(CITIES).flat());
    const region = getRegionFromState(destination.state);

    const pickupScheduled = new Date(createdAt);
    pickupScheduled.setHours(pickupScheduled.getHours() + 6 + Math.floor(Math.random() * 18));

    const transitDays = 2 + Math.floor(Math.random() * 5);
    const deliveryScheduled = new Date(pickupScheduled);
    deliveryScheduled.setDate(deliveryScheduled.getDate() + transitDays);

    // Determine status (realistic distribution)
    let status: ShipmentStatus;
    const statusRoll = Math.random();
    if (statusRoll < 0.55) {
      status = ShipmentStatus.DELIVERED;
    } else if (statusRoll < 0.75) {
      status = ShipmentStatus.IN_TRANSIT;
    } else if (statusRoll < 0.85) {
      status = ShipmentStatus.OUT_FOR_DELIVERY;
    } else if (statusRoll < 0.92) {
      status = ShipmentStatus.PENDING_PICKUP;
    } else {
      status = ShipmentStatus.EXCEPTION;
    }

    // Northeast has worse performance (more late, more exceptions)
    if (region === Region.NORTHEAST) {
      if (Math.random() < 0.15) {
        status = ShipmentStatus.EXCEPTION;
      }
    }

    const pickupActual = status !== ShipmentStatus.PENDING_PICKUP
      ? new Date(pickupScheduled.getTime() + (Math.random() - 0.5) * 3600000 * 4)
      : undefined;

    // Delivery actual (if delivered)
    let deliveryActual: Date | undefined;
    if (status === ShipmentStatus.DELIVERED) {
      // 91.3% on-time rate overall, worse for Northeast
      const isOnTime = region === Region.NORTHEAST
        ? Math.random() < 0.882
        : Math.random() < 0.94;

      if (isOnTime) {
        deliveryActual = new Date(deliveryScheduled.getTime() - Math.random() * 3600000 * 6);
      } else {
        deliveryActual = new Date(deliveryScheduled.getTime() + Math.random() * 3600000 * 48);
      }
    }

    const hasException = status === ShipmentStatus.EXCEPTION || (status === ShipmentStatus.DELIVERED && deliveryActual! > deliveryScheduled);

    // Mode distribution
    const modeRoll = Math.random();
    let mode: ShipmentMode;
    if (modeRoll < 0.44) mode = ShipmentMode.LTL;
    else if (modeRoll < 0.75) mode = ShipmentMode.TRUCKLOAD;
    else if (modeRoll < 0.87) mode = ShipmentMode.INTERMODAL;
    else if (modeRoll < 0.95) mode = ShipmentMode.PARCEL;
    else mode = ShipmentMode.AIR;

    shipments.push({
      id: generateShipmentId(i),
      status,
      origin,
      destination,
      carrier: random(CARRIERS),
      mode,
      createdAt,
      pickupScheduled,
      pickupActual,
      deliveryScheduled,
      deliveryActual,
      region,
      weight: 500 + Math.floor(Math.random() * 15000),
      palletCount: Math.random() < 0.7 ? 1 + Math.floor(Math.random() * 20) : undefined,
      commodityType: random(COMMODITY_TYPES),
      declaredValue: 5000 + Math.floor(Math.random() * 195000),
      hasException,
      exceptionId: hasException ? undefined : undefined, // Will link after exceptions are generated
      customerRef: `PO-${Math.floor(100000 + Math.random() * 900000)}`,
      internalNotes: Math.random() < 0.3 ? 'Customer requested priority handling' : undefined,
    });
  }

  return shipments;
};

// Generate mock exceptions
export const generateExceptions = (shipments: Shipment[]): Exception[] => {
  const exceptions: Exception[] = [];
  const exceptionShipments = shipments.filter(s => s.hasException);

  // We want 27 open exceptions
  const targetOpenExceptions = 27;
  const selectedShipments = exceptionShipments.slice(0, targetOpenExceptions);

  selectedShipments.forEach((shipment, i) => {
    const exceptionTypes = Object.values(ExceptionType);
    let type: ExceptionType;

    // Bias toward common exception types
    const typeRoll = Math.random();
    if (typeRoll < 0.40) type = ExceptionType.LATE_DELIVERY;
    else if (typeRoll < 0.60) type = ExceptionType.CARRIER_DELAY;
    else if (typeRoll < 0.75) type = ExceptionType.MISSING_POD;
    else type = random(exceptionTypes);

    // Determine severity
    let severity: ExceptionSeverity;
    const severityRoll = Math.random();
    if (severityRoll < 0.15) severity = ExceptionSeverity.CRITICAL;
    else if (severityRoll < 0.45) severity = ExceptionSeverity.HIGH;
    else severity = ExceptionSeverity.MEDIUM;

    // Exception age (hours ago)
    const ageHours = 4 + Math.floor(Math.random() * 80);
    const openedAt = new Date();
    openedAt.setHours(openedAt.getHours() - ageHours);

    const descriptions: Record<ExceptionType, string> = {
      [ExceptionType.LATE_DELIVERY]: 'Shipment missed scheduled delivery window due to traffic delays on I-95 corridor.',
      [ExceptionType.DAMAGED_FREIGHT]: 'Carrier reported freight damage during unloading. Visible puncture on left pallet.',
      [ExceptionType.MISSING_POD]: 'Proof of delivery not received from carrier within 24 hours of delivery.',
      [ExceptionType.CUSTOMS_HOLD]: 'Shipment held at border crossing pending documentation review.',
      [ExceptionType.ADDRESS_ISSUE]: 'Delivery address marked as undeliverable. No dock access reported by driver.',
      [ExceptionType.CARRIER_DELAY]: 'Carrier mechanical failure resulted in service disruption. Shipment transferred to backup carrier.',
      [ExceptionType.WEIGHT_DISCREPANCY]: 'Actual weight exceeds manifest by 340 lbs. Reweigh requested.',
    };

    const assignedToOptions = [
      'Ops-NE', 'Ops-SE', 'Ops-MW', 'Ops-SW', 'Ops-West',
      'Customs', 'Claims', 'Carrier Relations', undefined
    ];

    const exceptionId = generateExceptionId(i);

    // Link exception to shipment
    shipment.exceptionId = exceptionId;

    exceptions.push({
      id: exceptionId,
      shipmentId: shipment.id,
      type,
      severity,
      openedAt,
      assignedTo: random(assignedToOptions),
      description: descriptions[type],
      customerNotified: Math.random() < 0.7,
      impactedDeliveryDate: type === ExceptionType.LATE_DELIVERY ? new Date(shipment.deliveryScheduled.getTime() + 86400000 * 2) : undefined,
    });
  });

  return exceptions;
};

// Generate 90 days of daily volume data
export const generateDailyVolume = (): DailyVolume[] => {
  const dailyVolume: DailyVolume[] = [];
  const today = new Date();

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);

    // Volume between 340-420 with weekly patterns
    const dayOfWeek = date.getDay();
    let baseVolume = 380;

    // Lower on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseVolume = 280;
    }

    const shipmentsCreated = baseVolume + Math.floor((Math.random() - 0.5) * 60);
    const shipmentsDelivered = baseVolume - 10 + Math.floor((Math.random() - 0.5) * 50);

    // OTD% trends down recently (91.3% current average)
    // Was around 93-94% 60-90 days ago, declining trend
    let otdBase = 93.5;
    if (i < 30) {
      otdBase = 91.0 + Math.random() * 2; // Recent 30 days: 91-93%
    } else if (i < 60) {
      otdBase = 92.5 + Math.random() * 2; // 30-60 days ago: 92.5-94.5%
    }

    const otdPercentage = Math.min(100, Math.max(85, otdBase + (Math.random() - 0.5) * 4));
    const onTimeDeliveries = Math.floor(shipmentsDelivered * (otdPercentage / 100));
    const lateDeliveries = shipmentsDelivered - onTimeDeliveries;

    // Exceptions trending slightly up
    const exceptionBase = i < 30 ? 8 : 5;
    const newExceptions = exceptionBase + Math.floor(Math.random() * 6);
    const resolvedExceptions = exceptionBase - 2 + Math.floor(Math.random() * 5);

    // Calculate rolling open exceptions
    const prevOpen = i === 89 ? 15 : dailyVolume[dailyVolume.length - 1]?.openExceptions || 15;
    const openExceptions = Math.max(0, prevOpen + newExceptions - resolvedExceptions);

    dailyVolume.push({
      date,
      shipmentsCreated,
      shipmentsDelivered,
      shipmentsInTransit: Math.floor(Math.random() * 200 + 600),
      onTimeDeliveries,
      lateDeliveries,
      otdPercentage,
      newExceptions,
      resolvedExceptions,
      openExceptions,
    });
  }

  return dailyVolume;
};

// Generate regional performance data
export const generateRegionalPerformance = (shipments: Shipment[], exceptions: Exception[]): RegionalPerformance[] => {
  const regions = Object.values(Region);

  return regions.map(region => {
    const regionShipments = shipments.filter(s => s.region === region);
    const deliveredShipments = regionShipments.filter(s => s.status === ShipmentStatus.DELIVERED);
    const inTransitShipments = regionShipments.filter(s =>
      s.status === ShipmentStatus.IN_TRANSIT || s.status === ShipmentStatus.OUT_FOR_DELIVERY
    );

    const onTimeShipments = deliveredShipments.filter(s =>
      s.deliveryActual && s.deliveryActual <= s.deliveryScheduled
    );

    let otdPercentage = deliveredShipments.length > 0
      ? (onTimeShipments.length / deliveredShipments.length) * 100
      : 95;

    // Match target OTD% from requirements
    if (region === Region.NORTHEAST) otdPercentage = 88.2;
    else if (region === Region.SOUTHWEST) otdPercentage = 96.1;
    else if (region === Region.SOUTHEAST) otdPercentage = 93.7;
    else if (region === Region.MIDWEST) otdPercentage = 90.4;
    else if (region === Region.WEST) otdPercentage = 92.8;

    const regionExceptions = exceptions.filter(exc => {
      const shipment = shipments.find(s => s.id === exc.shipmentId);
      return shipment?.region === region;
    });

    const criticalExceptions = regionExceptions.filter(e => e.severity === ExceptionSeverity.CRITICAL).length;

    // Trend logic
    let otdTrend: "UP" | "DOWN" | "STABLE" = "STABLE";
    let trendDelta = 0;

    if (region === Region.NORTHEAST) {
      otdTrend = "DOWN";
      trendDelta = -3.1;
    } else if (region === Region.SOUTHWEST) {
      otdTrend = "UP";
      trendDelta = 2.4;
    } else if (region === Region.SOUTHEAST) {
      otdTrend = "UP";
      trendDelta = 1.2;
    } else if (region === Region.MIDWEST) {
      otdTrend = "DOWN";
      trendDelta = -0.8;
    }

    return {
      region,
      otdPercentage,
      totalShipments: regionShipments.length,
      deliveredShipments: deliveredShipments.length,
      inTransitShipments: inTransitShipments.length,
      exceptionCount: regionExceptions.length,
      criticalExceptions,
      otdTrend,
      trendDelta,
    };
  });
};

// Generate top lanes
export const generateTopLanes = (shipments: Shipment[]): Lane[] => {
  const laneMap = new Map<string, Shipment[]>();

  shipments.forEach(shipment => {
    const laneKey = `${shipment.origin.city},${shipment.origin.state}-${shipment.destination.city},${shipment.destination.state}`;
    if (!laneMap.has(laneKey)) {
      laneMap.set(laneKey, []);
    }
    laneMap.get(laneKey)!.push(shipment);
  });

  const lanes: Lane[] = [];
  let laneId = 1;

  laneMap.forEach((laneShipments, laneKey) => {
    if (laneShipments.length < 3) return; // Only include lanes with meaningful volume

    const [originStr, destStr] = laneKey.split('-');
    const [originCity, originState] = originStr.split(',');
    const [destCity, destState] = destStr.split(',');

    const delivered = laneShipments.filter(s => s.status === ShipmentStatus.DELIVERED);
    const onTime = delivered.filter(s => s.deliveryActual && s.deliveryActual <= s.deliveryScheduled);
    const withExceptions = laneShipments.filter(s => s.hasException);

    lanes.push({
      id: `LANE-${String(laneId++).padStart(3, '0')}`,
      origin: { city: originCity, state: originState, zip: laneShipments[0].origin.zip },
      destination: { city: destCity, state: destState, zip: laneShipments[0].destination.zip },
      shipmentCount: laneShipments.length,
      otdPercentage: delivered.length > 0 ? (onTime.length / delivered.length) * 100 : 95,
      exceptionRate: (withExceptions.length / laneShipments.length) * 100,
      avgTransitDays: 3.2,
      avgCost: 850 + Math.floor(Math.random() * 1200),
      preferredCarrier: random(CARRIERS),
    });
  });

  // Sort by volume and return top 10
  return lanes.sort((a, b) => b.shipmentCount - a.shipmentCount).slice(0, 10);
};

// Initialize all mock data
export const initializeMockData = () => {
  const shipments = generateShipments(220);
  const exceptions = generateExceptions(shipments);
  const dailyVolume = generateDailyVolume();
  const regionalPerformance = generateRegionalPerformance(shipments, exceptions);
  const topLanes = generateTopLanes(shipments);

  return {
    shipments,
    exceptions,
    dailyVolume,
    regionalPerformance,
    topLanes,
  };
};

// Export singleton data
export const mockData = initializeMockData();
