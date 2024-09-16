import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Import the Plus icon
import Tag from "@/app/(dashboard)/(routes)/strategy/components/tag"; // Import the Tag component
import { getCardsBySection, createCard, deleteCard } from "@/app/actions/getBusinessModelByUserId";

interface SectionProps {
  sectionName: string;
  sectionTitle: string;
}

const Section: React.FC<SectionProps> = ({ sectionName, sectionTitle }) => {
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
    const newCard = { id: `new_${Date.now()}`, name: "New Card", description: "New card description" };
    await createCard(sectionName, newCard);
    setCards([...cards, newCard]);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#111827]">{sectionTitle}</h2>

      {/* Display cards as tags */}
      <div className="flex flex-wrap items-center">
        {!loading && !error && cards.length > 0 ? (
          cards.map((card) => (
            <Tag
              key={card.id}
              label={card.name || "Untitled"}
              onDelete={() => handleDeleteCard(card.id)}
            />
          ))
        ) : (
          <p>No cards available in this section</p>
        )}

        {/* Add Card Button (Circular Green Plus Icon) */}
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
