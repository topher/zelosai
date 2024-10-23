// app/components/SidebarToggle.tsx

"use client";

import React from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Example icons
import { IconContext } from "react-icons";

interface SidebarToggleProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 bg-gray-200 rounded-md focus:outline-none lg:hidden"
      aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
    >
      <IconContext.Provider value={{ size: "1.5em" }}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </IconContext.Provider>
    </button>
  );
};

export default SidebarToggle;
