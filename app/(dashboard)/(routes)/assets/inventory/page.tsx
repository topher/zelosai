// app/page.tsx

'use client';

import React from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import Client from '@searchkit/instantsearch-client';
import { InfoAssetCatalog } from './components/info-asset-catalog';

const searchClient = Client({
  url: '/api/search',
});

export default function HomePage() {
  return (
    <InstantSearch indexName="info_assets" searchClient={searchClient}>
      <Configure hitsPerPage={15} />
      <InfoAssetCatalog />
    </InstantSearch>
  );
}
