import React, { useState, useEffect } from 'react';
import HeatmapGrid from './components/HeatmapGrid';
import TimeControl from './components/TimeControl';
import DeploymentPanel from './components/DeploymentPanel';
import { TIME_SLOTS, DISTRICTS, calculateRisk } from './constants';
import { TimeSlot, RiskSimulation } from './types';

const App: React.FC = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>(TIME_SLOTS[0]);
  const [riskData, setRiskData] = useState<RiskSimulation[]>([]);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

  // Simulation Engine: Update risks when time changes
  useEffect(() => {
    // Simulate "AI Processing" delay for effect
    setIsCalibrating(true);
    
    const timer = setTimeout(() => {
        const newRiskData = DISTRICTS.map(district => 
            calculateRisk(district, selectedTimeSlot.value)
        );
        setRiskData(newRiskData);
        setIsCalibrating(false);
    }, 400); // 400ms delay feels like "computing" without being annoying

    return () => clearTimeout(timer);
  }, [selectedTimeSlot]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
        
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">SENTINEL <span className="text-blue-500">AI</span></h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Predictive Traffic Risk System</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-4 text-sm">
                   <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-slate-400">System Online</span>
                   </div>
                   <div className="bg-slate-800 px-3 py-1 rounded border border-slate-700 text-xs font-mono">
                        v2.4.0-BETA
                   </div>
                </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Control Section */}
            <section className="mb-8">
                <TimeControl 
                    selectedSlot={selectedTimeSlot} 
                    onSlotChange={setSelectedTimeSlot} 
                />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Heatmap Visualizer */}
                <section className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="text-lg font-semibold text-white flex items-center">
                            <span className="mr-2">🗺️</span> Risk Heatmap Layer
                        </h2>
                        <div className="flex space-x-4 text-xs">
                            <span className="flex items-center"><span className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded mr-1"></span> Low</span>
                            <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500/20 border border-yellow-500 rounded mr-1"></span> Med</span>
                            <span className="flex items-center"><span className="w-3 h-3 bg-orange-500/20 border border-orange-500 rounded mr-1"></span> High</span>
                            <span className="flex items-center"><span className="w-3 h-3 bg-red-500/20 border border-red-500 rounded mr-1 animate-pulse"></span> Critical</span>
                        </div>
                    </div>

                    <div className={`transition-opacity duration-300 ${isCalibrating ? 'opacity-50' : 'opacity-100'}`}>
                        <HeatmapGrid districts={DISTRICTS} riskData={riskData} />
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-4 italic border-t border-slate-800 pt-2">
                        * Data simulates historical accident data fused with real-time weather APIs and traffic sensor density analysis.
                    </p>
                </section>

                {/* Right Column: AI Action Panel */}
                <section className="lg:col-span-1">
                    <div className={`transition-all duration-500 ${isCalibrating ? 'translate-y-2 opacity-50' : 'translate-y-0 opacity-100'}`}>
                        <DeploymentPanel 
                            riskData={riskData} 
                            districts={DISTRICTS} 
                            timeLabel={selectedTimeSlot.label} 
                        />
                    </div>

                    <div className="mt-6 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-slate-300 mb-2">System Status</h4>
                        <div className="space-y-2 text-xs font-mono text-slate-400">
                            <div className="flex justify-between">
                                <span>Model Confidence:</span>
                                <span className="text-emerald-400">98.4%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Data Source:</span>
                                <span>BRTA / Police / Weather API</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Sync:</span>
                                <span>Just now</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    </div>
  );
};

export default App;