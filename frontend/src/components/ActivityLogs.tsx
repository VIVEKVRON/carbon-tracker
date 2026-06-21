import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import { Trash2, Download } from 'lucide-react';

interface CarbonLog {
  id: string;
  category: string;
  value: number;
  co2EmissionsKg: number;
  loggedAt: string;
}

export const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<CarbonLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await apiFetch('/tracker');
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Optimistic update
      setLogs(prev => prev.filter(log => log.id !== id));
      await apiFetch(`/tracker/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete log', err);
      // Revert optimistic update if deletion fails
      loadLogs();
    }
  };

  const handleExportCsv = async () => {
    try {
      const csvText = await apiFetch('/tracker/export');
      const blob = new Blob([csvText as string], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'carbon_history.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV', err);
      alert('Failed to export CSV data. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-500 animate-pulse font-medium">Loading activity logs...</div>;
  }

  return (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Activity Logs</h3>
        <button 
          onClick={handleExportCsv}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Download size={16} />
          Export to CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-500">Date</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-500">Category</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-500">Value</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-500">Emissions</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                  No activity logs found.
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-slate-800">
                    {new Date(log.loggedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 capitalize">
                    {log.category.toLowerCase()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {log.value}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {log.co2EmissionsKg.toFixed(2)} kg
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(log.id)}
                      className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete log"
                      aria-label="Delete log"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
