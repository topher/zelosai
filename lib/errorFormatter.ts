// utils/errorFormatter.ts

interface ErrorResponse {
    error: {
      code: string;
      message: string;
    };
  }
  
  export function formatError(code: string, message: string): ErrorResponse {
    return {
      error: {
        code,
        message,
      },
    };
  }
  