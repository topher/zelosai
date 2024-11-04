"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiLimitCount = 500; // This should probably be from state or props
  const isPro = false; // This should probably be from state or props

  // State to control the collapsed state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle the collapse state of the sidebar
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="h-screen flex">
      <Sidebar 
        isCollapsed={isCollapsed}
        isSidebarOpen={true} // Pass true if you want sidebar to always be open
        toggleSidebar={toggleCollapse} // Rename to toggleCollapse
        toggleCollapse={toggleCollapse} // Pass the toggleCollapse function
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
