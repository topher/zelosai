import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingProcess } from "@/components/landing-process";
import { PricingSection } from "@/components/pricing-section";
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingProcess />
      <PricingSection />
      {/* <LandingHubs /> */}
    </div>
  );
};

export default LandingPage;
