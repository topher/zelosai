"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE, List } from "@/app/types"; // Ensure List is imported
import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { boardId, id } = data;
  let list: List;

  try {
    const board = demoData;
    list = board.lists.find(list => list.id === id) as List;
    if (!list) {
      return { error: "List not found" };
    }

    list.title = `A list with ${list.id}`;
    list.boardId = boardId; // Ensure boardId is included

    await CreateAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return { error: "Failed to update." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = Handler;
