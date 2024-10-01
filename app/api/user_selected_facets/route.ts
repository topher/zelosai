// /app/api/user_selected_facets/route.ts

import { NextResponse } from 'next/server';
import elasticsearch, { ensureIndexExists } from '@/lib/elasticsearch';

// Define the index name
const INDEX = 'user_selected_facets';

// Define the mappings for the 'user_selected_facets' index
const userSelectedFacetsMappings = {
  properties: {
    userId: {
      type: 'keyword'
    },
    selectedMarketingChannels: {
      type: 'keyword'
    },
    selectedMarkets: {
      type: 'keyword'
    },
    selectedIndustries: {
      type: 'keyword'
    },
    selectedVALSSegments: {
      type: 'keyword'
    },
    selectedLanguages: {
      type: 'keyword'
    },
    selectedNILActivities: {
      type: 'keyword'
    },
    selectedInterests: {
      type: 'keyword'
    },
    selectedProducts: {
      type: 'keyword'
    }
  }
};

// Initialize the index when the module is loaded
(async () => {
  try {
    await ensureIndexExists(INDEX, userSelectedFacetsMappings);
    console.log(`Index "${INDEX}" is ready.`);
  } catch (error) {
    console.error(`Error ensuring index "${INDEX}":`, error);
  }
})();

/**
 * GET Method
 * Retrieves user-selected facets based on userId
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'userId query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await elasticsearch.get(`/${INDEX}/_doc/${userId}`);

    if (response.status === 200 && response.data.found) {
      const facets = response.data._source;
      return NextResponse.json(facets, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'No facets found for the user.' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return NextResponse.json(
        { message: 'No facets found for the user.' },
        { status: 404 }
      );
    }
    console.error('Error fetching user-selected facets:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST Method
 * Creates or updates user-selected facets (Upsert)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Upsert the user-selected facets
    const response = await elasticsearch.put(`/${INDEX}/_doc/${body.userId}`, body, {
      params: { refresh: 'wait_for' },
    });

    if (response.status === 201 || response.status === 200) {
      return NextResponse.json(
        { message: 'Selections saved successfully' },
        { status: 200 }
      );
    } else {
      throw new Error('Failed to upsert document');
    }
  } catch (error: any) {
    console.error('Error saving user-selected facets:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * PUT Method
 * Updates existing user-selected facets
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Check if the document exists
    try {
      await elasticsearch.head(`/${INDEX}/_doc/${body.userId}`);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    // Update the user-selected facets
    const updateBody = {
      doc: {
        ...body,
      },
    };

    const response = await elasticsearch.post(
      `/${INDEX}/_update/${body.userId}`,
      updateBody,
      { params: { refresh: 'wait_for' } }
    );

    if (response.status === 200) {
      return NextResponse.json(
        { message: 'Selections updated successfully' },
        { status: 200 }
      );
    } else {
      throw new Error('Failed to update document');
    }
  } catch (error: any) {
    console.error('Error updating user-selected facets:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE Method
 * Deletes user-selected facets based on userId
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Delete the user-selected facets
    const response = await elasticsearch.delete(`/${INDEX}/_doc/${body.userId}`, {
      params: { refresh: 'wait_for' },
    });

    if (response.status === 200) {
      return NextResponse.json(
        { message: 'Selections deleted successfully' },
        { status: 200 }
      );
    } else {
      throw new Error('Failed to delete document');
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    console.error('Error deleting user-selected facets:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
