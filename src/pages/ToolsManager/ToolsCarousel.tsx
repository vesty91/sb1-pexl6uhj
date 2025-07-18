import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Play, Info } from 'lucide-react';
import { Tool } from './ToolsManager';
import { useNotification } from '../../context/NotificationContext';

interface ToolsCarouselProps {
  tools: Tool[];
}

const ToolsCarousel: React.FC<ToolsCarouselProps> = ({ tools }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { addNotification } = useNotification();

  const currentTool = tools[currentIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const nextTool = () => {
    setCurrentIndex((prev) => (prev + 1) % tools.length);
  };

  const prevTool = () => {
    setCurrentIndex((prev) => (prev - 1 + tools.length) % tools.length);
  };

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

  if (!currentTool) {
    return (
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
        <p className="text-white/60">Aucun outil disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center font-['Orbitron']">
        Carrousel des Outils - Shards de Mémoire
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevTool}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-black/60 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextTool}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-black/60 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Carousel Container */}
        <div className="relative h-96 flex items-center justify-center perspective-1000">
          {/* Main Card with 3D Flip */}
          <div
            className={`relative w-80 h-80 transition-transform duration-700 preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front Face */}
            <div className="absolute inset-0 backface-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-500">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-xl"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  {/* Tool Icon */}
                  <div className="text-6xl mb-4 animate-pulse">
                    {currentTool.icon}
                  </div>
                  
                  {/* Tool Name */}
                  <h3 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">
                    {currentTool.name}
                  </h3>
                  
                  {/* Category Badge */}
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white/80 text-sm mb-4 capitalize">
                    {currentTool.category}
                  </span>
                  
                  {/* Status */}
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    currentTool.installed 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      currentTool.installed ? 'bg-green-400' : 'bg-gray-400'
                    } animate-pulse`}></div>
                    {currentTool.installed ? 'Installé' : 'Non installé'}
                  </div>

                  {/* Click to flip hint */}
                  <p className="text-white/40 text-xs mt-4 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Cliquez pour plus d'infos
                  </p>
                </div>
              </div>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className="flex flex-col justify-between h-full">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 font-['Orbitron']">
                      {currentTool.name}
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed">
                      {currentTool.description}
                    </p>
                    
                    {/* Details */}
                    <div className="space-y-2 text-sm text-white/60">
                      {currentTool.version && (
                        <div>Version: <span className="text-white/80">{currentTool.version}</span></div>
                      )}
                      {currentTool.size && (
                        <div>Taille: <span className="text-white/80">{currentTool.size}</span></div>
                      )}
                      <div>Exécutable: <span className="text-white/80">{currentTool.executable}</span></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {currentTool.installed ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExecute(currentTool);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <Play className="w-4 h-4" />
                        Exécuter
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInstall(currentTool);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <Download className="w-4 h-4" />
                        Installer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {tools.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-400 shadow-lg shadow-blue-400/50' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Keyboard Navigation Hint */}
        <p className="text-center text-white/40 text-sm mt-4">
          Utilisez les flèches ← → pour naviguer
        </p>
      </div>
    </div>
  );
};

export default ToolsCarousel;