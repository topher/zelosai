// /app/components/atomic/templates/ThreePanelTemplate.tsx

"use client";

import React, { ReactNode } from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
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
  leftPanelProps?: {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapsible?: boolean;
  };
  centerPanelProps?: {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
  };
  rightPanelProps?: {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapsible?: boolean;
  };
}

const ThreePanelLayout: React.FC<ThreePanelTemplateProps> = ({
  header,
  leftPanel,
  centerPanel,
  rightPanel,
  leftPanelProps = {
    defaultSize: 25,
    minSize: 15,
    maxSize: 35,
    collapsible: true,
  },
  centerPanelProps = {
    defaultSize: 50,
    minSize: 30,
    maxSize: 70,
  },
  rightPanelProps = {
    defaultSize: 25,
    minSize: 15,
    maxSize: 35,
    collapsible: true,
  },
}) => {
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
            <ResizablePanel {...leftPanelProps}>{leftPanel}</ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel {...centerPanelProps}>{centerPanel}</ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel {...rightPanelProps}>{rightPanel}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default ThreePanelLayout;
