// app/components/FilterSection.tsx

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
    <div className="mb-4">
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-between w-full p-2 text-left text-gray-700 bg-gray-200 rounded-md focus:outline-none"
      >
        <span className="font-semibold">{title}</span>
        <IconContext.Provider value={{ size: "1.2em" }}>
          {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </IconContext.Provider>
      </button>
      <Collapse in={open}>
        <div className="mt-2">{children}</div>
      </Collapse>
    </div>
  );
};

export default FilterSection;
