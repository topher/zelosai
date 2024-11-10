// lib/policyEvaluation.ts

import type { Policy, Rule, Subscription, Condition, ConditionGroup } from 'app/types';
import { getResourceNameByResourceType } from './featureUtils';

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
    const resourceName = getResourceNameByResourceType(resourceType)
    resourceAttributes = await getResourceAttributes(resourceId, resourceName);
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

      const subjectMatches = evaluateConditionGroup(rule.subjectCondition, { ...userAttributes, ...environmentAttributes }, resourceAttributes);
      const objectMatches = evaluateConditionGroup(rule.objectCondition, { ...userAttributes, ...environmentAttributes }, resourceAttributes);
      console.log(`Rulezzzz: ${subjectMatches} ${objectMatches}}`);
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

  console.log("🔥 Evaluating Condition:", condition);

  // Replace dynamic values (like $orgId or $accountId)
  if (typeof value === 'string' && value.startsWith('$')) {
    const refAttribute = value.substring(1); // Remove '$'
    value = userAttributes[refAttribute] ?? resourceAttributes[refAttribute];
  } else if (Array.isArray(value)) {
    value = value.map((v) => {
      if (typeof v === 'string' && v.startsWith('$')) {
        const refAttribute = v.substring(1);
        return userAttributes[refAttribute] ?? resourceAttributes[refAttribute];
      }
      return v;
    });
  }

  const attributeValue = userAttributes[attribute] ?? resourceAttributes[attribute];
  console.log(`Attribute: ${attribute}, Attribute Value: ${attributeValue}, Value: ${JSON.stringify(value)}`);

  switch (operator) {
    case 'in':
      return Array.isArray(value) && value.includes(attributeValue);
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


// lib/policyEvaluation.ts

export async function getResourceAttributes(
  resourceId: string,
  resourceName: string // Changed from resourceType to resourceName
): Promise<Record<string, any> | null> {
  try {
    const endpoint = `http://localhost:9200/${resourceName.toLowerCase()}/_doc/${resourceId}`;
    console.log("😜", endpoint);
    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error(`Failed to fetch resource: ${resourceName} with ID: ${resourceId}`);
      return null;
    }

    const data = await response.json();
    return {
      resourceName, // Changed from resourceType to resourceName
      ...data._source,
    };
  } catch (error) {
    console.error(`Error fetching resource attributes: ResourceName=${resourceName}, ID=${resourceId}`, error);
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
              match: { organizationId: "*" }, // Ensure 'organizationId' matches your mapping
            },
            {
              match: { organizationId: orgId }, // Ensure 'organizationId' matches your mapping
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

// Function to fetch environment attributes (if needed)
function getEnvironmentAttributes(): Record<string, any> {
  return {
    timeOfAccess: new Date().toISOString(),
    // Add other environment attributes as needed
  };
}
