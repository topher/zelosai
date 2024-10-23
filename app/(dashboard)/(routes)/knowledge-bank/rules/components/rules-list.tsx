// app/(dashboard)/(routes)/knowledge-bank/rules/components/rules-list.tsx

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
        <strong>{condition.operator}</strong>
        <ul className="list-disc list-inside">
          {condition.conditions.map((cond, idx) => (
            <li key={idx}>
              <ConditionDisplay condition={cond} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <span>{`${condition.attribute} ${condition.operator} ${condition.value}`}</span>;
  }
};

const RulesList: React.FC<RulesListProps> = ({ rules }) => {
  if (rules.length === 0) {
    return (
      <p className="text-gray-600">No rules found in this category.</p>
    );
  }

  return (
    <div className="space-y-6">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {rule.predicate}
            </h3>
            <span className="text-sm text-gray-500">
              Created by: {rule.createdBy}
            </span>
          </div>
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Duty:</strong> {rule.deontologicalDuty}
            </p>
            <div>
              <strong>Subject Conditions:</strong>
              <ConditionDisplay condition={rule.subjectCondition} />
            </div>
            <div>
              <strong>Object Conditions:</strong>
              <ConditionDisplay condition={rule.objectCondition} />
            </div>
            <p>
              <strong>Owned By:</strong> {rule.ownedBy}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RulesList;
