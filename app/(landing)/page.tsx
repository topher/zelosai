import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingProcess } from "@/components/landing-process";
import { PricingSection } from "@/components/landing-pricing";
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <div className="w-full h-[1px] bg-white/20 mt-16"></div> {/* Thin White Line */}
      <div id="features" className="pt-16 -mt-16">
        <LandingFeatures />
      </div>
      <div className="w-full h-[1px] bg-white/20 mt-16"></div> {/* Thin White Line */}
      <div id="process" className="pt-16 -mt-16">
        <LandingProcess />
      </div>
      <div className="w-full h-[1px] bg-white/20 mt-16"></div> {/* Thin White Line */}
      <div id="pricing" className="pt-16 -mt-16">
        <PricingSection />
      </div>
    </div>
  );
};

export default LandingPage;
