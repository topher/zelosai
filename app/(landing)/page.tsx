import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import { caseStudies } from "@/app/data";

import Link from 'next/link';

const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold  text-white underline my-4">Case Studies from our blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {caseStudies.map((study, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h2 className="font-bold text-white text-xl">{study.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{study.date}</p>
            <img src={study.image} alt={study.title} className="w-full h-auto mb-4" />
            <ul className=" text-gray-100 list-disc list-inside">
              {study.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
            <Link href={`${study.url}`}>Read more

            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
   );
}
 
export default LandingPage;
