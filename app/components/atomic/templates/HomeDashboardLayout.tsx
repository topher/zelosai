import React from 'react';
import { Montserrat } from "next/font/google";
import HomeDashboardGrid from '../organisms/HomeDashboardGrid';
import { cn } from '@/lib/utils';

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

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
      {/* Glassmorphic Sticky Header */}
      <div className="sticky top-0 z-10">
        <div
          className={cn(
            'backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-md',
            'p-6 md:p-8 flex items-center justify-between',
          )}
        >
          <div>
            <h2 className={`text-2xl font-bold tracking-tight text-white ${montserrat.className}`}>
              {header.title}
            </h2>
            <p className="text-gray-200">{header.description}</p>
          </div>
          <div className="flex items-center space-x-2">{header.actions}</div>
        </div>
      </div>

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