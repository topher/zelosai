// utils/errorFormatter.ts

import { ErrorResponse } from "@/app/types";

  export function formatError(code: string, message: string): ErrorResponse {
    return {
      error: {
        code,
        message,
      },
    };
  }
  