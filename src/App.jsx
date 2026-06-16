import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { demoNetworks } from './data/demoData';
import About from './pages/About';
import AddNetwork from './pages/AddNetwork';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import Evaluation from './pages/Evaluation';
import Faults from './pages/Faults';
import Reports from './pages/Reports';
import { calculateReliability } from './utils/reliability';

const STORAGE_KEY = 'optic-reliability-networks';

const pageLabels = {
  dashboard: 'Bas bet',
  add: 'Tarmoq maǵlıwmatların kirgiziw',
  evaluation: 'Isenimlilikti bahalaw',
  faults: 'Texnikalıq nasazlıqlar dizimi',
  analytics: 'Diagrammalar hám analitika',
  reports: 'Usınıslar hám esabat',
  about: 'Platforma haqqında',
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [networks, setNetworks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : demoNetworks;
    } catch {
      return demoNetworks;
    }
  });
  const [editingNetwork, setEditingNetwork] = useState(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(networks));
  }, [networks]);

  const stats = useMemo(() => {
    const scores = networks.map(calculateReliability);
    const average = scores.length ? Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) : 0;
    return {
      total: networks.length,
      average,
      high: scores.filter((score) => score >= 85).length,
      medium: scores.filter((score) => score >= 60 && score < 85).length,
      low: scores.filter((score) => score < 60).length,
    };
  }, [networks]);

  const navigate = (page) => {
    setActivePage(page);
    setMobileOpen(false);
    if (page !== 'add') setEditingNetwork(null);
  };

  const saveNetwork = (network) => {
    if (editingNetwork) {
      setNetworks((current) => current.map((item) => (item.id === editingNetwork.id ? { ...item, ...network, id: item.id, createdAt: item.createdAt } : item)));
      setEditingNetwork(null);
    } else {
      setNetworks((current) => [{ ...network, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...current]);
    }
    setActivePage('faults');
  };

  const editNetwork = (network) => {
    setEditingNetwork(network);
    setActivePage('add');
  };

  const deleteNetwork = (id) => {
    if (window.confirm('Bul jazıwdı óshiriwdi tastıyıqlaysız ba?')) {
      setNetworks((current) => current.filter((item) => item.id !== id));
    }
  };

  const viewNetwork = (network) => {
    setSelectedNetworkId(network.id);
    setActivePage('evaluation');
  };

  const loadDemo = () => setNetworks(demoNetworks);
  const clearAll = () => {
    if (window.confirm('Barlıq maǵlıwmatlardı tozalawdı tastıyıqlaysız ba?')) setNetworks([]);
  };

  const pageProps = { networks, stats, onView: viewNetwork, onEdit: editNetwork, onDelete: deleteNetwork };

  return (
    <div className="app-grid-bg min-h-screen bg-slate-100">
      <Sidebar activePage={activePage} onNavigate={navigate} />
      {mobileOpen ? (
        <div className="no-print fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="h-full w-72" onClick={(event) => event.stopPropagation()}>
            <Sidebar activePage={activePage} onNavigate={navigate} mobile />
          </div>
        </div>
      ) : null}
      <Header activeLabel={pageLabels[activePage]} stats={stats} onMenuToggle={() => setMobileOpen(true)} />
      <main className="px-4 py-6 lg:ml-72 lg:px-8">
        <div className="no-print mb-6 flex flex-wrap gap-3">
          <button onClick={loadDemo} className="rounded-2xl border border-blue-200 bg-white/90 px-4 py-2.5 text-sm font-black text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50">
            Demo maǵlıwmatlardı júklew
          </button>
          <button onClick={clearAll} className="rounded-2xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm font-black text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-50">
            Barlıq maǵlıwmatlardı tozalaw
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {activePage === 'dashboard' && <Dashboard {...pageProps} />}
            {activePage === 'add' && <AddNetwork editingNetwork={editingNetwork} onSubmit={saveNetwork} onCancel={() => setEditingNetwork(null)} />}
            {activePage === 'evaluation' && <Evaluation networks={networks} selectedNetworkId={selectedNetworkId} onSelectNetwork={setSelectedNetworkId} />}
            {activePage === 'faults' && <Faults {...pageProps} />}
            {activePage === 'analytics' && <Analytics networks={networks} stats={stats} />}
            {activePage === 'reports' && <Reports networks={networks} />}
            {activePage === 'about' && <About />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
