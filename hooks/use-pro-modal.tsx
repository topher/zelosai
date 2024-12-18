// hooks/use-pro-modal.tsx

import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";

// Define the shape of the context
interface ProModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the context
const ProModalContext = createContext<ProModalContextProps | undefined>(undefined);

// Create the provider component
export const ProModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <ProModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ProModalContext.Provider>
  );
};

// Create the custom hook
export const useProModal = (): ProModalContextProps => {
  const context = useContext(ProModalContext);
  if (!context) {
    throw new Error("useProModal must be used within a ProModalProvider");
  }
  return context;
};
