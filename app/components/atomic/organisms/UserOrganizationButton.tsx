// components/UserOrganizationButton.tsx

'use client';

import {
  useUser,
  useOrganizationList,
  useOrganization,
  useClerk,
} from '@clerk/nextjs';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

interface UserOrganizationButtonProps {
  isCollapsed: boolean;
}

export default function UserOrganizationButton({
  isCollapsed,
}: UserOrganizationButtonProps) {
  const { user } = useUser();
  const { organizationList, isLoaded } = useOrganizationList();
  const { organization } = useOrganization();
  const clerk = useClerk();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      console.log('Organization List:', organizationList);
    }
  }, [organizationList, isLoaded]);

  // Close dropdown when clicking outside (for expanded sidebar)
  useEffect(() => {
    if (!isCollapsed) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, isCollapsed]);

  // Handle loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Provide default empty array if organizationList is undefined or null
  const organizations: Array<{ organization: { id: string; name: string } }> =
    Array.isArray(organizationList) ? organizationList : [];

  // Handle cases where useOrganization might not have fetched the active organization
  const currentOrganization = organization || null;

  const handleSignOut = () => {
    clerk.signOut();
  };

  const handleManageAccount = () => {
    clerk.openUserProfile();
  };

  const handleSwitchOrganization = async (organizationId: string | null) => {
    try {
      await clerk.setActive({ organization: organizationId });
      router.refresh(); // Refresh to apply the new organization context
    } catch (error) {
      console.error('Error switching organization:', error);
      // Optionally, display an error message to the user
    }
  };

  const handleCreateOrganization = () => {
    router.push('/create-organization');
  };

  // Menu content extracted for reuse
  const menuContent = (
    <>
      {/* Organization Section */}
      <div className="px-3 py-2 text-gray-500 text-sm">
        Current Organization:
      </div>
      {currentOrganization ? (
        <div className="px-3 py-2 font-semibold">
          {currentOrganization.name}
        </div>
      ) : (
        <div className="px-3 py-2 font-semibold">Personal Account</div>
      )}

      {/* Switch Organizations */}
      {organizations.length > 0 && (
        <>
          <div className="px-3 py-2 text-gray-500 text-sm">
            Switch Organization
          </div>
          {organizations.map((org) => (
            <button
              key={org.organization.id}
              onClick={() => handleSwitchOrganization(org.organization.id)}
              className="flex w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10 transition-colors"
            >
              {org.organization.name}
            </button>
          ))}
          {/* Option to switch to personal account */}
          <button
            onClick={() => handleSwitchOrganization(null)}
            className="flex w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10 transition-colors"
          >
            Personal Account
          </button>

          {/* Separator */}
          <div className="my-2 border-t border-gray-700"></div>
        </>
      )}

      {/* Organization Actions */}
      <button
        onClick={handleCreateOrganization}
        className="flex w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10 transition-colors"
      >
        Create Organization
      </button>

      {/* User Actions */}
      <button
        onClick={handleManageAccount}
        className="flex w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10 transition-colors"
      >
        Manage Account
      </button>
      <button
        onClick={handleSignOut}
        className="flex w-full px-3 py-2 text-left text-sm text-red-600 rounded-lg hover:bg-white/10 transition-colors"
      >
        Sign Out
      </button>
    </>
  );

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {isCollapsed ? (
        // Use HoverCard when sidebar is collapsed
        <HoverCard openDelay={0}>
          <HoverCardTrigger asChild>
            <button
              className={cn(
                `flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200`,
                font.className,
                'justify-center w-full'
              )}
            >
              <div className="flex items-center">
                <Image
                  src={user?.profileImageUrl || '/default-avatar.png'}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </button>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            className={cn(
              'bg-darkGray text-white border border-white/20 shadow-lg rounded-2xl w-64 p-2',
              font.className
            )}
          >
            {menuContent}
          </HoverCardContent>
        </HoverCard>
      ) : (
        // Original behavior when sidebar is expanded
        <>
          <button
            className={cn(
              `flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200`,
              font.className,
              'justify-between w-full'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center">
              <Image
                src={user?.profileImageUrl || '/default-avatar.png'}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-2 text-sm font-medium text-white">
                {user?.fullName || 'User'}
              </div>
            </div>
            <ChevronDown
              className={cn(
                'h-5 w-5 transform transition-transform duration-200',
                isOpen ? 'rotate-0' : 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>
          {isOpen && (
            <div
              className={cn(
                'absolute left-0 bottom-full mb-2 z-50 w-full rounded-2xl shadow-lg bg-darkGray text-white ring-1 ring-black ring-opacity-5 border border-white/20 p-2',
                font.className
              )}
            >
              {menuContent}
            </div>
          )}
        </>
      )}
    </div>
  );
}
