"use client";
import Image from "next/image";
import { useState } from "react";
import ConnectorsList from "./connectors-list";
import SidebarNav from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { ConnectorForm } from "./connector-form";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { connectors } from "@/app/data";
import { DataConnector } from "@/app/types";

// Interface for connector data with a `form` property for the specific form component
interface ConnectorCardProps {
  key: string;
  connector: DataConnector;
}

interface ConnectorsLayoutProps {
  children: React.ReactNode;
}

export default function ConnectorsLayout({ children }: ConnectorsLayoutProps) {
  const [selectedConnector, setSelectedConnector] = useState<DataConnector | null>(null);
  const [isCreateConnectorModalOpen, setIsCreateConnectorModalOpen] = useState(false);

  const handleOpenCreateConnectorModal = () => setIsCreateConnectorModalOpen(true);
  const handleCloseCreateConnectorModal = () => setIsCreateConnectorModalOpen(false);

  const handleConnectorSelect = (connector: DataConnector) => {
    setSelectedConnector(connector);
  };

  const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector }) => (
    <div className="bg-white rounded-lg shadow-md px-6 py-8 cursor-pointer hover:shadow-lg hover:bg-gray-100">
      <img src={connector.icon} alt={connector.name} className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-center">{connector.name}</h3>
      <p className="text-muted-foreground text-center">{connector.description?.slice(0, 70) + "..."}</p>
      <Button variant="outline" size="sm" className="mt-4 mx-auto">
        Connect
      </Button>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Sidebar for existing connectors */}
      <div className="col-span-2 text-l font-bold tracking-tight">
        <h2>My Integrations</h2>
        <SidebarNav
          items={connectors.map((connector) => ({
            href: `#${connector.name}`,
            title: connector.name,
          }))}
          onItemClick={handleConnectorSelect}
        />
      </div>
      {/* Main content area */}
      <div className="col-span-3">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {selectedConnector ? selectedConnector.name : "Discover Connectors"}
          </h2>
          <p className="text-muted-foreground">
            {selectedConnector?.description ||
              "Connect your favorite tools and platforms to streamline your workflow."}
          </p>
        </div>
        {selectedConnector ? (
          <>
            {/* Display connector details (icon, description) */}
            <img src={selectedConnector.icon} alt={selectedConnector.name} className="w-12 h-12 mb-4" />
            <p>{selectedConnector.description}</p>
            {/* Render the specific form component for the selected connector */}
            {selectedConnector.form && <selectedConnector.form />}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectors.map((connector) => (
              <ConnectorCard key={connector.id} connector={connector} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
