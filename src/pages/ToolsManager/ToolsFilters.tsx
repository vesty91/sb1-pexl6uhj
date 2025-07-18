import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ToolsFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ToolsFilters: React.FC<ToolsFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  const getCategoryLabel = (category: string) => {
    const labels = {
      all: 'Tous',
      nettoyage: 'Nettoyage',
      diagnostic: 'Diagnostic',
      compression: 'Compression',
      securite: 'Sécurité'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Rechercher un outil..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/50 mr-2" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsFilters;