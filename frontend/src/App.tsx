import React, { useEffect, useState } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { MetricsGrid } from './components/MetricsGrid';
import { LogActivityForm } from './components/LogActivityForm';
import { CarbonTrendsChart } from './components/CarbonTrendsChart';
import { ActivityLogs } from './components/ActivityLogs';
import { Challenges } from './components/Challenges';
import { SmartInsights } from './components/SmartInsights';
import { Settings } from './components/Settings';
import { Routes, Route } from 'react-router-dom';
import { apiFetch, getAuthToken, setAuthToken, removeAuthToken } from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());
  const [metrics, setMetrics] = useState({ dailyOutput: 0, weeklyDelta: 0 });
  const [chartData, setChartData] = useState([]);
  const [insights, setInsights] = useState<string[]>([]);
  
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    }
    
    // Apply dark mode on initial load
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Login State
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const loadDashboardData = async () => {
    try {
      const [logsResult, insightsResult] = await Promise.allSettled([
        apiFetch('/tracker'),
        apiFetch('/tracker/insights')
      ]);

      const logs = logsResult.status === 'fulfilled' ? logsResult.value : [];
      const fetchedInsights = insightsResult.status === 'fulfilled' ? insightsResult.value : [];
      
      const safeLogs = Array.isArray(logs) ? logs : [];
      setInsights(Array.isArray(fetchedInsights) ? fetchedInsights : []);
      
      const today = new Date().toISOString().split('T')[0];
      const todayLogs = safeLogs.filter((l: any) => l.loggedAt && l.loggedAt.startsWith(today));
      const dailyOutput = todayLogs.reduce((sum: number, log: any) => sum + (log.co2EmissionsKg || 0), 0);
      
      setMetrics({ dailyOutput, weeklyDelta: -12.5 });

      const grouped = safeLogs.reduce((acc: any, log: any) => {
        if (!log.loggedAt) return acc;
        const date = log.loggedAt.split('T')[0];
        if (!acc[date]) acc[date] = { date, TRANSPORTATION: 0, ENERGY: 0, DIET: 0 };
        acc[date][log.category] += (log.co2EmissionsKg || 0);
        return acc;
      }, {});

      const chartArray = Object.values(grouped).slice(-30) as any;
      setChartData(chartArray.length ? chartArray : [{ date: today, TRANSPORTATION: 0, ENERGY: 0, DIET: 0 }]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      if (isRegistering) {
        await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        setAuthSuccess('Account created successfully. Please sign in.');
        setIsRegistering(false);
      } else {
        const res = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        setAuthToken(res.token);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      if (err.status === 409) {
        setAuthError('An account with this email already exists.');
      } else if (err.status === 401) {
        setAuthError('Incorrect email or password.');
      } else {
        setAuthError(err.message || 'Authentication failed');
      }
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const handleLogActivity = async (category: string, value: number) => {
    try {
      await apiFetch('/tracker', {
        method: 'POST',
        body: JSON.stringify({ category, value })
      });
      await loadDashboardData();
    } catch (err: any) {
      console.error(err);
      alert('Failed to log activity: ' + (err.message || 'Unknown error'));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
        <div className="glassmorphism max-w-md w-full p-8 rounded-3xl transform transition-all duration-500 scale-100 opacity-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4 transition-transform hover:rotate-12 duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">CarbonTrack</h1>
            <p className="text-slate-500 mt-2">
              {isRegistering ? 'Create an account to get started.' : 'Sign in to track your emissions.'}
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center animate-in slide-in-from-top-2">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="p-3 bg-green-50 text-green-600 rounded-xl text-sm font-medium text-center animate-in slide-in-from-top-2">
                {authSuccess}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-200 text-slate-800 font-medium bg-white" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-200 text-slate-800 font-medium bg-white" 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium shadow-sm shadow-accent/20 transition-all duration-200 mt-2 transform active:scale-[0.98]">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </button>
            <div className="text-center pt-2">
              <button 
                type="button" 
                onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); setAuthSuccess(''); }}
                className="text-sm text-slate-500 hover:text-accent font-medium transition-colors"
              >
                {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MetricsGrid dailyOutput={metrics.dailyOutput} weeklyDelta={metrics.weeklyDelta} />
              <SmartInsights insights={insights} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <CarbonTrendsChart data={chartData} />
                </div>
                <div className="lg:col-span-1">
                  <LogActivityForm onLog={handleLogActivity} />
                </div>
              </div>
            </div>
          } 
        />
        <Route path="/logs" element={<ActivityLogs />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
