import React from 'react';
import { Home, Wrench, Package, HardDrive, Terminal, Settings } from 'lucide-react';
import { ActivePage } from '../../App';

interface SidebarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
}

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', description: 'Vue d\'ensemble' },
  { id: 'tools', icon: Wrench, label: 'Outils', description: 'Gestion des utilitaires' },
  { id: 'chocolatey', icon: Package, label: 'Chocolatey', description: 'Gestionnaire de paquets' },
  { id: 'nas', icon: HardDrive, label: 'NAS Explorer', description: 'Explorateur réseau' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', description: 'Console système' },
] as const;

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  return (
    <div className="w-20 lg:w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 transition-all duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-white font-['Orbitron']">VestyWinBox</h1>
            <p className="text-xs text-white/60">Gestion Système</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as ActivePage)}
              className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 shadow-lg shadow-blue-500/10 border border-blue-500/30'
                  : 'hover:bg-white/5 hover:shadow-md hover:shadow-white/5'
              }`}
            >
              {/* LED Effect for Active Item */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r"></div>
              )}
              
              <div className="flex items-center gap-4 p-4">
                <div className={`relative transition-all duration-300 ${
                  isActive ? 'text-blue-400 scale-110' : 'text-white/70 group-hover:text-white group-hover:scale-105'
                }`}>
                  <Icon className="w-6 h-6" />
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"></div>
                  )}
                </div>
                
                <div className="hidden lg:block text-left">
                  <div className={`font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {item.label}
                  </div>
                  <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    {item.description}
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/70 hidden lg:block">Système OK</span>
          </div>
          <div className="hidden lg:block space-y-1 text-xs text-white/50">
            <div>CPU: 45%</div>
            <div>RAM: 8.2/16 GB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;