// In your Page.tsx

import React from 'react';
import { tier_data } from '@/app/data'; // Import your JSON data file
import ZelosFeatureComparison from './ZelosFeatureComparison'; // Import your component
import Image from "next/image"

const Page: React.FC = () => {
    return (
        <div className="container mx-auto p-8 bg-gradient-to-b from-0A0E30 to-551AFF text-white">
            <div className="flex justify-center mb-8">
            <Image width={50} height={50} alt="Logo" src="/z_blue_backgroud.png" className="rounded-md"  />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Zelos Pricing</h1>
            <ZelosFeatureComparison jsonData={tier_data} />
        </div>
    );
}

export default Page;
