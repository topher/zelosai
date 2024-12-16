import axios from "axios";
import { Task } from "@/app/types";

const ELASTICSEARCH_URL = 'http://localhost:9200';
const TASKS_INDEX = 'tasks';

// Fetch all tasks by accountId
export const getTasksByAccountId = async (accountId: string): Promise<Task[]> => {
  try {
    const query = {
      query: {
        match: { accountId }
      }
    };
    const response = await axios.post(`${ELASTICSEARCH_URL}/${TASKS_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => hit._source);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Create a new task
export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${TASKS_INDEX}/_doc`, task);
    return response.data._source;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id: string, task: Partial<Task>): Promise<void> => {
  try {
    await axios.put(`${ELASTICSEARCH_URL}/${TASKS_INDEX}/_doc/${id}`, task);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${ELASTICSEARCH_URL}/${TASKS_INDEX}/_doc/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
