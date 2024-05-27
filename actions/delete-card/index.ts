"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let card;

  try {
    const list = demoData.lists.find(list => list.cards.some(card => card.id === id));
    if (!list) {
      return { error: "Card not found" };
    }

    card = list.cards.find(card => card.id === id);
    if (!card) {
      return { error: "Card not found" };
    }
    
    list.cards = list.cards.filter(card => card.id !== id);

    await CreateAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = Handler;
