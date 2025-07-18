import React, { useState } from 'react';
import { Folder, File, Download, Upload, RefreshCw, HardDrive, Wifi } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  path: string;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    modified: '2024-01-15',
    path: '/Documents'
  },
  {
    id: '2',
    name: 'Media',
    type: 'folder',
    modified: '2024-01-10',
    path: '/Media'
  },
  {
    id: '3',
    name: 'backup.zip',
    type: 'file',
    size: '2.5 GB',
    modified: '2024-01-14',
    path: '/backup.zip'
  },
  {
    id: '4',
    name: 'config.txt',
    type: 'file',
    size: '1.2 KB',
    modified: '2024-01-12',
    path: '/config.txt'
  }
];

const NasExplorer: React.FC = () => {
  const [files, setFiles] = useState(mockFiles);
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState<'ftp' | 'sftp' | 'webdav'>('sftp');

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedFiles([]);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDownload = () => {
    console.log('Downloading files:', selectedFiles);
    setSelectedFiles([]);
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder className="w-5 h-5 text-blue-400" />;
    }
    return <File className="w-5 h-5 text-white/70" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h1 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
          NAS Explorer
        </h1>
        <p className="text-white/70">
          Explorateur de fichiers réseau avec support FTP, SFTP et WebDAV
        </p>
      </div>

      {/* Connection Panel */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" />
            Connexion NAS
          </h2>
          
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isConnected 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            <Wifi className="w-4 h-4" />
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </div>
        </div>

        {!isConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Type de connexion</label>
                <select
                  value={connectionType}
                  onChange={(e) => setConnectionType(e.target.value as any)}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="sftp">SFTP</option>
                  <option value="ftp">FTP</option>
                  <option value="webdav">WebDAV</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Serveur</label>
                <input
                  type="text"
                  placeholder="192.168.1.100"
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Utilisateur</label>
                  <input
                    type="text"
                    placeholder="admin"
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Mot de passe</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Connection Info */}
            <div className="bg-black/30 rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-medium mb-3">Protocoles supportés</h3>
              <div className="space-y-2 text-sm text-white/70">
                <div>• <strong>SFTP:</strong> Transfert sécurisé via SSH</div>
                <div>• <strong>FTP:</strong> Protocole de transfert standard</div>
                <div>• <strong>WebDAV:</strong> Accès via HTTPS</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-white/70">
              Connecté à: <span className="text-white">192.168.1.100 (SFTP)</span>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-300"
            >
              Déconnecter
            </button>
          </div>
        )}

        {!isConnected && (
          <button
            onClick={handleConnect}
            className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
          >
            Se connecter
          </button>
        )}
      </div>

      {/* File Explorer */}
      {isConnected && (
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                <RefreshCw className="w-5 h-5" />
              </button>
              <span className="text-white/70 text-sm">Chemin: {currentPath}</span>
            </div>

            <div className="flex items-center gap-2">
              {selectedFiles.length > 0 && (
                <>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger ({selectedFiles.length})
                  </button>
                  <button
                    onClick={() => setSelectedFiles([])}
                    className="px-4 py-2 bg-white/10 text-white/70 rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Annuler
                  </button>
                </>
              )}
              
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                <Upload className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* File List */}
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={`group flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  selectedFiles.includes(file.id)
                    ? 'bg-blue-500/20 border-blue-500/30'
                    : 'border-white/10 hover:bg-white/5 hover:border-white/20'
                }`}
                onClick={() => handleFileSelect(file.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleFileSelect(file.id)}
                  className="w-4 h-4 accent-blue-500"
                />
                
                {getFileIcon(file)}
                
                <div className="flex-1">
                  <div className="text-white font-medium">{file.name}</div>
                  <div className="text-white/50 text-sm">
                    Modifié le {file.modified}
                    {file.size && ` • ${file.size}`}
                  </div>
                </div>

                {file.type === 'file' && (
                  <button className="opacity-0 group-hover:opacity-100 p-2 text-white/70 hover:text-white transition-all duration-300">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NasExplorer;