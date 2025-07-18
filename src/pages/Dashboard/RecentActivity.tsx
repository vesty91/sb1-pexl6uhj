import React from 'react';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'success',
    title: 'Nettoyage système terminé',
    description: '2.4 GB d\'espace libéré',
    timestamp: 'Il y a 5 minutes'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Mise à jour disponible',
    description: 'Windows Update disponible',
    timestamp: 'Il y a 15 minutes'
  },
  {
    id: '3',
    type: 'success',
    title: 'Scan antivirus complété',
    description: 'Aucune menace détectée',
    timestamp: 'Il y a 1 heure'
  },
  {
    id: '4',
    type: 'info',
    title: 'Benchmark système',
    description: 'Score: 8.5/10',
    timestamp: 'Il y a 2 heures'
  }
];

const RecentActivity: React.FC = () => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'error':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-400" />
        Activité Récente
      </h2>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`group relative rounded-xl border p-4 hover:scale-[1.02] transition-all duration-300 ${getActivityColor(activity.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm mb-1">
                  {activity.title}
                </h3>
                <p className="text-white/60 text-xs mb-2">
                  {activity.description}
                </p>
                <span className="text-white/40 text-xs">
                  {activity.timestamp}
                </span>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300 hover:bg-white/5 rounded-xl">
        Voir toute l'activité
      </button>
    </div>
  );
};

export default RecentActivity;