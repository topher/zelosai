// context/ResourceModalContext.tsx

"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import DynamicResourceModal, { DynamicResourceModalProps } from '@/app/components/atomic/ttemplates/modals/DynamicResourceModal'; // Ensure this path is correct
import { FeatureKey } from '@/config/featuresConfig';
import { Resource } from '@/app/types';
import { ResourceType } from '@/config/resourceTypes';

interface ResourceModalContextProps {
  openResourceModal: (
    action: 'create' | 'read' | 'update' | 'delete',
    resourceType: ResourceType,
    resourceId?: string, // Changed from resource?: Resource
    initialData?: any,
    onSuccess?: (result: any) => void
  ) => void;
}

const ResourceModalContext = createContext<ResourceModalContextProps | undefined>(undefined);

export const ResourceModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalProps, setModalProps] = useState<DynamicResourceModalProps | null>(null);

  const openResourceModal = useCallback(
    (
      action: 'create' | 'read' | 'update' | 'delete',
      resourceType: ResourceType,
      resourceId?: string, // Changed
      initialData?: any,
      onSuccess?: (result: any) => void
    ) => {
      setModalProps({
        isOpen: true,
        onClose: () => setModalProps(null),
        action,
        resourceType,
        resourceId, // Set resourceId
        initialData,
        onSuccess,
      });
    },
    []
  );

  return (
    <ResourceModalContext.Provider value={{ openResourceModal }}>
      {children}
      {modalProps && <DynamicResourceModal {...modalProps} />}
    </ResourceModalContext.Provider>
  );
};

export const useResourceModal = () => {
  const context = useContext(ResourceModalContext);
  if (!context) {
    throw new Error('useResourceModal must be used within a ResourceModalProvider');
  }
  return context;
};
