// app/components/asset-type-nav.tsx

import React from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import { ConnectedNav } from './nav';

export const AssetTypeNav = connectMenu(ConnectedNav);
