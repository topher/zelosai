"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createAgent, deleteAgent } from "@/app/actions/agentsActions"; // Import CRUD actions
import { Agent } from "@/app/types"; // Import the Agent type
import StrategyLayout from "@/app/components/atomic/ttemplates/StrategyLayout";

const AgentsPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [accountId] = useState("12345"); // Static accountId for now

  // Fetch agents on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/agents");
        if (response.ok) {
          const data = await response.json();
          setAgents(data.resources);
        } else {
          console.error("Error fetching agents:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };
    fetchData();
  }, []);

  // Handle creating a new agent (this could be hooked up to a form or modal)
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
      setAgents(agents.filter(agent => agent.id !== agentId));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  return (
    <StrategyLayout>
      <div className="space-y-8 p-6">
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {agents.map((agent: Agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>{agent.availabilityStatus}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={`/${agent.image}`} // Render agent photo
                    alt={agent.name}
                    className="w-full h-auto rounded-md"
                  />
                  <p className="mt-4 text-sm">{agent.agentType}</p>
                  <p className="mt-2 text-sm font-semibold">Expertise Areas:</p>
                  <ul className="list-disc ml-4">
                    {agent.expertiseAreas.map((area, idx) => (
                      <li key={idx} className="text-sm">{area}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleDeleteAgent(agent.id)}
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Chat
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </StrategyLayout>
  );
};

export default AgentsPage;
