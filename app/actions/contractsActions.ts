import axios from 'axios';

const ELASTICSEARCH_URL = 'http://localhost:9200';
const CONTRACTS_INDEX = 'contracts';

// Fetch Contracts by accountId
export const getContractsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${CONTRACTS_INDEX}/_search`, {
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
    console.error('Error fetching Contracts:', error);
    throw error;
  }
};

// Create a new Contract
export const createContract = async (newContract: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${CONTRACTS_INDEX}/_doc`, newContract);
    return {
      ...newContract,
      id: response.data._id,
    };
  } catch (error) {
    console.error('Error creating Contract:', error);
    throw error;
  }
};

// Update a Contract
export const updateContract = async (id: string, updatedContract: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${CONTRACTS_INDEX}/_update/${id}`, {
      doc: updatedContract,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Contract:', error);
    throw error;
  }
};

// Delete a Contract
export const deleteContract = async (id: string) => {
  try {
    const response = await axios.delete(`${ELASTICSEARCH_URL}/${CONTRACTS_INDEX}/_doc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Contract:', error);
    throw error;
  }
};
