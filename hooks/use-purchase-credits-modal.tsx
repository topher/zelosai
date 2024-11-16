// hooks/use-purchase-credits-modal.ts

import { useState, useCallback, useContext, ReactNode, createContext } from 'react';

interface PurchaseCreditsModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the context
const PurchaseCreditsModalContext = createContext<PurchaseCreditsModalContextProps | undefined>(undefined);

// Create the provider component
export const PurchaseCreditsModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <PurchaseCreditsModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </PurchaseCreditsModalContext.Provider>
  );
};

// Create the custom hook
export const usePurchaseCreditsModal = (): PurchaseCreditsModalContextProps => {
  const context = useContext(PurchaseCreditsModalContext);
  if (!context) {
    throw new Error("useProModal must be used within a ProModalProvider");
  }
  return context;
};
