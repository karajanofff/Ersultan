import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import PageHeader from '../components/PageHeader';
import { calculateReliability, getReliabilityLevel } from '../utils/reliability';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#2563eb', '#06b6d4'];

export default function Analytics({ networks, stats }) {
  const scoreData = networks.map((item) => ({ name: item.name, ball: calculateReliability(item) }));
  const categoryData = [
    { name: 'Joqarı isenimlilik', value: stats.high },
    { name: 'Orta isenimlilik', value: stats.medium },
    { name: 'Tómen isenimlilik', value: stats.low },
  ];
  const scatterData = networks.map((item) => ({ name: item.name, uzınlıq: Number(item.cableLength), joǵaltıw: Number(item.signalLoss) }));
  const typeData = Object.values(networks.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || { name: item.type, value: 0 };
    acc[item.type].value += 1;
    return acc;
  }, {}));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analitika"
        title="Diagrammalar hám analitika"
        description="Grafikler optik tarmoq isenimliligi, kabel uzınlıǵı, signal joǵaltıwı hám texnologiya túrleri arasındaǵı baylanıstı vizual túrde kórsetedi."
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Tarmaqlar boyınsha isenimlilik ballı" description="Har bir tarmaq ushın esaplanǵan indeks." footer="Tómen ballı tarmaqlar profilaktikalıq texnik xızmet rejesine birinshi kirgiziledi.">
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
        <ChartCard title="Isenimlilik toifaları" description="Joqarı, orta hám tómen dárejeler bólistiriliwi." footer="Toifalar platformadaǵı umumiy isenimlilik portretin diplom qorǵawında anıq túsindiredi.">
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={112} paddingAngle={4} label>
              {categoryData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartCard>
        <ChartCard title="Signal joǵaltıwı vs kabel uzınlıǵı" description="Kabel uzınlıǵı artqan sayın sońiw tendenciyasın baqlaw." footer="Noqatlar joqarıǵa hám ońǵa jıljısa, kabel trassası hám payvandlaw sapasına diagnostika kerek.">
          <ScatterChart>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
            <XAxis dataKey="uzınlıq" name="km" unit=" km" tick={{ fill: '#64748b' }} />
            <YAxis dataKey="joǵaltıw" name="dB" unit=" dB" tick={{ fill: '#64748b' }} />
            <Tooltip cursor={{ strokeDasharray: '4 4' }} />
            <Scatter data={scatterData} fill="#2563eb" />
          </ScatterChart>
        </ChartCard>
        <ChartCard title="Tarmoq túri boyınsha bólistiriw" description="FTTH, GPON, DWDM hám Metro Ethernet segmentleri." footer="Taqsimot diagramması qaysı texnologiya kóbirek monitoring talab etetuǵının kórsetedi.">
          <LineChart data={typeData}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
            <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name="Tarmaqlar sanı" stroke="#0891b2" strokeWidth={4} dot={{ r: 6, fill: '#2563eb' }} />
          </LineChart>
        </ChartCard>
      </div>
    </div>
  );
}
