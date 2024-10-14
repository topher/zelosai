"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { isValidUrl } from "@/app/utils/validateUrl"; // Adjust the import path as needed

interface BrandSearchCardProps {
  data: {
    id: string;
    brand_name?: string; // Ensure it's optional if it can be missing
    logo_url?: string | null;
    primary_industry?: string; // Reflects the flat structure
    secondary_industry?: string; // Reflects the flat structure
    mission_vision?: string;
    regions?: string[];
    // Add any other fields you need from your brand data
  };
}

const BrandSearchCard: React.FC<BrandSearchCardProps> = ({ data }) => {
  console.log("Data passed to BrandSearchCard:", data); // Add this for debugging

  const primaryIndustry = data.primary_industry || "Unknown Industry";
  const secondaryIndustry = data.secondary_industry ? `, ${data.secondary_industry}` : "";
  let logoUrl = "/truchet_avatar.png";

  if (data.logo_url) {
    if (isValidUrl(data.logo_url)) {
      logoUrl = data.logo_url;
    } else if (data.logo_url.startsWith("/")) {
      logoUrl = data.logo_url;
    }
  }

  return (
    <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white">
      <Link href={`/profiles/brands/${data.id}`}>
        <div className="relative">
          {/* Brand Logo */}
          <div className="flex items-center justify-center h-48 bg-gray-100">
            <Image
              src={logoUrl}
              alt={data.brand_name || "Brand Logo"}
              width={200}
              height={200}
              className="object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/truchet_avatar.png";
              }}
            />
          </div>
          {/* Overlay */}
          <div className="p-4">
            <h2 className="text-xl font-bold">{data.brand_name || "Unknown Brand"}</h2>
            <p className="text-gray-600">
              {primaryIndustry}
              {secondaryIndustry && <span>{secondaryIndustry}</span>}
            </p>
            {data.mission_vision && (
              <p className="text-gray-700 mt-2">{data.mission_vision}</p>
            )}
            {data.regions && data.regions.length > 0 && (
              <div className="mt-2">
                <span className="text-sm font-semibold">Regions: </span>
                <span className="text-sm">{data.regions.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};


export default BrandSearchCard;
