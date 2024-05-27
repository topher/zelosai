"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { List } from "@/app/types";
import { createSafeAction } from "@/lib/create-safe-action";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { items, boardId } = data;
  let updatedLists: List[] = [];

  try {
    items.forEach((list) => {
      const boardList = demoData.lists.find(l => l.id === list.id && demoData.id === boardId);
      if (boardList) {
        boardList.order = list.order;
        updatedLists.push(boardList);
      }
    });
  } catch (error) {
    return {
      error: "Failed to reorder."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedLists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, Handler);
