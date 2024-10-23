import { register } from 'ts-node';
import path from 'path';

// Register ts-node with ESM support
register({
  transpileOnly: true,
  esm: true,
  compilerOptions: {
    module: 'esnext',
  },
});

// Dynamically import the test script
import(path.resolve('lib/testPolicyEvaluation.ts')).catch(console.error);
