import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  TRANSPORTATION: number;
  ENERGY: number;
  DIET: number;
}

interface Props {
  data: ChartData[];
}

export const CarbonTrendsChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 tracking-tight">30-Day Emission Trends</h3>
        <p className="text-sm text-slate-500">Total CO₂e (kg) by category</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#F1F5F9' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontWeight: 500
              }}
            />
            <Bar dataKey="TRANSPORTATION" stackId="a" fill="#0EA5E9" radius={[0, 0, 4, 4]} />
            <Bar dataKey="ENERGY" stackId="a" fill="#F59E0B" />
            <Bar dataKey="DIET" stackId="a" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
