// /app/(dashboard)/(routes)/workflows/agents/page.tsx

"use client";

import { useEffect, useState } from "react";
import CardGridLayout from "@/app/components/atomic/templates/CardGridLayout";
import { Agent } from "@/app/types";
import { createAgent, deleteAgent } from "@/app/actions/agentsActions";
import AgentCard from "@/app/components/atomic/molecules/cards/AgentCard";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const AgentsPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch agents on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/resource/agents");
        if (response.ok) {
          const data = await response.json();
          setAgents(data.resources);
        } else {
          setError("Failed to fetch agents.");
          console.error("Error fetching agents:", response.statusText);
        }
      } catch (error) {
        setError("An unexpected error occurred.");
        console.error("Error fetching agents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle creating a new agent
  const handleCreateAgent = async (newAgentData: Agent) => {
    try {
      const createdAgent = await createAgent(newAgentData);
      setAgents([...agents, createdAgent]);
    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  // Handle deleting an agent
  const handleDeleteAgent = async (agentId: string) => {
    try {
      await deleteAgent(agentId);
      setAgents(agents.filter((agent) => agent.id !== agentId));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  return (
    <CardGridLayout
      header={{
        title: "Agents",
        description: "Manage your agents efficiently.",
        actions: (
          <Button
            onClick={() => {
              console.log("Open create agent modal");
              // Implement modal opening logic here
            }}
          >
            <PlusCircledIcon className="mr-2 h-5 w-5" />
            <span>Create New Agent</span>
          </Button>
        ),
      }}
      isLoading={isLoading}
      error={error}
      items={agents}
      renderItem={(agent) => (
        <AgentCard key={agent.id} agent={agent} onDelete={handleDeleteAgent} />
      )}
    />
  );
};

export default AgentsPage;
