import { NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types'; // Import types for better safety

// Initialize the Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' }); // Ensure this matches your ES node

// Define the structure of the aggregation result for better type checking
interface PredicateAggregation {
  predicates: {
    buckets: Array<{
      key: string; // The predicate value
      doc_count: number; // Number of documents for this predicate
    }>;
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'athlete';

  if (type !== 'athlete' && type !== 'brand') {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const indexName = type === 'athlete' ? 'athletes_triples' : 'brands_triples';

    // Elasticsearch aggregation query to get distinct predicates with `nested` aggregation
    const esQuery = {
      index: indexName,
      size: 0, // We don't need the actual hits, only the aggregation
      body: {
        aggs: {
          nested_triples: {
            nested: {
              path: 'triples',
            },
            aggs: {
              predicates: {
                terms: {
                  field: 'triples.predicate',
                  size: 1000, // Adjust size as needed
                },
              },
            },
          },
        },
      },
    };

    // Perform the search query
    const result: SearchResponse<unknown, PredicateAggregation> = await client.search(esQuery);

    // Safely access the buckets from the nested aggregation
    const predicates = result.aggregations?.nested_triples.predicates.buckets.map(
      (bucket) => bucket.key
    ) || [];

    return NextResponse.json({ predicates });
  } catch (error: any) {
    console.error('Error fetching predicates:', error.meta?.body?.error || error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
