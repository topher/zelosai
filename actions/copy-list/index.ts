"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { v4 as uuidv4 } from 'uuid';
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { id, boardId } = data;
  let list;

  try {
    const listToCopy = demoData.lists.find(list => list.id === id);

    if (!listToCopy) {
      return { error: "List not found" };
    }

    const newListId = uuidv4();
    const newList = {
      ...listToCopy,
      id: newListId,
      title: `${listToCopy.title} - Copy`,
      order: demoData.lists.length + 1,
      cards: listToCopy.cards.map(card => ({
        ...card,
        id: `card-${Date.now()}-${uuidv4()}`,
        title: `${card.title} - Copy`,
      })),
    };

    demoData.lists.push(newList);

    await CreateAuditLog({
      entityTitle: newList.title,
      entityId: newList.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to copy."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = Handler;
