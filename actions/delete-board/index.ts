"use server";

import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

  if (demoData.id !== id) {
    return { error: "Board not found" };
  }

  const deletedBoard = { ...demoData }; // Copy existing data

  try {
    // Reset demoData to indicate deletion
    demoData.id = '';
    demoData.title = '';
    demoData.lists = [];

    await CreateAuditLog({
      entityTitle: deletedBoard.title,
      entityId: deletedBoard.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  return { data: deletedBoard };
};

export const deleteBoard = Handler;
