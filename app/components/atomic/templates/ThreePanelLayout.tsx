// /app/components/atomic/templates/ThreePanelTemplate.tsx

"use client"

import React, { ReactNode } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import FeaturePageHeader from '../molecules/FeaturePageHeader';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

interface ThreePanelTemplateProps {
  header: PageHeaderProps;
  leftPanel: ReactNode;
  centerPanel: ReactNode;
  rightPanel: ReactNode;
  isCollapsed?: boolean;
}

const ThreePanelLayout: React.FC<ThreePanelTemplateProps> = ({
  header,
  leftPanel,
  centerPanel,
  rightPanel,
  isCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(isCollapsed);

  return (
    <div className="feature-layout flex flex-col h-full">
      {/* Header Component */}
      <FeaturePageHeader
        title={header.title}
        description={header.description}
        actions={header.actions}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full w-full">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel
              defaultSize={25}
              minSize={15}
              maxSize={35}
              collapsible
              onCollapse={() => setCollapsed(true)}
              onExpand={() => setCollapsed(false)}
            >
              {leftPanel}
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
              {centerPanel}
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={25} minSize={15} maxSize={35}>
              {rightPanel}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default ThreePanelLayout;
