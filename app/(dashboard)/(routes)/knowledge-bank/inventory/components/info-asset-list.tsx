// app/components/info-asset-list.tsx

'use client';

import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { InfoAsset } from '@/app/types';

interface InfoAssetListProps {
  hits: InfoAsset[];
  onSelect: (infoAsset: InfoAsset) => void;
}

const InfoAssetListComponent: React.FC<InfoAssetListProps> = ({ hits, onSelect }) => {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {hits.length > 0 ? (
          hits.map((infoAsset) => (
            <div
              key={infoAsset.uri}
              onClick={() => onSelect(infoAsset)}
              className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer"
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="font-semibold">{infoAsset.name}</div>
                  <div className="ml-auto text-xs">
                    {infoAsset.creation_date
                      ? formatDistanceToNow(new Date(infoAsset.creation_date), {
                          addSuffix: true,
                        })
                      : 'No date'}
                  </div>
                </div>
                {infoAsset.category && (
                  <div className="text-xs font-medium">{infoAsset.category}</div>
                )}
                {infoAsset.entity_type && (
                  <div className="text-xs font-medium">
                    Type: {infoAsset.entity_type}
                  </div>
                )}
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {infoAsset.content?.substring(0, 300)}
              </div>
              <div className="flex items-center justify-between mt-2">
                {infoAsset.dcma_registrant_email && (
                  <span className="text-xs text-muted-foreground">
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
            </div>
          ))
        ) : (
          <div>No results found.</div>
        )}
      </div>
    </ScrollArea>
  );
};

export const InfoAssetList = connectHits(InfoAssetListComponent);
