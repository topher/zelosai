import React, { useState } from 'react';

interface PopupNotificationProps {
  message: string;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="popup-notification">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={() => setVisible(false)}>Close</button>
      </div>
    </div>
  );
};

export default PopupNotification;
