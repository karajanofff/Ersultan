import { RotateCcw, Save, Sigma } from 'lucide-react';
import { useEffect, useState } from 'react';
import { displayValue } from '../utils/labels';

const initialForm = {
  name: '',
  type: 'FTTH',
  cableLength: '',
  signalLoss: '',
  splicePoints: '',
  connectors: '',
  splitterRatio: '1:16',
  hasReserve: 'mavjud',
  otdrStatus: 'normal',
  oltStatus: 'normal',
  ontStatus: 'normal',
  environmentRisk: 'past',
  maintenanceDate: '',
  note: '',
};

export default function NetworkForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData ? { ...initialForm, ...initialData } : initialForm);
    setErrors({});
  }, [initialData]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Tarmoq atı bos bolmawı kerek.';
    if (Number(form.cableLength) <= 0) nextErrors.cableLength = 'Kabel uzınlıǵı 0 den úlken bolıwı kerek.';
    if (Number(form.signalLoss) < 0 || form.signalLoss === '') nextErrors.signalLoss = 'Signal joǵaltıwı teris bolmawı kerek.';
    ['splicePoints', 'connectors'].forEach((field) => {
      if (form[field] === '' || Number(form[field]) < 0) nextErrors[field] = 'Bul maydanǵa 0 yamasa onnan úlken san kirgiziń.';
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      cableLength: Number(form.cableLength),
      signalLoss: Number(form.signalLoss),
      splicePoints: Number(form.splicePoints),
      connectors: Number(form.connectors),
    });
    if (!initialData) setForm(initialForm);
  };

  const resetForm = () => {
    setForm(initialData ? { ...initialForm, ...initialData } : initialForm);
    setErrors({});
  };

  const Input = ({ label, field, type = 'text', min, step }) => (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        type={type}
        min={min}
        step={step}
        value={form[field]}
        onChange={(event) => setField(field, event.target.value)}
        className={`mt-2 w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm font-medium outline-none transition duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 ${
          errors[field] ? 'border-red-300' : 'border-slate-200'
        }`}
      />
      {errors[field] ? <span className="mt-1 block text-xs text-red-600">{errors[field]}</span> : null}
    </label>
  );

  const Select = ({ label, field, children }) => (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select
        value={form[field]}
        onChange={(event) => setField(field, event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium outline-none transition duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
      >
        {children}
      </select>
    </label>
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="glass-card rounded-2xl p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Input label="Tarmoq atı" field="name" />
          <Select label="Tarmoq túri" field="type">
            <option>FTTH</option>
            <option>GPON</option>
            <option>DWDM</option>
            <option>Metro Ethernet</option>
          </Select>
          <Input label="Kabel uzınlıǵı, km" field="cableLength" type="number" min="0" step="0.1" />
          <Input label="Optik signal joǵaltıwı, dB" field="signalLoss" type="number" min="0" step="0.1" />
          <Input label="Payvandlaw noqatları sanı" field="splicePoints" type="number" min="0" step="1" />
          <Input label="Konnektorlar sanı" field="connectors" type="number" min="0" step="1" />
          <Select label="Splitter nısbatı" field="splitterRatio">
            <option>1:8</option>
            <option>1:16</option>
            <option>1:32</option>
            <option>1:64</option>
          </Select>
          <Select label="Rezerv kanal" field="hasReserve">
            <option value="mavjud">{displayValue('mavjud')}</option>
            <option value="mavjud emas">{displayValue('mavjud emas')}</option>
          </Select>
          <Select label="OTDR tekseriw jaǵdayı" field="otdrStatus">
            <option value="normal">{displayValue('normal')}</option>
            <option value="ogohlantirish">{displayValue('ogohlantirish')}</option>
            <option value="kritik">{displayValue('kritik')}</option>
          </Select>
          <Select label="OLT jaǵdayı" field="oltStatus">
            <option value="normal">{displayValue('normal')}</option>
            <option value="ogohlantirish">{displayValue('ogohlantirish')}</option>
            <option value="nosoz">{displayValue('nosoz')}</option>
          </Select>
          <Select label="ONT/ONU jaǵdayı" field="ontStatus">
            <option value="normal">{displayValue('normal')}</option>
            <option value="ogohlantirish">{displayValue('ogohlantirish')}</option>
            <option value="nosoz">{displayValue('nosoz')}</option>
          </Select>
          <Select label="Sırtqı ortalıq qáwpi" field="environmentRisk">
            <option value="past">{displayValue('past')}</option>
            <option value="orta">{displayValue('orta')}</option>
            <option value="yuqori">{displayValue('yuqori')}</option>
          </Select>
          <Input label="Aqırǵı texnikalıq xızmet sánesi" field="maintenanceDate" type="date" />
          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-slate-700">Izoh</span>
            <textarea
              value={form.note}
              onChange={(event) => setField('note', event.target.value)}
              rows="4"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium outline-none transition duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="gradient-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-black text-white transition duration-200 hover:-translate-y-0.5">
            <Save size={18} />
            Saqlaw
          </button>
          <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black text-slate-700 transition hover:bg-slate-50">
            <RotateCcw size={18} />
            Tazalaw
          </button>
          {onCancel ? (
            <button type="button" onClick={onCancel} className="rounded-2xl border border-slate-200 px-5 py-3 font-black text-slate-700 hover:bg-slate-50">
              Biykarlaw
            </button>
          ) : null}
        </div>
      </form>
      <aside className="card-hover rounded-2xl border border-cyan-100 bg-gradient-to-br from-blue-950 to-cyan-800 p-6 text-white shadow-soft">
        <div className="mb-4 inline-flex rounded-2xl bg-white/12 p-3 text-cyan-100">
          <Sigma size={24} />
        </div>
        <h3 className="text-xl font-black">Isenimlilik algoritmi qalay isleydi?</h3>
        <p className="mt-3 text-sm leading-6 text-cyan-50/85">
          Platforma 100 balldan baslaydı. Signal joǵaltıwı, kabel uzınlıǵı, payvandlaw noqatları, rezerv kanal, OTDR, OLT/ONT hám sırtqı ortalıq qáwpi boyınsha ball kemeytiledi.
        </p>
        <div className="mt-5 space-y-3 text-sm">
          <div className="rounded-2xl bg-white/10 p-3">85-100: Joqarı isenimlilik</div>
          <div className="rounded-2xl bg-white/10 p-3">60-84: Orta isenimlilik</div>
          <div className="rounded-2xl bg-white/10 p-3">0-59: Tómen isenimlilik</div>
        </div>
      </aside>
    </div>
  );
}
