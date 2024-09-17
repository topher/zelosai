import React from 'react';
import { Rule } from '@/app/types';

interface RulesListProps {
  rules: Rule[];
}

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
            <p>
              <strong>Subject:</strong>{' '}
              {`${rule.subjectCondition.attribute} ${rule.subjectCondition.operator} ${rule.subjectCondition.value}`}
            </p>
            <p>
              <strong>Object:</strong>{' '}
              {`${rule.objectCondition.attribute} ${rule.objectCondition.operator} ${rule.objectCondition.value}`}
            </p>
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
