// app/components/profile/ProfileHead.tsx

import React from 'react';
import SkyboxBanner from './SkyboxBanner';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ weight: '600', subsets: ['latin'] })

interface ProfileHeadProps {
  imageSrc: string;
  name: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ imageSrc, name }) => {
  const handleBannerClick = () => {
    console.log('Banner clicked');
  };

  return (
    <div className="relative h-64 w-full">
      <SkyboxBanner
        hdriPath="/sepulchral_chapel_rotunda_4k.hdr"
        onClick={handleBannerClick}
      />

      {/* Profile Image */}
      <div className="absolute top-1/3 left-4 w-40 h-40 overflow-hidden rounded-full bg-white/50 border-4 border-white shadow-lg z-10">
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="contain"
          alt={`${name} Image`}
        />
      </div>

      {/* Profile Name */}
      <div className="absolute bottom-4 left-48 z-10">
        <h1 className={`${font.className} text-4xl font-extrabold text-white drop-shadow-xl`}>
          {name}
        </h1>
      </div>
    </div>
  );
};

export default ProfileHead;
