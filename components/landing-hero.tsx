"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold pt-36 pb-9 text-center space-y-6">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-4 font-extrabold">
        <h1 className={cn("mb-3 drop-shadow-lg animate-fade-in")}>
          Scale Your Brand.
        </h1>
        <h1 className={cn("drop-shadow-lg animate-fade-in delay-[200ms]")}>
          Secure Your Future.
        </h1>
      </div>
      <div className="text-xl md:text-2xl font-medium text-zinc-400 max-w-5xl mx-auto">
        Simplify IP management. Build and manage your digital identity with Zelos Digital Twin.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button 
            variant="premium" 
            className="md:text-3xl px-8 py-4 lg:px-12 lg:py-6 rounded-full font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal mt-3">
        No credit card required.
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .delay-[200ms] {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};
