import React, { useState } from 'react';
import { Package, Download, Trash2, RefreshCw, Search, Terminal } from 'lucide-react';
import ChocolateyTerminal from './ChocolateyTerminal';

interface ChocolateyPackage {
  id: string;
  name: string;
  version: string;
  description: string;
  installed: boolean;
  category: string;
}

const mockPackages: ChocolateyPackage[] = [
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    version: '1.85.0',
    description: 'Éditeur de code source léger mais puissant',
    installed: true,
    category: 'development'
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    version: '120.0.6099.71',
    description: 'Navigateur web rapide et sécurisé',
    installed: true,
    category: 'browsers'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    version: '20.10.0',
    description: 'Runtime JavaScript côté serveur',
    installed: false,
    category: 'development'
  },
  {
    id: 'vlc',
    name: 'VLC Media Player',
    version: '3.0.18',
    description: 'Lecteur multimédia universel',
    installed: false,
    category: 'media'
  }
];

const ChocolateyManager: React.FC = () => {
  const [packages, setPackages] = useState(mockPackages);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const categories = ['all', ...Array.from(new Set(packages.map(pkg => pkg.category)))];

  const filteredPackages = packages.filter(pkg => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToTerminal = (message: string) => {
    setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleInstall = (pkg: ChocolateyPackage) => {
    addToTerminal(`Installation de ${pkg.name}...`);
    setTerminalVisible(true);
    
    // Simulate installation
    setTimeout(() => {
      setPackages(prev => prev.map(p => 
        p.id === pkg.id ? { ...p, installed: true } : p
      ));
      addToTerminal(`${pkg.name} installé avec succès`);
    }, 2000);
  };

  const handleUninstall = (pkg: ChocolateyPackage) => {
    addToTerminal(`Désinstallation de ${pkg.name}...`);
    setTerminalVisible(true);
    
    // Simulate uninstallation
    setTimeout(() => {
      setPackages(prev => prev.map(p => 
        p.id === pkg.id ? { ...p, installed: false } : p
      ));
      addToTerminal(`${pkg.name} désinstallé avec succès`);
    }, 1500);
  };

  const handleUpdate = (pkg: ChocolateyPackage) => {
    addToTerminal(`Mise à jour de ${pkg.name}...`);
    setTerminalVisible(true);
    
    setTimeout(() => {
      addToTerminal(`${pkg.name} mis à jour vers la dernière version`);
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      development: 'from-blue-500 to-cyan-400',
      browsers: 'from-green-500 to-emerald-400',
      media: 'from-purple-500 to-violet-400',
      tools: 'from-orange-500 to-yellow-400'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-slate-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h1 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
          Gestionnaire Chocolatey
        </h1>
        <p className="text-white/70">
          Installation et gestion des packages via Chocolatey
        </p>
      </div>

      {/* Controls */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Rechercher un package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>

          {/* Terminal Toggle */}
          <button
            onClick={() => setTerminalVisible(!terminalVisible)}
            className={`p-2 rounded-xl transition-all duration-300 ${
              terminalVisible
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative overflow-hidden bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(pkg.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Package className="w-8 h-8 text-blue-400" />
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    pkg.installed 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {pkg.installed ? 'Installé' : 'Non installé'}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-white/60 text-sm mb-3">
                  {pkg.description}
                </p>
                <div className="text-xs text-white/50 mb-4">
                  Version: {pkg.version}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {pkg.installed ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(pkg)}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Mettre à jour
                      </button>
                      <button
                        onClick={() => handleUninstall(pkg)}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-red-500 to-pink-400 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Désinstaller
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleInstall(pkg)}
                      className={`w-full py-2 px-4 bg-gradient-to-r ${getCategoryColor(pkg.category)} text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Installer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      {terminalVisible && (
        <ChocolateyTerminal 
          output={terminalOutput}
          onClose={() => setTerminalVisible(false)}
        />
      )}
    </div>
  );
};

export default ChocolateyManager;