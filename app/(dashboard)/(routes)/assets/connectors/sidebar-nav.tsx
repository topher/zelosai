// SidebarNav.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getConnectorsByAccountId } from "@/app/actions/connectorsActions"; // Ensure this import is present

interface SidebarNavProps {
  onItemClick: (item: any) => void;
  className?: string;
}

function SidebarNav({ onItemClick, className, ...props }: SidebarNavProps) {
  const [connectors, setConnectors] = React.useState<any[]>([]);
  const [newAlerts, setNewAlerts] = React.useState<number>(5); // Example alert count

  // Fetch connectors on mount
  React.useEffect(() => {
    async function fetchData() {
      const data = await getConnectorsByAccountId("12345"); // Using accountId 12345
      setConnectors(data);
    }
    fetchData();
  }, []);

  return (
    <nav className={cn("flex flex-col space-y-4", className)} {...props}>
      {/* Topics Chip */}
      <button
        type="button"
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => onItemClick({ type: 'topics' })}
      >
        <span>Topics</span>
        {newAlerts > 0 && (
          <Badge variant="destructive" className="ml-1">
            {newAlerts}
          </Badge>
        )}
      </button>

      {/* Separator */}
      <Separator className="my-4" />

      {/* Connectors Section */}
      <p className="text-sm font-semibold text-muted-foreground mb-2">Connectors</p>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          type="button"
          className="text-left hover:text-muted font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inset focus:ring-primary-500 px-4 py-2 rounded-md"
          onClick={() => onItemClick({ type: 'connector', data: connector })}
        >
          {connector.name}
        </button>
      ))}
    </nav>
  );
}

export default SidebarNav;
