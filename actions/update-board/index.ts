"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { UpdateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { title, id } = data;
  
  if (demoData.id !== id) {
    return {
      error: "Board not found",
    };
  }

  demoData.title = title;

  try {
    await CreateAuditLog({
      entityTitle: demoData.title,
      entityId: demoData.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: demoData };
};

export const updateBoard = Handler;
