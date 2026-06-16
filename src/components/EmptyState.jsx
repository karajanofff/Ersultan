import { DatabaseZap } from 'lucide-react';

export default function EmptyState({ title = 'Maǵlıwmat joq', description = 'Demo maǵlıwmatlardı júkleń yamasa jańa tarmaq qosıń.' }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        <DatabaseZap size={24} />
      </div>
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}
