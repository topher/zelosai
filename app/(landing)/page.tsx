import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingProcess } from "@/components/landing-process";
import { PricingSection } from "@/components/landing-pricing";
import MoreStories from "@/app/(landing)/blog/components/MoreStories";
import { getClient, getAllPosts } from "@/lib/sanity.client";
import { readToken } from "@/lib/sanity.api";
import { Post } from "@/lib/sanity.queries";

interface LandingPageProps {
  posts: Post[];
}

export default async function LandingPage() {
  const draftMode = false; // Adjust this according to your draft mode logic
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getAllPosts(client);

  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <div className="w-full h-[1px] bg-white/20 mt-16"></div>
      <div id="features" className="pt-16 -mt-16">
        <LandingFeatures />
      </div>
      <div className="w-full h-[1px] bg-white/20 mt-16"></div>
      <div id="process" className="pt-16 -mt-16">
        <LandingProcess />
      </div>
      <div className="w-full h-[1px] bg-white/20 mt-16"></div>
      <div id="stories" className="pt-16 -mt-16">
        <MoreStories posts={posts} />
      </div>
    </div>
  );
}
