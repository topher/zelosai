// /app/components/atomic/templates/ThreePanelTemplate.tsx

"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import FeaturePageHeader from '../molecules/FeaturePageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

// Hook to detect window size
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const checkSize = () => {
      setIsSmall(window.innerWidth < 768); // Example breakpoint
    };
    window.addEventListener('resize', checkSize);
    checkSize();
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  return isSmall;
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
  const isSmallScreen = useIsSmallScreen();

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
        {isSmallScreen ? (
          // On small screens, use a tab-based interface:
          <Tabs defaultValue="center" className="h-full w-full flex flex-col">
            <TabsList className="flex justify-around bg-gray-800">
              <TabsTrigger value="left">Filter</TabsTrigger>
              <TabsTrigger value="center">Inbox</TabsTrigger>
              <TabsTrigger value="right">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="left" className="overflow-auto p-4">
              {leftPanel}
            </TabsContent>
            <TabsContent value="center" className="overflow-auto p-4">
              {centerPanel}
            </TabsContent>
            <TabsContent value="right" className="overflow-auto p-4">
              {rightPanel}
            </TabsContent>
          </Tabs>
        ) : (
          // On larger screens, use the three-panel resizable layout:
          <div className="h-full w-full">
            <ResizablePanelGroup direction="horizontal" className="h-full w-full">
              <ResizablePanel {...leftPanelProps}>{leftPanel}</ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel {...centerPanelProps}>{centerPanel}</ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel {...rightPanelProps}>{rightPanel}</ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreePanelLayout;
