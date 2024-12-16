// types/clerk.d.ts

import '@clerk/types';

declare module '@clerk/types' {
  // Define the Membership interface
  export interface Membership {
    userId: string;
    role: string;
    // Add other properties if needed
  }

  // Extend OrganizationResource to include memberships and privateMetadata
  export interface OrganizationResource {
    privateMetadata?: Record<string, any>;
    memberships?: Membership[];
  }

  // Extend Organization class (if applicable)
  export interface Organization {
    privateMetadata?: Record<string, any>;
    memberships?: Membership[];
  }
}
