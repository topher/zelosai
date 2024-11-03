"use client"

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = 500; // This should probably be from state or props
  const isPro = false; // This should probably be from state or props

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="h-screen flex">
      <Sidebar 
        isPro={isPro} 
        apiLimitCount={apiLimitCount} 
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className={`flex-1 flex flex-col ${isCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
