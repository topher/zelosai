import axios from "axios";
import { UserAction } from "@/app/types";

const ELASTICSEARCH_URL = 'http://localhost:9200';
const USER_ACTION_INDEX = 'user_activity';

// Fetch all user actions by accountId
export const getUserActivityByAccountId = async (accountId: string): Promise<UserAction[]> => {
  try {
    const query = {
      query: {
        match: { accountId }
      }
    };
    const response = await axios.post(`${ELASTICSEARCH_URL}/${USER_ACTION_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => hit._source);
  } catch (error) {
    console.error("Error fetching user actions:", error);
    return [];
  }
};

// Create a new user action
export const createUserAction = async (userAction: UserAction): Promise<UserAction> => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${USER_ACTION_INDEX}/_doc`, userAction);
    return response.data._source;
  } catch (error) {
    console.error("Error creating user action:", error);
    throw error;
  }
};

// Update a user action
export const updateUserAction = async (id: string, userAction: Partial<UserAction>): Promise<void> => {
  try {
    await axios.put(`${ELASTICSEARCH_URL}/${USER_ACTION_INDEX}/_doc/${id}`, userAction);
  } catch (error) {
    console.error("Error updating user action:", error);
    throw error;
  }
};

// Delete a user action
export const deleteUserAction = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${ELASTICSEARCH_URL}/${USER_ACTION_INDEX}/_doc/${id}`);
  } catch (error) {
    console.error("Error deleting user action:", error);
    throw error;
  }
};
