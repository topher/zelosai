import axios from 'axios';

// Elasticsearch endpoint and index for agents
const ELASTICSEARCH_URL = 'http://localhost:9200';
const AGENTS_INDEX = 'agents';

// Function to get agents by accountId
export const getAgentsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${AGENTS_INDEX}/_search`, {
      params: {
        q: `accountId:${accountId}`,
      },
    });

    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits.map((hit: any) => ({
        ...hit._source,
        id: hit._id, // The Elasticsearch document _id for updates/deletes
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};

// Function to create a new agent
export const createAgent = async (newAgent: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${AGENTS_INDEX}/_doc`, newAgent);
    return {
      ...newAgent,
      id: response.data._id, // Return the new agent with the Elasticsearch _id
    };
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
};

// Function to update an existing agent
export const updateAgent = async (agentId: string, updatedAgent: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${AGENTS_INDEX}/_update/${agentId}`, {
      doc: updatedAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
};

// Function to delete an agent
export const deleteAgent = async (agentId: string) => {
  try {
    const response = await axios.delete(`${ELASTICSEARCH_URL}/${AGENTS_INDEX}/_doc/${agentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting agent:', error);
    throw error;
  }
};
