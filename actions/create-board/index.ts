"use server";

import { revalidatePath } from "next/cache";
import { demoData } from "@/app/data";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/app/types";
import { InputType, ReturnType } from "./types";

const Handler = async (data: InputType): Promise<ReturnType> => {
  const { title, image } = data;

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  ] = image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board."
    };
  }

  const lists: any[] = []

  let board = {
    id: `board-${Date.now()}`,
    title,
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML,
    lists
  };

  try {
    demoData.id = board.id;
    demoData.title = board.title;
    // demoData.imageId = board.imageId;
    // demoData.imageThumbUrl = board.imageThumbUrl;
    // demoData.imageFullUrl = board.imageFullUrl;
    // demoData.imageUserName = board.imageUserName;
    // demoData.imageLinkHTML = board.imageLinkHTML;
    demoData.lists = board.lists;

    await CreateAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = Handler;
