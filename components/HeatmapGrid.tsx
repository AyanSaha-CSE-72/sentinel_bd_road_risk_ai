import React from 'react';
import { DistrictData, RiskSimulation, RiskLevel } from '../types';

interface HeatmapGridProps {
  districts: DistrictData[];
  riskData: RiskSimulation[];
}

const HeatmapGrid: React.FC<HeatmapGridProps> = ({ districts, riskData }) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      case RiskLevel.HIGH: return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case RiskLevel.MEDIUM: return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      case RiskLevel.LOW: return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  const getRiskValue = (id: string) => riskData.find(r => r.districtId === id);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
      {districts.map((d) => {
        const risk = getRiskValue(d.id);
        const isCritical = risk?.level === RiskLevel.CRITICAL;

        return (
          <div
            key={d.id}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-500 ease-in-out flex flex-col justify-between h-32
              ${risk ? getRiskColor(risk.level) : 'border-slate-700'}
              ${isCritical ? 'animate-pulse-fast' : ''}
              hover:scale-105 cursor-pointer
            `}
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-sm uppercase tracking-wider text-white">{d.name}</span>
              {risk && (
                <span className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded">
                  {risk.score}%
                </span>
              )}
            </div>
            
            <div className="mt-2">
              <div className="text-xs opacity-80 mb-1">{d.type} Zone</div>
              <div className="text-xs font-semibold uppercase">{risk?.level} RISK</div>
            </div>

            {/* Visual Bar Graph inside card */}
            <div className="w-full bg-black/30 h-1.5 mt-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${isCritical ? 'bg-red-500' : risk?.level === RiskLevel.HIGH ? 'bg-orange-500' : risk?.level === RiskLevel.MEDIUM ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
                style={{ width: `${risk?.score || 0}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeatmapGrid;