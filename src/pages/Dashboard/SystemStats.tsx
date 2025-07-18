import React, { useEffect, useState } from 'react';
import { Cpu, MemoryStick, HardDrive, Thermometer } from 'lucide-react';

interface SystemStat {
  icon: React.ComponentType<any>;
  label: string;
  value: number;
  unit: string;
  color: string;
  max?: number;
}

const SystemStats: React.FC = () => {
  const [stats, setStats] = useState<SystemStat[]>([
    { icon: Cpu, label: 'CPU', value: 0, unit: '%', color: 'from-blue-500 to-cyan-400', max: 100 },
    { icon: MemoryStick, label: 'RAM', value: 0, unit: 'GB', color: 'from-green-500 to-emerald-400', max: 16 },
    { icon: HardDrive, label: 'Disque', value: 0, unit: '%', color: 'from-purple-500 to-violet-400', max: 100 },
    { icon: Thermometer, label: 'Temp CPU', value: 0, unit: '°C', color: 'from-red-500 to-pink-400', max: 100 }
  ]);

  useEffect(() => {
    // Simulate real-time system stats
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.label === 'RAM' 
            ? Math.random() * 16 
            : stat.label === 'Temp CPU'
            ? 40 + Math.random() * 30
            : Math.random() * 100
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const percentage = stat.max ? (stat.value / stat.max) * 100 : stat.value;
        
        return (
          <div key={index} className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/60 text-sm font-medium">{stat.label}</span>
            </div>

            {/* Value */}
            <div className="mb-3">
              <span className="text-2xl font-bold text-white">
                {stat.value.toFixed(stat.label === 'RAM' ? 1 : 0)}
              </span>
              <span className="text-white/60 ml-1">{stat.unit}</span>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out relative`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                >
                  {/* Animated Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                </div>
              </div>
              
              {/* Percentage Label */}
              <span className="text-xs text-white/50 mt-1 block">
                {percentage.toFixed(0)}%
              </span>
            </div>

            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default SystemStats;