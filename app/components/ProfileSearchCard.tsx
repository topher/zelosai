import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchSimilarityComponent from "./SearchSimilarityComponent";
import SearchCardBadgeDetail from "./SearchCardBadgeDetail";
import { Profile } from "@/app/types";

interface ProfileSearchCardProps {
  data: Profile;
}

const ProfileSearchCard: React.FC<ProfileSearchCardProps> = ({ data }) => {
  return (
    <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg">
      <Link href={`/profiles/${data.id}`}>
        <div className="relative">
          <Image
            src={data.imageSrc || '/placeholder.png'} // Use placeholder if imageSrc is missing
            alt={data.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              {data.similarity_score !== undefined && (
                <SearchSimilarityComponent data={data.similarity_score} />
              )}
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold">{data.name}</h2>
              <p className="text-white text-lg">{data.sport}</p>
              {data.accolades && data.accolades.length > 0 && (
                <SearchCardBadgeDetail data={data.accolades} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileSearchCard;
