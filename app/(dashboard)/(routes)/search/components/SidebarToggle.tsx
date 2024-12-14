// /app/(dashboard)/(routes)/search/components/SidebarToggle.tsx

"use client";

import React from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 ml-2 bg-gray-200 text-darkGray rounded-md focus:outline-none lg:hidden"
      aria-label="Open sidebar"
    >
      <IconContext.Provider value={{ size: "1.5em" }}>
        <FaBars />
      </IconContext.Provider>
    </button>
  );
};

export default SidebarToggle;
