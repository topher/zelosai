// lib/accessControl.ts

import { fetchPoliciesFromElasticsearch } from './policyEvaluation';
/**
 * Function to check if a user has access to a specific action on a resource.
 * @param userAttributes - The user's attributes.
 * @param action - The action the user wants to perform (e.g., 'read', 'create', 'update', 'delete').
 * @param resourceName - The resource name (e.g., 'goals', 'models').
 * @param resourceId - The ID of the specific resource the user is trying to access.
 * @returns A boolean indicating if the user has access or not.
 */
export async function checkAccess(
  userAttributes: Record<string, any>,
  action: string,
  resourceName: string,
  resourceId: string
): Promise<boolean> {
  try {
    // Get policies related to the user's organization and the resource they are trying to access.
    const policies = await fetchPoliciesFromElasticsearch(userAttributes.orgId);
    
    // If no policies are found, deny access by default
    if (!policies || policies.length === 0) {
      console.warn(`⚠️ No policies found for organizationId: ${userAttributes.orgId}. Denying access by default.`);
      return false;
    }

    // Iterate through policies and check for matching rules
    for (const policy of policies) {
      for (const rule of policy.rules) {
        if (!rule.predicate.includes(action) && !rule.predicate.includes('*')) continue;

        // Evaluate whether the user meets the subject conditions of the rule
        const subjectMatches = evaluateCheckAccessCondition(rule.subjectCondition, userAttributes);
        if (!subjectMatches) continue;

        // Check if the resource-specific conditions match
        const objectMatches = await checkObjectConditions(rule.objectCondition, resourceName, resourceId);

        // If both subject and object conditions are satisfied, grant access
        if (subjectMatches && objectMatches) {
          return rule.deontologicalDuty.toLowerCase() === 'allowed';
        }
      }
    }

    // If no matching policies are found, deny access
    return false;
  } catch (error) {
    console.error("❌ Error during access control check:", error);
    return false;
  }
}

/**
 * Function to check resource-specific conditions (object conditions) against Elasticsearch data.
 * @param objectCondition - The conditions to check against the resource.
 * @param resourceName - The name of the resource.
 * @param resourceId - The ID of the resource.
 * @returns A boolean indicating if the object conditions are satisfied.
 */
