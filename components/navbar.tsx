// components/navbar.tsx
"use client"
import dynamic from 'next/dynamic';

const UserButton = dynamic(() => import('@clerk/nextjs').then((mod) => mod.UserButton), {
  ssr: false,
});
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
      {/* Hello */}
      {/* <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} /> */}
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
