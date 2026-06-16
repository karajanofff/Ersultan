import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default function StatusBadge({ status = 'normal', children }) {
  const map = {
    normal: { icon: CheckCircle2, className: 'border-emerald-200 bg-emerald-50 text-emerald-700', label: 'Normal jaǵday' },
    warning: { icon: AlertTriangle, className: 'border-amber-200 bg-amber-50 text-amber-700', label: 'Ogohlantırıw' },
    critical: { icon: XCircle, className: 'border-red-200 bg-red-50 text-red-700', label: 'Kritik jaǵday' },
    online: { icon: CheckCircle2, className: 'border-cyan-200 bg-cyan-50 text-cyan-700', label: 'System Online' },
  };
  const item = map[status] || map.normal;
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${item.className}`}>
      <Icon size={14} />
      {children || item.label}
    </span>
  );
}
