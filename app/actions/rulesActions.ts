import axios from "axios";
import { Rule } from "@/app/types";

const ELASTICSEARCH_URL = 'http://localhost:9200';
const RULES_INDEX = "rules";


// Fetch all rules for the account
export const getRulesByAccountId = async (accountId: string): Promise<Rule[]> => {
  try {
    const query = {
      query: {
        match: {
          accountId: accountId,
        },
      },
    };

    const response = await axios.post(`${ELASTICSEARCH_URL}/${RULES_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: hit._id, // Include Elasticsearch document ID
    }));
  } catch (error) {
    console.error("Error fetching rules:", error);
    return [];
  }
};

// Create a new rule
export const createRule = async (rule: Rule): Promise<Rule> => {
  try {
    const response = await axios.post(ELASTICSEARCH_URL, rule);
    return {
      ...rule,
      id: response.data._id, // Return with the generated ID
    };
  } catch (error) {
    console.error("Error creating rule:", error);
    throw error;
  }
};

// Update an existing rule
export const updateRule = async (id: string, rule: Partial<Rule>): Promise<void> => {
  try {
    await axios.put(`${ELASTICSEARCH_URL}/${id}`, rule);
  } catch (error) {
    console.error("Error updating rule:", error);
    throw error;
  }
};

// Delete a rule
export const deleteRule = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${ELASTICSEARCH_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting rule:", error);
    throw error;
  }
};
