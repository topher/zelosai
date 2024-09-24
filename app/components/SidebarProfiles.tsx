// app/pages/profiles/page.tsx

import React from "react";
import Sidebar from "../components/Sidebar";

const SidebarProfiles: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar sections={["Athlete Profiles"]} />
      {/* Rest of your page content */}
    </div>
  );
};

export default SidebarProfiles;
