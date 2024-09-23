// ProfileSearchCard.tsx
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
    <Link href={`/profiles/${data.id}`}>
      <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md bg-white transition transform hover:scale-105 hover:shadow-xl w-full h-[400px]">
        {/* Image Section */}
        <div className="relative w-full h-full">
          <Image
            src={data.imageSrc || "/placeholder.png"}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
            {/* Similarity Score Badge */}
            {data.similarity_score !== undefined && (
              <div className="flex justify-end">
                <SearchSimilarityComponent data={data.similarity_score} />
              </div>
            )}

            {/* Profile Info */}
            <div>
              <h2 className="text-white text-2xl font-bold">{data.name}</h2>
              <p className="text-white text-lg">{data.sport}</p>
              {data.location && (
                <p className="text-white text-lg">{data.location}</p>
              )}
              {data.accolades && data.accolades.length > 0 && (
                <SearchCardBadgeDetail data={data.accolades} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileSearchCard;
