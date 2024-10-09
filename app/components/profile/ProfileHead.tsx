// app/components/profile/ProfileHead.tsx

import React from 'react';
import SkyboxBanner from './SkyboxBanner';
import Image from 'next/image'; // Assuming you're using Next.js

interface ProfileHeadProps {
  imageSrc: string;
  name: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ imageSrc, name }) => {
  const handleBannerClick = () => {
    console.log('Banner clicked');
  };

  return (
    <div className="relative h-[175px] w-full">
      {/* SkyboxBanner occupies the full height and width of parent */}
      <SkyboxBanner hdriPath="/sepulchral_chapel_rotunda_4k.hdr" onClick={handleBannerClick} />

      {/* Profile Image */}
      <div className="absolute top-1/2 left-4 w-32 h-32 overflow-hidden rounded-full border-4 border-white shadow-lg transform -translate-y-1/2 z-10">
        <Image src={imageSrc} layout="fill" objectFit="cover" alt={`${name} Image`} />
      </div>

      {/* Profile Name */}
      <div className="absolute bottom-4 left-40 text-2xl font-extrabold text-white drop-shadow-md z-10">
        {name}
      </div>
    </div>
  );
};

export default ProfileHead;
