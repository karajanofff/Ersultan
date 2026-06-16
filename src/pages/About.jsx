import ArchitectureDiagram from '../components/ArchitectureDiagram';
import PageHeader from '../components/PageHeader';

export default function About() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="III bap arxitekturası"
        title="Platforma haqqında"
        description="Bul web-platforma III bap ushın optik talshıq tarmaǵınıń isenimliligin bahalaw, monitoring nátiyjelerin vizuallastırıw hám usınıslar tayarlaw maqsetinde islep shıǵıldı."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="font-black text-slate-950">3.1. Maqset hám wazıypalar</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Platforma tarmaq parametrlerin jıynaydı, lokal saqlaydı, isenimlilik dárejesin esaplaydı hám injener ushın qarar qabıllawǵa járdem beretuǵın analitika usınadı.</p>
        </section>
        <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="font-black text-slate-950">3.2. Algoritm hám arxitektura</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Esaplaw modeli 100 balldan baslanıp, signal joǵaltıwı, OTDR, rezerv kanal, kabel uzınlıǵı hám ortalıq qáwpi boyınsha shtrax balların alıp taslaydı.</p>
        </section>
        <section className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="font-black text-slate-950">3.3. Interfeys hám nátiyje</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Basqarıw paneli, jadval, diagramma hám PDF/Print esabatları diplom qorǵawında ámeliy nátiyjeni kórsetiwge tayar.</p>
        </section>
      </div>
      <ArchitectureDiagram />
    </div>
  );
}
