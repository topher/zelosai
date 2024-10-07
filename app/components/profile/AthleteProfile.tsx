// app/components/profile/AthleteProfile.tsx

'use client';

import React from 'react';
import Profile from './Profile';
import { Triple } from '@/app/types';

interface AthleteProfileProps {
  resource: Triple[];
}

const AthleteProfile: React.FC<AthleteProfileProps> = ({ resource }) => {
  return (
    <Profile 
      resource={resource}
      type="athlete"
    />
  );
};

export default AthleteProfile;
