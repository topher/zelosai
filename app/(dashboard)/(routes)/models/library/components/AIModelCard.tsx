// library/components/AIModelCard.tsx

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import { AIModel } from "@/app/types";
import { useState } from "react";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

interface AIModelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool: AIModel;
  aspectRatio?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
}

export function AIModelCard({
  tool,
  className,
  width = 300,
  height = 225,
  aspectRatio = "landscape",
  ...props
}: AIModelCardProps) {
  const [expanded, setExpanded] = useState(false);
  const imageUrl = tool.iconName ? `/${tool.iconName.replace(/^\//, "")}` : null;

  const emoji = tool.tags.includes("voice")
    ? "🔊"
    : tool.tags.includes("text")
    ? "✏️"
    : "🚀";

  const aspectRatioClass =
    aspectRatio === "portrait"
      ? "aspect-[2/3]"
      : aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : "aspect-square";

  const handleExpand = () => setExpanded(true);
  const handleCollapse = () => setExpanded(false);

  // Check if the model is a foundational (base) model based on its tags
  const isFoundationalModel = tool.tags && tool.tags.includes("foundational");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg shadow group transition-all duration-500 ease-out",
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
                imageUrl ? "group-hover:scale-110 group-hover:shadow-lg" : ""
              )}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={tool.label}
                  layout="fill"
                  objectFit={isFoundationalModel ? "contain" : "cover"}
                  objectPosition="center"
                  className="rounded-lg"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center text-white font-bold"
                  style={{
                    backgroundColor: "rgba(17, 24, 39, 0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <span style={{ fontSize: "3rem" }}>{emoji}</span>
                </div>
              )}
            </div>
            {/* Label and Description Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg">
              <h3 className={`text-white text-xl ${montserrat.className} font-bold tracking-wide transition-all duration-300 ease-out 
                group-hover:text-shadow-lg`} 
                style={{ textShadow: "2px 2px 6px #111827" }}>
                {tool.label}
              </h3>
              {expanded && (
                <p className="text-white text-md mt-2 transition-opacity duration-300">
                  {tool.description}
                </p>
              )}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem>{tool.label}</ContextMenuItem>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
          <ContextMenuSeparator />
          <ContextMenuItem>Learn More</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
