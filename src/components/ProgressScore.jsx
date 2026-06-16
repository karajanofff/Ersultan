import { getReliabilityLevel } from '../utils/reliability';

export default function ProgressScore({ score, size = 170 }) {
  const level = getReliabilityLevel(score);
  const color = level.tone === 'green' ? '#10b981' : level.tone === 'yellow' ? '#f59e0b' : '#ef4444';
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <p className={`text-4xl font-black ${level.textClass}`}>{score}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">ball</p>
      </div>
    </div>
  );
}
