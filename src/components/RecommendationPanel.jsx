import { Activity, AlertTriangle, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';
import { getRecommendations, getRiskFactors } from '../utils/reliability';

export default function RecommendationPanel({ network, score }) {
  if (!network) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-soft">
        Tarmaq tańlań, usınıslar hám qáwip faktorları usı jerde kórsetiledi.
      </div>
    );
  }

  const recommendations = getRecommendations(network, score);
  const risks = getRiskFactors(network);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-2xl bg-amber-50 p-2 text-amber-600"><AlertTriangle size={20} /></div>
          <h3 className="font-bold text-slate-900">Anıqlanǵan qáwip faktorları</h3>
        </div>
        <ul className="grid gap-2 text-sm text-slate-600">
          {risks.map((risk) => (
            <li key={risk} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
              <Activity size={16} className="shrink-0 text-amber-600" />
              {risk}
            </li>
          ))}
        </ul>
      </section>
      <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-2xl bg-emerald-50 p-2 text-emerald-600"><ShieldCheck size={20} /></div>
          <h3 className="font-bold text-slate-900">Avtomatik usınıslar</h3>
        </div>
        <ul className="grid gap-2 text-sm text-slate-600">
          {recommendations.map((item, index) => (
            <li key={item} className="flex gap-2 rounded-2xl bg-emerald-50 px-3 py-3 text-emerald-800">
              {index % 2 === 0 ? <Wrench size={16} className="mt-0.5 shrink-0" /> : <CheckCircle2 size={16} className="mt-0.5 shrink-0" />}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
