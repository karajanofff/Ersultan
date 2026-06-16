import { getReliabilityLevel } from '../utils/reliability';

export default function ReliabilityBadge({ score }) {
  const level = getReliabilityLevel(score);
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black shadow-sm ${level.bgClass} ${level.textClass} ${level.borderClass}`}>
      {level.label}
    </span>
  );
}
