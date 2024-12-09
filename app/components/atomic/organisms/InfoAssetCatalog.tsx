// components/atomic/organisms/InfoAssetCatalog.tsx

'use client';

import React, { useState } from 'react';
import {
  SearchBox,
  Hits,
  Pagination,
  ClearRefinements,
} from 'react-instantsearch-dom';
import { InfoAssetDisplay } from './info-asset-display';
import { InfoAssetList } from './info-asset-list';
import AssetTypeNav from '@/app/components/atomic/molecules/AssetTypeNav';
import { StatusNav } from '../molecules/StatusNav';
import CustomRefinementList from '@/app/components/atomic/molecules/CustomRefinementList';
import { CustomCurrentRefinements } from '../molecules/CustomCurrentRefinements';
import { Separator } from '@/components/ui/separator';

interface InfoAssetCatalogProps {
  assets: any[];
  selectedAsset: any;
  onSelectAsset: (asset: any | null) => void;
}

export function InfoAssetCatalog({
  assets,
  selectedAsset,
  onSelectAsset,
}: InfoAssetCatalogProps) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState('');
  const [labels, setLabels] = useState<string[]>([]);

  // Define statuses and asset types
  const statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Archived', value: 'archived' },
    { label: 'Pending', value: 'pending' },
  ];

  const assetTypes = [
    { label: 'Type A', value: 'type_a' },
    { label: 'Type B', value: 'type_b' },
    // Add more asset types as needed
  ];

  // Prepare items for CustomRefinementList
  const labelItems = [
    { label: 'Label 1', value: 'label1', isSelected: labels.includes('label1') },
    { label: 'Label 2', value: 'label2', isSelected: labels.includes('label2') },
    // Add more labels as needed
  ];

  const leftPanel = (
    <div className="p-4 text-white">
      <StatusNav
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statuses={statuses}
        attribute='status'
      />
      <Separator className="my-4" />
      <AssetTypeNav
        selectedType={selectedAssetType}
        onTypeChange={setSelectedAssetType}
        assetTypes={assetTypes}
      />
    </div>
  );

  const centerPanel = (
    <div className="p-4 text-white">
      <SearchBox />
      <div className="my-4">
        <h4>Active Filters</h4>
        <CustomCurrentRefinements />
        <ClearRefinements
          clearsQuery
          translations={{ reset: 'Clear All' }}
        />
      </div>
      <CustomRefinementList
        items={labelItems}
        onToggle={(value) => {
          setLabels((prevLabels) =>
            prevLabels.includes(value)
              ? prevLabels.filter((label) => label !== value)
              : [...prevLabels, value]
          );
        }}
      />
      <Hits
        hitComponent={({ hit }) => (
          <InfoAssetList hits={assets} onSelect={onSelectAsset} />
        )}
      />
      <Pagination />
    </div>
  );

  const rightPanel = (
    <div className="p-4 text-white">
      {selectedAsset ? (
        <InfoAssetDisplay infoAsset={selectedAsset} />
      ) : (
        <div>Select an asset to view details.</div>
      )}
    </div>
  );

  return { leftPanel, centerPanel, rightPanel };
}
