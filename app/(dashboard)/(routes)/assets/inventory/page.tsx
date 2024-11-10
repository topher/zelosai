// app/(dashboard)/(routes)/assets/inventory/page.tsx

'use client';

import React, { useState } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import Client from '@searchkit/instantsearch-client';
import ThreePanelTemplate from '@/app/components/atomic/ttemplates/ThreePanelTemplate';
import { InfoAssetCatalog } from '@/app/components/atomic/organisms/InfoAssetCatalog';

const searchClient = Client({
  url: '/api/search',
});

export default function HomePage() {
  // Initialize state
  const [assets, setAssets] = useState<any[]>([]); // Replace 'any' with your asset type
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null); // Replace 'any' with your asset type

  // Handler for selecting an asset
  const handleSelectAsset = (asset: any | null) => {
    setSelectedAsset(asset);
  };

  // Pass the required props to InfoAssetCatalog
  const { leftPanel, centerPanel, rightPanel } = InfoAssetCatalog({
    assets,
    selectedAsset,
    onSelectAsset: handleSelectAsset,
  });

  return (
    <InstantSearch indexName="info_assets" searchClient={searchClient}>
      <Configure hitsPerPage={15} />
      <ThreePanelTemplate
        leftPanel={leftPanel}
        centerPanel={centerPanel}
        rightPanel={rightPanel}
      />
    </InstantSearch>
  );
}
