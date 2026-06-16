import { ArrowDown, ArrowRight, BarChart3, ClipboardCheck, FileInput, Gauge, Lightbulb, UserRound } from 'lucide-react';

const steps = [
  { title: 'Paydalanıwshı', icon: UserRound, text: 'Operator yamasa injener parametrlerdi kirgizedi.' },
  { title: 'Maǵlıwmat kirgiziw', icon: FileInput, text: 'OTDR, OLT, ONT hám kabel belgileri jıynaladı.' },
  { title: 'Bahalaw algoritmi', icon: Gauge, text: '100 balldan qáwip faktorları alıp taslanadı.' },
  { title: 'Nátiyje', icon: ClipboardCheck, text: 'Joqarı, orta yamasa tómen dáreje belgilenedi.' },
  { title: 'Dashboard', icon: BarChart3, text: 'Monitoring grafik hám jadvalda kórsetiledi.' },
  { title: 'Usınıs/Esabat', icon: Lightbulb, text: 'Risklerge qaray sheshim hám PDF tayarlanadı.' },
];

export default function ArchitectureDiagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="absolute inset-x-10 top-1/2 hidden h-1 bg-gradient-to-r from-blue-200 via-cyan-300 to-emerald-200 xl:block" />
      <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative">
              <div className="card-hover h-full rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
                <div className="mb-3 inline-flex rounded-2xl bg-white p-3 text-blue-700 shadow-sm">
                  <Icon size={21} />
                </div>
                <h4 className="text-sm font-bold text-slate-950">{step.title}</h4>
                <p className="mt-2 text-xs leading-5 text-slate-600">{step.text}</p>
              </div>
              {index < steps.length - 1 ? (
                <div className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-blue-100 bg-white p-2 text-blue-600 shadow-sm xl:block">
                  <ArrowRight size={22} />
                </div>
              ) : null}
              {index < steps.length - 1 ? (
                <div className="mx-auto my-1 flex justify-center text-blue-500 xl:hidden">
                  <ArrowDown size={20} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
