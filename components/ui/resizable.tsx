// /components/ui/resizable.tsx

"use client"

import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full",
      "data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) => (
  <ResizablePrimitive.Panel
    className={cn("h-full", className)}
    {...props}
  />
);

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex items-center justify-center",
      "bg-gray-700 hover:bg-gray-600 transition-colors duration-200",
      "data-[panel-group-direction=horizontal]:w-0.5 data-[panel-group-direction=vertical]:h-2",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "flex items-center justify-center",
          "w-6 h-6 rounded-full bg-gray-500 text-white",
          "hover:bg-gray-400",
          "transition-colors duration-200"
        )}
      >
        <GripVertical className="w-4 h-4" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
