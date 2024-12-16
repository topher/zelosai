// app/actions/policiesActions.ts

import axios from 'axios';
import { Policy } from '@/app/types';

const ELASTICSEARCH_URL = "http://localhost:9200";
const POLICIES_INDEX = "policies";

export const getPoliciesByAccountId = async (accountId: string): Promise<Policy[]> => {
  try {
    const query = {
      query: {
        match: {
          accountId: accountId
        }
      }
    };

    const response = await axios.post(`${ELASTICSEARCH_URL}/${POLICIES_INDEX}/_search`, query);
    return response.data.hits.hits.map((hit: any) => hit._source);
  } catch (error) {
    console.error("Error fetching policies:", error);
    return [];
  }
};
