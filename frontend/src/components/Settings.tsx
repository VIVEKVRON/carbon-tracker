import React, { useState, useEffect } from 'react';
import { getAuthToken } from '../api';
import { User, Bell, Moon } from 'lucide-react';

export const Settings: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');

    const token = getAuthToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.sub) {
          setEmail(payload.sub);
        }
      } catch {
        // ignore parsing errors
      }
    }
  }, []);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="glassmorphism p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">Settings</h3>
      
      <div className="space-y-8">
        <section>
          <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">Account</h4>
          <div className="bg-white/50 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-full text-accent">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-slate-800">Email Address</p>
                <p className="text-sm text-slate-500">{email}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">Preferences</h4>
          <div className="bg-white/50 rounded-xl border border-slate-100 divide-y divide-slate-100">
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-full text-blue-500">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Push Notifications</p>
                  <p className="text-sm text-slate-500">Receive alerts for your weekly goals</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-full text-indigo-500">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Dark Mode</p>
                  <p className="text-sm text-slate-500">Toggle dark appearance</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={(e) => handleDarkModeToggle(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};
