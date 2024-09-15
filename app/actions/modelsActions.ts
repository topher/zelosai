import axios from "axios";
import { AIModel } from "../types";

// Elasticsearch endpoint and index
const ELASTICSEARCH_URL = "http://localhost:9200";
const MODELS_INDEX = "complete_trained_models";
const CATEGORIES_INDEX = "user_defined_model_categories";

// Fetch all models for the given accountId, ensuring we fetch more than 10 models.
export const getAIModelsByAccountId = async (accountId: string): Promise<AIModel[]> => {
  try {
    const query = {
      query: {
        match: {
          accountId: accountId
        }
      },
      size: 50 // Set the size to 50 to fetch up to 50 models (adjust as needed)
    };
    
    const response = await axios.post(`${ELASTICSEARCH_URL}/${MODELS_INDEX}/_search`, query);

    // Log response for debugging
    console.log(`Fetched models for accountId ${accountId}:`, response.data.hits.hits);

    // Map over the hits to extract the models from Elasticsearch's response
    return response.data.hits.hits.map((hit: any) => hit._source);
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
};

// Fetch user-defined model categories from Elasticsearch
export const getModelCategoriesByAccountId = async (accountId: string) => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${CATEGORIES_INDEX}/_search`, {
      params: {
        q: `accountId:${accountId}`,
      },
    });

    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits.map((hit: any) => hit._source);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching model categories:", error);
    throw error;
  }
};

// Create a new AI model in Elasticsearch
export const createAIModel = async (newModel: any) => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${MODELS_INDEX}/_doc`, newModel);
    return response.data;
  } catch (error) {
    console.error("Error creating AI model:", error);
    throw error;
  }
};
