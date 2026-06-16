import { Activity, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RiskCard({ title, description, recommendation, status = 'normal', icon: Icon }) {
  const accent = {
    normal: 'border-emerald-200 bg-emerald-50/60 text-emerald-700',
    warning: 'border-amber-200 bg-amber-50/60 text-amber-700',
    critical: 'border-red-200 bg-red-50/60 text-red-700',
  };
  const DefaultIcon = status === 'critical' ? ShieldAlert : status === 'warning' ? AlertTriangle : CheckCircle2;
  const CardIcon = Icon || DefaultIcon || Activity;

  return (
    <article className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className={`rounded-2xl border p-3 ${accent[status]}`}>
          <CardIcon size={22} />
        </div>
        <StatusBadge status={status} />
      </div>
      <h3 className="mt-4 font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700">{recommendation}</p>
    </article>
  );
}
