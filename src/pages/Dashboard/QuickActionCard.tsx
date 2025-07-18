import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface QuickActionCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  action: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  action
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleAction = async () => {
    setIsLoading(true);
    
    // Simulate action execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    addNotification({
      type: 'success',
      title: 'Action Terminée',
      message: `${title} exécuté avec succès`
    });
  };

  return (
    <div className="group relative overflow-hidden">
      {/* Glassmorphism Card */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
        
        {/* LED Border Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/60 text-sm mb-4 group-hover:text-white/80 transition-colors duration-300">
            {description}
          </p>

          {/* Action Button */}
          <button
            onClick={handleAction}
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-gradient-to-r ${color} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Exécution...</span>
              </div>
            ) : (
              'Exécuter'
            )}
            
            {/* Button LED Effect */}
            {!isLoading && (
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
            )}
          </button>
        </div>

        {/* Hover Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
      </div>
    </div>
  );
};

export default QuickActionCard;