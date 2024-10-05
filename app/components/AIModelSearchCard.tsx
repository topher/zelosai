import React from "react";
import Image from "next/image";
import Link from "next/link";
import AvatarAndUsername from "./AvatarAndUsername";
import ModelTypeIcon from "./ModelTypeIcon";
import { AIModel } from "@/app/types";

interface AIModelSearchCardProps {
  data: AIModel;
}

const AIModelSearchCard: React.FC<AIModelSearchCardProps> = ({ data }) => {
  // Check if iconName is a non-empty string
  const iconName = data.iconName?.trim() !== "" ? data.iconName?.trim() : null;

  // Determine the image URL (use iconName if it exists, then fallback to tags)
  let imageUrl = iconName;

  // If imageUrl is null or empty, determine the image based on tags
  if (!imageUrl) {
    const tags = data.tags || [];

    // Check if any of the specific tags exist in the array
    if (tags.includes("voice")) {
      imageUrl = "/mic/mic-dynamic-clay.png";
    } else if (tags.includes("text")) {
      imageUrl = "/chat-bubble/chat-bubble-dynamic-clay.png";
    } else if (tags.includes("image")) {
      imageUrl = "/painting-brush/paint-brush-dynamic-clay.png";
    } else {
      // Default image if none of the tags match or no valid image found
      imageUrl = "/default-image.png"; // Adjust to your default image
    }
  }

  // Set a default background color or use data.bgColor
  const backgroundColor = data.bgColor || "rgba(0, 0, 0, 0.5)";

  return (
    <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg h-64">
      <Link href={`/models/${data.modelId}`}>
        <div className="relative h-full">
          {/* Always display the image */}
          <div className="relative h-full">
            <Image
              src={imageUrl}
              alt={data.label}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <ModelTypeIcon
                  data={data.foundational_model ? "foundational" : "specialized"}
                />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">{data.label}</h2>
                <p className="text-white text-sm">
                  {data.description || "No description available"}
                </p>
                <AvatarAndUsername
                  data={{
                    avatarSrc: data.creatorAvatar || "/truchet_avatar.png",
                    username: data.createdBy || "Unknown Creator",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AIModelSearchCard;
