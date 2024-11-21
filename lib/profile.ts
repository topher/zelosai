// /lib/profile.ts

import { Profile } from '@/app/types';
import { createResource } from '@/lib/resource'; // Existing function to create resources

export async function createProfile(profile: Profile): Promise<Profile> {
  // Assign the linkedResources as needed, for example, linking to triples
  profile.linkedResources = profile.linkedResources || {};

  // Create the profile using your existing data fetching utility
  const createdProfile = await createResource('profiles', profile, profile.id);

  return createdProfile;
}
