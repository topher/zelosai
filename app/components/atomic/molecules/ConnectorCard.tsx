// /app/components/atomic/molecules/ConnectorCard.tsx

import React, { useState } from 'react';
import { DataConnector } from '@/app/types';
import { Button } from '@/components/ui/button';
import { SiShopify, SiInstagram, SiMailchimp } from 'react-icons/si';
import { FaGlobe } from 'react-icons/fa'; // For HTTP connector

interface ConnectorCardProps {
  connector: DataConnector;
  onClick: (connector: DataConnector) => void;
}

const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to handle description truncation
  const getDescription = (description: string) => {
    const maxLength = 70;
    return description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;
  };

  // Helper function to get the appropriate background icon
  const getBackgroundIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'shopify':
        return <SiShopify size={150} className="text-white opacity-10" />;
      case 'instagram':
        return <SiInstagram size={150} className="text-white opacity-10" />;
      case 'mailchimp':
        return <SiMailchimp size={150} className="text-white opacity-10" />;
      case 'http':
      default:
        return <FaGlobe size={150} className="text-white opacity-10" />;
    }
  };

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-transform duration-300 transform bg-gray-800 ${
        isHovered ? 'scale-105 shadow-xl' : 'scale-100'
      }`}
      onClick={() => onClick(connector)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      ></div>

      {/* Semi-transparent Service Icon as Background */}
      <div
        className="absolute inset-y-0 right-4 flex items-center justify-end pointer-events-none"
        style={{
          zIndex: 0,
        }}
      >
        {getBackgroundIcon(connector.name)}
      </div>

      {/* JSON Icon Logic */}
      {/* Uncomment this block to prioritize the icon from connectors.json */}
      {/* 
      <div className="relative w-full h-56">
        <img
          src={connector.icon || '/placeholder.png'}
          alt={connector.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
          }}
        ></div>
      </div>
      */}

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="text-white text-xl font-semibold mb-4">
          {connector.name}
        </h3>
        {connector.description && (
          <p className="text-white text-sm mb-6">
            {getDescription(connector.description)}
          </p>
        )}
        <Button variant="outline" size="sm">
          Connect
        </Button>
      </div>
    </div>
  );
};

export default ConnectorCard;
