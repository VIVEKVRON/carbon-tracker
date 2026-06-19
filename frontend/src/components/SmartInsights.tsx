import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  insights: string[];
}

export const SmartInsights: React.FC<Props> = ({ insights }) => {
  return (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex items-center gap-2">
        <Sparkles className="text-accent" size={24} />
        <h3 className="text-lg font-semibold text-slate-800 tracking-tight">Personalized Insights</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        {insights.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-sm font-medium text-slate-600">Gathering insights...</p>
          </div>
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {insight}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
