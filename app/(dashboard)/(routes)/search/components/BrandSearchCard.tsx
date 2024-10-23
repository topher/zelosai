// app/components/BrandSearchCard.tsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { isValidUrl } from "@/app/utils/validateUrl";
import {
  FaChartArea,
  FaGlobeAmericas,
  FaUsers,
  FaLanguage,
} from "react-icons/fa";

interface BrandSearchCardProps {
  data: {
    id: string;
    brand_name?: string;
    logo_url?: string | null;
    primary_industry?: string;
    secondary_industry?: string;
    mission_vision?: string;
    regions?: string[];
    audience_lifestyle?: string[];
    languages?: string[];
    [key: string]: any;
  };
}

const BrandSearchCard: React.FC<BrandSearchCardProps> = ({ data }) => {
  const primaryIndustry = data.primary_industry || "Unknown Industry";
  const secondaryIndustry = data.secondary_industry
    ? `, ${data.secondary_industry}`
    : "";

  let logoUrl = "/brand_avatar.png";

  if (data.logo_url) {
    if (isValidUrl(data.logo_url)) {
      logoUrl = data.logo_url;
    } else if (data.logo_url.startsWith("/")) {
      logoUrl = data.logo_url;
    }
  }

  return (
    <Link href={`/profiles/brands/${data.id}`}>
      <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg">
        {/* Image Section */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={logoUrl}
            alt={data.brand_name || "Brand Logo"}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/truchet_avatar.png";
            }}
          />
          {/* Cover Effect */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-darkGray mb-2 line-clamp-2">
            {data.brand_name || "Unknown Brand"}
          </h2>
          {/* Industry */}
          <div className="flex items-center text-darkGray text-sm mb-2">
            <FaChartArea className="mr-2 text-indigo" />
            <span>
              {primaryIndustry}
              {secondaryIndustry}
            </span>
          </div>
          {/* Regions */}
          {data.regions && data.regions.length > 0 && (
            <div className="flex items-center text-darkGray text-sm mb-2">
              <FaGlobeAmericas className="mr-2 text-pink" />
              <span>{data.regions.join(", ")}</span>
            </div>
          )}
          {/* Audience Lifestyle */}
          {data.audience_lifestyle && data.audience_lifestyle.length > 0 && (
            <div className="flex items-center text-darkGray text-sm mb-2">
              <FaUsers className="mr-2 text-gold" />
              <span>{data.audience_lifestyle.join(", ")}</span>
            </div>
          )}
          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="flex items-center text-darkGray text-sm">
              <FaLanguage className="mr-2 text-red" />
              <span>{data.languages.join(", ")}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BrandSearchCard;
