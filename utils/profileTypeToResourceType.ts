// /utils/profileTypeToResourceType.ts

import { ResourceType } from "@/config/resourceTypes";

export const profileTypeToResourceType = (profileType: string): ResourceType | null => {
  switch (profileType.toLowerCase()) {
    case "user":
      return ResourceType.ProfileUser;
    case "athlete":
      return ResourceType.ProfileAthlete;
    case "brand":
      return ResourceType.ProfileBrand;
    default:
      return null;
  }
};