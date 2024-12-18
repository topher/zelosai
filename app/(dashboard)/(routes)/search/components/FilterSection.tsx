// /app/(dashboard)/(routes)/search/components/FilterSection.tsx

"use client";

import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Collapse } from "@mui/material";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <div className="mb-6">
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-between w-full px-4 py-2 text-left text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md hover:bg-gray-600 transition-colors"
      >
        <span className="text-lg font-semibold">{title}</span>
        <IconContext.Provider value={{ size: "1.2em" }}>
          {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </IconContext.Provider>
      </button>
      <Collapse in={open}>
        <div className="mt-4 pl-2 border-l-2 border-gray-600">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default FilterSection;
