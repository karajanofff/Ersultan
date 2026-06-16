import ReliabilityBadge from './ReliabilityBadge';
import { displayValue } from '../utils/labels';
import { calculateReliability, getRecommendations, getRiskFactors } from '../utils/reliability';

export default function PrintReport({ network }) {
  if (!network) return null;
  const score = calculateReliability(network);
  const risks = getRiskFactors(network);
  const recommendations = getRecommendations(network, score);
  const rows = [
    ['Tarmoq atı', network.name],
    ['Tarmoq túri', network.type],
    ['Kabel uzınlıǵı', `${network.cableLength} km`],
    ['Signal joǵaltıwı', `${network.signalLoss} dB`],
    ['Payvandlaw noqatları', network.splicePoints],
    ['Konnektorlar', network.connectors],
    ['Splitter nısbatı', network.splitterRatio],
    ['Rezerv kanal', displayValue(network.hasReserve)],
    ['OTDR jaǵdayı', displayValue(network.otdrStatus)],
    ['OLT jaǵdayı', displayValue(network.oltStatus)],
    ['ONT/ONU jaǵdayı', displayValue(network.ontStatus)],
    ['Sırtqı ortalıq qáwpi', displayValue(network.environmentRisk)],
    ['Texnik xızmet sánesi', network.maintenanceDate || 'Kirgizilmegen'],
  ];

  return (
    <article className="print-area mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Optic Reliability Platform</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Optik tarmaq isenimlilik esabatı</h2>
          <p className="mt-1 text-sm text-slate-500">Esabat sánesi: {new Date().toLocaleDateString('uz-UZ')}</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-center">
          <p className="text-4xl font-black text-blue-700">{score}</p>
          <div className="mt-2"><ReliabilityBadge score={score} /></div>
        </div>
      </div>
      <section className="mt-6">
        <h3 className="mb-3 text-lg font-bold text-slate-950">Kiritilgen parametrler</h3>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <td className="w-1/3 bg-slate-50 px-4 py-3 font-semibold text-slate-600">{label}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-bold text-slate-950">Qáwip faktorları</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {risks.map((risk) => <li key={risk} className="rounded-xl bg-red-50 px-3 py-2 text-red-800">{risk}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-bold text-slate-950">Usınıslar</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {recommendations.map((item) => <li key={item} className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-800">{item}</li>)}
          </ul>
        </div>
      </section>
      {network.note ? <p className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-900">Izoh: {network.note}</p> : null}
    </article>
  );
}
