export function calculateReliability(network) {
  let score = 100;
  const loss = Number(network.signalLoss) || 0;
  const length = Number(network.cableLength) || 0;
  const splices = Number(network.splicePoints) || 0;
  const connectors = Number(network.connectors) || 0;

  if (loss > 10) score -= 10;
  if (loss > 15) score -= 10;
  if (length > 20) score -= 5;
  if (length > 50) score -= 10;
  if (splices > 10) score -= 5;
  if (splices > 25) score -= 10;
  if (connectors > 6) score -= 5;
  if (network.splitterRatio === '1:32') score -= 5;
  if (network.splitterRatio === '1:64') score -= 10;
  if (network.hasReserve === 'mavjud emas') score -= 15;
  if (network.otdrStatus === 'ogohlantirish') score -= 10;
  if (network.otdrStatus === 'kritik') score -= 25;
  if (network.oltStatus === 'ogohlantirish') score -= 10;
  if (network.oltStatus === 'nosoz') score -= 25;
  if (network.ontStatus === 'ogohlantirish') score -= 5;
  if (network.ontStatus === 'nosoz') score -= 15;
  if (network.environmentRisk === 'orta') score -= 5;
  if (network.environmentRisk === 'yuqori') score -= 15;

  return Math.max(0, Math.round(score));
}

export function getReliabilityLevel(score) {
  if (score >= 85) {
    return {
      label: 'Joqarı isenimlilik',
      tone: 'green',
      textClass: 'text-emerald-700',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200',
    };
  }
  if (score >= 60) {
    return {
      label: 'Orta isenimlilik',
      tone: 'yellow',
      textClass: 'text-amber-700',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200',
    };
  }
  return {
    label: 'Tómen isenimlilik',
    tone: 'red',
    textClass: 'text-red-700',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
  };
}

export function getRiskFactors(network) {
  const risks = [];
  if (Number(network.signalLoss) > 10) risks.push('Optik signal joǵaltıwı meyarden joqarı');
  if (Number(network.signalLoss) > 15) risks.push('Signal joǵaltıwı kritik shekten asqan');
  if (Number(network.cableLength) > 20) risks.push('Kabel uzınlıǵı úlken aralıqta jaylasqan');
  if (Number(network.splicePoints) > 10) risks.push('Payvandlaw noqatları sanı kóp');
  if (Number(network.connectors) > 6) risks.push('Konnektorlar sanı signal sapasına tásir etedi');
  if (network.splitterRatio === '1:32' || network.splitterRatio === '1:64') risks.push('Splitter nısbatı joqarı júklenis beredi');
  if (network.hasReserve === 'mavjud emas') risks.push('Rezerv kanal joq');
  if (network.otdrStatus === 'ogohlantirish' || network.otdrStatus === 'kritik') risks.push('OTDR tekseriwinde qáwip belgileri bar');
  if (network.oltStatus !== 'normal') risks.push('OLT jaǵdayı monitoring talap etedi');
  if (network.ontStatus !== 'normal') risks.push('ONT/ONU qurılmaları turaqlılıǵı tómenlegen');
  if (network.environmentRisk === 'orta' || network.environmentRisk === 'yuqori') risks.push('Sırtqı ortalıq qáwpi bar');
  return risks.length ? risks : ['Áhmiyetli qáwip faktorları anıqlanbadı'];
}

export function getRecommendations(network, score) {
  const items = [];
  if (Number(network.signalLoss) > 10) {
    items.push('Optik signal joǵaltıwı joqarı. Konnektorlar, payvandlaw noqatları hám kabel egiliw radiusın tekseriw usınıladı.');
  }
  if (network.hasReserve === 'mavjud emas') {
    items.push('Rezerv kanal joq. Tarmaq isenimliligin arttırıw ushın qosımsha rezerv kanal yamasa halqa topologiyası usınıladı.');
  }
  if (network.otdrStatus === 'kritik') {
    items.push('OTDR nátiyjesi kritik. Kabel úziliwi, kúshli sońiw yamasa refleksiya noqatların anıqlaw kerek.');
  }
  if (network.environmentRisk === 'yuqori') {
    items.push('Sırtqı ortalıq qáwpi joqarı. Kabel qorǵaw qutıları, kanalizaciya yamasa bronlangan kabel qollanıw usınıladı.');
  }
  if (Number(network.splicePoints) > 10) {
    items.push('Payvandlaw noqatları sanı kóp. Signal joǵaltıwın kemeytiw ushın payvandlaw sapasın qayta tekseriw kerek.');
  }
  if (score >= 85) {
    items.push('Tarmaq jaǵdayı jaqsı. Rejali texnikalıq xızmet hám monitoringti dawam ettiriw jetkilikli.');
  }
  return items;
}
