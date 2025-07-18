import React, { useRef, useEffect } from 'react';
import { X, Terminal } from 'lucide-react';

interface ChocolateyTerminalProps {
  output: string[];
  onClose: () => void;
}

const ChocolateyTerminal: React.FC<ChocolateyTerminalProps> = ({ output, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-white font-medium">Terminal Chocolatey</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto bg-black/40 font-mono text-sm"
      >
        {output.length === 0 ? (
          <div className="text-green-400">
            PS C:\Users\Admin&gt; <span className="animate-pulse">_</span>
          </div>
        ) : (
          <>
            {output.map((line, index) => (
              <div key={index} className="text-green-400 mb-1">
                {line}
              </div>
            ))}
            <div className="text-green-400 mt-2">
              PS C:\Users\Admin&gt; <span className="animate-pulse">_</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChocolateyTerminal;