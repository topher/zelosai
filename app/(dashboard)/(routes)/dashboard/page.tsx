// page.tsx (dashboard homepage)

"use client";

import React from "react";
import Link from "next/link";
import { Montserrat } from 'next/font/google';
import { features, FeatureCategory, Feature, featureCategoryConfig } from "@/config/featuresConfig";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

/**
 * Derive FeatureCategoryColors from featureCategoryConfig
 */
const FeatureCategoryColors: Record<FeatureCategory, string> = Object.keys(featureCategoryConfig).reduce((acc, key) => {
  const category = key as FeatureCategory;
  acc[category] = featureCategoryConfig[category].colorHex;
  return acc;
}, {} as Record<FeatureCategory, string>);

/**
 * Formats the category name by adding spaces before capital letters.
 * Example: 'knowledgeBank' -> 'Knowledge Bank'
 * @param category - The feature category.
 * @returns Formatted category name.
 */
const formatCategoryName = (category: FeatureCategory): string => {
  // Split camelCase or PascalCase into separate words
  const formatted = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  return formatted.trim();
};

const Dashboard: React.FC = () => {
  /**
   * Groups features by their categories.
   */
  const groupFeaturesByCategory = () => {
    return features.reduce<Record<FeatureCategory, Feature[]>>((acc, feature) => {
      const category = feature.metadata.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(feature);
      return acc;
    }, {} as Record<FeatureCategory, Feature[]>);
  };

  const featuresByCategory = groupFeaturesByCategory();

  return (
    <div className={`container mx-auto flex flex-col justify-center h-full my-8 ${montserrat.className}`}>
      <h1 className="text-6xl font-black mb-4 tracking-tight leading-tight text-left">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          Dashboard
        </span>
        <span className="block mb-2 h-1 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full w-40"></span>
      </h1>
      
      {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
        <section key={category} className="mb-8">
          <h2 
            className="text-4xl font-bold mb-6" 
            style={{ color: FeatureCategoryColors[category as FeatureCategory] }}
          >
            {formatCategoryName(category as FeatureCategory)}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {categoryFeatures.map((feature) => (
              <li
                key={feature.key}
                className="relative rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:-translate-y-2 duration-300 group bg-gradient-to-t from-black/10 to-transparent backdrop-blur-lg hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500 hover:text-white hover:bg-opacity-30 hover:backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <Link href={feature.metadata.href} className="block h-full">
                  <div className="flex flex-col justify-center items-center h-full p-6">
                    <div className="mb-4">
                      {/* Render the icon component directly */}
                      <feature.metadata.icon 
                        size={64} 
                        className="text-current transition-opacity duration-300 group-hover:hidden" 
                      />
                      {/* Optional: Render a different icon or style on hover */}
                      <feature.metadata.icon 
                        size={64} 
                        className="hidden group-hover:block text-white transition-opacity duration-300" 
                      />
                    </div>
                    <h2 
                      className={`absolute bottom-4 left-4 text-2xl font-bold ${FeatureCategoryColors[feature.metadata.category]} group-hover:text-white transition-colors duration-300`}
                    >
                      {feature.metadata.label}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500 group-hover:text-white transition-colors duration-300">
                      {feature.metadata.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Dashboard;
