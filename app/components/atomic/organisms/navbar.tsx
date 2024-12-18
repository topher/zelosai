// components/navbar.tsx

import UserOrganizationButton from './UserOrganizationButton';

const Navbar = () => {
  return (
    <div className="navbar flex items-center justify-between p-4">
      {/* Add your logo and navigation links here */}
      <div className="flex w-full justify-end">
        <UserOrganizationButton />
      </div>
    </div>
  );
};

export default Navbar;
