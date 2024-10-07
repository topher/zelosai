// app/components/profile/BrandProfile.tsx

'use client';

import React from 'react';
import Profile from './Profile';
import { Triple } from '@/app/types';

interface BrandProfileProps {
  resource: Triple[];
}

const BrandProfile: React.FC<BrandProfileProps> = ({ resource }) => {
  return (
    <Profile 
      resource={resource}
      type="brand"
    />
  );
};

export default BrandProfile;
