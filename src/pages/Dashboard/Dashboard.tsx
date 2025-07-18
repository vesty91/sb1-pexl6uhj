import React from 'react';
import QuickActionCard from './QuickActionCard';
import SystemStats from './SystemStats';
import RecentActivity from './RecentActivity';
import { Zap, Shield, Trash2, Download, Cpu, HardDrive } from 'lucide-react';

const quickActions = [
  {
    id: 'scan',
    title: 'Scan Système',
    description: 'Analyse complète du système',
    icon: Zap,
    color: 'from-blue-500 to-cyan-400',
    action: 'scan'
  },
  {
    id: 'clean',
    title: 'Nettoyage',
    description: 'Supprime les fichiers temporaires',
    icon: Trash2,
    color: 'from-green-500 to-emerald-400',
    action: 'clean'
  },
  {
    id: 'security',
    title: 'Sécurité',
    description: 'Vérification antivirus',
    icon: Shield,
    color: 'from-red-500 to-pink-400',
    action: 'security'
  },
  {
    id: 'update',
    title: 'Mises à jour',
    description: 'Recherche des mises à jour',
    icon: Download,
    color: 'from-purple-500 to-violet-400',
    action: 'update'
  },
  {
    id: 'benchmark',
    title: 'Benchmark',
    description: 'Test de performance',
    icon: Cpu,
    color: 'from-orange-500 to-yellow-400',
    action: 'benchmark'
  },
  {
    id: 'disk',
    title: 'Analyse Disque',
    description: 'Espace disque et défragmentation',
    icon: HardDrive,
    color: 'from-indigo-500 to-blue-400',
    action: 'disk'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h1 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
          Bienvenue dans VestyWinBox
        </h1>
        <p className="text-white/70">
          Tableau de bord principal pour la gestion avancée de votre système Windows
        </p>
      </div>

      {/* System Stats */}
      <SystemStats />

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.id} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;