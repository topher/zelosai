// /components/sidebar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Briefcase,
  ImageIcon,
  LayoutDashboard,
  Database,
  Workflow,
  ChevronDown,
  ChevronRight,
  Settings,
  QrCode,
  Search,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import React, { useState, useCallback, useContext, useEffect } from "react";
// Uncomment the imports below when you need them
// import MintTokenGlobe from "../../assets/images/mint_token_globe.png"; // Adjust the path if needed
// import { connectWallet, getMetadataFromApiAsync, getSelectedAddress } from "@/app/(dashboard)/(routes)/mint-token/Web3Client";
// import { ACCOUNT_STATE, TokenContext } from "@/app/(dashboard)/(routes)/mint-token/TokenContext";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

export const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-gray-500",  // Adjusted to gray-500 for consistency
    children: [
      { label: 'Strategy', href: '/strategy', color: "text-gray-600", description: "Build new AI models to expand your digital brand.", icon: "travel" },
      { label: 'Models', href: '/models', color: "text-gray-600", description: "Explore your collection of AI models.", icon: "picture" },
      { label: 'Data Bank', href: '/knowledge-bank', color: "text-gray-600", description: "Monitor the performance of your AI models.", icon: "locker" },
      { label: 'Campaigns', href: '/workflows', color: "text-gray-600", description: "Ensure the safe and responsible use of your likeness.", icon: "bulb" },
    ],
  },
  {
    label: 'Strategy',
    icon: Briefcase,
    href: '/strategy',
    color: "text-blue-500",
    children: [
      { label: 'Goals', href: '/strategy/goals', color: "text-blue-500", description: "Define the objectives for your organization.", icon: "target" },
      { label: 'User Personas', href: '/strategy/agents', color: "text-blue-500", description: "Identify potential challenges to your AI strategy.", icon: "flag" },
      { label: 'Use Cases', href: '/strategy/use-cases', color: "text-blue-500", description: "Set the practical applications for your AI models and products.", icon: "bookmark-fav" },
      { label: 'Plan', href: '/strategy/plan', color: "text-blue-500", description: "Develop a strategy to achieve your AI-driven goals.", icon: "chess" },
    ],
  },
  {
    label: 'Models',
    icon: ImageIcon,
    href: '/models',
    color: "text-green-500",
    children: [
      { label: 'My Library', href: '/models/library', color: "text-green-500", description: "Explore your collection of AI models.", icon: "folder" },
      { label: 'Usage', href: '/models/analytics', color: "text-green-500", description: "Monitor the performance of your AI models.", icon: "chart" },
      { label: 'Safety', href: '/models/safety', color: "text-green-500", description: "Ensure the safe and responsible use of your likeness.", icon: "lock" },
      { label: 'Create New', href: '/models/library', color: "text-green-500", description: "Build new AI models to expand your digital brand.", icon: "new-folder" },
    ],
  },
  {
    label: 'Data Bank',
    icon: Database,
    href: '/knowledge-bank',
    color: "text-yellow-500",
    children: [
      { label: 'My Assets', href: '/knowledge-bank/inventory', color: "text-yellow-500", description: "Manage the core data that shapes the foundation of your AI models.", icon: "locker" },
      { label: 'My Terms', href: '/knowledge-bank/taxonomy', color: "text-yellow-500", description: "Visualize key insights from your data.", icon: "copy" },
      { label: 'Rules', href: '/knowledge-bank/rules', color: "text-yellow-500", description: "Manage your account rules across compliance frameworks.", icon: "shield" },
      { label: 'Connectors', href: '/knowledge-bank/connectors', color: "text-yellow-500", description: "Connect your favorite tools and platforms to streamline your workflow.", icon: "puzzle" },
    ],
  },
  {
    label: 'Campaigns',
    icon: Workflow,
    href: '/workflows',
    color: "text-orange-500",
    children: [
      { label: 'Library', href: '/workflows/library', color: "text-orange-500", description: "Access resources to steamline your campaign processes.", icon: "link" },
      { label: 'My Tasks', href: '/workflows/tasks', color: "text-orange-500", description: "Track your ongoing tasks and responsibilities.", icon: "tick" },
      { label: 'Activity', href: '/workflows/analytics', color: "text-orange-500", description: "Review recent actions and updates within your campaigns.", icon: "rocket" },
      { label: 'New Campaign', href: '/workflows/plan', color: "text-orange-500", description: "Create and customize new campaigns to optimize your efficiency.", icon: "plus" },
    ],
  },
  {
    label: 'Contracts',
    icon: Briefcase,
    href: '/contracts',
    color: "text-red-500",
    // children: [],
  },
  {
    label: 'Search',
    icon: Search,
    href: '/search',
    color: "text-purple-500",
    children: [
      { label: 'Athletes', href: '/search/athletes', color: "text-purple-500", description: "Discover athletes and their profiles.", icon: "zoom" },
      { label: 'Contracts', href: '/search/contracts', color: "text-purple-500", description: "Find contracts that suit your business needs.", icon: "zoom" },
      { label: 'Models', href: '/search/models', color: "text-purple-500", description: "Search for existing AI models to determine which one is right for you.", icon: "zoom" },
      { label: 'Brands', href: '/search/brands', color: "text-purple-500", description: "Search for existing AI models to determine which one is right for you.", icon: "zoom" },
    ],
  },
];


