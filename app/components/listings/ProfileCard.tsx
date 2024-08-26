import Link from "next/link";
import Image from "next/image";

import getProfiles from "@/app/actions/getProfiles";
import { Profile } from "@/app/types";

  
// ProfileCardProps interface
  interface ProfileCardProps {
    data: Profile;
    // currentUser?: SafeUser | null;
  }

// ProfileCard Component
const ProfileCard: React.FC<ProfileCardProps> = ({
  data,
  // currentUser,
}) => {

  const [city, state] = data.location ? data.location.split(', ') : ['', ''];

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <Link href={`/profiles/${data.id}`}>
            <div 
              className="
                aspect-square 
                w-full 
                relative 
                overflow-hidden 
                rounded-xl
              "
            >
            <Image
              fill
              className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
              src={data.imageSrc}
              alt="Profile"
            />
            </div>
            <div className="mt-2 font-semibold text-lg">
              {data.name}
            </div>
            <div className="mt-1 font-light text-neutral-500">
            {data.sport}
            </div>
            <div className="mt-1 font-light text-neutral-500">
            {city}, {state}
            </div>
        </Link>
    </div>
  </div>
  );
}

export default ProfileCard;
