import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { AIModel } from "@/app/types";

// Interface for AIModelCard props (unchanged)
interface AIModelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool: AIModel;
  aspectRatio?: "portrait" | "square";
  width: number;
  height: number;
}

export function AIModelCard({ tool, className, ...props }: { tool: AIModel } & AIModelCardProps) {
  // Define image URL based on tool icon name
  const imageUrl = tool.iconName ? `/${tool.iconName}` : null; // Use iconName if provided

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={tool.label}
                width={props.width}
                height={props.height}
                className={cn(
                  "overflow-hidden rounded-mdh-auto w-auto object-cover transition-all hover:scale-105",
                  props.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            ) : (
              <div
                className="overflow-hidden rounded-md relative"
                style={{
                  background: `linear-gradient(135deg, ${tool.bgColor} 0%, ${tool.color} 100%)`,
                  width: props.width,
                  height: props.height,
                }}
              />
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>{tool.label}</ContextMenuItem>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
          <ContextMenuSeparator />
          {/* Rest of context menu content can remain the same */}
          <ContextMenuItem>Learn More</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{tool.label}</h3>
      </div>
    </div>
  );
}

