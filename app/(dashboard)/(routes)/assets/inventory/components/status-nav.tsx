// app/components/status-nav.tsx

import React from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import { ConnectedNav } from './nav';

export const StatusNav = connectMenu(ConnectedNav);
