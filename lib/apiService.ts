// services/apiService.ts

export const apiService = {
    createResource: async (resourceType: string, data: any) => {
      const response = await fetch(`/api/resource/${resourceType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create resource');
      return response.json();
    },
    updateResource: async (resourceType: string, resourceId: string, data: any) => {
      const response = await fetch(`/api/resource/${resourceType}/${resourceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update resource');
      return response.json();
    },
    deleteResource: async (resourceType: string, resourceId: string) => {
      const response = await fetch(`/api/resource/${resourceType}/${resourceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete resource');
      return response.json();
    },
  };
  