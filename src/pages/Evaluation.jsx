import { useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import ProgressScore from '../components/ProgressScore';
import RecommendationPanel from '../components/RecommendationPanel';
import ReliabilityBadge from '../components/ReliabilityBadge';
import { calculateReliability, getReliabilityLevel } from '../utils/reliability';

export default function Evaluation({ networks, selectedNetworkId, onSelectNetwork }) {
  const selectedId = selectedNetworkId || networks[0]?.id || '';
  const selected = useMemo(() => networks.find((item) => item.id === selectedId) || networks[0], [networks, selectedId]);
  const score = selected ? calculateReliability(selected) : 0;
  const level = getReliabilityLevel(score);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reliability engine"
        title="Isenimlilikti bahalaw"
        description="Algoritm baslanǵısh 100 balldan qáwip faktorları ushın ball kemeytip, tarmaq isenimliligin avtomatik esaplaydı."
      />
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <label className="block text-sm font-bold text-slate-700">Tarmaqtı tańlaw</label>
          <select value={selected?.id || ''} onChange={(event) => onSelectNetwork(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100">
            {networks.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          {selected ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Nátiyje</p>
              <div className="mt-4 flex justify-center"><ProgressScore score={score} /></div>
              <div className="mt-4"><ReliabilityBadge score={score} /></div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${level.tone === 'green' ? 'bg-emerald-500' : level.tone === 'yellow' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
              </div>
              <p className={`mt-3 text-sm font-bold ${level.textClass}`}>{selected.name}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Bahalaw ushın tarmaq maǵlıwmatı kerek.</p>
          )}
        </section>
        <RecommendationPanel network={selected} score={score} />
      </div>
    </div>
  );
}
