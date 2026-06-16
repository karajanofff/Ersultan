import { Activity, BarChart3, ChevronRight, ClipboardList, FileText, Gauge, Info, Network, PlusCircle, RadioTower } from 'lucide-react';

const items = [
  { id: 'dashboard', label: 'Bas bet', icon: Gauge },
  { id: 'add', label: 'Tarmoq maǵlıwmatların kirgiziw', icon: PlusCircle },
  { id: 'evaluation', label: 'Isenimlilikti bahalaw', icon: Activity },
  { id: 'faults', label: 'Texnikalıq nasazlıqlar', icon: ClipboardList },
  { id: 'analytics', label: 'Diagrammalar hám analitika', icon: BarChart3 },
  { id: 'reports', label: 'Usınıslar hám esabat', icon: FileText },
  { id: 'about', label: 'Platforma haqqında', icon: Info },
];

export default function Sidebar({ activePage, onNavigate, mobile = false }) {
  return (
    <aside className={`no-print ${mobile ? 'block h-full' : 'fixed inset-y-0 left-0 z-30 hidden lg:block'} w-72 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-cyan-900 text-white shadow-2xl`}>
      <div className="pointer-events-none absolute -left-16 top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative flex h-24 items-center gap-3 border-b border-white/10 px-6">
        <div className="rounded-2xl bg-white/12 p-3 text-cyan-200 ring-1 ring-white/15">
          <Network size={26} />
        </div>
        <div>
          <p className="text-base font-black tracking-tight">Optic Reliability</p>
          <p className="text-xs font-medium text-cyan-100/75">Telecom NOC platforma</p>
        </div>
      </div>
      <div className="relative mx-4 mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-400/15 p-2 text-emerald-200">
            <RadioTower size={18} />
          </div>
          <div>
            <p className="text-xs text-cyan-100/70">Monitoring halatı</p>
            <p className="text-sm font-bold text-white">System Online</p>
          </div>
        </div>
      </div>
      <nav className="relative space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group flex w-full items-center gap-3 rounded-2xl border-l-4 px-3 py-3 text-left text-sm font-bold transition duration-200 ${
                active ? 'border-cyan-300 bg-white text-blue-950 shadow-lg' : 'border-transparent text-cyan-50/80 hover:translate-x-1 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={19} className={active ? 'text-blue-700' : 'text-cyan-200'} />
              <span className="flex-1">{item.label}</span>
              <ChevronRight size={16} className={active ? 'text-blue-700' : 'opacity-0 transition group-hover:opacity-80'} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
