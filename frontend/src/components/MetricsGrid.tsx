import React from 'react';
import { ArrowDownRight, ArrowUpRight, Cloud, Zap } from 'lucide-react';

interface MetricsProps {
  dailyOutput: number;
  weeklyDelta: number;
}

export const MetricsGrid: React.FC<MetricsProps> = ({ dailyOutput, weeklyDelta }) => {
  const isGood = weeklyDelta <= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="glassmorphism p-6 rounded-2xl flex flex-col gap-4 transform hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <Cloud size={24} />
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {isGood ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
            {Math.abs(weeklyDelta)}%
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Daily Carbon Output</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight">{dailyOutput.toFixed(1)}</h2>
            <span className="text-slate-500 font-medium">kg CO₂e</span>
          </div>
        </div>
      </div>

      <div className="glassmorphism p-6 rounded-2xl flex flex-col gap-4 transform hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
            <Zap size={24} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Top Contributor</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Energy</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
