import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getConnectorsByAccountId } from "@/app/actions/connectorsActions";

interface SidebarNavProps {
  items: { href: string; title: string }[];
  onItemClick: (connector: any) => void;
  className?: string;
}

// SidebarNav component fetching data dynamically
function SidebarNav({ onItemClick, className, ...props }: SidebarNavProps) {
  const [connectors, setConnectors] = React.useState<any[]>([]);

  // Fetch connectors on mount
  React.useEffect(() => {
    async function fetchData() {
      const data = await getConnectorsByAccountId("12345"); // Using accountId 12345
      setConnectors(data);
    }
    fetchData();
  }, []);

  return (
    <nav className={cn("flex flex-col space-y-2", className)} {...props}>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          type="button"
          className="text-left hover:text-muted font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inset focus:ring-primary-500 px-4 py-2 rounded-md"
          onClick={() => onItemClick(connector)}
        >
          {connector.name}
        </button>
      ))}
    </nav>
  );
}

export default SidebarNav;
