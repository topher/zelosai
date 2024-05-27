import { z } from "zod";

export const CopyCard = z.object({
  id: z.string(),
  boardId: z.string(),
  description: z.string(),
  order: z.string(),
  listId: z.string(),
  // createdAt: Date,
  // updatedAt: Date,
});
