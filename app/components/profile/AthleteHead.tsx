import React from 'react';
import Image from "next/image";
import SkyboxBanner from './SkyboxBanner'; // Import the SkyboxBanner component

interface AthleteHeadProps {
  name: string;
  imageSrc: string; // Athlete's profile picture
  hdriPath: string; // HDRI image path for the skybox
}

const AthleteHead: React.FC<AthleteHeadProps> = ({ name, imageSrc, hdriPath }) => {
  
  const handleBannerClick = () => {
    // Logic to handle transitioning to full-screen 3D scene
  };

  return (
    <div className="relative athlete-head" style={{ minHeight: '250px' }}>
      <div style={{ minHeight: '150px' }}>
        <SkyboxBanner hdriPath={hdriPath} onClick={handleBannerClick} />
      </div>
      <div className="absolute top-1/4 left-4 w-40 h-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <Image src={imageSrc} layout="fill" objectFit="cover" alt={`${name} Image`} />
      </div>

      <div className="absolute bottom-4 left-32 text-4xl font-extrabold text-white drop-shadow-md">{name}</div>
    </div>
  );
};

export default AthleteHead;
