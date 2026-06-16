import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white via-blue-50/70 to-cyan-50/80 p-5 shadow-soft sm:p-6"
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
          {description ? <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </motion.section>
  );
}
