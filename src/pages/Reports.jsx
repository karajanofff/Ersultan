import { Printer } from 'lucide-react';
import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import PrintReport from '../components/PrintReport';
import RecommendationPanel from '../components/RecommendationPanel';
import { calculateReliability } from '../utils/reliability';

export default function Reports({ networks }) {
  const [selectedId, setSelectedId] = useState(networks[0]?.id || '');
  const selected = useMemo(() => networks.find((item) => item.id === selectedId) || networks[0], [networks, selectedId]);
  const score = selected ? calculateReliability(selected) : 0;

  return (
    <div className="space-y-6">
      <div className="no-print">
        <PageHeader
          eyebrow="Esabat generator"
          title="Usınıslar hám esabat"
          description="Tanlanǵan tarmaq boyınsha parametrler, isenimlilik ballı, qáwip faktorları hám usınıslar A4 preview formatında tayarlanadı."
          action={(
            <button onClick={() => window.print()} className="gradient-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-black text-white transition hover:-translate-y-0.5">
              <Printer size={18} />
              PDF/Print
            </button>
          )}
        />
      </div>
      <div className="no-print flex flex-wrap items-end gap-3">
        <label className="block min-w-72">
          <span className="text-sm font-bold text-slate-700">Tarmaqtı tańlaw</span>
          <select value={selected?.id || ''} onChange={(event) => setSelectedId(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100">
            {networks.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <button onClick={() => window.print()} className="gradient-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-black text-white transition hover:-translate-y-0.5">
          <Printer size={18} />
          Esabat tayarlaw
        </button>
      </div>
      {selected ? (
        <>
          <PrintReport network={selected} />
          <div className="no-print">
            <RecommendationPanel network={selected} score={score} />
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 shadow-soft">Esabat ushın tarmaq maǵlıwmatı kerek.</div>
      )}
    </div>
  );
}
