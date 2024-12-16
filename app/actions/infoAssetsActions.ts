import axios from 'axios';

const ELASTICSEARCH_URL = 'http://localhost:9200';
const INFO_ASSETS_INDEX = 'info_assets';

// Fetch InfoAssets by accountId
export const getInfoAssetsByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${INFO_ASSETS_INDEX}/_search`, {
      params: { q: `accountId:${accountId}` },
    });

    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits.map((hit: any) => ({
        ...hit._source,
        id: hit._id, // Include the Elasticsearch _id
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching InfoAssets:', error);
    throw error;
  }
};

// Create a new InfoAsset
export const createInfoAsset = async (newInfoAsset: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${INFO_ASSETS_INDEX}/_doc`, newInfoAsset);
    return {
      ...newInfoAsset,
      id: response.data._id, // Return the new asset with its Elasticsearch _id
    };
  } catch (error) {
    console.error('Error creating InfoAsset:', error);
    throw error;
  }
};

// Update an InfoAsset
export const updateInfoAsset = async (id: string, updatedInfoAsset: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${INFO_ASSETS_INDEX}/_update/${id}`, {
      doc: updatedInfoAsset,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating InfoAsset:', error);
    throw error;
  }
};

// Delete an InfoAsset
export const deleteInfoAsset = async (id: string) => {
  try {
    const response = await axios.delete(`${ELASTICSEARCH_URL}/${INFO_ASSETS_INDEX}/_doc/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting InfoAsset:', error);
    throw error;
  }
};
