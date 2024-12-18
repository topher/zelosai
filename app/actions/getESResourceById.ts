// lib/actions/getESResourceById.ts

import { Client } from '@elastic/elasticsearch';
import { RDFResource, Triple } from '../types';

// Initialize Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

/**
 * Fetches a resource by ID from a specified Elasticsearch index.
 * @param indexName - The name of the Elasticsearch index.
 * @param id - The unique identifier of the resource.
 * @returns The resource object or null if not found.
 */
export default async function getESResourceById(indexName: string, id: string) {
  // Determine whether the resource is an athlete or brand
  let uriPrefix = '';
  if (indexName === 'athletes_triples') {
    uriPrefix = 'knowledge/athlete';
  } else if (indexName === 'brands_triples') {
    uriPrefix = 'knowledge/brand';
  } else {
    throw new Error('Invalid index name. Must be athletes_triples or brands_triples.');
  }

  // Construct the full URI for the resource
  const uri = `http://zelos.ai/${uriPrefix}/${id}`;

  console.log("Index Name:", indexName);
  console.log("Resource ID:", id);
  console.log("Full URI:", uri);

  try {
    // Search for the resource by its `subject` URI
    const result = await client.search({
      index: indexName, // Dynamic index name
      body: {
        query: {
          term: { "subject": uri } // Corrected field
        }
      }
    });

    // Handle hits.total based on Elasticsearch version
    const totalHits = typeof result.hits.total === 'number'
      ? result.hits.total
      : result.hits.total.value;

    console.log(`Total Hits Found: ${totalHits}`);

    // If no hits are found, return null
    if (totalHits === 0) {
      console.log(`Resource with ID ${id} not found in index "${indexName}"`);
      return null;
    }

    // Type cast to ensure TypeScript knows the shape of the source
    const resource = result.hits.hits[0]._source as RDFResource;

    // Extract the triples from the found document
    const triples = resource.triples.map((triple: Triple) => ({
      subject: resource.subject,
      predicate: triple.predicate,
      object: triple.object,
      citation: triple.citation || null // Handle case where citation might be missing
    }));

    console.log("Resource triples:", triples);

    return { id, triples };
  } catch (error) {
    console.error("Error retrieving resource by ID:", error);
    throw error;
  }
}
