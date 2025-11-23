import { DistrictData, TimeSlot, RiskLevel, RiskSimulation } from './types';

export const TIME_SLOTS: TimeSlot[] = [
  { id: 't1', label: '00:00 - 03:00', value: 0 },
  { id: 't2', label: '03:00 - 06:00', value: 3 },
  { id: 't3', label: '06:00 - 09:00', value: 6 },
  { id: 't4', label: '09:00 - 12:00', value: 9 },
  { id: 't5', label: '12:00 - 15:00', value: 12 },
  { id: 't6', label: '15:00 - 18:00', value: 15 },
  { id: 't7', label: '18:00 - 21:00', value: 18 },
  { id: 't8', label: '21:00 - 00:00', value: 21 },
];

export const DISTRICTS: DistrictData[] = [
  { id: 'dhaka', name: 'Dhaka Metro', type: 'Urban' },
  { id: 'hwy-n1', name: 'Dhaka-Ctg Hwy (N1)', type: 'Highway' },
  { id: 'gazipur', name: 'Gazipur Ind. Zone', type: 'Urban' },
  { id: 'chittagong', name: 'Chittagong Port', type: 'Urban' },
  { id: 'hwy-n5', name: 'Dhaka-Bogra Hwy (N5)', type: 'Highway' },
  { id: 'sylhet', name: 'Sylhet Region', type: 'Rural' },
  { id: 'barisal', name: 'Barisal Highways', type: 'Highway' },
  { id: 'khulna', name: 'Khulna Metro', type: 'Urban' },
  { id: 'rajshahi', name: 'Rajshahi City', type: 'Urban' },
  { id: 'mymensingh', name: 'Mymensingh Road', type: 'Rural' },
  { id: 'coxsbazar', name: 'Cox\'s Bazar Marine Dr', type: 'Highway' },
  { id: 'padma', name: 'Padma Bridge Appr.', type: 'Highway' },
];

// Helper to generate deterministic pseudo-random risk based on time and location type
export const calculateRisk = (district: DistrictData, timeValue: number): RiskSimulation => {
  let baseScore = 20;

  // Simulation Logic based on real-world patterns
  if (district.type === 'Urban') {
    // Rush hours are risky for Urban
    if (timeValue === 9 || timeValue === 18) baseScore += 50; 
    else if (timeValue === 12 || timeValue === 15) baseScore += 30;
    else baseScore += 10;
  } else if (district.type === 'Highway') {
    // Night time and early morning fog/speeding
    if (timeValue === 0 || timeValue === 3) baseScore += 65;
    else if (timeValue === 21) baseScore += 45;
    else if (timeValue === 9) baseScore += 20; // Morning commute
  } else {
    // Rural - mostly random but dangerous at night
    if (timeValue >= 18 || timeValue <= 3) baseScore += 40;
  }

  // Add some randomness relative to the district ID string length to keep it consistent per district
  const noise = (district.id.length * 7) % 15;
  const finalScore = Math.min(100, Math.max(0, baseScore + noise));

  let level = RiskLevel.LOW;
  if (finalScore > 30) level = RiskLevel.MEDIUM;
  if (finalScore > 60) level = RiskLevel.HIGH;
  if (finalScore > 80) level = RiskLevel.CRITICAL;

  let details = "Traffic flow normal.";
  if (level === RiskLevel.CRITICAL) details = "Heavy congestion + poor visibility predicted.";
  else if (level === RiskLevel.HIGH) details = "High speed variance detected.";
  else if (level === RiskLevel.MEDIUM) details = "Moderate traffic density.";

  return {
    districtId: district.id,
    score: finalScore,
    level,
    details
  };
};