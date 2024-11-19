// /lib/subjectIdGenerator.ts

import { ResourceType } from "@/config/resourceTypes";

export function generateSubjectId(resourceType: ResourceType, resourceId: string): string {
    return `zelos.ai/knowledge/${resourceType}/${resourceId}`;
  }