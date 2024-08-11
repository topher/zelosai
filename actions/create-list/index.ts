"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { title, boardId } = data;

  if (demoData.id !== boardId) {
    return { error: "Board not found" };
  }

  const newOrder = demoData.lists.length + 1;

  const cards: any[] = []

  let list = {
    id: `list-${Date.now()}`,
    title,
    boardId,
    order: newOrder,
    cards
  };

  try {
    demoData.lists.push(list);

    await CreateAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = Handler;
