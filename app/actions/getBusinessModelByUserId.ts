import axios from 'axios';

// Replace with your actual Elasticsearch endpoint
const ELASTICSEARCH_URL = 'http://localhost:9200';
const BUSINESS_MODEL_INDEX = 'business_model'; // Replace with your actual index

// Function to get a business model from Elasticsearch
export const getBusinessModel = async (): Promise<any> => {
  try {
    // Replace this query with the actual Elasticsearch query as per your requirements
    const response = await axios.get(`${ELASTICSEARCH_URL}/${BUSINESS_MODEL_INDEX}/_search`, {
      params: {
        size: 1 // Get one business model, replace with actual query logic as needed
      }
    });

    if (response.data.hits && response.data.hits.hits.length > 0) {
      // Extract the first business model (assuming you only want one for now)
      const businessModel = response.data.hits.hits[0]._source;
      return businessModel;
    } else {
      throw new Error('No business models found');
    }
  } catch (error) {
    console.error('Error fetching business model from Elasticsearch:', error.message);
    throw error;
  }
};

// CRUD Functions

// Create a new card in Elasticsearch
export const createCard = async (section: string, newCard: any) => {
    try {
      const response = await axios.post(`${ELASTICSEARCH_URL}/${BUSINESS_MODEL_INDEX}/_doc`, newCard);
      return {
        ...newCard,
        _id: response.data._id, // Return the Elasticsearch _id along with the card data
      };
    } catch (error) {
      console.error(`Error creating card in section ${section}:`, error);
      throw error;
    }
  };
  

// Read all cards for a section
export const getCardsBySection = async (section: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${ELASTICSEARCH_URL}/${BUSINESS_MODEL_INDEX}/_search`);
    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits[0]._source[section] || [];
    } else {
      throw new Error("No business model found");
    }
  } catch (error) {
    console.error(`Error fetching cards for section ${section}:`, error);
    throw error;
  }
};

// Update an existing card in Elasticsearch
export const updateCard = async (section: string, cardId: string, updatedCard: any) => {
    try {
      const response = await axios.post(`${ELASTICSEARCH_URL}/${BUSINESS_MODEL_INDEX}/_update/${cardId}`, {
        doc: updatedCard,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating card in section ${section}:`, error);
      throw error;
    }
  };
  

// Delete a card in Elasticsearch
export const deleteCard = async (cardId: string) => {
    try {
      const response = await axios.delete(`${ELASTICSEARCH_URL}/${BUSINESS_MODEL_INDEX}/_doc/${cardId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting card with id ${cardId}:`, error);
      throw error;
    }
  };
  