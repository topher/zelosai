import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import Image from "next/image";
import { AIModel } from "@/app/types";

// Interface for AIModelCard props (unchanged)
interface AIModelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool: AIModel;
  aspectRatio?: "portrait" | "square";
  width: number;
  height: number;
}


// Define the single background color with low opacity
const backgroundColor = 'rgba(17, 24, 39, .85)'; // Very dark blue with low opacity

export function AIModelCard({ tool, className, width, height, ...props }: { tool: AIModel } & AIModelCardProps) {
  // Ensure the iconName starts with a slash if it doesn't already
  const imageUrl = tool.iconName ? `/${tool.iconName.replace(/^\//, '')}` : null;

  // Determine the appropriate emoji based on the model type
  const emoji = tool.tags.includes("voice") ? "🔊" : tool.tags.includes("text") ? "✏️" : "🚀";

  // Wrapper to enforce aspect ratio
  const aspectRatioClass = props.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square";

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={cn("overflow-hidden rounded-lg relative", aspectRatioClass, "transition-transform transform hover:scale-105")} style={{ width, height }}>
            {imageUrl ? (
              <div className="absolute inset-0">
                <Image
                  src={imageUrl}
                  alt={tool.label}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: backgroundColor, // Apply the single color with low opacity
                  backdropFilter: 'blur(12px)', // Apply a slightly stronger blur for more glass effect
                  WebkitBackdropFilter: 'blur(12px)', // Support for Safari
                  borderRadius: '16px', // Rounded corners for the glass effect
                  border: '1px solid rgba(255, 255, 255, 0.18)', // Subtle border for glassmorphism
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                }}
              >
                <span style={{ fontSize: '3.5rem' }}>{emoji}</span> {/* Larger and more elegant emoji */}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>{tool.label}</ContextMenuItem>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
          <ContextMenuSeparator />
          <ContextMenuItem>Learn More</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none text-gray-900">{tool.label}</h3>
      </div>
    </div>
  );
}
