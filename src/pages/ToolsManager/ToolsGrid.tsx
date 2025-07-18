import React from 'react';
import { Download, Play, CheckCircle } from 'lucide-react';
import { Tool } from './ToolsManager';
import { useNotification } from '../../context/NotificationContext';

interface ToolsGridProps {
  tools: Tool[];
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools }) => {
  const { addNotification } = useNotification();

  const handleInstall = (tool: Tool) => {
    addNotification({
      type: 'success',
      title: 'Installation',
      message: `${tool.name} installé avec succès`
    });
  };

  const handleExecute = (tool: Tool) => {
    addNotification({
      type: 'info',
      title: 'Exécution',
      message: `Lancement de ${tool.name}`
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      nettoyage: 'from-green-500 to-emerald-400',
      diagnostic: 'from-blue-500 to-cyan-400',
      compression: 'from-purple-500 to-violet-400',
      securite: 'from-red-500 to-pink-400',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-slate-400';
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="group relative overflow-hidden bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(tool.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
            
            {/* LED Border Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getCategoryColor(tool.category)} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{tool.icon}</div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  tool.installed 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {tool.installed && <CheckCircle className="w-3 h-3" />}
                  {tool.installed ? 'Installé' : 'Non installé'}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
                {tool.name}
              </h3>
              
              <p className="text-white/60 text-sm mb-4 group-hover:text-white/80 transition-colors duration-300">
                {tool.description}
              </p>

              {/* Details */}
              <div className="space-y-1 text-xs text-white/50 mb-4">
                <div className="flex justify-between">
                  <span>Catégorie:</span>
                  <span className="capitalize text-white/70">{tool.category}</span>
                </div>
                {tool.version && (
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="text-white/70">{tool.version}</span>
                  </div>
                )}
                {tool.size && (
                  <div className="flex justify-between">
                    <span>Taille:</span>
                    <span className="text-white/70">{tool.size}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {tool.installed ? (
                <button
                  onClick={() => handleExecute(tool)}
                  className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Exécuter
                </button>
              ) : (
                <button
                  onClick={() => handleInstall(tool)}
                  className={`w-full py-2 px-4 bg-gradient-to-r ${getCategoryColor(tool.category)} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2`}
                >
                  <Download className="w-4 h-4" />
                  Installer
                </button>
              )}
            </div>

            {/* Hover Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
          </div>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">Aucun outil ne correspond aux critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default ToolsGrid;