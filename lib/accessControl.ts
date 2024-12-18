// accessControl.ts

import { fetchPoliciesFromElasticsearch } from './policyEvaluation';

/**
 * Function to check if a user has access to a specific action on a resource.
 */
export async function checkAccess(
  userAttributes: Record<string, any>,
  action: string,
  resourceName: string,
  resourceId: string
): Promise<boolean> {
  try {
    const accountId = userAttributes.orgId || userAttributes.userId;
    if (!accountId) {
      console.error("❌ accountId is missing in userAttributes.");
      return false;
    }

    // Fetch policies related to the user's account
    const policies = await fetchPoliciesFromElasticsearch(accountId);

    // If no policies are found, deny access by default
    if (!policies || policies.length === 0) {
      console.warn(`⚠️ No policies found for accountId: ${accountId}. Denying access by default.`);
      return false;
    }

    // Iterate through policies and check for matching rules
    for (const policy of policies) {
      console.log(`📝 Evaluating Policy: ${policy.description}`);
      for (const rule of policy.rules) {
        if (!rule.predicate.includes(action) && !rule.predicate.includes('*')) continue;

        // Evaluate subject conditions
        const subjectMatches = evaluateCondition(rule.subjectCondition, userAttributes);
        if (!subjectMatches) {
          console.log(`   ❌ Subject conditions do not match for rule: ${rule.id}`);
          continue;
        }

        // Evaluate object conditions
        const objectMatches = await checkObjectConditions(rule.objectCondition, resourceName, resourceId, userAttributes);
        if (objectMatches) {
          console.log(`   ✅ Access granted by rule: ${rule.id}`);
          return rule.deontologicalDuty.toLowerCase() === 'allowed';
        } else {
          console.log(`   ❌ Object conditions do not match for rule: ${rule.id}`);
        }
      }
    }

    // If no matching policies grant access, deny access
    console.warn(`⚠️ No matching policies grant access for action: ${action} on resource: ${resourceName}/${resourceId}.`);
    return false;
  } catch (error) {
    console.error("❌ Error during access control check:", error);
    return false;
  }
}

/**
 * Function to evaluate a condition against user/resource attributes.
 */
function evaluateCondition(condition: any, attributes: Record<string, any>): boolean {
  if (!condition) return true;

  if ('conditions' in condition && Array.isArray(condition.conditions)) {
    const results = condition.conditions.map((subCondition: any) =>
      evaluateCondition(subCondition, attributes)
    );
    return condition.operator === 'AND' ? results.every(Boolean) : results.some(Boolean);
  } else {
    const { attribute, operator, value } = condition;
    let actualValue = attributes[attribute];
    let expectedValues = Array.isArray(value) ? value : [value];
    expectedValues = expectedValues.map(val =>
      typeof val === 'string' && val.startsWith('$') ? attributes[val.substring(1)] : val
    );

    switch (operator) {
      case 'is':
        return actualValue === expectedValues[0];
      case 'is_not':
        return actualValue !== expectedValues[0];
      case 'contains':
        return Array.isArray(actualValue) && actualValue.includes(expectedValues[0]);
      case 'not_contains':
        return !Array.isArray(actualValue) || !actualValue.includes(expectedValues[0]);
      case 'in':
        return expectedValues.includes(actualValue);
      case 'not_in':
        return !expectedValues.includes(actualValue);
      case 'exists':
        return actualValue !== undefined;
      case 'not_exists':
        return actualValue === undefined;
      default:
        console.error(`Unsupported operator: ${operator}`);
        return false;
    }
  }
}

/**
 * Function to check resource-specific conditions (object conditions) against Elasticsearch data.
 */
