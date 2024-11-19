// components/UserOrganizationButton.tsx

'use client';

import { useUser, useOrganizationList, useOrganization, useClerk } from '@clerk/nextjs';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from "lucide-react"
import { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserOrganizationButton() {
  const { user } = useUser();
  const { organizationList, isLoaded } = useOrganizationList();
  const { organization } = useOrganization();
  const clerk = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      // console.log('Organization List:', organizationList);
    }
  }, [organizationList, isLoaded]);

  // Handle loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Provide default empty array if organizationList is undefined or null
  const organizations: Array<{ organization: { id: string; name: string } }> = Array.isArray(organizationList)
    ? organizationList
    : [];

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

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center focus:outline-none">
          <Image
            src={user?.profileImageUrl || '/default-avatar.png'}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <ChevronDown className="w-5 h-5 ml-2" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {/* Organization Section */}
          <div className="px-1 py-1 ">
            <div className="px-3 py-2 text-gray-500 text-sm">
              Current Organization:
            </div>
            {currentOrganization ? (
              <Menu.Item disabled>
                <div className="px-3 py-2 font-semibold">
                  {currentOrganization.name}
                </div>
              </Menu.Item>
            ) : (
              <Menu.Item disabled>
                <div className="px-3 py-2 font-semibold">Personal Account</div>
              </Menu.Item>
            )}
          </div>

          {/* Switch Organizations */}
          {organizations.length > 0 && (
            <div className="px-1 py-1 ">
              <div className="px-3 py-2 text-gray-500 text-sm">
                Switch Organization
              </div>
              {organizations.map((org) => (
                <Menu.Item key={org.organization.id}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSwitchOrganization(org.organization.id)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex w-full px-3 py-2 text-left`}
                    >
                      {org.organization.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
              {/* Option to switch to personal account */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleSwitchOrganization(null)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex w-full px-3 py-2 text-left`}
                  >
                    Personal Account
                  </button>
                )}
              </Menu.Item>
            </div>
          )}

          {/* Organization Actions */}
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleCreateOrganization}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex w-full px-3 py-2 text-left`}
                >
                  Create Organization
                </button>
              )}
            </Menu.Item>
          </div>

          {/* User Actions */}
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleManageAccount}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex w-full px-3 py-2 text-left`}
                >
                  Manage Account
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex w-full px-3 py-2 text-left text-red-600`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
