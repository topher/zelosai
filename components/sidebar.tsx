// components/Sidebar.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLock } from 'react-icons/fa';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import {
  Feature,
  FeatureCategory,
  featureCategoryConfig,
  features,
  SubscriptionTier,
} from '@/config/featuresConfig';
import { Subscription, FeaturesUsage } from '@/app/types';

const Sidebar: React.FC<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
}> = ({ isCollapsed, toggleSidebar }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [featuresUsage, setFeaturesUsage] = useState<FeaturesUsage>({});
  const pathname = usePathname();

  const { user } = useUser();
  const { organization } = useOrganization();
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [allowedFeatures, setAllowedFeatures] = useState<{ [key: string]: boolean }>({});

  const [loading, setLoading] = useState<boolean>(true);

  // Default subscription
  const defaultSubscription: Subscription = {
    subscriptionId: '',
    subscriptionTier: SubscriptionTier.FREE,
    creditsUsed: 0,
    monthlyCreditLimit: 100,
    credits: 0,
    featuresUsage: {},
    resourceCounts: {},
    organizationId: '',
    userId: '',
    createdAt: '',
    updatedAt: '',
  };

  const { isFeatureAllowed } = useFeatureAccess(subscription || defaultSubscription);

  // Fetch user subscription
  const fetchUserSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debugging line

        const subscriptionData: Subscription = data.subscription; // Ensure API returns { subscription }

        if (!subscriptionData) {
          console.error('Subscription data is undefined.');
          return;
        }

        console.log('Fetched Subscription Data:', subscriptionData);
        setSubscriptionTier(subscriptionData.subscriptionTier as SubscriptionTier);
        setFeaturesUsage(subscriptionData.featuresUsage);
        setSubscription(subscriptionData);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch subscription:', errorData.error);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSubscription();
  }, [organization?.id]);

  useEffect(() => {
    console.log('Updated Subscription Tier:', subscriptionTier, ' for ', featuresUsage);
  }, [subscriptionTier, featuresUsage]);

  useEffect(() => {
    const fetchAllowedFeatures = async () => {
      const allowedStatuses: { [key: string]: boolean } = {};

      for (const feature of features) {
        const isAllowed = await isFeatureAllowed(feature.key, 'read');
        allowedStatuses[feature.key] = isAllowed;
      }

      setAllowedFeatures(allowedStatuses);
    };

    if (subscription) {
      fetchAllowedFeatures();
    }
  }, [subscription]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (loading || !user || !subscription) {
    return <div className="p-4 text-center text-white">Loading...</div>;
  }

  // **Group features by category and exclude Profiles category**
  const categories = features.reduce((acc: { [key: string]: Feature[] }, feature) => {
    if (feature.metadata.category === FeatureCategory.Profiles) {
      return acc; // Exclude Profiles category
    }

    if (!acc[feature.metadata.category]) {
      acc[feature.metadata.category] = [];
    }
    acc[feature.metadata.category].push(feature);
    return acc;
  }, {});

  return (
    <TooltipProvider>
      <div className="relative transition duration-300 ease-in-out">
        <div
          className={cn(
            'fixed top-0 left-0 z-50 transition-all',
            isCollapsed ? 'w-20' : 'w-64',
            'overflow-y-auto h-screen bg-[#0A0E27] text-white flex flex-col'
          )}
        >
          {/* Header */}
          <div className="py-4 flex items-center pl-3 mb-14">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative rounded-md h-12 w-12 mr-4">
                <Image fill alt="Logo" src="/zlogo.png" />
              </div>
              {!isCollapsed && (
                <h1 className={cn('text-3xl font-bold', 'font-montserrat')}>ZELOS</h1>
              )}
            </Link>
          </div>
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1">
              {Object.entries(categories).map(([categoryKey, categoryFeatures]) => {
                const category = featureCategoryConfig[categoryKey as FeatureCategory];
                const CategoryIcon = category.icon;
                const categoryLabel = category.label;
                const categoryColorHex = category.colorHex;

                return (
                  <div key={categoryKey} className="relative group">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <button
                            className={cn(
                              'flex items-center p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                              isCollapsed ? 'justify-center' : 'justify-start',
                              'text-zinc-400'
                            )}
                            onClick={() => toggleCategory(categoryKey)}
                          >
                            <CategoryIcon
                              className="h-6 w-6"
                              style={{ color: categoryColorHex }}
                            />
                            {!isCollapsed && (
                              <>
                                <span className="ml-4 capitalize">{categoryLabel}</span>
                                <ChevronDown
                                  className={cn(
                                    'h-4 w-4 ml-auto transition-transform duration-200',
                                    expandedCategories[categoryKey] ? 'transform rotate-180' : ''
                                  )}
                                />
                              </>
                            )}
                          </button>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2"
                        >
                          <div className="capitalize">{categoryLabel}</div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                    {/* Render child features */}
                    {!isCollapsed && expandedCategories[categoryKey] && (
                      <div className="ml-8 space-y-1">
                        {categoryFeatures.map((feature: Feature) => {
                          const isAllowed = allowedFeatures[feature.key];

                          // Optionally handle undefined
                          if (isAllowed === undefined) {
                            return null; // Or render a loading placeholder
                          }

                          return (
                            <Link
                              key={feature.key}
                              href={isAllowed ? feature.metadata.href : '#'}
                              passHref
                            >
                              <div
                                className={cn(
                                  'flex items-center p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                  pathname === feature.metadata.href
                                    ? 'text-white bg-white/10'
                                    : 'text-zinc-400',
                                  !isAllowed && 'opacity-50 cursor-not-allowed'
                                )}
                              >
                                <feature.metadata.icon
                                  className="h-5 w-5"
                                  style={{ color: categoryColorHex }}
                                />
                                <span className="ml-4 capitalize">{feature.metadata.label}</span>
                                {!isAllowed && <FaLock className="ml-auto h-4 w-4 text-red-500" />}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
