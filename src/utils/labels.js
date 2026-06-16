export const valueLabels = {
  'mavjud': 'bar',
  'mavjud emas': 'joq',
  normal: 'normal',
  ogohlantirish: 'eskertiw',
  kritik: 'kritik',
  nosoz: 'nasaz',
  past: 'tómen',
  orta: 'orta',
  yuqori: 'joqarı',
};

export function displayValue(value) {
  return valueLabels[value] || value;
}
