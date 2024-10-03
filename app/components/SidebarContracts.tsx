// app/components/SidebarContracts.tsx

"use client";

import React from "react";
import Sidebar from "./Sidebar";

interface SidebarContractsProps {
  hitsPerPage: number;
  onChangeHitsPerPage: (value: number) => void;
}

const SidebarContracts: React.FC<SidebarContractsProps> = ({
  hitsPerPage,
  onChangeHitsPerPage,
}) => {
  return (
    <Sidebar
      sections={["Contracts"]}
      hitsPerPage={hitsPerPage}
      onChangeHitsPerPage={onChangeHitsPerPage}
    />
  );
};

export default SidebarContracts;
