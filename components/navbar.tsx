// components/navbar.tsx

import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "@/components/mobile-sidebar";

interface NavbarProps {
  routes: {
    label: string;
    icon: React.ComponentType;
    href: string;
    color: string;
    children?: {
      label: string;
      href: string;
      color: string;
    }[];
  }[];
  apiLimitCount: number;
  isPro: boolean;
}

const Navbar = ({ routes, apiLimitCount, isPro }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