async function checkObjectConditions(
  objectCondition: any,
  resourceName: string,
  resourceId: string
): Promise<boolean> {
  try {
    // Build a query to fetch the resource from Elasticsearch
    const query = {
      bool: {
        must: [
          { match: { _id: resourceId } },
          { match: { resourceType: resourceName } },
        ],
      },
    };

    const response = await fetch(`http://localhost:9200/${resourceName.toLowerCase()}/_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        size: 1,
      }),
    });

    const data = await response.json();
    const resource = data.hits?.hits[0]?._source || null;

    // Evaluate the object conditions against the fetched resource
    return evaluateCheckAccessCondition(objectCondition, resource);
  } catch (error) {
    console.error("❌ Error fetching resource for object condition check:", error);
    return false;
  }
}

/**
 * Helper function to evaluate a condition against a set of attributes.
 * @param condition - The condition to evaluate.
 * @param attributes - The attributes to evaluate the condition against.
 * @returns A boolean indicating if the condition is satisfied.
 */
function evaluateCheckAccessCondition(condition: any, attributes: Record<string, any>): boolean {
  // Similar logic as before (check for 'exists', 'is', 'contains', etc.)
  // This function checks if the user's attributes or the resource's data meet the condition.
  if (!condition) return true;

  if ('conditions' in condition && Array.isArray(condition.conditions)) {
    const results = condition.conditions.map((subCondition: any) =>
      evaluateCheckAccessCondition(subCondition, attributes)
    );
    return condition.operator === 'AND' ? results.every(Boolean) : results.some(Boolean);
  } else {
    const { attribute, operator, value } = condition;
    const actualValue = attributes[attribute];

    switch (operator) {
      case 'exists':
        return actualValue !== undefined;
      case 'is':
        return actualValue === value;
      case 'is_not':
        return actualValue !== value;
      case 'contains':
        return Array.isArray(actualValue) && actualValue.includes(value);
      case 'not_contains':
        return !Array.isArray(actualValue) || !actualValue.includes(value);
      default:
        return false;
    }
  }
}

export async function buildAccessControlledQuery(
  userAttributes: Record<string, any>,
  action: string,
  resourceType: string
): Promise<any> {
  // Fetch policies relevant to the action and resourceType based on organizationId
  const policies = await fetchPoliciesFromElasticsearch(userAttributes.orgId);

  // console.log("❤️ User Attributes:", userAttributes);
  console.log(`🔍 Action: ${action}, Resource Type: ${resourceType}`);

  // If no policies found, default to deny access
  if (!policies || policies.length === 0) {
    console.warn(`⚠️ No policies found for organizationId: ${userAttributes.orgId}. Denying access by default.`);
    return {
      bool: {
        must: [
          { match: { resourceType } },
          { match: { orgId: userAttributes.orgId } },
          { match: { _id: "__non_existent_document_id__" } } // This will match nothing
        ]
      }
    };
  }

  // Build Elasticsearch query conditions based on policies
  const mustConditions = [
    { match: { resourceType } },
    { match: { orgId: userAttributes.orgId } } // Enforce orgId match
  ];
  const shouldConditions: any[] = [];
  const mustNotConditions: any[] = [];

  for (const policy of policies) {
    console.log("📝 Evaluating Policy:", policy.description);
    for (const rule of policy.rules) {
      // console.log("📝📝📝 rules check predicate:", rule);
      if (!rule.predicate.includes(action) && !rule.predicate.includes('*')) continue;

      // Evaluate subject conditions against user attributes
      const subjectMatches = evaluateCondition(rule.subjectCondition, userAttributes);
      // console.log(`   🔎 Subject Condition Match: ${subjectMatches}`);
      if (!subjectMatches) continue;

      // Convert object conditions into Elasticsearch queries
      const objectMatches = convertConditionToElasticsearchQuery(rule.objectCondition, userAttributes);

      if (objectMatches.length === 0 && rule.objectCondition) {
        console.log("   ⚠️ No object conditions matched. Skipping rule.");
        continue; // Skip if object conditions result in no query
      }

      if (rule.deontologicalDuty.toLowerCase() === 'allowed') {
        shouldConditions.push({
          bool: {
            must: objectMatches,
          },
        });
      } else if (rule.deontologicalDuty.toLowerCase() === 'prohibited') {
        mustNotConditions.push({
          bool: {
            must: objectMatches,
          },
        });
      }
    }
  }

  // If no policies matched after evaluation, deny access
  if (shouldConditions.length === 0 && mustNotConditions.length === 0) {
    console.warn(`⚠️ No applicable policies for user. Denying access by default.`);
    return {
      bool: {
        must: [
          { match: { resourceType } },
          { match: { orgId: userAttributes.orgId } },
          { match: { _id: "__non_existent_document_id__" } } // This will match nothing
        ]
      }
    };
  }

  // Final query
  const query: any = {
    bool: {
      must: mustConditions,
    },
  };

  if (shouldConditions.length > 0) {
    query.bool.must.push({
      bool: {
        should: shouldConditions,
        minimum_should_match: 1,
      },
    });
  }

  if (mustNotConditions.length > 0) {
    query.bool.must_not = mustNotConditions;
  }

  // console.log("✅ Final Elasticsearch Query:", JSON.stringify(query, null, 2));
  return query;
}

function evaluateCondition(
  condition: any,
  attributes: Record<string, any>
): boolean {
  if (!condition) return true;

  if ('conditions' in condition && Array.isArray(condition.conditions)) {
    const results = condition.conditions.map((subCondition: any) =>
      evaluateCondition(subCondition, attributes)
    );
    const result = condition.operator === 'AND'
      ? results.every(Boolean)
      : results.some(Boolean);
    // console.log(`   🔄 Evaluated group condition (${condition.operator}):`, result);
    return result;
  } else {
    const { attribute, operator, value } = condition;
    let attributeValue = value;

    if (typeof value === 'string' && value.startsWith('$')) {
      const refAttribute = value.substring(1);
      attributeValue = attributes[refAttribute];
    }

    const actualValue = attributes[attribute];

    let result = false;
    // console.log("❌ ❌ ❌ ",operator)
    switch (operator) {
      case 'exists':
        result = actualValue !== undefined;
        break;
      case 'not_exists':
        result = actualValue === undefined;
        break;
      case 'is':
        result = actualValue === attributeValue;
        break;
      case 'is_not':
        result = actualValue !== attributeValue;
        break;
      case 'contains':
        result = Array.isArray(actualValue) && actualValue.includes(attributeValue);
        break;
      case 'not_contains':
        result = !Array.isArray(actualValue) || !actualValue.includes(attributeValue);
        break;
      default:
        console.error(`Unsupported operator: ${operator}`);
    }

    // console.log(`   🔍 Evaluated condition: { attribute: ${attribute}, operator: ${operator}, value: ${value} } => ${result}`);
    return result;
  }
}

function convertConditionToElasticsearchQuery(
  condition: any,
  attributes?: Record<string, any>
): any[] {
  const queries: any[] = [];

  if (!condition) return queries;

  if ('conditions' in condition && Array.isArray(condition.conditions)) {
    const subQueries = condition.conditions.flatMap((subCondition: any) =>
      convertConditionToElasticsearchQuery(subCondition, attributes)
    );

    if (subQueries.length === 0) return []; // Skip if no sub-queries

    if (condition.operator === 'AND') {
      queries.push({ bool: { must: subQueries } });
    } else if (condition.operator === 'OR') {
      queries.push({ bool: { should: subQueries, minimum_should_match: 1 } });
    }
  } else {
    const { attribute, operator, value } = condition;
    let queryCondition: any;
    let attributeValue = value;

    if (typeof value === 'string' && value.startsWith('$')) {
      const refAttribute = value.substring(1);
      attributeValue = attributes?.[refAttribute];
    }

    if (operator === 'exists') {
      queryCondition = { exists: { field: attribute } };
    } else if (operator === 'not_exists') {
      queryCondition = { bool: { must_not: { exists: { field: attribute } } } };
    } else {
      if (attributeValue === undefined) return [];

      switch (operator) {
        case 'is':
          queryCondition = { match: { [attribute]: attributeValue } };
          break;
        case 'is_not':
          queryCondition = { bool: { must_not: { match: { [attribute]: attributeValue } } } };
          break;
        case 'contains':
          queryCondition = { term: { [attribute]: attributeValue } };
          break;
        case 'not_contains':
          queryCondition = { bool: { must_not: { term: { [attribute]: attributeValue } } } };
          break;
        default:
          console.error(`Unsupported operator: ${operator}`);
          break;
      }
    }

    if (queryCondition) {
      // console.log(`   ➕ Adding query condition:`, queryCondition);
      queries.push(queryCondition);
    }
  }

  return queries;
}
