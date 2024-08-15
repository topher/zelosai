// landing-navbar.tsx

"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Custom navigation handler
  const handleNavigation = (href: string) => {
    if (window.location.pathname === "/") {
      document.getElementById(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  // Scroll to anchor if URL contains hash on landing page load
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

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
        "fixed top-0 left-0 w-full py-4 px-6 sm:py-6 sm:px-8 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg rounded-b-3xl shadow-md flex flex-wrap items-center justify-between z-50 transition-all border-b border-white/20"
      )}>
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-4">
            <Image fill alt="Logo" src="/zlogo.png" />
          </div>
          <h1 className={cn("text-2xl sm:text-4xl font-bold text-white", font.className)}>
            Zelos
          </h1>
        </Link>
        <div className="flex flex-wrap items-center space-x-4 sm:space-x-8 mt-4 sm:mt-0">
          <Button
            className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105"
            onClick={() => handleNavigation("#features")}
          >
            Features
          </Button>
          <Button
            className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105"
            onClick={() => handleNavigation("#process")}
          >
            How It Works
          </Button>
          <Link href="/pricing">
            <Button className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
              Pricing
            </Button>
          </Link>
          <Link href="/blog">
            <Button className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
              Blog
            </Button>
          </Link>
          <Link href="/">
            <Button className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
              About
            </Button>
          </Link>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-transparent border border-indigo-500 rounded-lg transition-transform transform hover:scale-105 hover:border-indigo-700">
                Log In
              </Button>
            </Link>
            <Link href="/connect-form">
              <Button className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 rounded-lg transition-transform transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
