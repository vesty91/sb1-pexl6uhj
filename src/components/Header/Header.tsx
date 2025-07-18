import React, { useState } from 'react';
import { Search, Bell, User, Maximize2, Minimize2 } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <header className="h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-blue-400 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Rechercher des outils, actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300"
          />
          {/* Search Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 text-sm rounded-lg border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105">
            Scan Rapide
          </button>
          <button className="px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 text-sm rounded-lg border border-green-500/30 hover:from-green-500/30 hover:to-emerald-600/30 transition-all duration-300 hover:scale-105">
            Optimiser
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
          <Bell className="w-5 h-5" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden lg:block text-sm">Admin</span>
          <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;