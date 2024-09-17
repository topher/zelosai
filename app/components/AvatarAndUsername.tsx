// AvatarAndUsername.tsx
import React from 'react';

interface AvatarAndUsernameProps {
  data: {
    avatarSrc: string;
    username: string;
  };
}

const AvatarAndUsername: React.FC<AvatarAndUsernameProps> = ({ data }) => (
  <div className="flex items-center mt-2">
    <img
      src={data.avatarSrc || '/default-avatar.png'}
      alt={data.username}
      className="w-8 h-8 rounded-full"
    />
    <span className="ml-2 text-sm">{data.username}</span>
  </div>
);

export default AvatarAndUsername;
