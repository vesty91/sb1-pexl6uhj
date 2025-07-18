import React, { useState } from 'react';
import ToolsCarousel from './ToolsCarousel';
import ToolsGrid from './ToolsGrid';
import ToolsFilters from './ToolsFilters';
import { Grid, RotateCcw } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  executable: string;
  version?: string;
  size?: string;
  installed?: boolean;
}

const mockTools: Tool[] = [
  {
    id: '1',
    name: 'CCleaner',
    description: 'Nettoyeur de registre et fichiers temporaires',
    category: 'nettoyage',
    icon: '🧹',
    executable: 'ccleaner.exe',
    version: '6.0.1',
    size: '45 MB',
    installed: true
  },
  {
    id: '2',
    name: 'CPU-Z',
    description: 'Informations détaillées sur le processeur',
    category: 'diagnostic',
    icon: '🔍',
    executable: 'cpuz.exe',
    version: '2.0.0',
    size: '3.2 MB',
    installed: false
  },
  {
    id: '3',
    name: '7-Zip',
    description: 'Gestionnaire d\'archives haute performance',
    category: 'compression',
    icon: '📦',
    executable: '7zip.exe',
    version: '23.01',
    size: '1.5 MB',
    installed: true
  },
  {
    id: '4',
    name: 'HWiNFO',
    description: 'Diagnostic matériel complet',
    category: 'diagnostic',
    icon: '⚙️',
    executable: 'hwinfo.exe',
    version: '7.5.0',
    size: '8.9 MB',
    installed: false
  },
  {
    id: '5',
    name: 'Malwarebytes',
    description: 'Protection anti-malware avancée',
    category: 'securite',
    icon: '🛡️',
    executable: 'malwarebytes.exe',
    version: '4.6.0',
    size: '156 MB',
    installed: true
  },
  {
    id: '6',
    name: 'CrystalDiskInfo',
    description: 'Monitoring de santé des disques durs',
    category: 'diagnostic',
    icon: '💿',
    executable: 'crystaldiskinfo.exe',
    version: '9.0.0',
    size: '5.1 MB',
    installed: false
  }
];

const ToolsManager: React.FC = () => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = mockTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(mockTools.map(tool => tool.category)))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
              Gestionnaire d'Outils
            </h1>
            <p className="text-white/70">
              Collection d'utilitaires système et outils de diagnostic
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('carousel')}
              className={`p-2 rounded-xl transition-all duration-300 ${
                viewMode === 'carousel'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ToolsFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Tools Display */}
      {viewMode === 'carousel' ? (
        <ToolsCarousel tools={filteredTools} />
      ) : (
        <ToolsGrid tools={filteredTools} />
      )}
    </div>
  );
};

export default ToolsManager;