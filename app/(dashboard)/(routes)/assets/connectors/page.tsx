// /app/(dashboard)/(routes)/assets/connectors/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ConnectorForm } from "./connector-form";
import { DataConnector } from "@/app/types";
import { ConnectorFormValues } from "./connectorFormSchema";
import CardGridLayout from "@/app/components/atomic/templates/CardGridLayout";
import ConnectorCard from "@/app/components/atomic/molecules/cards/ConnectorCard";

export default function ConnectorsLayout() {
  const [selectedConnector, setSelectedConnector] = useState<DataConnector | null>(null);
  const [connectors, setConnectors] = useState<DataConnector[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
          setError("Failed to load connectors.");
        }
      } catch (error) {
        console.error("Error fetching connectors:", error);
        setError("Failed to load connectors.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleConnectorCardClick = (connector: DataConnector) => {
    setSelectedConnector(connector);
  };

  const handleOpenCreateConnectorModal = () => setIsCreateConnectorModalOpen(true);
  const handleCloseCreateConnectorModal = () => setIsCreateConnectorModalOpen(false);

  const ConnectorDetails = ({ connector }: { connector: DataConnector }) => {
    // Map connectionType to form type
    const typeMapping: Record<string, string> = {
      API: "api_key",
      "Social Media": "social_media",
      "Email Marketing": "email_marketing",
      HTTP: "http",
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
              : [
                  { url: "https://dummyurl1.com" },
                  { url: "https://dummyurl2.com" },
                ], // Pre-populated dummy URLs
          }}
          onSubmit={(data: ConnectorFormValues) => {
            console.log("Connector Submitted:", data);
          }}
          isUpdate={true}
        />
      </div>
    );
  };

  return (
    <div>
      {selectedConnector ? (
        // Render Connector Details
        <ConnectorDetails connector={selectedConnector} />
      ) : (
        // Use CardGridLayout for Default Content
        <CardGridLayout<DataConnector>
          header={{
            title: "Discover Connectors",
            description:
              "Connect your favorite tools and platforms to streamline your workflow.",
            actions: (
              <Button onClick={handleOpenCreateConnectorModal}>
                + Add Connector
              </Button>
            ),
          }}
          isLoading={isLoading}
          error={error}
          items={connectors}
          renderItem={(connector) => (
            <ConnectorCard
              key={connector.id}
              connector={connector}
              onClick={handleConnectorCardClick}
            />
          )}
        />
      )}
    </div>
  );
}
