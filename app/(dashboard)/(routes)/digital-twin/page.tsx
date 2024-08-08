"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/components/sidebar";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const DigitalTwin: React.FC = () => {
  // Find the Assistants route from the sidebar routes array
  const assistantsRoute = routes.find(route => route.label === 'Assistants');

  return (
    <div className={`container mx-auto pb-10 ${montserrat.className}`}>
      <h1 className="text-4xl font-bold mb-8 mt-4 relative text-left">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Assistants
        </span>
        <span className="block h-1 w-16 bg-indigo-600 mt-2 rounded"></span>
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {assistantsRoute?.children?.map((child, index) => (
          <li
            key={index}
            className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 duration-300 group bg-white bg-opacity-75 hover:bg-opacity-100"
          >
            <Link href={child.href}>
              <div className="p-6">
                <div className="mb-4">
                  <Image
                    src="/rocket/rocket-dynamic-premium.png"
                    alt={child.label}
                    width={180}
                    height={180}
                    className="mx-auto group-hover:hidden transition-opacity duration-300"
                  />
                  <Image
                    src="/rocket/rocket-dynamic-color.png"
                    alt={child.label}
                    width={180}
                    height={180}
                    className="mx-auto hidden group-hover:block transition-opacity duration-300"
                  />
                </div>
                <h2 className={`text-2xl font-bold ${child.color} group-hover:text-indigo-600 transition-colors duration-300`}>
                  {child.label}
                </h2>
                <p className="text-gray-600 group-hover:text-gray-800 mt-2 text-sm transition-colors duration-300">
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

export default DigitalTwin;
