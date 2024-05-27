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
    // items.forEach(({ id, order, listId, title, createdAt, updatedAt }) => {
    items.forEach(({ id, order, listId, title }) => {
      const list = demoData.lists.find(list => list.id === listId);
      if (list) {
        const card = list.cards.find(card => card.id === id);
        if (card) {
          card.order = order;
          card.title = title;
          // card.createdAt = createdAt;
          // card.updatedAt = updatedAt;
        } else {
          const newCard: Card = {
            id,
            title,
            description: '', // Provide a default or required description
            order,
            listId,
            // createdAt,
            // updatedAt,
          };
          list.cards.push(newCard);
          updatedCards.push(newCard);
        }
      }
    });

    updatedCards = items.map(item => ({
      ...item,
      description: '' // Ensure description is included
    }));
  } catch (error) {
    return {
      error: "Failed to reorder."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = Handler;
