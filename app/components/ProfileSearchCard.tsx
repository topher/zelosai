// ProfileSearchCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaRunning } from "react-icons/fa";
import SearchSimilarityComponent from "./SearchSimilarityComponent";
import SearchCardBadgeDetail from "./SearchCardBadgeDetail";
import { Profile } from "@/app/types";

interface ProfileSearchCardProps {
  data: Profile;
}

const ProfileSearchCard: React.FC<ProfileSearchCardProps> = ({ data }) => {
  return (
    <Link href={`/profiles/${data.id}`}>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md bg-white transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full h-[400px]"
      >
        {/* Image Section */}
        <div className="relative w-full h-full">
          <Image
            src={data.imageSrc || "/placeholder.png"}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
            {/* Similarity Score Badge */}
            {data.similarity_score !== undefined && (
              <div className="absolute top-2 right-2">
                <SearchSimilarityComponent data={data.similarity_score} />
              </div>
            )}

            {/* Profile Info */}
            <div className="text-left">
              <h2 className="text-white text-xl font-bold mb-1">{data.name}</h2>
              <div className="flex items-center text-white text-sm mb-1">
                <FaRunning className="mr-2 text-gold" />
                <span className="uppercase tracking-wide">{data.sport}</span>
              </div>
              {data.location && (
                <div className="flex items-center text-white text-sm mb-2">
                  <FaMapMarkerAlt className="mr-2 text-gold" />
                  <span>{data.location}</span>
                </div>
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
