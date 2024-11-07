// components/UserCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface UserCardProps {
  triple: Triple;
}

const UserCard: React.FC<UserCardProps> = ({ triple }) => {
  // User details rendering logic
  return (
    <div className="user-card">
      <div className="title">{triple.subject}</div>
      {/* User avatar and name rendering logic here */}
    </div>
  );
};

export default UserCard;
