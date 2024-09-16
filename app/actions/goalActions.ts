import axios from 'axios';

// Elasticsearch endpoint and index for goals
const ELASTICSEARCH_URL = 'http://localhost:9200';
const GOALS_INDEX = 'goals';

// Function to get goals by accountId
export const getGoalsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${GOALS_INDEX}/_search`, {
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
    console.error('Error fetching goals:', error);
    throw error;
  }
};

// Function to create a new goal
export const createGoal = async (newGoal: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${GOALS_INDEX}/_doc`, newGoal);
    return {
      ...newGoal,
      id: response.data._id, // Return the new goal with the Elasticsearch _id
    };
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

// Function to update a goal
export const updateGoal = async (goalId: string, updatedGoal: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${GOALS_INDEX}/_update/${goalId}`, {
      doc: updatedGoal,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

// Function to delete a goal
export const deleteGoal = async (goalId: string) => {
  try {
    const response = await axios.delete(`${ELASTICSEARCH_URL}/${GOALS_INDEX}/_doc/${goalId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};
