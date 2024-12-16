// app/utils/validateUrl.ts

export const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  