async function checkObjectConditions(
  objectCondition: any,
  resourceName: string,
  resourceId: string,
  userAttributes: Record<string, any>
): Promise<boolean> {
  if (!objectCondition) return true;

  try {
    // Build a query to fetch the resource from Elasticsearch
    const query = {
      bool: {
        must: [
          { term: { _id: resourceId } },
          { term: { resourceType: resourceName } }
        ]
      }
    };

    console.log("🔍 Constructing Elasticsearch query for resource fetch:", JSON.stringify(query, null, 2));

    const response = await fetch(`http://localhost:9200/${resourceName.toLowerCase()}/_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        size: 1
      })
    });

    if (!response.ok) {
      console.error(`❌ Failed to fetch resource ${resourceId} from Elasticsearch.`);
      return false;
    }

    const data = await response.json();
    const resource = data.hits?.hits[0]?._source || null;

    if (!resource) {
      console.warn(`⚠️ Resource ${resourceId} not found in Elasticsearch.`);
      return false;
    }

    console.log("✅ Resource fetched successfully:", JSON.stringify(resource, null, 2));

    // Evaluate the object conditions against the fetched resource
    return evaluateCondition(objectCondition, resource);
  } catch (error) {
    console.error("❌ Error fetching resource for object condition check:", error);
    return false;
  }
}

/**
 * Function to build an Elasticsearch query based on access control policies.
 */
export async function buildAccessControlledQuery(
  userAttributes: Record<string, any>,
  action: string,
  resourceType: string
): Promise<any> {
  try {
    const accountId = userAttributes.orgId || userAttributes.userId;
    if (!accountId) {
      console.error("❌ accountId is missing in userAttributes.");
      return {
        bool: {
          must: [
            { match: { resourceType } },
            { match: { accountId: "__non_existent_account__" } } // This will match nothing
          ]
        }
      };
    }

    const policies = await fetchPoliciesFromElasticsearch(accountId);

    if (!policies || policies.length === 0) {
      console.warn(`⚠️ No policies found for accountId: ${accountId}. Denying access by default.`);
      return {
        bool: {
          must: [
            { match: { resourceType } },
            { match: { accountId: "__non_existent_account__" } } // This will match nothing
          ]
        }
      };
    }

    const mustConditions: any[] = [
      { term: { resourceType } },
      { term: { accountId: accountId } }
    ];
    const shouldConditions: any[] = [];
    const mustNotConditions: any[] = [];

    for (const policy of policies) {
      console.log(`📝 Evaluating Policy: ${policy.description}`);
      for (const rule of policy.rules) {
        if (!rule.predicate.includes(action) && !rule.predicate.includes('*')) continue;

        const subjectMatches = evaluateCondition(rule.subjectCondition, userAttributes);
        if (!subjectMatches) {
          console.log(`   ❌ Subject conditions do not match for rule: ${rule.id}`);
          continue;
        }

        // Convert object conditions into Elasticsearch queries
        const objectMatches = convertConditionToElasticsearchQuery(rule.objectCondition, userAttributes);

        if (objectMatches.length === 0 && rule.objectCondition) {
          console.log("   ⚠️ No object conditions matched. Skipping rule.");
          continue; // Skip if object conditions result in no query
        }

        if (rule.deontologicalDuty.toLowerCase() === 'allowed') {
          shouldConditions.push(...objectMatches);
        } else if (rule.deontologicalDuty.toLowerCase() === 'prohibited') {
          mustNotConditions.push(...objectMatches);
        }
      }
    }

    // If no policies matched after evaluation, deny access
    if (shouldConditions.length === 0 && mustNotConditions.length === 0) {
      console.warn(`⚠️ No applicable policies for user. Denying access by default.`);
      return {
        bool: {
          must: [
            { term: { resourceType } },
            { term: { accountId: accountId } },
            { term: { _id: "__non_existent_document_id__" } } // This will match nothing
          ]
        }
      };
    }

    // Final query construction
    const query: any = {
      bool: {
        must: [...mustConditions]
      }
    };

    if (shouldConditions.length > 0) {
      query.bool.must.push({
        bool: {
          should: shouldConditions,
          minimum_should_match: 1
        }
      });
    }

    if (mustNotConditions.length > 0) {
      query.bool.must_not = mustNotConditions;
    }

    console.log("🏁 constructedQuery", JSON.stringify(query, null, 2));

    return query;
  } catch (error) {
    console.error("❌ Error building access controlled query:", error);
    // Return a query that matches nothing to deny access in case of error
    return {
      bool: {
        must: [
          { term: { _id: "__non_existent_document_id__" } }
        ]
      }
    };
  }
}

/**
 * Helper function to convert a condition into Elasticsearch query clauses.
 */
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
    let attributeValue = value;

    // Resolve variables in attributeValue
    if (Array.isArray(attributeValue)) {
      attributeValue = attributeValue.map(val =>
        typeof val === 'string' && val.startsWith('$') ? attributes?.[val.substring(1)] : val
      );
    } else if (typeof attributeValue === 'string' && attributeValue.startsWith('$')) {
      const refAttribute = attributeValue.substring(1);
      attributeValue = attributes?.[refAttribute];
    }

    if (operator === 'exists') {
      queries.push({ exists: { field: attribute } });
    } else if (operator === 'not_exists') {
      queries.push({ bool: { must_not: { exists: { field: attribute } } } });
    } else {
      if (attributeValue === undefined) return [];

      switch (operator) {
        case 'is':
          queries.push({ term: { [attribute]: attributeValue } });
          break;
        case 'is_not':
          queries.push({ bool: { must_not: { term: { [attribute]: attributeValue } } } });
          break;
        case 'contains':
          queries.push({ term: { [attribute]: attributeValue } });
          break;
        case 'not_contains':
          queries.push({ bool: { must_not: { term: { [attribute]: attributeValue } } } });
          break;
        case 'in':
          if (Array.isArray(attributeValue)) {
            queries.push({ terms: { [attribute]: attributeValue } });
          } else {
            console.error(`Operator 'in' requires an array value.`);
          }
          break;
        case 'not_in':
          if (Array.isArray(attributeValue)) {
            queries.push({ bool: { must_not: { terms: { [attribute]: attributeValue } } } });
          } else {
            console.error(`Operator 'not_in' requires an array value.`);
          }
          break;
        default:
          console.error(`Unsupported operator: ${operator}`);
          break;
      }
    }
  }

  return queries;
}
