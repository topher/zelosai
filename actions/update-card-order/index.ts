"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { Card } from "@/app/types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { items, boardId } = data;
  let updatedCards: Card[] = [];

  try {
    items.forEach(({ id, order, listId, title }) => {
      const list = demoData.lists.find((list) => list.id === listId);
      if (list) {
        const card = list.cards.find((card) => card.id === id);
        if (card) {
          card.order = order;
          card.title = title;
        } else {
          const newCard: Card = {
            id,
            title,
            description: '', // Provide a default or required description
            order,
            listId,
            // createdAt: new Date().toISOString(), // Assuming these fields are required
            // updatedAt: new Date().toISOString(),
          };
          list.cards.push(newCard);
          updatedCards.push(newCard);
        }
      }
    });

    // Ensure that all required fields are included in updatedCards
    updatedCards = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: '', // Provide a default or required description
      order: item.order,
      listId: item.listId,
      createdAt: new Date().toISOString(), // Assuming you want to update the timestamp
      updatedAt: new Date().toISOString(),
    }));
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = Handler;
