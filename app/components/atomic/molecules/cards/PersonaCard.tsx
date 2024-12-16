// /app/components/atomic/molecules/cards/PersonaCard.tsx

"use client";

import React, { useState } from "react";
import { Persona } from "@/app/types";
import { Badge } from "@/components/ui/badge";

interface PersonaCardProps {
  persona: Persona;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden bg-gray-800 p-6 transition-transform duration-300 transform ${
        isHovered ? "scale-105 shadow-xl" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">{persona.Name}</h3>
          <p className="text-white text-sm">{persona.Description}</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="default">{persona.Type}</Badge>
          <Badge variant="secondary">{persona.visibility}</Badge>
        </div>

        {/* Associated Use Cases */}
        <div className="mt-4">
          <p className="text-sm text-white mb-2">Associated Use Cases:</p>
          <ul className="list-disc list-inside text-white text-sm">
            {persona.AssociatedUseCases.map((useCase, idx) => (
              <li key={idx}>{useCase}</li>
            ))}
          </ul>
        </div>

        {/* Image */}
        {persona.image && (
          <div className="mt-4">
            <img
              src={persona.image}
              alt={`${persona.Name}'s image`}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaCard;
