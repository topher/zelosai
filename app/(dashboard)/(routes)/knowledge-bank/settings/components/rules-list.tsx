import React from "react";

import { Rule } from "@/app/types";

interface RulesListProps {
  rules: Rule[];
}

const RulesList: React.FC<RulesListProps> = ({ rules }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Attribute</th>
            <th>Operator</th>
            <th>Value</th>
            <th>Duty</th>
            <th>Action</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule: Rule) => (
            <tr key={rule.id}> {/* Assuming rules have a unique ID */}
              <td>{rule.subject}</td>
              <td>{rule.attribute}</td>
              <td>{rule.operator}</td>
              <td>{rule.value}</td>
              <td>{rule.duty}</td>
              <td>{rule.action}</td>
              <td>{rule.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RulesList;
