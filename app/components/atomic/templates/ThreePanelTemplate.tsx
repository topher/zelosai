// ThreePanelTemplate.tsx
"use client"

import React, { ReactNode } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface ThreePanelTemplateProps {
  leftPanel: ReactNode;
  centerPanel: ReactNode;
  rightPanel: ReactNode;
  isCollapsed?: boolean;
}

const ThreePanelTemplate: React.FC<ThreePanelTemplateProps> = ({ leftPanel, centerPanel, rightPanel, isCollapsed = false }) => {
  const [collapsed, setCollapsed] = React.useState(isCollapsed);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-screen items-stretch">
      <ResizablePanel defaultSize={250} minSize={200} maxSize={400} collapsible onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)}>
        {leftPanel}
      </ResizablePanel>
      
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={500} minSize={400}>
        {centerPanel}
      </ResizablePanel>
      
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={450} minSize={300}>
        {rightPanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ThreePanelTemplate;
