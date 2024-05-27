import { z } from "zod";
import { Board } from "@/app/types";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;
