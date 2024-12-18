import axios from 'axios';

const ELASTICSEARCH_URL = 'http://localhost:9200';
const WORKFLOWS_INDEX = 'workflows';

// Fetch Workflows by accountId
export const getWorkflowsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${WORKFLOWS_INDEX}/_search`, {
      params: { q: `accountId:${accountId}` },
    });

    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits.map((hit: any) => ({
        ...hit._source,
        id: hit._id,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching Workflows:', error);
    throw error;
  }
};

// Create a new Workflow
export const createWorkflow = async (newWorkflow: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${WORKFLOWS_INDEX}/_doc`, newWorkflow);
    return {
      ...newWorkflow,
      id: response.data._id,
    };
  } catch (error) {
    console.error('Error creating Workflow:', error);
    throw error;
  }
};

// Update a Workflow
export const updateWorkflow = async (id: string, updatedWorkflow: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${WORKFLOWS_INDEX}/_update/${id}`, {
      doc: updatedWorkflow,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Workflow:', error);
    throw error;
  }
};

// Delete a Workflow
export const deleteWorkflow = async (id: string) => {
  try {
    const response = await axios.delete(`${ELASTICSEARCH_URL}/${WORKFLOWS_INDEX}/_doc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Workflow:', error);
    throw error;
  }
};
