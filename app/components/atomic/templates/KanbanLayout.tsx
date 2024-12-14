// /app/components/atomic/templates/KanbanLayout.tsx

import React from 'react'
import FeaturePageHeader from '../molecules/FeaturePageHeader'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

interface KanbanLayoutProps {
  header: PageHeaderProps
  children: React.ReactNode
  isLoading?: boolean
  error?: string | null
}

const KanbanLayout: React.FC<KanbanLayoutProps> = ({
  header,
  children,
  isLoading = false,
  error = null
}) => {
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
      <div className="flex-1 overflow-x-auto p-4">
        {children}
      </div>
    </div>
  )
}

export default KanbanLayout
