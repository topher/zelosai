// lib/toastHelpers.ts

import { toast, ToastOptions } from 'react-hot-toast';

export const toastWarning = (message: string, options?: ToastOptions) => {
  toast(message, {
    icon: '⚠️',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
    ...options,
  });
};
