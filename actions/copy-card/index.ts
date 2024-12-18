"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { InputType, ReturnType } from "./types";
import { Description } from "@radix-ui/react-toast";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let card;

  try {
    const cardToCopy = demoData[0].lists.flatMap(list => list.cards).find(card => card.id === id);

    if (!cardToCopy) {
      return { error: "Card not found" };
    }

    // Iterate over each item in demoData to find the list containing the card
    const list = demoData.find(data => 
      data.lists.some(list => list.cards.some(card => card.id === id))
    )?.lists.find(list => list.cards.some(card => card.id === id));

    if (!list) {
      return { error: "List not found" };
    }

    const newOrder = Math.max(...list.cards.map(card => card.order), 0) + 1;

    card = {
      ...cardToCopy,
      id: `card-${Date.now()}`, // Generating a new unique id
      title: `${cardToCopy.title} - Copy`,
      order: newOrder,
      description: cardToCopy.description,
      listId: list.id,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    list.cards.push(card);

    await CreateAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to copy."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = Handler;
