// /app/(dashboard)/layout.tsx

"use client"

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { routes } from "@/components/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = 500;
  const isPro = false;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For small screens

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen">
      <Sidebar
        isPro={isPro}
        apiLimitCount={apiLimitCount}
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleCollapse={toggleCollapse}
      />
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex flex-col flex-1">
        {/* Header Bar for Small Screens */}
        {!isSidebarOpen && (
          <header className="md:hidden bg-darkGray text-white h-16 flex items-center justify-between px-4">
            <button onClick={toggleSidebar} aria-label="Open sidebar">
              {/* Hamburger icon */}
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
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
            <h1 className={cn("text-3xl font-bold", montserrat.className)}>
              ZELOS
            </h1>
          </header>
        )}
        <main className="flex-1 overflow-auto">
          {/* Main content */}
          <div className={cn("min-h-full", !isSidebarOpen && "md:pt-0 pt-0")}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
