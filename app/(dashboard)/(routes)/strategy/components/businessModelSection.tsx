// Section.tsx
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Tag from "@/app/(dashboard)/(routes)/strategy/components/tag";
import { getCardsBySection, createCard, deleteCard } from "@/app/actions/getBusinessModelByUserId";

interface SectionProps {
  sectionName: string;
  sectionTitle: string;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ sectionName, sectionTitle, icon }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await getCardsBySection(sectionName);
        setCards(cardsData);
      } catch (error) {
        setError(`Failed to load ${sectionTitle}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [sectionName]);

  const handleDeleteCard = async (cardId: string) => {
    await deleteCard(cardId);
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleAddCard = async () => {
    const newCard = {
      id: `new_${Date.now()}`,
      name: "New Card",
      description: "New card description",
    };
    await createCard(sectionName, newCard);
    setCards([...cards, newCard]);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {icon && <div className="mr-2">{icon}</div>}
        <h2 className="text-xl font-semibold text-[#111827]">{sectionTitle}</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
      )}
    </div>
  );
};

export default Section;
