// components/LinkedResourcesList.tsx

import React from 'react';
import { Resource } from '@/app/types';
import { useRouter } from 'next/router';

interface LinkedResourcesListProps {
  resource: Resource;
}

const LinkedResourcesList: React.FC<LinkedResourcesListProps> = ({ resource }) => {
  const router = useRouter();

  const handleResourceClick = (resourceType: string, resourceId: string) => {
    router.push(`/${resourceType}/${resourceId}`);
  };

  return (
    <div>
      <h4>Related Resources:</h4>
      {resource.linkedResources &&
        Object.entries(resource.linkedResources).map(
          ([resourceType, ids]) => (
            <div key={resourceType}>
              <h5>{resourceType}</h5>
              <ul>
                {ids.map((id) => (
                  <li key={id}>
                    <a onClick={() => handleResourceClick(resourceType, id)}>
                      {id}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
    </div>
  );
};

export default LinkedResourcesList;
