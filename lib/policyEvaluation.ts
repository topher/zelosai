// policyEvaluation.ts

import type { Policy, Rule, Subscription, Condition, ConditionGroup } from 'app/types';
import { getUserAttributes } from './auth';

export async function evaluateAccess({
  userId,
  action,
  resourceId,
  resourceType,
  userAttributes,
  subscription,
}: {
  userId: string;
  action: string;
  resourceId?: string;
  resourceType: string;
  userAttributes: Record<string, any>;
  subscription: Subscription;
}): Promise<boolean> {
  console.log("Policy Evaluation - Start");
  console.log(`User ID: ${userId}`);
  console.log(`Action: ${action}`);
  console.log(`Resource ID: ${resourceId}`);
  console.log(`Resource Type: ${resourceType}`);
  console.log(`User Attributes:`, userAttributes);
  console.log(`Subscription:`, subscription);

  let resourceAttributes = {};

  if (resourceId) {
    resourceAttributes = await getResourceAttributes(resourceId, resourceType);
    if (!resourceAttributes) {
      console.error(`Resource attributes not found for resourceId: ${resourceId}, resourceType: ${resourceType}`);
      return false;
    }
  } else {
    resourceAttributes = { resourceType };
  }

  const environmentAttributes = getEnvironmentAttributes();

  // Fetch policies from Elasticsearch, filtered by active organization
  const policies = await fetchPoliciesFromElasticsearch(userAttributes.orgId);
  console.log('Policies fetched:', policies.length, 'policies');

  let isAllowed = false;
  let isProhibited = false;

  for (const policy of policies) {
    console.log(`Evaluating policy: ${policy.id}`);

    for (const rule of policy.rules) {
      if (!rule.predicate.includes(action)) continue;

      const subjectMatches = evaluateConditionGroup(
        rule.subjectCondition,
        { ...userAttributes, ...environmentAttributes },
        resourceAttributes
      );
      const objectMatches = evaluateConditionGroup(
        rule.objectCondition,
        { ...userAttributes, ...environmentAttributes },
        resourceAttributes
      );

      if (subjectMatches && objectMatches) {
        console.log(`Rule Matched: ${rule.id}`);
        if (rule.deontologicalDuty.toLowerCase() === 'prohibited') {
          isProhibited = true;
        } else if (rule.deontologicalDuty.toLowerCase() === 'allowed') {
          isAllowed = true;
        }
      }
    }
  }

  if (isProhibited) {
    console.log("Policy Evaluation - Access Denied");
    return false;
  }
  if (isAllowed) {
    console.log("Policy Evaluation - Access Granted");
    return true;
  }
  console.log("Policy Evaluation - No Matching Policy, Access Denied");
  return false;
}


function evaluateConditionGroup(
  condition: ConditionGroup | Condition,
  userAttributes: Record<string, any>,
  resourceAttributes: Record<string, any>
): boolean {
  if (!condition) return false;

  if ('conditions' in condition && Array.isArray(condition.conditions)) {
    const { operator, conditions } = condition;
    const results = conditions.map(cond => evaluateConditionGroup(cond, userAttributes, resourceAttributes));
    return operator === 'AND' ? results.every(Boolean) : results.some(Boolean);
  } else {
    return evaluateCondition(condition as Condition, userAttributes, resourceAttributes);
  }
}

export function evaluateCondition(
  condition: Condition,
  userAttributes: Record<string, any>,
  resourceAttributes: Record<string, any>
): boolean {
  let { attribute, operator, value } = condition;

  // Replace dynamic values (like $orgId or $accountId)
  if (typeof value === 'string' && value.startsWith('$')) {
    const refAttribute = value.substring(1); // Remove '$'
    value = userAttributes[refAttribute] ?? resourceAttributes[refAttribute];
  }

  const attributeValue = userAttributes[attribute] ?? resourceAttributes[attribute];

  switch (operator) {
    case 'is':
      return attributeValue === value;
    case 'is_not':
      return attributeValue !== value;
    case 'contains':
      return Array.isArray(attributeValue) && attributeValue.includes(value);
    case 'not_contains':
      return Array.isArray(attributeValue) && !attributeValue.includes(value);
    case 'exists':
      return attributeValue !== undefined && attributeValue !== null;
    case 'before':
      return new Date(attributeValue) < new Date(value);
    case 'after':
      return new Date(attributeValue) > new Date(value);
    default:
      console.warn(`Unsupported operator: ${operator}`);
      return false;
  }
}


