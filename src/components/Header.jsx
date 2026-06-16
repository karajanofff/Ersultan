import { CalendarDays, Database, Menu, ShieldCheck, Wifi } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function Header({ activeLabel, stats, onMenuToggle }) {
  const date = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <header className="no-print sticky top-0 z-20 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="flex min-h-20 flex-col gap-3 px-4 py-3 lg:ml-72 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm lg:hidden" title="Menyu">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-950">Optic Reliability Platform</h1>
            <p className="text-sm font-medium text-slate-500">{activeLabel}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs sm:flex">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 font-bold text-slate-600 shadow-sm md:flex">
            <CalendarDays size={16} />
            <span>{date}</span>
          </div>
          <StatusBadge status="online" />
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 font-bold text-emerald-700">
            <Wifi size={16} />
            <span>Offline tayar</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 font-bold text-blue-700">
            <Database size={16} />
            <span>{stats.total} jazıw</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 font-bold text-slate-700 shadow-sm">
            <ShieldCheck size={16} />
            <span>Ortasha {stats.average}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
