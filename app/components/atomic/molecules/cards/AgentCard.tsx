// /app/components/atomic/molecules/cards/AgentCard.tsx

import React from "react";
import { Agent } from "@/app/types";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  agent: Agent;
  onDelete: (agentId: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onDelete }) => {
  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-800 p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-white text-xl font-semibold mb-2">{agent.Name}</h3>
        <p className="text-white text-sm mb-4">{agent.Description}</p>
        <img
          src={agent.Image}
          alt={agent.Name}
          className="w-full h-auto rounded-md mb-4"
        />
        <p className="text-sm text-white">
          <strong>Type:</strong> {agent.Type}
        </p>
        <p className="mt-2 text-sm font-semibold text-white">
          Associated Use Cases:
        </p>
        <ul className="list-disc ml-4 text-sm text-white mb-4">
          {agent.expertiseAreas.map((area, idx) => (
            <li key={idx}>{area}</li>
          ))}
        </ul>
        <div className="flex justify-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(agent.id)}
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white transform hover:-translate-y-0.5 hover:scale-105"
          >
            Delete Agent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
