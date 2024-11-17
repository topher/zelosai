// /app/(dashboard)/(routes)/search/components/SearchCard.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaRunning,
  FaChartArea,
  FaGlobeAmericas,
  FaUsers,
  FaLanguage,
  FaFileContract,
} from "react-icons/fa";
import { countryMap, sportsMap } from "../../../../../lib/utils";
import { isValidUrl } from "@/app/utils/validateUrl";
import AvatarAndUsername from "./AvatarAndUsername";
import ModelTypeIcon from "./ModelTypeIcon";
import ContractCardTermDetail from "./ContractCardTermDetail";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

interface SearchCardProps {
  data: any;
  type: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ data, type }) => {
  if (!data || !type) return null;

  const [isHovered, setIsHovered] = useState(false);

  // Map the data to a common format
  const cardData = mapCardData(data, type);

  // Determine link based on type
  let linkHref = "#";
  switch (type) {
    case "athlete":
      linkHref = `/profiles/athlete/${cardData.id}`;
      break;
    case "brand":
      linkHref = `/profiles/brands/${cardData.id}`;
      break;
    case "contract":
      linkHref = `/contracts/${cardData.id}`;
      break;
    case "model":
      linkHref = `/models/${cardData.id}`;
      break;
    default:
      break;
  }

  // Common card styles with hover effects and border
  const cardClassName =
    `relative group cursor-pointer rounded-xl overflow-hidden transition-transform duration-300 transform bg-gray-800 ${
      isHovered ? "scale-105 shadow-xl" : "scale-100"
    }`;

  return (
    <Link href={linkHref}>
      <div
        className={cardClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Background Section */}
        <div className="relative w-full h-64">
          {/* Background Image or Color */}
          {type !== "contract" ? (
            <Image
              src={cardData.imageUrl || "/placeholder.png"}
              alt={cardData.title || "Card Image"}
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-500 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800"></div>
          )}

          {/* Background Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
            }}
          ></div>

          {/* Semi-transparent Icon as Background */}
          {type === "contract" && (
            <div
              className={`absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-500 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
              style={{
                zIndex: 0,
              }}
            >
              <FaFileContract size={150} color="white" />
            </div>
          )}

          {/* Optional Model Type Icon */}
          {cardData.modelType && (
            <div className="absolute top-3 left-3">
              <ModelTypeIcon data={cardData.modelType} />
            </div>
          )}

          {/* Status Badge for Contract */}
          {type === "contract" && cardData.status && (
            <div className="absolute top-2 right-2">
              <span
                className={`text-sm px-2 py-1 rounded-full ${getStatusColorClass(
                  cardData.status
                )}`}
              >
                {cardData.status}
              </span>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 p-4 w-full">
            <h2
              className={`text-white text-xl font-semibold mb-1 ${montserrat.className}`}
              style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}
            >
              {cardData.title || "No Title"}
            </h2>
            {/* Subtitle for Model Cards */}
            {cardData.subtitle && (
              <p
                className="text-white text-sm mb-2 line-clamp-2"
                style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}
              >
                {cardData.subtitle}
              </p>
            )}
            {/* Details */}
            {type === "contract" ? (
              <ContractCardTermDetail
                data={{
                  effectiveDate: data.effectiveDate,
                  expirationDate: data.expirationDate,
                }}
              />
            ) : (
              cardData.details && cardData.details.length > 0 && (
                <ul className="text-white text-sm mb-2">
                  {cardData.details.map((detail: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center mb-1"
                      style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}
                    >
                      {detail.icon && (
                        <span className="mr-2 text-white">{detail.icon}</span>
                      )}
                      <span>{detail.text}</span>
                    </li>
                  ))}
                </ul>
              )
            )}
            {/* Badges */}
            {cardData.badges && cardData.badges.length > 0 && (
              <div className="flex flex-wrap">
                {cardData.badges.map((badge: any, index: number) => (
                  <span
                    key={index}
                    className={`text-xs font-medium mr-2 mb-2 px-2 py-1 rounded-full ${badge.colorClass}`}
                    style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.8)" }}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            )}
            {/* Optional Creator Info */}
            {cardData.creator && (
              <div className="mt-2">
                <AvatarAndUsername data={cardData.creator} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;

/* Helper Functions */

const mapCardData = (data: any, type: string) => {
  switch (type) {
    case "athlete":
      return {
        id: data.id,
        imageUrl: data.imageSrc || "/placeholder_avatar.png",
        title: data.name,
        details: [
          data.sport && {
            icon: <FaRunning />,
            text: sportsMap[data.sport] || data.sport,
          },
          data.location && {
            icon: <FaMapMarkerAlt />,
            text: countryMap[data.location]?.name || data.location,
          },
        ].filter(Boolean),
        badges: data.accolades
          ? data.accolades.map((accolade: string) => ({
              text: accolade,
              colorClass: "bg-blue-600 text-white",
            }))
          : [],
      };

    case "brand":
      return {
        id: data.id,
        imageUrl: getBrandLogoUrl(data.logo_url),
        title: data.brand_name || "Unknown Brand",
        details: [
          data.primary_industry && {
            icon: <FaChartArea />,
            text: data.primary_industry,
          },
          data.secondary_industry && {
            icon: <FaChartArea />,
            text: data.secondary_industry,
          },
          data.regions && data.regions.length > 0 && {
            icon: <FaGlobeAmericas />,
            text: data.regions.join(", "),
          },
          data.languages && data.languages.length > 0 && {
            icon: <FaLanguage />,
            text: data.languages.join(", "),
          },
          data.audience_lifestyle && data.audience_lifestyle.length > 0 && {
            icon: <FaUsers />,
            text: data.audience_lifestyle.join(", "),
          },
        ].filter(Boolean),
        badges: [], // No badges for brands
      };

    case "contract":
      return {
        id: data.id,
        imageUrl: null, // No image URL, we'll use background color and icon
        title: data.title,
        details: [], // Details will be handled by ContractCardTermDetail
        badges: [], // No badges
        status: data.status, // Add status field for badge
        creator: {
          avatarSrc: data.creatorAvatar || "/truchet_avatar.png",
          username: data.contract_creator || "Unknown Creator",
        },
      };

    case "model":
      return {
        id: data.id,
        imageUrl: getModelImageUrl(data),
        title: data.label,
        subtitle: data.description || "No description available",
        details: [], // No details
        badges: [], // No badges
        creator: {
          avatarSrc: data.creatorAvatar || "/truchet_avatar.png",
          username: data.createdBy || "Unknown Creator",
        },
        modelType: getModelType(data),
      };

    default:
      return {
        id: data.id,
        imageUrl: "/placeholder.png",
        title: "Unknown Item",
        details: [],
        badges: [],
      };
  }
};

const getStatusColorClass = (status: string) => {
  if (!status) return "bg-gray-100 text-gray-800";

  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "expired":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getBrandLogoUrl = (logoUrl: string | null | undefined) => {
  if (!logoUrl) return "/brand_avatar.png";
  if (isValidUrl(logoUrl)) return logoUrl;
  if (logoUrl.startsWith("/")) return logoUrl;
  return "/brand_avatar.png";
};

const getModelImageUrl = (data: any) => {
  const iconName =
    data.iconName && data.iconName.trim() !== "" ? data.iconName.trim() : null;
  let imageUrl = iconName;

  if (!imageUrl) {
    const tags = data.tags || [];
    if (tags.includes("voice")) {
      imageUrl = "/3dicons/mic/mic-dynamic-premium.png";
    } else if (tags.includes("text")) {
      imageUrl = "/3dicons/chat-bubble/chat-bubble-dynamic-premium.png";
    } else if (tags.includes("image")) {
      imageUrl = "/3dicons/painting-brush/paint-brush-dynamic-premium.png";
    } else {
      imageUrl = "/default-image.png"; // Adjust to your default image
    }
  }

  return imageUrl;
};

const getModelType = (data: any) => {
  if (data.foundational_model) {
    return "foundational";
  } else if (data.tags?.includes("voice")) {
    return "voice";
  } else if (data.tags?.includes("text")) {
    return "text";
  } else if (data.tags?.includes("image")) {
    return "image";
  }
  return "specialized";
};
