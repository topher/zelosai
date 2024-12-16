import { evaluateAccess } from './policyEvaluation.js';

(async () => {
  // Test 'read' action (should be granted)
  const readAccess = await evaluateAccess({
    userId: 'user-123',
    action: 'read',
    resourceId: 'contract-456',
  });

  console.log(`Read Access: ${readAccess ? 'granted' : 'denied'}`); // Expected: granted

  // Test 'update' action (should be granted)
  const updateAccess = await evaluateAccess({
    userId: 'user-123',
    action: 'update',
    resourceId: 'contract-456',
  });

  console.log(`Update Access: ${updateAccess ? 'granted' : 'denied'}`); // Expected: granted

  // Test 'delete' action (should be denied)
  const deleteAccess = await evaluateAccess({
    userId: 'user-123',
    action: 'delete',
    resourceId: 'contract-456',
  });

  console.log(`Delete Access: ${deleteAccess ? 'granted' : 'denied'}`); // Expected: denied
})();
