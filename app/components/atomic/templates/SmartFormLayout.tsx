// /app/components/atomic/templates/SmartFormLayout.tsx

import React, { ReactNode } from 'react';
import FeaturePageHeader from '../molecules/FeaturePageHeader';

interface FeatureHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

interface SmartFormLayoutProps {
  header: FeatureHeaderProps;
  isLoading?: boolean;
  error?: string | null;
  children: ReactNode;
}

const SmartFormLayout: React.FC<SmartFormLayoutProps> = ({
  header,
  isLoading = false,
  error = null,
  children,
}) => {
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="feature-layout">
      {/* Header Section */}
      <FeaturePageHeader
        title={header.title}
        description={header.description}
        actions={header.actions}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SmartFormLayout;
