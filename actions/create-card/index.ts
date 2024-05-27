"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { title, description, boardId, listId } = data;
  let card;

  try {
    const list = demoData.lists.find(list => list.id === listId);

    if (!list) {
      return { error: "List not found" };
    }

    const newOrder = list.cards.length + 1;

    card = {
      id: `card-${Date.now()}`,
      title,
      description,
      order: newOrder,
      listId,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    list.cards.push(card);

    await CreateAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = Handler;
