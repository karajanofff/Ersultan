import { AlertCircle, Cable, Gauge, Server, ShieldCheck, ShieldOff } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import NetworkTable from '../components/NetworkTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { calculateReliability, getReliabilityLevel } from '../utils/reliability';

export default function Dashboard({ networks, stats, onView, onEdit, onDelete }) {
  const latest = [...networks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const criticalOtdr = networks.filter((item) => item.otdrStatus === 'kritik').length;
  const noReserve = networks.filter((item) => item.hasReserve === 'mavjud emas').length;
  const scoreData = networks.slice(0, 8).map((item) => ({ name: item.name, ball: calculateReliability(item) }));
  const categoryData = [
    { name: 'Joqarı', value: stats.high, fill: '#10b981' },
    { name: 'Orta', value: stats.medium, fill: '#f59e0b' },
    { name: 'Tómen', value: stats.low, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="NOC monitoring"
        title="Bas bet"
        description="Optik talshıq tarmaqları boyınsha monitoring, isenimlilik indeksi, kritik OTDR belgileri hám rezerv kanal jaǵdayı bir professional panelde kórsetiledi."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard title="Jami tarmaqlar" value={stats.total} icon={Cable} tone="blue" note="localStorage bazasında" />
        <StatCard title="Ortasha isenimlilik" value={stats.average} icon={Gauge} tone="green" note="0-100 ball" />
        <StatCard title="Kritik jaǵday" value={criticalOtdr} icon={AlertCircle} tone="red" note="OTDR kritik" trend="tez tekseriw kerek" />
        <StatCard title="Rezervsiz tarmaqlar" value={noReserve} icon={ShieldOff} tone="yellow" note="qosımsha kanal joq" />
        <StatCard title="Joqarı isenimlilik" value={stats.high} icon={ShieldCheck} tone="green" note="85+ ball" />
        <StatCard title="Tómen isenimlilik" value={stats.low} icon={Server} tone="red" note="0-59 ball" trend="prioritet monitoring" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Isenimlilik balları" description="Har bir tarmaq ushın avtomatik esaplanǵan 0-100 ball." footer="Joqarı ball rezerv kanal, normal OTDR hám tómen signal joǵaltıwı menen baylanıslı.">
          <BarChart data={scoreData}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b' }} />
            <Tooltip cursor={{ fill: '#eff6ff' }} />
            <Bar dataKey="ball" radius={[10, 10, 0, 0]}>
              {scoreData.map((entry) => <Cell key={entry.name} fill={getReliabilityLevel(entry.ball).tone === 'green' ? '#10b981' : getReliabilityLevel(entry.ball).tone === 'yellow' ? '#f59e0b' : '#ef4444'} />)}
            </Bar>
          </BarChart>
        </ChartCard>
        <ChartCard title="Isenimlilik toifaları" description="Joqarı, orta hám tómen dárejedegi tarmaqlar úlesi." footer="Pie chart diplom qorǵawında umumiy monitoring jaǵdayın tez túsindiriwge qolay.">
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={68} outerRadius={112} paddingAngle={4} label>
              {categoryData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>
      </div>
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-950">Sońǵı qosılǵan tarmaqlar</h3>
            <p className="text-sm text-slate-500">III bap ámeliy bólimi ushın real monitoring jadvalı.</p>
          </div>
        </div>
        <NetworkTable networks={latest} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </section>
    </div>
  );
}
