// lib/clerk.d.ts

import '@clerk/clerk-sdk-node';

declare module '@clerk/clerk-sdk-node' {
  interface User {
    organizationMemberships?: Array<{
      organization: {
        id: string;
        name?: string;
        // Add other organization properties if needed
      };
      // Add other membership properties if needed
    }>;
  }
}
