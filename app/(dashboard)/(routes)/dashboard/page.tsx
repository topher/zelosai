// page.tsx (Dashboard Homepage)

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Montserrat } from 'next/font/google';
import { features, FeatureCategory, Feature, featureCategoryConfig } from "@/config/featuresConfig";
import { motion } from "framer-motion";
import FeaturePageHeader from "@/app/components/atomic/molecules/FeaturePageHeader";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

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
   * Derive FeatureCategoryColors from featureCategoryConfig
   */
  const FeatureCategoryColors: Record<FeatureCategory, string> = useMemo(() => {
    return Object.keys(featureCategoryConfig).reduce((acc, key) => {
      const category = key as FeatureCategory;
      acc[category] = featureCategoryConfig[category].colorHex;
      return acc;
    }, {} as Record<FeatureCategory, string>);
  }, []);

  /**
   * Groups features by their categories.
   */
  const featuresByCategory = useMemo(() => {
    return features.reduce<Record<FeatureCategory, Feature[]>>((acc, feature) => {
      const category = feature.metadata.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(feature);
      return acc;
    }, {} as Record<FeatureCategory, Feature[]>);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-indigo-900 ${montserrat.className}`}>
      {/* Use the reusable FeaturePageHeader */}
      <FeaturePageHeader 
        title="Dashboard" 
        description="Welcome to your dashboard! Explore the features below to manage your account, resources, and more."
      />

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
          <section key={category} className="mb-16">
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-8" 
              style={{ color: FeatureCategoryColors[category as FeatureCategory] }}
            >
              {formatCategoryName(category as FeatureCategory)}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryFeatures.map((feature) => (
                <motion.li
                  key={feature.key}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95, opacity: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 backdrop-blur-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500 transition-colors duration-300 group"
                  aria-label={`Feature: ${feature.metadata.label}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Link href={feature.metadata.href} className="block h-full">
                    <div className="flex flex-col justify-center items-center h-full p-6">
                      <div className="mb-4">
                        {/* Render the icon component directly */}
                        <feature.metadata.icon 
                          size={64} 
                          className="text-gray-400 transition-opacity duration-300 group-hover:hidden" 
                        />
                        {/* Render a different icon or style on hover */}
                        <feature.metadata.icon 
                          size={64} 
                          className="hidden group-hover:block text-white transition-opacity duration-300" 
                        />
                      </div>
                      <h3 
                        className={`text-2xl font-bold mb-2 ${montserrat.className} text-gray-200 group-hover:text-white transition-colors duration-300`}
                      >
                        {feature.metadata.label}
                      </h3>
                      <p className="text-center text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        {feature.metadata.description}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
