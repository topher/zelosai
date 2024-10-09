"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { Briefcase, ImageIcon, LayoutDashboard, Database, Workflow, ChevronDown, ChevronRight, Settings, QrCode, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import React, { useState, useCallback, useContext, useEffect } from "react";
// import MintTokenGlobe from "../../assets/images/mint_token_globe.png"; // Adjust the path if needed
import { Link as RNLink } from "react-router-dom";
import { connectWallet, getMetadataFromApiAsync, getSelectedAddress } from "@/app/(dashboard)/(routes)/mint-token/Web3Client";
import { ACCOUNT_STATE, TokenContext } from "@/app/(dashboard)/(routes)/mint-token/TokenContext";
import athleteMetadata from "@/app/(dashboard)/(routes)/mint-token/athlete_metadata.json"; // Ensure correct path

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

export const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-gray-500",  // Adjusted to gray-500 for consistency
    children: [
      { label: 'Models', href: '/models', color: "text-gray-600", description: "Explore your collection of AI models.", icon: "picture" },
      { label: 'Data Bank', href: '/knowledge-bank', color: "text-gray-600", description: "Monitor the performance of your AI models.", icon: "locker" },
      { label: 'Campaigns', href: '/workflows', color: "text-gray-600", description: "Ensure the safe and responsible use of your likeness.", icon: "bulb" },
      { label: 'Strategy', href: '/strategy', color: "text-gray-600", description: "Build new AI models to expand your digital brand.", icon: "travel" },
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
      { label: 'Business Model', href: '/strategy/plan', color: "text-blue-500", description: "Develop a strategy to achieve your AI-driven goals.", icon: "chess" },
      { label: 'Branding', href: '/strategy/branding', color: "text-blue-500", description: "Manage your brand strategy and assets.", icon: "tag" },
    ],
  },
  {
    label: 'Assistants',
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
    label: 'Contracts',
    icon: Briefcase,
    href: '/contracts',
    color: "text-orange-500",
    children: [],
  },
  {
    label: 'Campaigns',
    icon: Workflow,
    href: '/workflows',
    color: "text-red-500",
    children: [
      { label: 'Library', href: '/workflows/library', color: "text-red-500", description: "Access resources to steamline your campaign processes.", icon: "link" },
      { label: 'My Tasks', href: '/workflows/tasks', color: "text-red-500", description: "Track your ongoing tasks and responsibilities.", icon: "tick" },
      { label: 'Activity', href: '/workflows/analytics', color: "text-red-500", description: "Review recent actions and updates within your campaigns.", icon: "rocket" },
      { label: 'New Campaign', href: '/workflows/plan', color: "text-red-500", description: "Create and customize new campaigns to optimize your efficiency.", icon: "plus" },
    ],
  },
  {
    label: 'Profiles',
    icon: Search,
    href: '/profiles',
    color: "text-purple-500"
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
  toggleSidebar
}: {
  apiLimitCount: number;
  isPro: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const pathname = usePathname();
  const [expandedRoutes, setExpandedRoutes] = useState<{ [key: string]: boolean }>({});
  
  const { onSetUserProfile, web3BtnState, onAccountState } = useContext(TokenContext);

  const toggleExpand = (label: string) => {
    setExpandedRoutes((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

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
    console.log(web3BtnState)  // This might not show the updated state immediately
  }, [onSetUserProfileHandler, onSetSelectedToken]);
  
  useEffect(() => {
    onSetSelectedToken();
    onSetUserProfileHandler();
  }, [onSetSelectedToken, onSetUserProfileHandler]);
  
  return (
    <TooltipProvider>
      <div className="relative transition duration-300 ease-in-out">
        <div
          className={cn(
            "fixed top-0 left-0 z-50 transition-all",
            isCollapsed ? "w-20" : "w-64",
            "overflow-y-auto h-screen bg-[#111827] text-white flex flex-col"
          )}
        >
          <div className="py-4 flex items-center pl-3 mb-14">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative rounded-md h-12 w-12 mr-4">
                <Image fill alt="Logo" src="/zlogo.png" />
              </div>
              {!isCollapsed && (
                <h1 className={cn("text-3xl font-bold", montserrat.className)}>
                  ZELOS
                </h1>
              )}
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1">
              {routes.map((route) => (
                <div key={route.label} className="relative group">
                  <Tooltip key={isCollapsed ? "collapsed" : "expanded"}>
                    <TooltipTrigger asChild>
                      <Link href={route.href} passHref>
                        <div
                          className={cn(
                            "flex items-center p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                            isCollapsed ? "justify-center" : "justify-start"
                          )}
                        >
                          <route.icon className={cn("h-6 w-6", route.color)} />
                          {!isCollapsed && (
                            <>
                              <span className="ml-4 flex-1">{route.label}</span>
                              {route.children && route.label !== "Dashboard" && (
                                <button
                                  className="ml-2 p-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleExpand(route.label);
                                  }}
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
                    {isCollapsed && (
                      <TooltipContent
                        side="right"
                        className="bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2 transition-opacity duration-200 ease-in-out transform opacity-0 group-hover:opacity-100"
                      >
                        <div>
                          <div>{route.label}</div>
                          {route.children && route.label !== 'Dashboard' && (
                            <div className="mt-2">
                              {route.children.map((child) => (
                                <Link key={child.label} href={child.href} passHref>
                                  <div
                                    className={cn(
                                      "text-xs p-1 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded transition",
                                      pathname === child.href ? "text-white bg-white/10" : "text-zinc-400"
                                    )}
                                  >
                                    {child.label}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  {!isCollapsed && route.children && (
                    <div
                      className={cn(
                        "transition-max-height duration-300 ease-in-out overflow-hidden",
                        expandedRoutes[route.label] ? "max-h-40" : "max-h-0"
                      )}
                    >
                      <div className="ml-8 space-y-1">
                        {route.children.map((child) => (
                          <Link key={child.label} href={child.href} passHref>
                            <div
                              className={cn(
                                "text-xs p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === child.href ? "text-white bg-white/10" : "text-zinc-400"
                              )}
                            >
                              {child.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div key={settings.label} className="relative group">
              <Tooltip key={isCollapsed ? "collapsed" : "expanded"}>
                <TooltipTrigger asChild>
                  <Link href={settings.href} passHref>
                    <div
                      className={cn(
                        "flex items-center p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathname === settings.href ? "text-white bg-white/10" : "text-zinc-400",
                        isCollapsed ? "justify-center" : "justify-start"
                      )}
                    >
                      <settings.icon className={cn("h-6 w-6", settings.color)} />
                      {!isCollapsed && (
                        <span className="ml-3 flex-1">{settings.label}</span>
                      )}
                    </div>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent
                    side="right"
                    className="bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2 transition-opacity duration-200 ease-in-out transform opacity-0 group-hover:opacity-100"
                  >
                    <div>{settings.label}</div>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </div>
          <div className="relative group">
            <Tooltip key={isCollapsed ? "collapsed" : "expanded"}>
              <TooltipTrigger asChild>
                <Link href="#" passHref>
                  <div
                    className={cn(
                      "flex items-center p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                      pathname === "#" ? "text-white bg-white/10" : "text-zinc-400",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                    onClick={() => onConnectWallet()}
                  >
                    <QrCode className="h-6 w-6 text-gray-300" />
                    {!isCollapsed && (
                      <span className="ml-3 flex-1">Connect</span>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent
                  side="right"
                  className="bg-[#1f2937] text-white border border-gray-700 shadow-lg rounded-md px-3 py-2 transition-opacity duration-200 ease-in-out transform opacity-0 group-hover:opacity-100"
                >
                  Connect
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
        <button
          style={{ zIndex: 1000, left: isCollapsed ? "4.25rem" : "15.25rem", top: "1.6rem" }}
          className={cn(
            "p-1 rounded-full fixed bg-gray-800 border border-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300"
          )}
          onClick={toggleSidebar}
        >
          <svg
            className="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={isCollapsed ? "M8 6L16 12L8 18" : "M16 6L8 12L16 18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </TooltipProvider>
  );
};
