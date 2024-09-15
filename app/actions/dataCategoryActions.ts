import axios from "axios";
import { DataCategory } from "@/app/types";

const ELASTICSEARCH_URL = 'http://localhost:9200';
const DATA_CATEGORIES_INDEX = 'data_categories';

// Fetch all data categories by accountId
export const getDataCategoriesByAccountId = async (accountId: string): Promise<DataCategory[]> => {
  try {
    const query = {
      query: {
        match: { accountId }
      }
    };
    const response = await axios.post(`${ELASTICSEARCH_URL}/${DATA_CATEGORIES_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => hit._source);
  } catch (error) {
    console.error("Error fetching data categories:", error);
    return [];
  }
};

// Create a new data category
export const createDataCategory = async (dataCategory: DataCategory): Promise<DataCategory> => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${DATA_CATEGORIES_INDEX}/_doc`, dataCategory);
    return response.data._source;
  } catch (error) {
    console.error("Error creating data category:", error);
    throw error;
  }
};

// Update a data category
export const updateDataCategory = async (id: string, dataCategory: Partial<DataCategory>): Promise<void> => {
  try {
    await axios.put(`${ELASTICSEARCH_URL}/${DATA_CATEGORIES_INDEX}/_doc/${id}`, dataCategory);
  } catch (error) {
    console.error("Error updating data category:", error);
    throw error;
  }
};

// Delete a data category
export const deleteDataCategory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${ELASTICSEARCH_URL}/${DATA_CATEGORIES_INDEX}/_doc/${id}`);
  } catch (error) {
    console.error("Error deleting data category:", error);
    throw error;
  }
};
