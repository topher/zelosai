// services/predicateService.ts

import axios from 'axios';

export const fetchPredicateById = async (id: string) => {
  const response = await axios.get(`http://localhost:9200/predicates/_doc/${id}`);
  return response.data._source;
};

export const searchPredicates = async (query: string, resourceType: string) => {
  if (!resourceType) {
    console.warn("ResourceType is required for the predicate search. Returning empty results as a fallback.");
    return []; // Return an empty array or any suitable fallback value.
  }

  const mustClause = query && query.trim() !== ''
    ? [
        {
          multi_match: {
            query: query,
            fields: ['label^2', 'description', 'synonyms'],
          },
        },
      ]
    : [
        {
          match_all: {},
        },
      ];

  const response = await axios.post('http://localhost:9200/predicate_types/_search', {
    query: {
      bool: {
        must: mustClause,
        filter: [
          {
            term: { applicableSubjectResourceTypes: resourceType },
          },
        ],
      },
    },
  });

  return response.data.hits.hits.map((hit: any) => hit._source);
};
