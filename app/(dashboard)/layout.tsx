// /app/(dashboard)/layout.tsx

"use client";

import Navbar from "@/app/components/atomic/organisms/navbar";
import Sidebar from "@/app/components/atomic/organisms/sidebar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import ZelosLogo from "@/app/components/atomic/atoms/icons/Zelos.png"; // Import your Zelos logo

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="feature-layout relative flex flex-col items-center justify-center min-h-screen">
        {/* Pulsing halo behind the icon */}
        <div className="absolute h-64 w-64 rounded-full bg-white opacity-20 animate-ping"></div>
        
        {/* Zelos logo transformed into white and gently bouncing */}
        <img
          src={ZelosLogo.src}
          alt="Zelos Logo"
          className="h-32 w-32 animate-bounce filter brightness-0 invert"
        />

        {/* Pulsing Loading text */}
        <p className={cn("text-white text-2xl mt-4 animate-pulse", montserrat.className)}>
          ZELOS
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          "md:block md:relative md:flex-shrink-0"
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          toggleCollapse={toggleCollapse}
        />
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex flex-col flex-1 overflow-x-hidden">
        {/* Header Bar for Small Screens */}
        {!isSidebarOpen && (
          <header className="md:hidden bg-darkGray text-white h-16 flex items-center justify-between px-4">
            <button onClick={toggleSidebar} aria-label="Open sidebar">
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
            <Link href="/dashboard">
              <h1 className={cn("text-3xl font-bold cursor-pointer", montserrat.className)}>
                ZELOS
              </h1>
            </Link>
          </header>
        )}

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
