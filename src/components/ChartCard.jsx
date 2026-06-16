import { ResponsiveContainer } from 'recharts';

export default function ChartCard({ title, description, children, footer, height = 320 }) {
  return (
    <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4">
        <h3 className="font-bold text-slate-950">{title}</h3>
        {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
      {footer ? <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">{footer}</p> : null}
    </section>
  );
}