const settings = {
  label: 'Settings',
  icon: Settings,
  href: '/settings',
  color: "text-gray-300",
};

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
  isCollapsed,
  isSidebarOpen,
  toggleSidebar,
  toggleCollapse,
}: {
  apiLimitCount: number;
  isPro: boolean;
  isCollapsed: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
}) => {
  const pathname = usePathname();
  const [expandedRoutes, setExpandedRoutes] = useState<{
    [key: string]: boolean;
  }>({});

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

  const toggleExpand = (label: string) => {
    setExpandedRoutes((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Determine if screen size is medium or larger
  const [isMediumOrLarger, setIsMediumOrLarger] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 768);
    };
    handleResize(); // Initialize the state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On small screens, always uncollapse the sidebar
  const actualIsCollapsed = isMediumOrLarger ? isCollapsed : false;

  // Update expandedRoutes based on the current pathname
  useEffect(() => {
    routes.forEach((route) => {
      if (pathname.startsWith(route.href) && route.children) {
        setExpandedRoutes((prev) => ({
          ...prev,
          [route.label]: true,
        }));
      } else {
        setExpandedRoutes((prev) => ({
          ...prev,
          [route.label]: false,
        }));
      }
    });
  }, [pathname]);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "bg-darkGray text-white flex flex-col overflow-x-visible transition-all duration-300 z-50",
          "h-screen",
          // Width classes: w-20 for collapsed, w-64 for expanded
          actualIsCollapsed ? "md:w-20 w-64" : "w-64",
          // Positioning: fixed on small screens, relative on medium and above
          isSidebarOpen
            ? "fixed inset-y-0 left-0 transform translate-x-0"
            : "fixed inset-y-0 left-0 transform -translate-x-full",
          "md:translate-x-0 md:relative md:flex-shrink-0"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          </button>
        </div>

        {/* Header Section with Logo and Toggle Button */}
        <div className="relative mb-4 overflow-visible">
          <div className="py-4 flex items-center pl-3">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative rounded-md h-12 w-12 mr-4">
                {/* Uncomment and use your image when needed */}
                {/* <Image fill alt="Logo" src={MintTokenGlobe} /> */}
                <Image fill alt="Logo" src="/zlogo.png" />
              </div>
              {!actualIsCollapsed && (
                <h1 className={cn("text-3xl font-bold", montserrat.className)}>
                  ZELOS
                </h1>
              )}
            </Link>
          </div>
          {/* Collapse/Expand Button */}
          <button
            className={cn(
              "p-2 rounded-full bg-gray-800 border border-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-50",
              "md:block hidden"
            )}
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className="h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={
                  isCollapsed
                    ? "M8 6L16 12L8 18"
                    : "M16 6L8 12L16 18"
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="space-y-1">
            {/* Iterate through each route to create menu items */}
            {routes.map((route) => (
              <div key={route.label} className="relative group">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={route.href}
                      passHref
                      onClick={(e) => {
                        if (route.children) {
                          if (pathname === route.href) {
                            if (!actualIsCollapsed) {
                              e.preventDefault(); // Prevent navigation
                              toggleExpand(route.label); // Toggle dropdown
                            }
                            // If collapsed, allow navigation; child routes handled by tooltip
                          } else {
                            // Expand the dropdown for the new route
                            if (!actualIsCollapsed) {
                              setExpandedRoutes((prev) => ({
                                ...prev,
                                [route.label]: true,
                              }));
                            }
                            // Allow navigation
                          }
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "flex items-center p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                          pathname === route.href
                            ? "text-white bg-white/10"
                            : "text-zinc-400",
                          actualIsCollapsed ? "justify-center" : "justify-start"
                        )}
                      >
                        {/* Icon for the route */}
                        <route.icon className={cn("h-6 w-6", route.color)} />
                        {!actualIsCollapsed && (
                          <>
                            <span className="ml-4 flex-1">{route.label}</span>
                            {route.children && route.label !== "Dashboard" && (
                              <button
                                className="ml-2 p-1"
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent navigation
                                  toggleExpand(route.label); // Toggle dropdown
                                }}
                                aria-label={`Toggle ${route.label} submenu`}
                              >
                                {expandedRoutes[route.label] ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={cn(
                      "bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2",
                      !actualIsCollapsed && "hidden"
                    )}
                  >
                    <div>{route.label}</div>
                    {route.children && route.label !== "Dashboard" && (
                      <div className="mt-2">
                        {route.children.map((child) => (
                          <Link key={child.label} href={child.href} passHref>
                            <div
                              className={cn(
                                "text-sm p-1 px-2 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded transition",
                                pathname === child.href
                                  ? "text-white bg-white/10"
                                  : "text-zinc-400"
                              )}
                            >
                              {child.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>

                {/* Expandable Children with Smooth Transitions */}
                {!actualIsCollapsed && route.children && route.label !== "Dashboard" && (
                  <div
                    className={cn(
                      "ml-8 space-y-1 overflow-hidden transition-all duration-300",
                      expandedRoutes[route.label]
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    {route.children.map((child) => (
                      <Link key={child.label} href={child.href} passHref>
                        <div
                          className={cn(
                            "text-sm p-2 px-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded transition",
                            pathname === child.href
                              ? "text-white bg-white/10"
                              : "text-zinc-400"
                          )}
                        >
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Settings and Connect Icons */}
        <div className="space-y-1 mb-4">
          {/* Settings Link */}
          <div key={settings.label} className="relative group">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={settings.href} passHref>
                  <div
                    className={cn(
                      "flex items-center p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                      pathname === settings.href
                        ? "text-white bg-white/10"
                        : "text-zinc-400",
                      actualIsCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <settings.icon className={cn("h-6 w-6", settings.color)} />
                    {!actualIsCollapsed && (
                      <span className="ml-3 flex-1">{settings.label}</span>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className={cn(
                  "bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2",
                  !actualIsCollapsed && "hidden"
                )}
              >
                <div>{settings.label}</div>
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
                      "flex items-center p-3 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                      pathname === "#"
                        ? "text-white bg-white/10"
                        : "text-zinc-400",
                      actualIsCollapsed ? "justify-center" : "justify-start"
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
                  "bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2",
                  !actualIsCollapsed && "hidden"
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