// Function to fetch resource attributes
export async function getResourceAttributes(
  resourceId: string,
  resourceType: string
): Promise<Record<string, any> | null> {
  try {
    const response = await fetch(`http://localhost:9200/${resourceType.toLowerCase()}s/_doc/${resourceId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error(`Failed to fetch resource: ${resourceType} with ID: ${resourceId}`);
      return null;
    }

    const data = await response.json();
    return {
      resourceType,
      ...data._source,
    };
  } catch (error) {
    console.error(`Error fetching resource attributes: Type=${resourceType}, ID=${resourceId}`, error);
    return null;
  }
}

// Function to fetch policies from Elasticsearch
export async function fetchPoliciesFromElasticsearch(orgId: string): Promise<Policy[]> {
  const response = await fetch(`http://localhost:9200/policies/_search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        bool: {
          should: [
          {
            match: { organizationId: "*" }, // Updated from orgId to organizationId
          },      
          {
            match: { organizationId: orgId }, // Updated from orgId to organizationId
          }
        ]
      }
      }
    }),
  });

  if (!response.ok) {
    console.error(`Failed to fetch policies for organizationId: ${orgId}`);
    return [];
  }

  const data = await response.json();
  return data.hits?.hits?.map((hit: any) => hit._source) || [];
}




// export async function evaluateAccess({
//   userId,
//   action,
//   resourceId,
//   resourceType,
//   resourceAttributes,
//   userAttributes
// }: {
//   userId: string;
//   action: string;
//   resourceId?: string;
//   resourceType?: string;
//   resourceAttributes?: Record<string, any>;
//   userAttributes?: Record<string, any>; // Add this type
// }): Promise<boolean> {
//   // console.log("😀 Starting evaluation for:", { userId, action, resourceId, resourceType });

//   // const userAttributes = await getUserAttributes();
//   console.log("User attributes fetched:", userAttributes);

//   let finalResourceAttributes = resourceAttributes;
//   if (!resourceAttributes && resourceId && resourceType) {
//     finalResourceAttributes = await getResourceAttributes(resourceId, resourceType);
//   }

//   const environmentAttributes = getEnvironmentAttributes();
//   console.log("Final resource attributes:", finalResourceAttributes);

//   // Fetch policies from Elasticsearch
//   const policies = await fetchPoliciesFromElasticsearch();
//   // console.log("Policies fetched:", policies.length, "policies");

//   let isAllowed = false;
//   let isProhibited = false;

//   // Loop through each policy
//   for (const policy of policies) {
//     console.log(`Evaluating policy: ${policy.id} - ${policy.description}`);

//     for (const rule of policy.rules) {
//       if (rule.predicate !== action) continue;

//       console.log(`\tEvaluating rule: ${rule.id} - Predicate: ${rule.predicate}`);

//       // Check if user matches the subject conditions
//       const subjectMatches = evaluateConditionGroup(
//         rule.subjectCondition,
//         { ...userAttributes, ...environmentAttributes },
//         finalResourceAttributes
//       );

//       // Check if resource matches the object conditions
//       const objectMatches = evaluateConditionGroup(
//         rule.objectCondition,
//         { ...userAttributes, ...environmentAttributes },
//         finalResourceAttributes
//       );

//       console.log(`\t\tSubject Matches: ${subjectMatches}, Object Matches: ${objectMatches}`);

//       // If both subject and object conditions match
//       if (subjectMatches && objectMatches) {
//         if (rule.deontologicalDuty.toLowerCase() === 'prohibited') {
//           console.log(`\t\t\tAccess explicitly PROHIBITED by rule: ${rule.id}`);
//           isProhibited = true;
//         } else if (rule.deontologicalDuty.toLowerCase() === 'allowed') {
//           console.log(`\t\t\tAccess ALLOWED by rule: ${rule.id}`);
//           isAllowed = true;
//         }
//         // Continue evaluating other rules to catch any prohibitions
//       }
//     }
//   }

//   // Deny overrides allow
//   if (isProhibited) {
//     console.log("Final Decision: ACCESS DENIED (Prohibited by at least one rule)");
//     return false;
//   }

//   if (isAllowed) {
//     console.log("Final Decision: ACCESS GRANTED (Allowed by at least one rule)");
//     return true;
//   }

//   console.log("Final Decision: ACCESS DENIED (No matching allow rules)");
//   return false; // Default to deny if no matching rule is found
// }

// Function to fetch environment attributes (if needed)
function getEnvironmentAttributes(): Record<string, any> {
  return {
    timeOfAccess: new Date().toISOString(),
    // Add other environment attributes as needed
  };
}
