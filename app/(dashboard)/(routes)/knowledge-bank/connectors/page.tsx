"use client";
import { useState, useEffect } from "react";
import SidebarNav from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { ConnectorForm } from "./connector-form";
import { getConnectorsByAccountId } from "@/app/actions/connectorsActions";
import { DataConnector } from "@/app/types";

// Interface for connector data
interface ConnectorCardProps {
  key: string;
  connector: DataConnector;
}

export default function ConnectorsLayout() {
  const [selectedConnector, setSelectedConnector] = useState<DataConnector | null>(null);
  const [connectors, setConnectors] = useState<DataConnector[]>([]);
  const [isCreateConnectorModalOpen, setIsCreateConnectorModalOpen] = useState(false);

  // Fetch connectors dynamically on mount
  useEffect(() => {
    async function fetchData() {
      const data = await getConnectorsByAccountId("12345"); // Replace with dynamic accountId
      setConnectors(data);
      console.log(connectors)
    }
    fetchData();
  }, []);

  const handleOpenCreateConnectorModal = () => setIsCreateConnectorModalOpen(true);
  const handleCloseCreateConnectorModal = () => setIsCreateConnectorModalOpen(false);

  const handleConnectorSelect = (connector: DataConnector) => {
    setSelectedConnector(connector);
  };

  const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector }) => (
    <div className="bg-white rounded-lg shadow-md px-6 py-8 cursor-pointer hover:shadow-lg hover:bg-gray-100 w-full max-w-[300px]">
      <img src={connector.icon} alt={connector.name} className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-center">{connector.name}</h3>
      <p className="text-muted-foreground text-center">
        {connector.description?.slice(0, 70) + "..."}
      </p>
      <Button variant="outline" size="sm" className="mt-4 mx-auto">
        Connect
      </Button>
    </div>
  );

  return (
    <div className="flex">
      {/* Sidebar for existing connectors */}
      <div className="w-1/4 bg-gray-100 h-screen p-6 sticky top-0">
        <h2 className="text-xl font-bold tracking-tight mb-6">My Integrations</h2>
        <SidebarNav
          items={connectors.map((connector) => ({
            href: `#${connector.name}`,
            title: connector.name,
          }))}
          onItemClick={handleConnectorSelect}
        />
      </div>

      {/* Main content area */}
      <div className="w-3/4 p-8">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {selectedConnector ? selectedConnector.name : "Discover Connectors"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {selectedConnector?.description ||
              "Connect your favorite tools and platforms to streamline your workflow."}
          </p>
        </div>

        {selectedConnector ? (
          <>
            {/* Display connector details (icon, description) */}
            <img
              src={selectedConnector.icon}
              alt={selectedConnector.name}
              className="w-12 h-12 mb-4"
            />
            <p>{selectedConnector.description}</p>
            {/* Render the specific form component for the selected connector */}
            {selectedConnector.form && <ConnectorForm initialMetadata={selectedConnector} onSubmit={function (data: z.infer<any>): void {
              throw new Error("Function not implemented.");
            } } />}
          </>
        ) : (
          <div className="flex flex-wrap gap-6">
            {connectors.map((connector) => (
              <ConnectorCard key={connector.id} connector={connector} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
