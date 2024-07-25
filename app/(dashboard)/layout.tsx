// app/(dashboard)/layout.tsx
"use client"

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { routes } from "@/components/sidebar";
import { useState } from "react";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = 500; // This should probably be from state or props
  const isPro = false; // This should probably be from state or props

  const [isCollapsed, setIsCollapsed] = useState(false); // lifted collapse state to layout so main content could be dynamic based on toggle

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="min-h-screen relative bg-cover bg-center bg-fixed">
      <div>
        <Sidebar 
          isPro={isPro} 
          apiLimitCount={apiLimitCount} 
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <main className={isCollapsed ? "md:pl-20 min-h-screen" : "md:pl-72 min-h-screen"}>
        <Navbar routes={routes} apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
