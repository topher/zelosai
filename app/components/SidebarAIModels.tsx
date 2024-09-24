// app/pages/ai-models/page.tsx

import React from "react";
import Sidebar from "../components/Sidebar";

const SidebarAIModels: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar sections={["AI Models"]} />
    </div>
  );
};

export default SidebarAIModels;
