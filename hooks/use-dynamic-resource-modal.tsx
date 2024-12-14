// hooks/use-dynamic-resource-modal.tsx

import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { FeatureKey } from "@/config/featuresConfig"; // Ensure correct path
import { DynamicResourceModalProps } from "@/app/components/atomic/templates/modals/DynamicResourceModal";
import DynamicResourceModal from "@/app/components/atomic/templates/modals/DynamicResourceModal";

interface DynamicResourceModalContextProps {
  openModal: (modalProps: Omit<DynamicResourceModalProps, "isOpen">) => void;
  closeModal: () => void;
}

const DynamicResourceModalContext = createContext<DynamicResourceModalContextProps | undefined>(undefined);

export const DynamicResourceModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalProps, setModalProps] = useState<Omit<DynamicResourceModalProps, "isOpen"> | null>(null);

  const openModal = useCallback((props: Omit<DynamicResourceModalProps, "isOpen">) => {
    setModalProps(props);
  }, []);

  const closeModal = useCallback(() => {
    setModalProps(null);
  }, []);

  return (
    <DynamicResourceModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps && (
        <DynamicResourceModal
          isOpen={!!modalProps}
          onClose={closeModal}
          {...modalProps}
        />
      )}
    </DynamicResourceModalContext.Provider>
  );
};

export const useDynamicResourceModal = (): DynamicResourceModalContextProps => {
  const context = useContext(DynamicResourceModalContext);
  if (!context) {
    throw new Error("useDynamicResourceModal must be used within a DynamicResourceModalProvider");
  }
  return context;
};
