import axios from "axios";
import { DataConnector } from "@/app/types";

// Elasticsearch endpoint (modify if needed)
const ELASTICSEARCH_URL = 'http://localhost:9200';
const CONNECTORS_INDEX = 'connectors';

// Fetch all connectors for the account
export const getConnectorsByAccountId = async (accountId: string): Promise<DataConnector[]> => {
    try {
      const response = await axios.get(`${ELASTICSEARCH_URL}/${CONNECTORS_INDEX}/_search`, {
        params: { q: `accountId:${accountId}` }, // Query string style
      });
      console.log(response)
      return response.data.hits.hits.map((hit: any) => hit._source);
    } catch (error) {
      console.error("Error fetching connectors:", error);
      return [];
    }
  };

// Create a new connector
export const createConnector = async (connector: DataConnector): Promise<DataConnector> => {
  try {
    const response = await axios.post(ELASTICSEARCH_URL, connector);
    return response.data._source;
  } catch (error) {
    console.error("Error creating connector:", error);
    throw error;
  }
};

// Update an existing connector
export const updateConnector = async (id: string, connector: Partial<DataConnector>): Promise<void> => {
  try {
    await axios.put(`${ELASTICSEARCH_URL}/${id}`, connector);
  } catch (error) {
    console.error("Error updating connector:", error);
    throw error;
  }
};

// Delete a connector
export const deleteConnector = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${ELASTICSEARCH_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting connector:", error);
    throw error;
  }
};
