// app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Client from '@searchkit/api';

const client = Client({
  connection: {
    host: 'http://localhost:9200',
    // Add authentication if needed
    // apiKey: 'YOUR_API_KEY',
    // auth: {
    //   username: 'elastic',
    //   password: 'YOUR_PASSWORD',
    // },
  },
  search_settings: {
    // Define settings for multiple entity types
    highlight_attributes: ['name'],
    snippet_attributes: ['content'],
    search_attributes: [
      { field: 'name', weight: 3 },
      'content',
      'category',
    ],
    result_attributes: [
      'name',
      'uri',
      'creation_date',
      'content',
      'category',
      'labels',
      'dcma_registrant_email',
      'entity_type',
    ],
    facet_attributes: [
      {
        field: 'category',
        type: 'string',
        attribute: 'category',
      },
      {
        field: 'entity_type',
        type: 'string',
        attribute: 'entity_type',
      },
      {
        field: 'asset_type',
        type: 'string',
        attribute: 'asset_type',
      },
      {
        field: 'status',
        type: 'string',
        attribute: 'status',
      },
      {
        field: 'labels',
        type: 'string',
        attribute: 'labels',
      },
    ],
  },
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const results = await client.handleRequest(body);
  return NextResponse.json(results);
}
