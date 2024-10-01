import React from 'react';
import { tier_data } from '@/app/data'; // Import your JSON data file
import ZelosFeatureComparison from './ZelosFeatureComparison'; // Import your component
import Image from "next/image"
import { PricingSection } from '@/components/landing-pricing';
import { LandingNavbar } from '@/components/landing-navbar';
import { Footer } from '../components/Footer';

const Page: React.FC = () => {
    return (
        <>
            <div className="container mx-auto p-8 bg-gradient-to-b from-0A0E30 to-551AFF text-white">
                <LandingNavbar />
                <PricingSection />
            </div>
            <Footer />
        </>

    );
}

export default Page;
