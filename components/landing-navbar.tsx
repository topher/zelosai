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
    <nav className="pt-8 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/zlogo.png" />
        </div>
        <h1 className={cn("text-4xl font-bold text-white", font.className)}>
          Zelos
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button className="px-6 py-6 text-xl font-bold rounded-xl border-2 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white bg-transparent shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl">
            Log In
          </Button>
        </Link>
        <Link href="/connect-form">
          <Button className="px-6 py-6 text-xl font-bold rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-xl">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
