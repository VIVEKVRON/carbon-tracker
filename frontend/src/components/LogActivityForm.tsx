import React, { useState } from 'react';
import { Zap, Car, Utensils, Send } from 'lucide-react';

interface Props {
  onLog: (category: string, value: number) => Promise<void>;
}

export const LogActivityForm: React.FC<Props> = ({ onLog }) => {
  const [category, setCategory] = useState<'ENERGY' | 'TRANSPORTATION' | 'DIET'>('TRANSPORTATION');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || isNaN(Number(value))) return;
    
    setLoading(true);
    try {
      await onLog(category, Number(value));
      setValue('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glassmorphism p-6 rounded-2xl flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-slate-800 tracking-tight">Quick Log Activity</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {(['TRANSPORTATION', 'ENERGY', 'DIET'] as const).map((cat) => {
          const isActive = category === cat;
          const icons = {
            TRANSPORTATION: <Car size={20} />,
            ENERGY: <Zap size={20} />,
            DIET: <Utensils size={20} />
          };
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 border ${
                isActive 
                  ? 'border-accent bg-accent/5 text-accent shadow-sm' 
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {icons[cat]}
              <span className="text-sm font-medium capitalize">{cat.toLowerCase()}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              category === 'TRANSPORTATION' ? 'Distance (km)' :
              category === 'ENERGY' ? 'Electricity (kWh)' : 'Meals count'
            }
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-200 text-slate-800 placeholder-slate-600 font-medium"
            required
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-600 font-medium">
            {category === 'TRANSPORTATION' ? 'km' : category === 'ENERGY' ? 'kWh' : 'meals'}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading || !value}
          className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-medium shadow-sm shadow-accent/20 flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={18} />
          )}
          <span className="hidden sm:inline">Log</span>
        </button>
      </div>
    </form>
  );
};
