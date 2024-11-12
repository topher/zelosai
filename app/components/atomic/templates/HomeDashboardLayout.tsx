import React from 'react';
import FeatureHeader from '../atoms/feature-header';
import HomeDashboardGrid from '../organisms/HomeDashboardGrid';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

interface HomeDashboardLayoutProps<T> {
  header: PageHeaderProps;
  isLoading?: boolean;
  error?: string | null;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const HomeDashboardLayout = <T,>({
  header,
  isLoading = false,
  error = null,
  items,
  renderItem,
}: HomeDashboardLayoutProps<T>) => {
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-indigo-900">
      {/* Header Component */}
      <FeatureHeader title={header.title} description={header.description} actions={header.actions} />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <HomeDashboardGrid items={items} renderItem={renderItem} />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboardLayout;
