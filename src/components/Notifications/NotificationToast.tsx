import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { Notification, useNotification } from '../../context/NotificationContext';

interface NotificationToastProps {
  notification: Notification;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification }) => {
  const { removeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeNotification(notification.id), 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColorClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10 shadow-green-500/20';
      case 'error':
        return 'border-red-500/30 bg-red-500/10 shadow-red-500/20';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10 shadow-yellow-500/20';
      default:
        return 'border-blue-500/30 bg-blue-500/10 shadow-blue-500/20';
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`bg-black/40 backdrop-blur-xl rounded-xl border p-4 shadow-2xl ${getColorClasses()}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm mb-1">
              {notification.title}
            </h4>
            <p className="text-white/70 text-xs leading-relaxed">
              {notification.message}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r transition-all duration-300 ${
              notification.type === 'success' ? 'from-green-400 to-emerald-400' :
              notification.type === 'error' ? 'from-red-400 to-pink-400' :
              notification.type === 'warning' ? 'from-yellow-400 to-orange-400' :
              'from-blue-400 to-cyan-400'
            }`}
            style={{
              animation: `shrink ${notification.duration}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;