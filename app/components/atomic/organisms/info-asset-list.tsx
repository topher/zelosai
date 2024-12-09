// app/components/atomic/organisms/info-asset-list.tsx

'use client';

import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { InfoAsset } from '@/app/types';

interface InfoAssetListProps {
  hits: InfoAsset[];
  onSelect: (infoAsset: InfoAsset) => void;
}

const InfoAssetListComponent: React.FC<InfoAssetListProps> = ({ hits, onSelect }) => {
  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md shadow-lg">
      <ul className="divide-y divide-white/20">
        {hits.length > 0 ? (
          hits.map((infoAsset) => (
            <li
              key={infoAsset.uri}
              onClick={() => onSelect(infoAsset)}
              className="p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <h4 className="text-md font-semibold text-white truncate">
                  {infoAsset.name}
                </h4>
                <span className="ml-auto text-xs text-gray-400">
                  {infoAsset.creation_date
                    ? formatDistanceToNow(new Date(infoAsset.creation_date), {
                        addSuffix: true,
                      })
                    : 'No date'}
                </span>
              </div>
              {infoAsset.category && (
                <div className="mt-1 text-sm text-gray-200">
                  Category: {infoAsset.category}
                </div>
              )}
              {infoAsset.entity_type && (
                <div className="mt-1 text-sm text-gray-200">
                  Type: {infoAsset.entity_type}
                </div>
              )}
              {infoAsset.content && (
                <p className="mt-2 text-sm text-gray-200 line-clamp-2">
                  {infoAsset.content.substring(0, 300)}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between">
                {infoAsset.dcma_registrant_email && (
                  <span className="text-xs text-gray-400">
                    DCMA: {infoAsset.dcma_registrant_email}
                  </span>
                )}
                {infoAsset.labels && infoAsset.labels.length > 0 && (
                  <div className="flex items-center gap-2">
                    {infoAsset.labels.map((label) => (
                      <Badge key={label} variant="secondary">
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
};

export const InfoAssetList = connectHits(InfoAssetListComponent);
