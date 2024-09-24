// app/pages/contracts/page.tsx

import React from "react";
import Sidebar from "../components/Sidebar";

const SidebarContracts: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar sections={["Contracts"]} />
    </div>
  );
};

export default SidebarContracts;
