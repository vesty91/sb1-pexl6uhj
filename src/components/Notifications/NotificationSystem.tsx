import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import NotificationToast from './NotificationToast';

const NotificationSystem: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationToast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationSystem;