import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, tone = 'blue', note, trend = 'monitoring aktiv' }) {
  const tones = {
    blue: 'from-blue-600 to-cyan-500 text-white',
    green: 'from-emerald-600 to-teal-500 text-white',
    red: 'from-red-600 to-rose-500 text-white',
    yellow: 'from-amber-500 to-orange-500 text-white',
    gray: 'from-slate-600 to-slate-500 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="card-hover overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
    >
      <div className="absolute" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
          {note ? <p className="mt-1 text-xs font-medium text-slate-500">{note}</p> : null}
        </div>
        {Icon ? (
          <div className={`rounded-2xl bg-gradient-to-br p-3 shadow-lg ${tones[tone]}`}>
            <Icon size={22} />
          </div>
        ) : null}
      </div>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
        <TrendingUp size={14} className="text-emerald-600" />
        {trend}
      </div>
    </motion.div>
  );
}
