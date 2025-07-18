import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Square, Trash2, Save } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'command' | 'output' | 'error';
  content: string;
}

const TerminalView: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      type: 'output',
      content: 'VestyWinBox Terminal v1.0.0 - Prêt'
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: LogEntry['type'], content: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type,
      content
    };
    setLogs(prev => [...prev, newLog]);
  };

  const executeCommand = async () => {
    if (!currentCommand.trim() || isRunning) return;

    setIsRunning(true);
    addLog('command', `PS C:\\Users\\Admin> ${currentCommand}`);

    // Simulate command execution
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock command responses
    const responses = {
      'dir': 'Volume in drive C is Windows\n Directory of C:\\Users\\Admin\n\n01/15/2024  10:30 AM    <DIR>          .\n01/15/2024  10:30 AM    <DIR>          ..\n01/15/2024  10:30 AM    <DIR>          Documents\n01/15/2024  10:30 AM    <DIR>          Downloads\n               0 File(s)              0 bytes\n               4 Dir(s)  125,234,567,890 bytes free',
      'ipconfig': 'Windows IP Configuration\n\nEthernet adapter Ethernet:\n\n   Connection-specific DNS Suffix  . :\n   IPv4 Address. . . . . . . . . . . : 192.168.1.100\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1',
      'systeminfo': 'Host Name:                 VESTY-PC\nOS Name:                   Microsoft Windows 11 Pro\nOS Version:                10.0.22631 N/A Build 22631\nSystem Type:               x64-based PC\nProcessor(s):              1 Processor(s) Installed.\n                          [01]: AMD64 Family 23 Model 113 Stepping 0 AuthenticAMD ~3600 Mhz\nTotal Physical Memory:     16,384 MB\nAvailable Physical Memory: 8,192 MB',
      'help': 'Commandes disponibles:\n  dir - Liste le contenu du répertoire\n  ipconfig - Configuration réseau\n  systeminfo - Informations système\n  tasklist - Liste des processus\n  cls - Effacer l\'écran\n  help - Afficher cette aide'
    };

    const response = responses[currentCommand.toLowerCase() as keyof typeof responses] || 
                    `'${currentCommand}' n'est pas reconnu comme une commande interne ou externe, un programme exécutable ou un fichier de commandes.`;

    addLog(currentCommand.toLowerCase() === 'cls' ? 'command' : 'output', response);
    
    if (currentCommand.toLowerCase() === 'cls') {
      setLogs([]);
      addLog('output', 'VestyWinBox Terminal v1.0.0 - Prêt');
    }

    setCurrentCommand('');
    setIsRunning(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  const clearTerminal = () => {
    setLogs([]);
    addLog('output', 'VestyWinBox Terminal v1.0.0 - Prêt');
  };

  const saveLog = () => {
    const logContent = logs.map(log => 
      `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.type.toUpperCase()}: ${log.content}`
    ).join('\n');
    
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `terminal-log-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'command':
        return 'text-cyan-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
              Terminal Intégré
            </h1>
            <p className="text-white/70">
              Console système avec logging et exécution de commandes
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearTerminal}
              className="p-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
              title="Effacer le terminal"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            
            <button
              onClick={saveLog}
              className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              title="Sauvegarder les logs"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">PowerShell</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black/60"
        >
          {logs.map((log) => (
            <div key={log.id} className={`mb-1 ${getLogColor(log.type)}`}>
              <pre className="whitespace-pre-wrap break-words">{log.content}</pre>
            </div>
          ))}
          
          {/* Current Command Line */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-cyan-400">PS C:\Users\Admin&gt;</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isRunning}
              className="flex-1 bg-transparent text-green-400 outline-none disabled:opacity-50"
              placeholder={isRunning ? "Exécution en cours..." : "Tapez une commande..."}
              autoFocus
            />
            {isRunning && (
              <div className="flex items-center gap-1 text-yellow-400">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Exécution...</span>
              </div>
            )}
          </div>
        </div>

        {/* Command Input */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <button
              onClick={executeCommand}
              disabled={!currentCommand.trim() || isRunning}
              className="p-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <span className="text-white/60 text-sm">
              Appuyez sur Entrée pour exécuter la commande
            </span>
          </div>
        </div>
      </div>

      {/* Command History & Help */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Commands */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Commandes Rapides</h3>
          <div className="space-y-2">
            {['dir', 'ipconfig', 'systeminfo', 'tasklist', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => setCurrentCommand(cmd)}
                className="w-full text-left px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Statut Système</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Sessions actives:</span>
              <span className="text-white">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Commandes exécutées:</span>
              <span className="text-white">{logs.filter(log => log.type === 'command').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Logs générés:</span>
              <span className="text-white">{logs.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">PowerShell:</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalView;