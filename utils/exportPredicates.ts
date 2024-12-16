// scripts/exportPredicates.ts

import { predicates } from '../config/predicates';
import * as fs from 'fs';

const exportPredicates = () => {
  const predicateArray = Object.values(predicates).map(predicate => {
    return predicate; // No need to modify the predicate
  });

  fs.writeFileSync('predicate_types.json', JSON.stringify(predicateArray, null, 2));
};

exportPredicates();
