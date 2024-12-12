// components/atomic/organisms/InfoAssetCatalog.tsx

'use client';

import React, { useState } from 'react';
import {
  SearchBox,
  Pagination,
  ClearRefinements,
} from 'react-instantsearch-dom';
import { InfoAssetList } from './info-asset-list';
import { InfoAssetDisplay } from './info-asset-display';
import AssetTypeNav from '@/app/components/atomic/molecules/AssetTypeNav';
import { StatusNav } from '../molecules/StatusNav';
import CustomRefinementList from '@/app/components/atomic/molecules/CustomRefinementList';
import { CustomCurrentRefinements } from '../molecules/CustomCurrentRefinements';
import { Separator } from '@/components/ui/separator';

interface InfoAssetCatalogProps {
  selectedAsset: any; // Replace 'any' with your asset type
  onSelectAsset: (asset: any | null) => void; // Replace 'any' with your asset type
}

export function InfoAssetCatalog({
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
        attribute="status"
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
      {/* The SearchBox will render with ais-SearchBox classes, which we can style globally */}
      <SearchBox
        submit={null}
        reset={null}
        loadingIndicator={null}
        translations={{
          placeholder: 'Search...',
        }}
      />
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
      {/* Connected InfoAssetList */}
      <InfoAssetList onSelect={onSelectAsset} />

      {/* The Pagination will render with ais-Pagination classes, which we can style globally */}
      <Pagination
        showFirst={false}
        showLast={false}
        translations={{
          previous: '‹',
          next: '›',
        }}
      />
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
