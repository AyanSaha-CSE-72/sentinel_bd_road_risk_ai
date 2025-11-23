import React, { useMemo } from 'react';
import { DeploymentStrategy, RiskLevel, RiskSimulation, DistrictData } from '../types';

interface DeploymentPanelProps {
  riskData: RiskSimulation[];
  districts: DistrictData[];
  timeLabel: string;
}

const DeploymentPanel: React.FC<DeploymentPanelProps> = ({ riskData, districts, timeLabel }) => {
  
  // Calculate recommendations based on current risk data
  const recommendations: DeploymentStrategy[] = useMemo(() => {
    return riskData
      .filter(r => r.score > 50) // Only interested in High/Critical for deployment
      .sort((a, b) => b.score - a.score) // Sort descending
      .slice(0, 3) // Top 3
      .map(risk => {
        const district = districts.find(d => d.id === risk.districtId);
        const name = district ? district.name : 'Unknown Zone';
        
        let units = 0;
        let action = "";

        if (risk.level === RiskLevel.CRITICAL) {
            units = 4;
            action = `IMMEDIATE: Deploy highway patrol and ambulance units to ${name}. Establish speed checkposts. High probability of collision due to visibility/speed.`;
        } else {
            units = 2;
            action = `ALERT: Increase patrol visibility in ${name}. Monitor CCTV feeds for reckless driving patterns typical of this time window.`;
        }

        return {
            zoneId: risk.districtId,
            zoneName: name,
            riskScore: risk.score,
            unitsRequired: units,
            action: action
        };
      });
  }, [riskData, districts]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center space-x-2 mb-6 border-b border-slate-700 pb-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">AI Deployment Strategy</h3>
        <span className="ml-auto text-xs font-mono text-blue-400 border border-blue-900 bg-blue-900/30 px-2 py-1 rounded">
            SIMULATION ACTIVE
        </span>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
            <p>No critical anomalies detected for this time window.</p>
            <p className="text-sm">Standard patrol routines advised.</p>
        </div>
      ) : (
        <div className="space-y-4">
            {recommendations.map((rec, idx) => (
                <div key={rec.zoneId} className="bg-slate-900 border-l-4 border-red-500 p-4 rounded-r-lg shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="text-xs font-bold text-red-400 block mb-1">PRIORITY #{idx + 1}</span>
                            <h4 className="text-white font-bold text-lg">{rec.zoneName}</h4>
                        </div>
                        <div className="text-right">
                             <span className="block text-2xl font-mono font-bold text-red-500">{rec.riskScore}%</span>
                             <span className="text-[10px] text-slate-400 uppercase">Risk Score</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3 text-sm text-slate-300">
                        <div className="flex items-center">
                            <span className="mr-2">🕒</span>
                            <span>{timeLabel}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">🚔</span>
                            <span>{rec.unitsRequired} Units Required</span>
                        </div>
                    </div>

                    <p className="text-sm text-slate-400 border-t border-slate-800 pt-2 font-mono leading-relaxed">
                        <span className="text-blue-400 font-bold">AI REC: </span>
                        {rec.action}
                    </p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DeploymentPanel;