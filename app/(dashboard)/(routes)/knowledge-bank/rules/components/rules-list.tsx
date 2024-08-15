import React from "react";
import { Rule } from "@/app/types";

interface RulesListProps {
  rules: Rule[];
}

const RulesList: React.FC<RulesListProps> = ({ rules }) => {
  return (
    <div>
      {rules.map((rule) => (
        <div key={rule.id} className="p-4 border rounded mb-2">
          <p><strong>Duty:</strong> {rule.deontologicalDuty}</p>
          <p><strong>Subject:</strong> {rule.subjectCondition.attribute} {rule.subjectCondition.operator} {rule.subjectCondition.value}</p>
          <p><strong>Predicate:</strong> {rule.predicate}</p>
          <p><strong>Object:</strong> {rule.objectCondition.attribute} {rule.objectCondition.operator} {rule.objectCondition.value}</p>
          <p><strong>Created By:</strong> {rule.createdBy}</p>
          <p><strong>Owned By:</strong> {rule.ownedBy}</p>
        </div>
      ))}
    </div>
  );
};

export default RulesList;
