"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { Briefcase, ImageIcon, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { useState } from "react";
import React from "react";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

export const routes = [
  {
    label: 'My Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-white-500",
  },
  {
    label: 'Digital Twin',
    icon: ImageIcon,
    href: '/digital-twin',
    color: "text-sky-500",
    children: [
      { label: 'My Library', href: '/digital-twin', color: "text-blue-500" },
      { label: 'Analytics', href: '/digital-twin/analytics', color: "text-blue-500" },
      { label: 'Safety', href: '/digital-twin/safety', color: "text-blue-500" },
      { label: 'Create New', href: '/digital-twin', color: "text-blue-500" },
    ],
  },
  {
    label: 'Knowledge Bank',
    icon: Briefcase,
    href: '/knowledge-bank',
    color: "text-green-500",
    children: [
      { label: 'My Assets', href: '/knowledge-bank/inventory', color: "text-red-500" },
      { label: 'My Terms', href: '/knowledge-bank/taxonomy', color: "text-red-500" },
      { label: 'Rules', href: '/knowledge-bank/settings', color: "text-red-500" },
      { label: 'Connectors', href: '/knowledge-bank/connectors', color: "text-red-500" },
    ],
  },
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

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
  isCollapsed, // state kept in layout for dynamic changes based on toggle
  toggleSidebar
}: {
  apiLimitCount: number;
  isPro: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="relative transition duration-300 ease-in-out">
      <div
        className={cn(
          "fixed top-0 left-0 z-50 transition-all",
          isCollapsed ? "w-20" : "w-64", // Adjust width based on collapse state - min 20 so logo remains and doesn't shrink
          "overflow-y-auto h-screen bg-[#111827] text-white flex flex-col"
        )}
      >
        <div className="py-4 flex items-center pl-3 mb-14">
          <Link href="/dashboard" className="flex items-center">
            <div className="relative rounded-md h-12 w-12 mr-4">
              <Image fill alt="Logo" src="/zlogo.png"/>
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
                <Link href={route.href} passHref>
                  <div
                    className={cn(
                      "flex items-center p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                      pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                      isCollapsed ? "justify-center" : "justify-start" // center icons when sidebar is collapsed
                    )}
                    title={isCollapsed ? route.label : ""} // add tooltip with label when hovering icon while sidebar is collapsed
                  >
                    <route.icon className={cn("h-5 w-5", route.color)} />
                    {!isCollapsed && (
                      <span className="ml-3">{route.label}</span>
                    )}
                  </div>
                </Link>
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 z-50">
                    {route.label}
                  </span>
                )}
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
                        {!isCollapsed && child.label}
                      </a>
                    ) : (
                      <Link href={child.href} passHref>
                        <div
                          className={cn(
                            "text-xs p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === child.href ? "text-white bg-white/10" : "text-zinc-400",
                          )}
                        >
                          {!isCollapsed && child.label}
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
        style={{ zIndex: 1000, left: isCollapsed ? '5rem' : '16rem', top: '1rem' }} // Move button on top of other elements and adjust left position
        className={cn(
          "p-2 rounded-full fixed bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-left duration-300",
        )}
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={isCollapsed ? "M8 6L16 12L8 18" : "M16 6L8 12L16 18"} // changed toggle button to cleaner triangle pointing direction toggle will push sidebar
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};