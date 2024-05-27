"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { title, id, boardId } = data;

  if (demoData.id !== boardId) {
    return { error: "Board not found" };
  }

  const list = demoData.lists.find(list => list.id === id);
  if (!list) {
    return { error: "List not found" };
  }

  list.title = title;

  try {
    await CreateAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = Handler;
