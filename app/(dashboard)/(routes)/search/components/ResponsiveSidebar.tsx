// /app/(dashboard)/(routes)/search/components/ResponsiveSidebar.tsx

"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "./Sidebar";

interface ResponsiveSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  sections: string[];
  hitsPerPage: number;
  onChangeHitsPerPage: (value: number) => void;
}

const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({
  isOpen,
  toggleSidebar,
  sections,
  hitsPerPage,
  onChangeHitsPerPage,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const drawerContent = (
    <Sidebar
      sections={sections}
      hitsPerPage={hitsPerPage}
      onChangeHitsPerPage={onChangeHitsPerPage}
    />
  );

  return (
    <>
      {/* Persistent Sidebar for Large Screens */}
      {isLargeScreen ? (
        <div
          className="w-64 p-4 shadow-lg overflow-y-auto hidden lg:block"
          style={{
            backgroundColor: "rgba(245, 245, 245, 0.9)",
            backgroundImage:
              'linear-gradient(to right, rgba(245, 245, 245, 0.5) 50%, rgba(255, 255, 255, 0)), url("/bg-marble.jpg")',
            backgroundPosition: "top left",
            backgroundRepeat: "repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "fixed",
            backdropFilter: "blur(10px)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          {drawerContent}
        </div>
      ) : (
        // Temporary Drawer for Small Screens
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div
            className="w-64 p-4 shadow-lg overflow-y-auto"
            style={{
              backgroundColor: "rgba(245, 245, 245, 0.9)",
              backgroundImage:
                'linear-gradient(to right, rgba(245, 245, 245, 0.5) 50%, rgba(255, 255, 255, 0)), url("/bg-marble.jpg")',
              backgroundPosition: "top left",
              backgroundRepeat: "repeat",
              backgroundAttachment: "fixed",
              backgroundSize: "fixed",
              backdropFilter: "blur(10px)",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            {drawerContent}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default ResponsiveSidebar;
