"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { UpdateCard } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId, ...values } = data;

  if (demoData.id !== boardId) {
    return { error: "Board not found" };
  }

  const list = demoData.lists.find(list => list.cards.some(card => card.id === id));
  if (!list) {
    return { error: "Card not found" };
  }

  const card = list.cards.find(card => card.id === id);
  if (!card) {
    return { error: "Card not found" };
  }

  Object.assign(card, values);

  try {
    await CreateAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = Handler;
