// /app/components/atomic/molecules/FeaturePageHeader.tsx

import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

interface FeatureHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const FeaturePageHeader: React.FC<FeatureHeaderProps> = ({ title, description, actions }) => {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-md p-6 md:p-8 flex items-center justify-between">
      <div>
        <h2 className={`text-3xl text-white mb-2 ${montserrat.className}`}>
          {title}
        </h2>
        <p className="text-gray-200">{description}</p>
      </div>
      <div className={`flex items-center space-x-2 ${montserrat.className}`}>{actions}</div>
    </div>
  );
};

export default FeaturePageHeader;
