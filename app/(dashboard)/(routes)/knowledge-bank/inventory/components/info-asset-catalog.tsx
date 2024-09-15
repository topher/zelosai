// app/components/info-asset-catalog.tsx

import React, { useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  ClearRefinements,
} from 'react-instantsearch-dom';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { InfoAssetDisplay } from './info-asset-display';
import { InfoAssetList } from './info-asset-list';
import { AssetTypeNav } from './asset-type-nav';
import { StatusNav } from './status-nav';
import { CustomRefinementList } from './CustomRefinementList';
import { CustomCurrentRefinements } from './CustomCurrentRefinements';
import { Separator } from '@/components/ui/separator';

export function InfoAssetCatalog() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-[800px] items-stretch"
    >
      {/* Left Sidebar with Navigation */}
      <ResizablePanel
        defaultSize={265}
        minSize={15}
        maxSize={30}
        collapsible={true}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
      >
        <StatusNav isCollapsed={isCollapsed} attribute="status" />
        <Separator />
        <AssetTypeNav isCollapsed={isCollapsed} attribute="asset_type" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* Middle Panel with Search and Results */}
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="p-4">
          <SearchBox />
          <div className="mt-4">
            <h4>Active Filters</h4>
            <CustomCurrentRefinements />
            <ClearRefinements
              clearsQuery={true}
              translations={{
                reset: 'Clear All',
              }}
            />
          </div>
          <div className="filters-section">
            <h4>Filter by Labels</h4>
            <CustomRefinementList attribute="labels" />
          </div>
          {/* Hits and Pagination */}
          <Hits
            hitComponent={({ hit }) => (
              <InfoAssetList hits={[hit]} onSelect={setSelectedAsset} />
            )}
          />
          <Pagination />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* Right Panel for Asset Details */}
      <ResizablePanel defaultSize={655}>
        {selectedAsset ? (
          <InfoAssetDisplay infoAsset={selectedAsset} />
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No asset selected
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
