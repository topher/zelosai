// components/Sidebar.tsx

'use client';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
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
import { FaLock } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import { QrCode, Settings } from 'lucide-react';
// Uncomment the imports below when you need them
// import { connectWallet, getMetadataFromApiAsync, getSelectedAddress } from '@/lib/Web3Client';
// import { ACCOUNT_STATE, TokenContext } from '@/context/TokenContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });

interface SidebarProps {
  isCollapsed: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isSidebarOpen,
  toggleSidebar,
  toggleCollapse,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [featuresUsage, setFeaturesUsage] = useState<FeaturesUsage>({});
  const pathname = usePathname();

  const { user } = useUser();
  const { organization } = useOrganization();
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [allowedFeatures, setAllowedFeatures] = useState<{ [key: string]: boolean }>({});

  const [loading, setLoading] = useState<boolean>(true);

  // Determine if screen size is medium or larger
  const [isMediumOrLarger, setIsMediumOrLarger] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 768);
    };
    handleResize(); // Initialize the state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On small screens, always uncollapse the sidebar
  const actualIsCollapsed = isMediumOrLarger ? isCollapsed : false;

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
      console.log(allowedStatuses, "allowed");
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

  // Group features by category and exclude Profiles category
  const categories = features.reduce((acc: { [key: string]: Feature[] }, feature) => {
    if (feature.metadata.category === FeatureCategory.Profiles) {
      return acc; // Exclude Profiles category
    }

    const categoryKey = feature.metadata.category as string;
    if (!acc[categoryKey]) {
      acc[categoryKey] = [];
    }
    acc[categoryKey].push(feature);
    return acc;
  }, {});

  // Uncomment and use the context when needed
  /*
  const { onSetUserProfile, web3BtnState, onAccountState } = useContext(TokenContext);

  const onSetSelectedToken = useCallback(async () => {
    const token = await getSelectedAddress();
    if (token) {
      onAccountState(ACCOUNT_STATE.MINT_TOKEN);
    } else {
      onAccountState(ACCOUNT_STATE.GUEST);
    }
  }, [onAccountState]);

  const onSetUserProfileHandler = useCallback(async () => {
    const userProfile = await getMetadataFromApiAsync();
    onSetUserProfile(userProfile);
  }, [onSetUserProfile]);

  const onConnectWallet = useCallback(async () => {
    await connectWallet();
    await onSetSelectedToken();
    await onSetUserProfileHandler();
    console.log(web3BtnState); // This might not show the updated state immediately
  }, [onSetUserProfileHandler, onSetSelectedToken]);

  useEffect(() => {
    onSetSelectedToken();
    onSetUserProfileHandler();
  }, [onSetSelectedToken, onSetUserProfileHandler]);
  */

  return (
    <TooltipProvider>
      <div
        className={cn(
          'bg-[#0A0E27] text-white flex flex-col overflow-x-visible transition-all duration-300 z-50',
          'h-screen',
          // Width classes: w-20 for collapsed, w-64 for expanded
          actualIsCollapsed ? 'md:w-20 w-64' : 'w-64',
          // Positioning: fixed on small screens, relative on medium and above
          isSidebarOpen
            ? 'fixed inset-y-0 left-0 transform translate-x-0'
            : 'fixed inset-y-0 left-0 transform -translate-x-full',
          'md:translate-x-0 md:relative md:flex-shrink-0'
        )}
      >
        {/* Close button for small screens */}
        <div className="absolute top-4 right-4 md:hidden z-50">
          <button onClick={toggleSidebar} aria-label="Close sidebar">
            {/* Close icon */}
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Header Section with Logo and Toggle Button */}
        <div className="relative mb-4 overflow-visible">
          <div className="py-4 flex items-center pl-3">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative rounded-md h-12 w-12 mr-4">
                <Image fill alt="Logo" src="/zlogo.png" />
              </div>
              {!actualIsCollapsed && (
                <h1 className={cn('text-3xl font-bold', montserrat.className)}>ZELOS</h1>
              )}
            </Link>

            {/* Collapse/Expand Button */}
            <button
              className={cn(
                'p-2 rounded-full bg-gray-800 border border-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-50',
                'md:block hidden'
              )}
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isCollapsed ? 'M8 6L16 12L8 18' : 'M16 6L8 12L16 18'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="space-y-1">
            {Object.entries(categories).map(([categoryKey, categoryFeatures]) => {
              const category = featureCategoryConfig[categoryKey as FeatureCategory];
              if (!category) return null;

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
                            'flex items-center p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                            pathname.startsWith(category.href) ? 'text-white bg-white/10' : 'text-zinc-400',
                            actualIsCollapsed ? 'justify-center' : 'justify-start'
                          )}
                          onClick={() => toggleCategory(categoryKey)}
                        >
                          <CategoryIcon className="h-6 w-6" style={{ color: categoryColorHex }} />
                          {!actualIsCollapsed && (
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
                    {actualIsCollapsed && (
                      <TooltipContent
                        side="right"
                        className="bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2"
                      >
                        <div className="capitalize">{categoryLabel}</div>
                      </TooltipContent>
                    )}
                  </Tooltip>

                  {/* Render child features */}
                  {!actualIsCollapsed && (
                    <div
                      className={cn(
                        'ml-8 space-y-1 overflow-hidden transition-all duration-300',
                        expandedCategories[categoryKey] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      {(categoryFeatures as Feature[]).map((feature: Feature) => {
                        const isAllowed = allowedFeatures[feature.key];

                        // Optionally handle undefined
                        if (isAllowed === undefined) {
                          return null; // Or render a loading placeholder
                        }

                        const FeatureIcon = feature.metadata.icon;

                        return (
                          <Link
                            key={feature.key}
                            href={isAllowed ? feature.metadata.href : '#'}
                            passHref
                          >
                            <div
                              className={cn(
                                'flex items-center text-sm p-2 px-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded transition',
                                pathname === feature.metadata.href
                                  ? 'text-white bg-white/10'
                                  : 'text-zinc-400',
                                !isAllowed && 'opacity-50 cursor-not-allowed'
                              )}
                            >
                              <FeatureIcon className="h-5 w-5" style={{ color: categoryColorHex }} />
                              <span className="ml-4 capitalize">{feature.metadata.label}</span>
                              {!isAllowed && (
                                <FaLock className="ml-auto h-4 w-4 text-red-500" />
                              )}
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

        {/* Settings and Connect Icons */}
        <div className="space-y-1 mb-4">
          {/* Settings Link */}
          <div className="relative group">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/settings" passHref>
                  <div
                    className={cn(
                      'flex items-center p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                      pathname === '/settings' ? 'text-white bg-white/10' : 'text-zinc-400',
                      actualIsCollapsed ? 'justify-center' : 'justify-start'
                    )}
                  >
                    <Settings className="h-6 w-6 text-gray-300" />
                    {!actualIsCollapsed && (
                      <span className="ml-3 flex-1">Settings</span>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={cn(
                  'bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2',
                  !actualIsCollapsed && 'hidden'
                )}
              >
                <div>Settings</div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Connect Link */}
          <div className="relative group">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#" passHref>
                  <div
                    className={cn(
                      'flex items-center p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                      pathname === '#' ? 'text-white bg-white/10' : 'text-zinc-400',
                      actualIsCollapsed ? 'justify-center' : 'justify-start'
                    )}
                    // Uncomment the onClick handler when ready to use
                    // onClick={() => onConnectWallet()}
                  >
                    <QrCode className="h-6 w-6 text-gray-300" />
                    {!actualIsCollapsed && (
                      <span className="ml-3 flex-1">Connect</span>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={cn(
                  'bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2',
                  !actualIsCollapsed && 'hidden'
                )}
              >
                <div>Connect</div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
