// runTest.cjs
require('ts-node').register({
    esm: true,  // Ensure esm support is enabled
  });
  
  // Use dynamic import to load the TypeScript file
  import('./lib/testPolicyEvaluation.ts').catch(console.error);
  