import React from 'react';
import { TIME_SLOTS } from '../constants';
import { TimeSlot } from '../types';

interface TimeControlProps {
  selectedSlot: TimeSlot;
  onSlotChange: (slot: TimeSlot) => void;
}

const TimeControl: React.FC<TimeControlProps> = ({ selectedSlot, onSlotChange }) => {
  return (
    <div className="w-full mb-8 px-4">
        <div className="flex justify-between items-end mb-2">
            <h2 className="text-slate-300 text-sm font-semibold uppercase tracking-widest">Temporal Analysis Filter</h2>
            <div className="text-2xl font-mono font-bold text-blue-400 glow-text">
                {selectedSlot.label}
            </div>
        </div>
        
        <div className="relative w-full h-12 bg-slate-800 rounded-full p-1 flex items-center shadow-inner border border-slate-700">
            {/* Track Background */}
            <div className="absolute w-full h-full px-2 flex justify-between items-center pointer-events-none z-0">
                {TIME_SLOTS.map((slot, idx) => (
                    <div key={slot.id} className={`w-1 h-3 rounded-full ${idx % 2 === 0 ? 'bg-slate-600' : 'bg-slate-700'}`}></div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-between z-10 relative">
                {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot.id === slot.id;
                    return (
                        <button
                            key={slot.id}
                            onClick={() => onSlotChange(slot)}
                            className={`
                                h-10 w-full rounded-full text-xs font-medium transition-all duration-300
                                ${isSelected 
                                    ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-400' 
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}
                            `}
                        >
                           {isSelected ? 'Active' : slot.label.split(' ')[0]}
                        </button>
                    );
                })}
            </div>
        </div>
        <p className="text-center text-slate-500 text-xs mt-2">
            Select a 3-hour window to simulate predictive AI risk assessment
        </p>
    </div>
  );
};

export default TimeControl;