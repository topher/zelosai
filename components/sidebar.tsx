"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Briefcase, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { useState } from "react";
import React from "react";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

export const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-white-500",
  },
  {
    label: 'Assistants',
    icon: ImageIcon,
    href: '/digital-twin',
    color: "text-sky-500",
    children: [
      { label: 'My Library', href: '/digital-twin', color: "text-blue-500" },
      { label: 'Usage', href: '/digital-twin/analytics', color: "text-blue-500" },
      { label: 'Safety', href: '/digital-twin/safety', color: "text-blue-500" },
      { label: 'Create New', href: '/digital-twin', color: "text-blue-500" },
    ],
  },
  {
    label: 'Data Vault',
    icon: Briefcase,
    href: '/knowledge-bank',
    color: "text-green-500",
    children: [
      { label: 'My Assets', href: '/knowledge-bank/inventory', color: "text-red-500" },
      { label: 'My Terms', href: '/knowledge-bank/taxonomy', color: "text-red-500" },
      { label: 'Rules', href: '/knowledge-bank/settings', color: "text-red-500" },
      { label: 'Connectors', href: '/knowledge-bank/connectors', color: "text-red-500" },
      // { label: 'Analytics', href: '/knowledge-bank/analytics', color: "text-red-500" },
    ],
  },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/settings',
  //   color: "text-gray-300",
  //   children: [
  //     { label: 'Constants', href: '/settings/constants', color: "text-gray-300" },
  //   ],
  // },
  {
    label: 'Workflows',
    icon: ImageIcon,
    href: '/workflows',
    color: "text-yellow-500",
    children: [
      { label: 'Library', href: '/workflows', color: "text-blue-500" },
      { label: 'My Tasks', href: '/workflows/tasks', color: "text-blue-500" },
      { label: 'Activity', href: '/workflows/analytics', color: "text-blue-500" },
      { label: 'New Workflow', href: '/workflows/plan', color: "text-blue-500" },
      
    ],
  },
  {
    label: 'Strategy',
    icon: Briefcase,
    href: '/strategy',
    color: "text-orange-500",
    children: [
      { label: 'Goals', href: '/strategy/goals', color: "text-red-500" },
      { label: 'Risks', href: '/strategy/risks', color: "text-red-500" },
      { label: 'Use Cases', href: '/strategy/use-cases', color: "text-red-500" },
      { label: 'Plan', href: '/strategy/plan', color: "text-red-500" },
    ],
  },
];
// Sidebar component with collapse functionality
export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={cn("transition duration-300 ease-in-out")}>
      <div
        className={cn(
          "fixed top-0 left-0 z-50 transition-all",
          isCollapsed ? "w-16" : "w-64", // Adjust width based on collapse state
          "overflow-y-auto h-screen bg-[#111827] text-white flex flex-col"
        )}
      >
        <div className="py-4">
          <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <div className="relative rounded-md h-12 w-12 mr-4">
              <Image fill alt="Logo" src="/zlogo.png"/>
            </div>
            <h1 className={cn("text-3xl font-bold", poppins.className)}>
              ZELOS
            </h1>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            {routes.map((route) => (
              <div key={route.label}>
                <Link href={route.href} passHref>
                  <div
                    className={cn(
                      "flex items-center p-3 w-full justify-between font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                      pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                      {route.label}
                    </div>
                  </div>
                </Link>
                {route.children?.map((child) => (
                  <React.Fragment key={child.label}>
                    {child.href.includes("[") && !child.href.includes("/app") ? (
                      <a
                        href={child.href}
                        className={cn(
                          "text-xs p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                          pathname === child.href ? "text-white bg-white/10" : "text-zinc-400",
                        )}
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link href={child.href} passHref>
                        <div
                          className={cn(
                            "text-xs p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === child.href ? "text-white bg-white/10" : "text-zinc-400",
                          )}
                        >
                          {child.label}
                        </div>
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className={cn(
          "p-2 rounded-full fixed bottom-4 left-4 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
          isCollapsed ? "hidden" : "" // Hide button when collapsed
        )}
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isCollapsed ? (
            <path
              d="M15 8H9M11 16L8 13L11 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 6H16M6 12L9 15L6 18Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
};
