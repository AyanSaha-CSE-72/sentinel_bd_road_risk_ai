export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface DistrictData {
  id: string;
  name: string;
  type: 'Urban' | 'Highway' | 'Rural';
}

export interface RiskSimulation {
  districtId: string;
  score: number; // 0-100
  level: RiskLevel;
  details: string;
}

export interface TimeSlot {
  id: string;
  label: string; // e.g. "00:00 - 03:00"
  value: number; // Start hour for calculation logic
}

export interface DeploymentStrategy {
  zoneId: string;
  zoneName: string;
  riskScore: number;
  unitsRequired: number;
  action: string;
}