import { Cable, CircuitBoard, Router, Scissors, Split, Waves } from 'lucide-react';
import NetworkTable from '../components/NetworkTable';
import PageHeader from '../components/PageHeader';
import RiskCard from '../components/RiskCard';
import { calculateReliability } from '../utils/reliability';

export default function Faults({ networks, onView, onEdit, onDelete }) {
  const avgLoss = networks.length ? networks.reduce((sum, item) => sum + Number(item.signalLoss || 0), 0) / networks.length : 0;
  const maxLength = networks.length ? Math.max(...networks.map((item) => Number(item.cableLength || 0))) : 0;
  const badConnectors = networks.filter((item) => Number(item.connectors) > 6).length;
  const splitterRisk = networks.filter((item) => item.splitterRatio === '1:32' || item.splitterRatio === '1:64').length;
  const deviceRisk = networks.filter((item) => item.oltStatus !== 'normal' || item.ontStatus !== 'normal').length;
  const envRisk = networks.filter((item) => item.environmentRisk === 'yuqori').length;
  const lowScore = networks.filter((item) => calculateReliability(item) < 60).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Fault intelligence"
        title="Texnikalıq nasazlıqlar"
        description="Nasazlıq kategoriyaları signal joǵaltıwı, kabel úziliwi, splitter, konnektor, qurılma hám sırtqı ortalıq qáwpi boyınsha professional monitoring formatında beriledi."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RiskCard title="Signal joǵaltıwı" icon={Waves} status={avgLoss > 15 ? 'critical' : avgLoss > 10 ? 'warning' : 'normal'} description={`Ortasha signal joǵaltıwı: ${avgLoss.toFixed(1)} dB.`} recommendation="Konnektorlar, payvandlaw noqatları hám egiliw radiusın tekseriw." />
        <RiskCard title="Kabel úziliwi" icon={Cable} status={lowScore > 0 || maxLength > 50 ? 'critical' : maxLength > 20 ? 'warning' : 'normal'} description={`Eń uzaq uchastka: ${maxLength} km.`} recommendation="OTDR trassasın qayta ólshep, refleksiya noqatların lokalizaciya qılıw." />
        <RiskCard title="Konnektor mashqalası" icon={Scissors} status={badConnectors > 0 ? 'warning' : 'normal'} description={`${badConnectors} tarmaqta konnektor sanı meyarden joqarı.`} recommendation="Konnektor tazalıǵı, APC/UPC uyqaslıǵı hám signal sapasın tekseriw." />
        <RiskCard title="Splitter joǵaltıwı" icon={Split} status={splitterRisk > 0 ? 'warning' : 'normal'} description={`${splitterRisk} tarmaqta 1:32 yamasa 1:64 splitter bar.`} recommendation="Splitter júklenisin optimallastırıw yamasa segmentti qayta bóliw." />
        <RiskCard title="OLT/ONT nasazlıǵı" icon={Router} status={deviceRisk > 0 ? 'critical' : 'normal'} description={`${deviceRisk} tarmaqta qurılma eskertiw/nasaz halatta.`} recommendation="OLT portları, ONT/ONU quwatlanıwı hám firmware monitoringin tekseriw." />
        <RiskCard title="Sırtqı ortalıq qáwpi" icon={CircuitBoard} status={envRisk > 0 ? 'critical' : 'normal'} description={`${envRisk} tarmaqta sırtqı qáwip joqarı.`} recommendation="Qorǵaw qutıları, kanalizaciya yamasa bronlangan kabel qollanıw." />
      </div>
      <NetworkTable networks={networks} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
