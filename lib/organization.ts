// lib/organization.ts

import { clerkClient } from '@clerk/nextjs/server';

/**
 * Updates the organization data in Clerk.
 * @param organizationId - The ID of the organization.
 * @param data - The data to update.
 */
export async function updateOrganization(organizationId: string, data: any): Promise<void> {
  await clerkClient.organizations.updateOrganization(organizationId, {
    name: data.name,
    // Update other fields as needed
  });
}
