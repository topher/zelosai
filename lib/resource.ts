// lib/resource.ts
export function getResourceTypeFromPath(path: string): string | null {
  const parts = path.split('/');
  // Ensure that the path is at least 4 segments: ['', 'api', 'resource', 'topics']
  if (parts.length >= 4 && parts[1] === 'api' && parts[2] === 'resource') {
    return parts[3]; // This is the resourceName (e.g., 'topics')
  }
  return null;
}

export function getResourceIdFromPath(path: string): string | null {
  const parts = path.split('/');
  // Check if there's an ID present
  if (parts.length >= 5 && parts[1] === 'api' && parts[2] === 'resource') {
    return parts[4]; // '123' in /api/resource/topics/123
  }
  return null; // No ID in path
}

  