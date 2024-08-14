"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold min-h-screen flex flex-col justify-center items-center text-center space-y-10 pt-16">
      <div className="space-y-6">
        <h1 className={cn("text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 drop-shadow-lg animate-fade-in")}>
          Scale Your Brand.
        </h1>
        <h1 className={cn("text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold drop-shadow-lg animate-fade-in delay-[200ms]")}>
          Secure Your Future.
        </h1>
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-medium text-zinc-400 max-w-5xl mx-auto">
        Simplify IP management. Build and manage your digital identity with Zelos Digital Twin.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button 
            variant="premium" 
            className="text-2xl sm:text-3xl md:text-4xl px-10 py-5 lg:px-14 lg:py-7 rounded-full font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-sm md:text-base font-normal mt-5">
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
