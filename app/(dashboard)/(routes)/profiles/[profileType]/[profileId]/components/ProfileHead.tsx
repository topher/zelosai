// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/ProfileHead.tsx

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
    <div className="relative h-64 w-full -mt-8 flex flex-col items-center sm:items-start">
      <SkyboxBanner
        hdriPath="/sepulchral_chapel_rotunda_4k.hdr"
        onClick={handleBannerClick}
      />

      {/* Profile Image */}
      <div className="absolute top-[calc(40%-theme(spacing.20))] sm:top-1/3 left-1/2 sm:left-4 transform -translate-x-1/2 sm:translate-x-0 w-40 h-40 overflow-hidden rounded-full bg-white/50 border-4 border-white shadow-lg z-10">
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="contain"
          alt={`${name} Image`}
        />
      </div>

      {/* Profile Name */}
      <div className="absolute bottom-4 sm:left-48 text-center sm:text-left z-10">
        <h1
          className={`${font.className} text-4xl text-white`}
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8), 1px 1px 6px rgba(0, 0, 0, 0.6)' }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default ProfileHead;
