import { LandingNavbar } from "./components/landing-navbar";
import { LandingHero } from "./components/landing-hero";
import { LandingFeatures } from "./components/landing-features";
import { LandingProcess } from "./components/landing-process";
import { LandingQuotes } from "./components/landing-quotes";
import MoreStories from "@/app/(landing)/blog/components/MoreStories";
import { getClient, getAllPosts } from "@/lib/sanity.client";
import { readToken } from "@/lib/sanity.api";
import { Post } from "@/lib/sanity.queries";
import { Footer } from "./components/Footer";

interface LandingPageProps {
  posts: Post[];
}

export default async function LandingPage() {
  const draftMode = false;
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getAllPosts(client);

  return (
    <div className="h-full">
      <div className="mx-auto max-w-screen-xl">
        <LandingNavbar />
        <LandingHero />
        <div className="w-full h-[1px] bg-white/20 mt-8"></div>
        <div id="features" className="pt-8">
          <LandingFeatures />
        </div>
        <div className="w-full h-[1px] bg-white/20 mt-8"></div>
        <div id="process" className="pt-8">
          <LandingProcess />
        </div>
        <div className="w-full h-[1px] bg-white/20 mt-8"></div>
      </div>

      {/* <div id="testimonials" className="pt-8">
        <LandingQuotes />
      </div> */}

      <div className="mx-auto max-w-screen-xl">
        {/* <div className="w-full h-[1px] bg-white/20 mt-8"></div> */}
        <div id="stories" className="pt-8">
          <MoreStories posts={posts} title="Check Out Our Resources" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
