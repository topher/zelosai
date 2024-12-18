// /app/components/atomic/organisms/LibraryCard.tsx

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface LibraryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  imageUrl?: string | null;
  emoji?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
  contextMenuItems?: React.ReactNode;
  objectFit?: "cover" | "contain";
}

export function LibraryCard({
  title,
  description,
  imageUrl = null,
  emoji = "📄",
  aspectRatio = "landscape",
  width = 300,
  height = 225,
  contextMenuItems,
  objectFit = "cover",
  className,
  ...props
}: LibraryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const aspectRatioClass =
    aspectRatio === "portrait"
      ? "aspect-[2/3]"
      : aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : "aspect-square";

  const handleExpand = () => setExpanded(true);
  const handleCollapse = () => setExpanded(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-lg group transition-all duration-500 ease-out transform hover:scale-105",
        expanded ? "max-h-[300px]" : "max-h-[225px]",
        aspectRatioClass,
        className
      )}
      style={{ width, height }}
      onMouseEnter={handleExpand}
      onMouseLeave={handleCollapse}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative w-full h-full">
            <div
              className={cn(
                "absolute inset-0 transition-transform duration-500 ease-out",
                imageUrl ? "group-hover:scale-110 group-hover:shadow-2xl" : ""
              )}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  style={{ objectFit }}
                  className="rounded-lg"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center text-white font-bold"
                  style={{
                    backgroundColor: "rgba(17, 24, 39, 0.85)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <span style={{ fontSize: "3rem" }}>{emoji}</span>
                </div>
              )}
            </div>
            {/* Label and Description Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg backdrop-blur-sm">
              <h3
                className={`text-white text-xl ${montserrat.className} font-bold tracking-wide transition-all duration-300 ease-out group-hover:text-shadow-lg`}
                style={{ textShadow: "2px 2px 10px #000000" }}
              >
                {title}
              </h3>
              {expanded && description && (
                <p className="text-gray-300 text-sm mt-1 transition-opacity duration-300">
                  {description}
                </p>
              )}
            </div>
          </div>
        </ContextMenuTrigger>
        {contextMenuItems && (
          <ContextMenuContent className="w-48 rounded-lg bg-gray-800 text-gray-200 shadow-lg">
            {contextMenuItems}
          </ContextMenuContent>
        )}
      </ContextMenu>
    </div>
  );
}
