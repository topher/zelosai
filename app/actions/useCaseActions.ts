import axios from 'axios';

// Define your Elasticsearch URL and index
const ELASTICSEARCH_URL = 'http://localhost:9200';
const USE_CASES_INDEX = 'use_cases';

// Function to fetch use cases by account ID (Read)
export const getUseCasesByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${USE_CASES_INDEX}/_search`, {
      params: {
        q: `accountId:${accountId}`,
      },
    });

    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits.map((hit: any) => ({
        ...hit._source,
        id: hit._id, // The Elasticsearch _id, used for updates/deletes
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching use cases:', error);
    throw error;
  }
};

// Function to create a new use case (Create)
export const createUseCase = async (newUseCase: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${USE_CASES_INDEX}/_doc`, newUseCase);
    return {
      ...newUseCase,
      id: response.data._id, // Return the new use case with its Elasticsearch _id
    };
  } catch (error) {
    console.error('Error creating use case:', error);
    throw error;
  }
};

// Function to update an existing use case (Update)
export const updateUseCase = async (useCaseId: string, updatedUseCase: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${USE_CASES_INDEX}/_update/${useCaseId}`, {
      doc: updatedUseCase,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating use case:', error);
    throw error;
  }
};

// Function to delete a use case (Delete)
export const deleteUseCase = async (useCaseId: string) => {
  try {
    const response = await axios.delete(`${ELASTICSEARCH_URL}/${USE_CASES_INDEX}/_doc/${useCaseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting use case:', error);
    throw error;
  }
};
