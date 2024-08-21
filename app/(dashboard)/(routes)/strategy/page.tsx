"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/components/sidebar";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const Strategy: React.FC = () => {
  // find the Strategy route from the sidebar routes array
  const strategyRoute = routes.find(route => route.label === 'Strategy');

  return (
    <div className={`container mx-auto pb-10 ${montserrat.className}`}>
      <h1 className="text-6xl font-black mb-8 -mt-10 relative text-left tracking-tight leading-tight">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          {strategyRoute.label}
          {/* add extra context to denote homepage, maybe implement breadcrumb */}
        </span>
        <span className="block mt-2 h-1 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full w-40"></span>
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {strategyRoute?.children?.map((child, index) => (
          <li
            key={index}
            className="rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:-translate-y-2 duration-300 group bg-gradient-to-t from-black/10 to-transparent backdrop-blur-lg hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500 hover:text-white hover:bg-opacity-30 hover:backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <Link href={child.href}>
              <div className="p-6">
                <div className="mb-2">
                  <Image
                    src={`/${child.icon}/${child.icon}-dynamic-color.png`}
                    alt={child.label}
                    width={240}
                    height={240}
                    className="mx-auto group-hover:hidden transition-opacity duration-300"
                  />
                  <Image
                    src={`/${child.icon}/${child.icon}-dynamic-premium.png`}
                    alt={child.label}
                    width={240}
                    height={240}
                    className="mx-auto hidden group-hover:block transition-opacity duration-300"
                  />
                </div>
                <h2 className={`text-2xl font-bold ${child.color} group-hover:text-white transition-colors duration-300`}>
                  {child.label}
                </h2>
                <p className="text-gray-600 group-hover:text-gray-200 mt-2 text-sm transition-colors duration-300">
                  {child.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Strategy;
