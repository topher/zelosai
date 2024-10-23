// app/components/info-asset-display.tsx

'use client';

import React from 'react';
import { format } from 'date-fns';
import { InfoAsset } from '@/app/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface InfoAssetDisplayProps {
  infoAsset: InfoAsset;
}

export function InfoAssetDisplay({ infoAsset }: InfoAssetDisplayProps) {

  // Action handlers (placeholders)
  const handleArchive = () => {
    // Implement archive functionality here
    console.log(`Archiving asset: ${infoAsset.name}`);
  };
  const handleClaimOwnership = () => {
    // Implement claim ownership functionality here
    console.log(`Claiming ownership of asset: ${infoAsset.name}`);
  };
  const handleMonetize = () => {
    // Implement monetize functionality here
    console.log(`Monetizing asset: ${infoAsset.name}`);
  };

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

      {/* Action Buttons */}
      <div className="p-4 flex gap-2">
        <Button className='transition hover:scale-105 hover:bg-indigo-light duration-300' variant="default" onClick={handleClaimOwnership}>
          Claim Ownership
        </Button>
        <Button className='transition hover:scale-105 hover:bg-indigo-light duration-300' variant="default" onClick={handleMonetize}>
          Monetize
        </Button>
        <Button className='transition hover:scale-105 hover:bg-lightGray hover:text-white duration-300' variant="secondary" onClick={handleArchive}>
          Archive
        </Button>
      </div>

      {/* Asset Content */}
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {infoAsset.content}
      </div>
    </div>
  );
}
