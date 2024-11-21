// components/atomic/ttemplates/modals/modal-provider.tsx

"use client";

import { useEffect, useState } from "react";

import { PurchaseCreditsModal } from "@/app/components/atomic/templates/modals/purchase-credits-modal";
import { ProModal } from "@/app/components/atomic/templates/modals/pro-modal";
import { ProModalProvider } from "@/hooks/use-pro-modal";
import { PurchaseCreditsModalProvider } from "@/hooks/use-purchase-credits-modal";
import { CardModal } from "@/app/components/atomic/templates/modals/card-modal"; // Ensure correct path
import { DynamicResourceModal } from "@/app/components/atomic/templates/modals/DynamicResourceModal"; // Import DynamicResourceModal

import { ResourceModalProvider } from "@/app/context/ResourceModalContext"; // Ensure correct path

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ProModalProvider>
      <PurchaseCreditsModalProvider>
        {children} {/* Ensures that all children have access to the context */}
        <PurchaseCreditsModal />
        <ProModal />
        {/* Include CardModal if necessary */}
        <CardModal />
        {/* Include DynamicResourceModal */}
        {/* DynamicResourceModal is now managed by ResourceModalProvider */}
      </PurchaseCreditsModalProvider>
    </ProModalProvider>
  );
};
