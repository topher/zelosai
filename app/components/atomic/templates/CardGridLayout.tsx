// /app/components/atomic/templates/CardGridLayout.tsx

import React from 'react'
import FeaturePageHeader from '../molecules/FeaturePageHeader'
import HomeDashboardGrid from '../organisms/HomeDashboardGrid'

interface PageHeaderProps {
  title: string
  description: string
  actions?: React.ReactNode
}

interface CardGridLayoutProps<T> {
  header: PageHeaderProps
  isLoading?: boolean
  error?: string | null
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

const CardGridLayout = <T,>({
  header,
  isLoading = false,
  error = null,
  items,
  renderItem,
}: CardGridLayoutProps<T>) => {
  if (isLoading) return <p className="text-white">Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="feature-layout">
      {/* Header Component */}
      <FeaturePageHeader
        title={header.title}
        description={header.description}
        actions={header.actions}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <HomeDashboardGrid items={items} renderItem={renderItem} />
        </div>
      </div>
    </div>
  );
};

export default CardGridLayout;