// /app/(dashboard)/(routes)/strategy/components/businessModelSection.tsx

import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Tag from "@/app/(dashboard)/(routes)/strategy/components/tag";
import { createCard, deleteCard } from "@/app/actions/getBusinessModelByUserId";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SectionProps {
  sectionName: string;
  sectionTitle: string;
  icon?: React.ReactNode;
  cards: any[]; // The list of cards passed from the BusinessPlan component
}

const Section: React.FC<SectionProps> = ({ sectionName, sectionTitle, icon, cards }) => {
  const handleDeleteCard = async (cardId: string) => {
    await deleteCard(cardId);
    // Implement state update or re-fetch logic here
  };

  const handleAddCard = async () => {
    const newCard = {
      id: `new_${Date.now()}`,
      name: "New Card",
      description: "New card description",
      // Add other necessary fields
    };
    await createCard(sectionName, newCard);
    // Implement state update or re-fetch logic here
  };

  return (
    <div className="relative group bg-gray-800 rounded-xl overflow-hidden p-6 shadow-lg">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center mb-4">
          {icon && <div className="text-primary text-3xl mr-4">{icon}</div>}
          <h2 className={`text-2xl font-semibold text-white ${montserrat.className}`}>
            {sectionTitle}
          </h2>
        </div>

        {/* Tags and Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          {cards.length > 0 ? (
            cards.map((card) => (
              <Tag
                key={card.id}
                label={card.name || "Untitled"}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))
          ) : (
            <p className="text-gray-400">No items available in this section</p>
          )}

          {/* Add Card Button */}
          <button
            className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark shadow-md transition-all duration-200 hover:scale-105"
            onClick={handleAddCard}
            aria-label={`Add card to ${sectionTitle}`}
          >
            <AiOutlinePlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section;
