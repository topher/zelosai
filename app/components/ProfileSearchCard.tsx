import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/app/types"; // Adjust import based on your project structure

interface ProfileSearchCardProps {
  data: Profile;
}

const ProfileSearchCard: React.FC<ProfileSearchCardProps> = ({ data }) => {
  const [city, state] = data.location ? data.location.split(', ') : ['', ''];

  return (
    <div className="col-span-1 cursor-pointer group">
      <Link href={`/profiles/${data.id}`}>
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              fill
              className="object-cover h-full w-full group-hover:scale-110 transition"
              src={data.imageSrc}
              alt="Profile"
            />
          </div>
          <div className="mt-2 font-semibold text-lg">{data.name}</div>
          <div className="mt-1 font-light text-neutral-500">{data.sport}</div>
          <div className="mt-1 font-light text-neutral-500">
            {city}, {state}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileSearchCard;
