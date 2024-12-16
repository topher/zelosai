// context/purchase-credits-modal-context.tsx

import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";

// Define the shape of the context
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
    throw new Error("usePurchaseCreditsModal must be used within a PurchaseCreditsModalProvider");
  }
  return context;
};
