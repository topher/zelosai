// ConnectorsLayout.tsx
"use client";

import { useState, useEffect } from "react";
import SidebarNav from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { ConnectorForm } from "./connector-form";
import { DataConnector } from "@/app/types"; // Ensure ConnectorFormValues is exported from types
import TopicsPage from "../topics/page"; // Ensure the path is correct
import { ConnectorFormValues } from "./connectorFormSchema";

export default function ConnectorsLayout() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [connectors, setConnectors] = useState<DataConnector[]>([]);
  const [isCreateConnectorModalOpen, setIsCreateConnectorModalOpen] = useState(false);

  // Fetch connectors dynamically on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/resource/connectors");
        if (response.ok) {
          const data = await response.json();
          setConnectors(data.resources);
        } else {
          console.error("Error fetching connectors:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching connectors:", error);
      }
    }
    fetchData();
  }, []);


  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleOpenCreateConnectorModal = () => setIsCreateConnectorModalOpen(true);
  const handleCloseCreateConnectorModal = () => setIsCreateConnectorModalOpen(false);

  const ConnectorCard: React.FC<{ connector: DataConnector }> = ({ connector }) => (
    <div
      className="bg-white rounded-lg shadow-md px-6 py-8 cursor-pointer hover:shadow-lg hover:bg-gray-100 w-full max-w-[300px]"
      onClick={() => handleItemClick({ type: 'connector', data: connector })}
    >
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

  const ConnectorDetails = ({ connector }: { connector: DataConnector }) => {
    // Map connectionType to form type
    const typeMapping: Record<string, string> = {
      "API": "api_key",
      "Social Media": "social_media",
      "Email Marketing": "email_marketing",
      "HTTP": "http",
    };
  
    const formType = typeMapping[connector.connectionType] || "http"; // Default to 'http' if not mapped
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{connector.name} Connector</h2>
        <ConnectorForm
          initialMetadata={{
            type: formType as ConnectorFormValues["type"],
            name: connector.name,
            email: connector.metadata.email || "",
            api_key: connector.metadata.api_key || "",
            username: connector.metadata.username || "",
            password: connector.metadata.password || "",
            whitelist: connector.metadata.whitelist
              ? connector.metadata.whitelist.map((url: string) => ({ url }))
              : [{ url: "https://dummyurl1.com" }, { url: "https://dummyurl2.com" }], // Pre-populated dummy URLs
          }}
          onSubmit={(data: ConnectorFormValues) => {
            console.log("Connector Submitted:", data);
          }}
          isUpdate={true}
        />
      </div>
    );
  };
  
  const DefaultContent = ({ connectors }: { connectors: DataConnector[] }) => (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Discover Connectors</h2>
        <p className="text-muted-foreground mb-6">
          Connect your favorite tools and platforms to streamline your workflow.
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        {connectors.map((connector) => (
          <ConnectorCard key={connector.id} connector={connector} />
        ))}
      </div>
    </>
  );

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className="w-1/4 bg-gray-100 h-screen p-6 sticky top-0">
        <h2 className="text-xl font-bold tracking-tight mb-6">My Integrations</h2>
        <SidebarNav onItemClick={handleItemClick} />
        <Button
          onClick={handleOpenCreateConnectorModal}
          className="mt-6"
        >
          + Add Connector
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-8 overflow-auto">
        {selectedItem ? (
          selectedItem.type === 'connector' ? (
            // Render Connector Details
            <ConnectorDetails connector={selectedItem.data} />
          ) : selectedItem.type === 'topics' ? (
            // Render Topics Page
            <TopicsPage />
          ) : null
        ) : (
          // Default Content
          <DefaultContent connectors={connectors} />
        )}
      </div>
    </div>
  );
}
