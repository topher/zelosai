// app/(dashboard)/layout.tsx

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { routes } from "@/components/sidebar";
import { LucideIcon } from "lucide-react";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = 500; // This should probably be from state or props
  const isPro = false; // This should probably be from state or props

  return (
    <div className="min-h-screen relative bg-cover bg-center bg-fixed">
      <div>
      {/* className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900" */}
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 min-h-screen">
        <Navbar routes={routes} apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
