// app/components/info-asset-display.tsx

'use client';

import React from 'react';
import { format } from 'date-fns';
import { InfoAsset } from '@/app/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface InfoAssetDisplayProps {
  infoAsset: InfoAsset;
}

export function InfoAssetDisplay({ infoAsset }: InfoAssetDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage alt={infoAsset.name} src={infoAsset.image} />
            <AvatarFallback>
              {infoAsset.name
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{infoAsset.name}</div>
            <div className="line-clamp-1 text-xs">{infoAsset.uri}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">Email:</span> {infoAsset.dcma_registrant_email}
            </div>
            {infoAsset.entity_type && (
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Type:</span> {infoAsset.entity_type}
                <div className="font-semibold">Status: {infoAsset.status}</div>
              </div>
            )}
          </div>
        </div>
        {infoAsset.creation_date && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(infoAsset.creation_date), 'PPpp')}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {infoAsset.content}
      </div>
    </div>
  );
}
