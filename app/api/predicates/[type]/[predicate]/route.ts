// app/api/predicates/[type]/[predicate]/route.ts

import { NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch';

// Initialize the Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' }); // Ensure this matches your ES node

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  subjectName?: string;
  type: 'athlete' | 'brand';
}

export async function GET(
  request: Request,
  { params }: { params: { type: string; predicate: string } }
) {
  const { type, predicate } = params;

  if (type !== 'brand' && type !== 'athlete') {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const hitsPerPage = parseInt(url.searchParams.get('hitsPerPage') || '30', 10);

    // Use the correct index names
    const indexName = type === 'athlete' ? 'athletes_triples' : 'brands_triples';

    // Elasticsearch query with nested predicates and text search
    const esQuery = {
      index: indexName,
      from: (page - 1) * hitsPerPage,
      size: hitsPerPage,
      body: {
        query: {
          nested: {
            path: 'triples',
            query: {
              bool: {
                must: [
                  {
                    term: { 'triples.predicate': predicate },  // Search by predicate
                  },
                  ...(searchQuery
                    ? [
                        {
                          match: {
                            'triples.object': {
                              query: searchQuery,
                              operator: 'and' as const,  // Apply search query to object field
                            },
                          },
                        },
                      ]
                    : []),
                ],
              },
            },
            inner_hits: {
              name: 'matching_triples',
              size: 100,
              _source: ['triples.predicate', 'triples.object', 'triples.citation'], // Fetch only necessary fields
            },
          },
        },
        _source: ['subject', 'triples'],  // Return subject and triples fields in the response
      },
    };

    // Perform the search
    const result = await client.search<any, any>(esQuery);
    const hits = result.hits.hits;

    const triples: Triple[] = hits
      .map((hit: any) => {
        const source = hit._source;
        const subject = source.subject;

        // Find the 'has_name' or 'name' triple within the same document
        const nameTriple = source.triples.find(
          (triple: any) =>
            triple.predicate === 'has_name' || triple.predicate === 'name' || triple.predicate === 'brand_name'
        );

        const subjectName = nameTriple ? nameTriple.object : 'Name Unavailable';

        // Get the matching triples from inner_hits
        const matchingTriples = hit.inner_hits.matching_triples.hits.hits.map((innerHit: any) => {
          const tripleSource = innerHit._source;
          return {
            subject,
            predicate: tripleSource.predicate,
            object: tripleSource.object,
            citation: tripleSource.citation,
            subjectName,  // Include the subject name
            type,  // Include the type (athlete or brand)
          };
        });

        return matchingTriples;
      })
      .flat();

    // Total hits
    const total = typeof result.hits.total === 'number' ? result.hits.total : result.hits.total.value;
    const totalPages = Math.ceil(total / hitsPerPage);

    return NextResponse.json({
      triples,
      total,
      page,
      hitsPerPage,
      totalPages,
    });
  } catch (error: any) {
    console.error('Elasticsearch search error:', error.meta?.body?.error || error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
