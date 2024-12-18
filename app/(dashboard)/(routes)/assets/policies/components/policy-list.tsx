// app/(dashboard)/(routes)/rules/components/policy-list.tsx

'use client';

import React from 'react';
import { Policy, ConditionGroup, Condition } from '@/app/types';

interface PolicyListProps {
  policies: Policy[];
}

const ConditionDisplay: React.FC<{ condition: Condition | ConditionGroup }> = ({ condition }) => {
  if (!condition) {
    return null; // Safeguard against undefined conditions
  }

  if (condition.type === 'group') {
    return (
      <div className="ml-4">
        <strong>{condition.operator}</strong>
        <ul>
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

const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  if (policies.length === 0) {
    return <p className="text-gray-600 px-6">No policies found.</p>;
  }

  return (
    <div className="space-y-6">
      {policies.map((policy) => (
        <div key={policy.id} className="border p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{policy.description}</h2>
          {policy.rules.map((rule) => (
            <div key={rule.id} className="mb-4">
              <h3 className="text-xl font-medium">{rule.predicate.toUpperCase()}</h3>
              <p><strong>Duty:</strong> {rule.deontologicalDuty}</p>
              <div>
                <strong>Subject Conditions:</strong>
                <ConditionDisplay condition={rule.subjectCondition} />
              </div>
              <div>
                <strong>Object Conditions:</strong>
                <ConditionDisplay condition={rule.objectCondition} />
              </div>
              <p><strong>Created By:</strong> {rule.createdBy}</p>
              <p><strong>Owned By:</strong> {rule.ownedBy}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
