import React from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { connectors } from "@/app/data"

// Interface for props passed to SidebarNav component
interface SidebarNavProps {
  items: { href: string; title: string }[];
  onItemClick: (connector: any) => void; // Placeholder type for onItemClick
  className?: string;
}

// SidebarNav component with updated onItemClick prop
function SidebarNav({ items, onItemClick, className, ...props }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col space-y-2", className)} {...props}>
      {items.map((item) => (
        <button
          key={item.href}
          type="button"
          className="text-left hover:text-muted font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inset focus:ring-primary-500 px-4 py-2 rounded-md"
          onClick={() => onItemClick(connectors.find((connector) => connector.name === item.title)!)}
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}

export default SidebarNav
