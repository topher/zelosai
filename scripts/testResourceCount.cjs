// scripts/testResourceCount.ts

import { getResourceCount } from '../lib/resource';

(async () => {
  try {
    const count = await getResourceCount('test_resource', '', 'test_user');
    console.log(`Test Resource Count: ${count}`);
  } catch (error) {
    console.error('Error testing getResourceCount:', error);
  }
})();
