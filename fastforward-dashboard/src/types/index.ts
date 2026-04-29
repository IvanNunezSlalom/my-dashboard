// Core domain types for FastForward Logistics Dashboard

export enum ShipmentStatus {
  PENDING_PICKUP = "PENDING_PICKUP",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  EXCEPTION = "EXCEPTION",
  CANCELLED = "CANCELLED"
}

export enum ShipmentMode {
  TRUCKLOAD = "TRUCKLOAD",
  LTL = "LTL",
  INTERMODAL = "INTERMODAL",
  AIR = "AIR",
  PARCEL = "PARCEL"
}

export enum Region {
  NORTHEAST = "NORTHEAST",
  SOUTHEAST = "SOUTHEAST",
  MIDWEST = "MIDWEST",
  SOUTHWEST = "SOUTHWEST",
  WEST = "WEST"
}

export enum ExceptionType {
  LATE_DELIVERY = "LATE_DELIVERY",
  DAMAGED_FREIGHT = "DAMAGED_FREIGHT",
  MISSING_POD = "MISSING_POD",
  CUSTOMS_HOLD = "CUSTOMS_HOLD",
  ADDRESS_ISSUE = "ADDRESS_ISSUE",
  CARRIER_DELAY = "CARRIER_DELAY",
  WEIGHT_DISCREPANCY = "WEIGHT_DISCREPANCY"
}

export enum ExceptionSeverity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM"
}

export interface Location {
  city: string;
  state: string;
  zip: string;
  facilityName?: string;
}

export interface Shipment {
  id: string;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  carrier: string;
  mode: ShipmentMode;
  createdAt: Date;
  pickupScheduled: Date;
  pickupActual?: Date;
  deliveryScheduled: Date;
  deliveryActual?: Date;
  region: Region;
  weight: number;
  palletCount?: number;
  commodityType: string;
  declaredValue: number;
  hasException: boolean;
  exceptionId?: string;
  customerRef?: string;
  internalNotes?: string;
}

export interface Exception {
  id: string;
  shipmentId: string;
  type: ExceptionType;
  severity: ExceptionSeverity;
  openedAt: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  description: string;
  resolution?: string;
  rootCause?: string;
  customerNotified: boolean;
  impactedDeliveryDate?: Date;
}

export interface RegionalPerformance {
  region: Region;
  otdPercentage: number;
  totalShipments: number;
  deliveredShipments: number;
  inTransitShipments: number;
  exceptionCount: number;
  criticalExceptions: number;
  otdTrend: "UP" | "DOWN" | "STABLE";
  trendDelta: number;
}

export interface DailyVolume {
  date: Date;
  shipmentsCreated: number;
  shipmentsDelivered: number;
  shipmentsInTransit: number;
  onTimeDeliveries: number;
  lateDeliveries: number;
  otdPercentage: number;
  newExceptions: number;
  resolvedExceptions: number;
  openExceptions: number;
}

export interface Lane {
  id: string;
  origin: Location;
  destination: Location;
  shipmentCount: number;
  otdPercentage: number;
  exceptionRate: number;
  avgTransitDays: number;
  avgCost: number;
  preferredCarrier?: string;
}

export interface CarrierPerformance {
  carrierName: string;
  mode: ShipmentMode;
  shipmentCount: number;
  marketShare: number;
  otdPercentage: number;
  exceptionRate: number;
  avgTransitTime: number;
  performanceTrend: "IMPROVING" | "DECLINING" | "STABLE";
}

// UI-specific types

export type TrendDirection = "up" | "down" | "stable";
export type TrendSentiment = "good" | "bad" | "neutral";
export type StatusType = "success" | "warning" | "danger" | "info" | "neutral";

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: TrendDirection;
  trendValue?: string;
  status?: StatusType;
  sparklineData?: number[];
  onClick?: () => void;
}

export interface TrendIndicatorProps {
  direction: TrendDirection;
  value: string;
  sentiment?: TrendSentiment;
}

export interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: "sm" | "md" | "lg";
}
