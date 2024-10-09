// app/components/AIModelSearchCard.tsx

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
  // Determine the image URL
  const iconName = data.iconName?.trim() !== "" ? data.iconName?.trim() : null;
  let imageUrl = iconName;

  if (!imageUrl) {
    const tags = data.tags || [];
    if (tags.includes("voice")) {
      imageUrl = "/mic/mic-dynamic-clay.png";
    } else if (tags.includes("text")) {
      imageUrl = "/chat-bubble/chat-bubble-dynamic-clay.png";
    } else if (tags.includes("image")) {
      imageUrl = "/painting-brush/paint-brush-dynamic-clay.png";
    } else {
      imageUrl = "/default-image.png"; // Adjust to your default image
    }
  }

  // Determine the model type based on tags
  let modelType = "specialized";
  if (data.foundational_model) {
    modelType = "foundational";
  } else if (data.tags?.includes("voice")) {
    modelType = "voice";
  } else if (data.tags?.includes("text")) {
    modelType = "text";
  } else if (data.tags?.includes("image")) {
    modelType = "image";
  }

  return (
    <Link href={`/models/${data.modelId}`}>
      <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md h-80 bg-white transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg">
        {/* Image Section */}
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={data.label}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 100%)",
            }}
          ></div>

          {/* Model Type Icon at Top Left */}
          <div className="absolute top-3 left-3">
            <ModelTypeIcon data={modelType} />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 p-4 w-full">
            <h2 className="text-white text-xl font-semibold mb-1">
              {data.label}
            </h2>
            <p className="text-white text-sm mb-2 line-clamp-2">
              {data.description || "No description available"}
            </p>
            {/* Creator Information */}
            <div className="flex items-center text-white">
              <AvatarAndUsername
                data={{
                  avatarSrc: data.creatorAvatar || "/truchet_avatar.png",
                  username: data.createdBy || "Unknown Creator",
                }}
              />
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default AIModelSearchCard;
