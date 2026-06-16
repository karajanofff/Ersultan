import { Edit2, Eye, Trash2 } from 'lucide-react';
import { calculateReliability, getReliabilityLevel } from '../utils/reliability';
import ReliabilityBadge from './ReliabilityBadge';
import { displayValue } from '../utils/labels';
import EmptyState from './EmptyState';

export default function NetworkTable({ networks, onView, onEdit, onDelete, compact = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div className="max-h-[560px] overflow-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/95 text-left text-xs uppercase tracking-wide text-slate-500 backdrop-blur">
            <tr>
              <th className="px-4 py-3">Tarmoq atı</th>
              <th className="px-4 py-3">Túri</th>
              <th className="px-4 py-3">Uzınlıq</th>
              <th className="px-4 py-3">Joǵaltıw</th>
              <th className="px-4 py-3">Rezerv</th>
              <th className="px-4 py-3">OTDR</th>
              <th className="px-4 py-3">Ball</th>
              <th className="px-4 py-3">Halat</th>
              {!compact ? <th className="px-4 py-3">Ámel</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {networks.map((network) => {
              const score = calculateReliability(network);
              const level = getReliabilityLevel(score);
              return (
                <tr key={network.id} className="transition hover:bg-blue-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-900">{network.name}</td>
                  <td className="px-4 py-3 text-slate-600">{network.type}</td>
                  <td className="px-4 py-3 text-slate-600">{network.cableLength} km</td>
                  <td className="px-4 py-3 text-slate-600">{network.signalLoss} dB</td>
                  <td className="px-4 py-3 text-slate-600">{displayValue(network.hasReserve)}</td>
                  <td className="px-4 py-3 text-slate-600">{displayValue(network.otdrStatus)}</td>
                  <td className={`px-4 py-3 font-bold ${level.textClass}`}>{score}</td>
                  <td className="px-4 py-3"><ReliabilityBadge score={score} /></td>
                  {!compact ? (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => onView(network)} className="rounded-xl border border-blue-100 bg-blue-50 p-2 text-blue-700 transition hover:-translate-y-0.5" title="Kóriw">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => onEdit(network)} className="rounded-xl border border-emerald-100 bg-emerald-50 p-2 text-emerald-700 transition hover:-translate-y-0.5" title="Ózgertiw">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => onDelete(network.id)} className="rounded-xl border border-red-100 bg-red-50 p-2 text-red-700 transition hover:-translate-y-0.5" title="Óshiriw">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              );
            })}
            {!networks.length ? (
              <tr>
                <td colSpan={compact ? 8 : 9} className="px-4 py-8">
                  <EmptyState />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
