"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for WebKit browsers */
        ::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }

        /* Optional: Add custom styles for the scrollbar */
        ::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2); /* Adjust color to blend */
          border-radius: 10px;
          border: 3px solid transparent; /* Makes the thumb narrower */
        }

        /* For Firefox */
        body {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
      
      <nav className={cn(
        "fixed top-0 left-0 w-full py-6 px-8 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg rounded-b-3xl shadow-md flex items-center justify-between z-50 transition-all border-b border-white/20"
      )}>
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-12 mr-4">
            <Image fill alt="Logo" src="/zlogo.png" />
          </div>
          <h1 className={cn("text-4xl font-bold text-white", font.className)}>
            Zelos
          </h1>
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/blog">
            <Button className="px-6 py-3 text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
              Blog
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="px-6 py-3 text-xl font-semibold text-white bg-transparent border border-indigo-500 rounded-lg transition-transform transform hover:scale-105 hover:border-indigo-700">
                Log In
              </Button>
            </Link>
            <Link href="/connect-form">
              <Button className="px-6 py-3 text-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 rounded-lg transition-transform transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
