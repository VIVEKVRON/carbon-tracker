import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, LayoutDashboard, Settings, LogOut, Activity, Target } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<Props> = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-surface border-r border-slate-200 flex flex-col transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-accent/10 p-2 rounded-lg text-accent">
            <Leaf size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">CarbonTrack</span>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-2">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-accent/5 text-accent' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/logs" 
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-accent/5 text-accent' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <Activity size={20} />
            Activity Logs
          </NavLink>
          <NavLink 
            to="/challenges" 
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-accent/5 text-accent' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <Target size={20} />
            Eco-Challenges
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-accent/5 text-accent' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-surface/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex justify-between items-center transition-all duration-300">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Overview</h1>
          <div className="flex items-center gap-4">
             <NavLink to="/settings" className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-medium hover:ring-2 hover:ring-accent transition-all cursor-pointer">
               U
             </NavLink>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
