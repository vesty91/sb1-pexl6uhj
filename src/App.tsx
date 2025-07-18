import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import ToolsManager from './pages/ToolsManager/ToolsManager';
import ChocolateyManager from './pages/ChocolateyManager/ChocolateyManager';
import NasExplorer from './pages/NasExplorer/NasExplorer';
import TerminalView from './pages/Terminal/TerminalView';
import NotificationSystem from './components/Notifications/NotificationSystem';
import { NotificationProvider } from './context/NotificationContext';

export type ActivePage = 'dashboard' | 'tools' | 'chocolatey' | 'nas' | 'terminal';

function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tools':
        return <ToolsManager />;
      case 'chocolatey':
        return <ChocolateyManager />;
      case 'nas':
        return <NasExplorer />;
      case 'terminal':
        return <TerminalView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>

        {/* Glassmorphism Background Blur */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>

        <div className="relative z-10 flex h-screen">
          <Sidebar activePage={activePage} onPageChange={setActivePage} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        </div>

        <NotificationSystem />
      </div>
    </NotificationProvider>
  );
}

export default App;