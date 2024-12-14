// app/(dashboard)/(routes)/assets/inventory/page.tsx

'use client';

import React, { useState } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import Client from '@searchkit/instantsearch-client';
import ThreePanelLayout from '@/app/components/atomic/templates/ThreePanelLayout';
import { InfoAssetCatalog } from '@/app/components/atomic/organisms/InfoAssetCatalog';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';

const searchClient = Client({
  url: '/api/search',
});

export default function InfoAssets() {
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null); // Replace 'any' with your asset type

  // Handler for selecting an asset
  const handleSelectAsset = (asset: any | null) => {
    setSelectedAsset(asset);
  };

  const header = {
    title: 'Information Assets Inventory',
    description: 'Manage your information assets here.',
    actions: (
      <Button>
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        Add Asset
      </Button>
    ),
  };

  // Pass the required props to InfoAssetCatalog
  const { leftPanel, centerPanel, rightPanel } = InfoAssetCatalog({
    selectedAsset,
    onSelectAsset: handleSelectAsset,
  });

  return (
    <InstantSearch indexName="info_assets" searchClient={searchClient}>
      <Configure hitsPerPage={10} />
      <ThreePanelLayout
        header={header}
        leftPanel={leftPanel}
        centerPanel={centerPanel}
        rightPanel={rightPanel}
      />
    </InstantSearch>
  );
}
