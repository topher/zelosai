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
      className="p-2 bg-darkGray text-white rounded-md focus:outline-none"
      aria-label="Open sidebar"
    >
      <IconContext.Provider value={{ size: "1.5em" }}>
        <FaBars />
      </IconContext.Provider>
    </button>
  );
};

export default SidebarToggle;
