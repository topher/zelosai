import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Tag from "@/app/(dashboard)/(routes)/strategy/components/tag";
import { createCard, deleteCard } from "@/app/actions/getBusinessModelByUserId";

interface SectionProps {
  sectionName: string;
  sectionTitle: string;
  icon?: React.ReactNode;
  cards: any[]; // The list of cards passed from the BusinessPlan component
}

const Section: React.FC<SectionProps> = ({ sectionName, sectionTitle, icon, cards }) => {
  const handleDeleteCard = async (cardId: string) => {
    await deleteCard(cardId);
    // Trigger a re-fetch or update the local state to reflect the deleted card
  };

  const handleAddCard = async () => {
    const newCard = {
      id: `new_${Date.now()}`,
      name: "New Card",
      description: "New card description",
    };
    await createCard(sectionName, newCard);
    // Trigger a re-fetch or update the local state to reflect the new card
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {icon && <div className="mr-2">{icon}</div>}
        <h2 className="text-xl font-semibold text-[#111827]">{sectionTitle}</h2>
      </div>

      <div className="flex flex-wrap items-center">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Tag
              key={card.id}
              label={card.name || "Untitled"}
              onDelete={() => handleDeleteCard(card.id)}
            />
          ))
        ) : (
          <p>No items available in this section</p>
        )}

        {/* Add Card Button */}
        <button
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none ml-2 mb-2 shadow-sm"
          onClick={handleAddCard}
        >
          <AiOutlinePlus className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Section;
