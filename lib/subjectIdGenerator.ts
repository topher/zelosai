// /lib/subjectIdGenerator.ts

import { ResourceType } from "@/config/resourceTypes";

export function generateSubjectId(resourceType: string, resourceId: string): string {
    return `http://zelos.ai/knowledge/${resourceType}/${resourceId}`;
  }