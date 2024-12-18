import axios from "axios";

const ELASTICSEARCH_URL = 'http://localhost:9200/';
const WORKFLOW_ANALYTICS_INDEX = 'all_stats_cards';
const MODEL_ANALYTICS_INDEX = 'model_analytics';

// Fetch Workflow Analytics
export const getWorkflowAnalytics = async (accountId: string) => {
  try {
    const query = {
      query: {
        match: {
          accountId: accountId
        }
      }
    };
    
    const response = await axios.post(`${ELASTICSEARCH_URL}/${WORKFLOW_ANALYTICS_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: hit._id, // Include the document ID
    }));
  } catch (error) {
    console.error("Error fetching workflow analytics:", error);
    throw error;
  }
};

// Fetch Model Analytics
export const getModelAnalytics = async (accountId: string) => {
  try {
    const query = {
      query: {
        match: {
          accountId: accountId
        }
      }
    };
    
    const response = await axios.post(`${ELASTICSEARCH_URL}/${MODEL_ANALYTICS_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: hit._id, // Include the document ID
    }));
  } catch (error) {
    console.error("Error fetching model analytics:", error);
    throw error;
  }
};
