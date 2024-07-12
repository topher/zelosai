"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold pt-36 pb-9 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Scale Your Brand.</h1>
        <h1>Secure Your Future.</h1>
      </div>
      <div className="text-xl md:text-2xl font-light text-zinc-400">
        Simplify IP management. Build and manage your digital identity with Zelos Digital Twin.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-3xl p-12 lg:p-6 rounded-full font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};
