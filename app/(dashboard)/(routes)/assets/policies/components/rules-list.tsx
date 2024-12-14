// app/(dashboard)/(routes)/assets/rules/components/rules-list.tsx

'use client';

import React from 'react';
import { Rule, Condition, ConditionGroup } from '@/app/types';

interface RulesListProps {
  rules: Rule[];
}

// Recursive component to display conditions
const ConditionDisplay: React.FC<{ condition: Condition | ConditionGroup }> = ({ condition }) => {
  if ('operator' in condition && 'conditions' in condition) {
    return (
      <div className="ml-4">
        <strong className="text-gray-300">{condition.operator}</strong>
        <ul className="list-disc list-inside mt-2">
          {condition.conditions.map((cond, idx) => (
            <li key={idx}>
              <ConditionDisplay condition={cond} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <span className="text-gray-200">
        {`${condition.attribute} ${condition.operator} ${condition.value}`}
      </span>
    );
  }
};

const RulesList: React.FC<RulesListProps> = ({ rules }) => {
  if (rules.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        No rules found in this category.
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md shadow-lg">
      <ul className="divide-y divide-white/20">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className="p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-white truncate">
                {rule.predicate}
              </h3>
              <span className="text-xs text-gray-400">
                Created by: {rule.createdBy}
              </span>
            </div>
            <div className="text-gray-200 space-y-2">
              <p>
                <strong className="text-gray-300">Duty:</strong> {rule.deontologicalDuty}
              </p>
              <div>
                <strong className="text-gray-300">Subject Conditions:</strong>
                <ConditionDisplay condition={rule.subjectCondition} />
              </div>
              <div>
                <strong className="text-gray-300">Object Conditions:</strong>
                <ConditionDisplay condition={rule.objectCondition} />
              </div>
              <p>
                <strong className="text-gray-300">Owned By:</strong> {rule.ownedBy}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RulesList;
