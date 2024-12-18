// app/components/AvatarAndUsername.tsx

import React from 'react';
import Image from 'next/image';

interface AvatarAndUsernameProps {
  data: {
    avatarSrc: string;
    username: string;
  };
}

const AvatarAndUsername: React.FC<AvatarAndUsernameProps> = ({ data }) => (
  <div className="flex items-center">
    <Image
      src={data.avatarSrc || '/default-avatar.png'}
      alt={`${data.username}'s avatar`}
      width={32}
      height={32}
      className="rounded-full"
    />
    <span className="ml-2 text-sm text-white/80">{data.username}</span>
  </div>
);

export default AvatarAndUsername;
