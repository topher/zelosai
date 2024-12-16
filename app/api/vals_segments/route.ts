// /app/api/vals_segments/route.ts

import { NextResponse } from 'next/server';
import { fetchStaticData, filterData } from '../../../lib/staticData';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const idsParam = url.searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',') : undefined;
  const query = url.searchParams.get('query') || '';
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 10;

  console.log(`Received GET request for /api/vals_segments with parameters: ids=${idsParam}, query="${query}", limit=${limit}`);

  try {
    const data = await fetchStaticData('vals_segments');
    
    if (!Array.isArray(data)) {
      console.error('Data fetched is not an array:', data);
      return NextResponse.json(
        { error: 'Internal Server Error: Invalid data format' },
        { status: 500 }
      );
    }

    const filtered = filterData(data, ids, query, limit);
    console.log(`Filtered data count: ${filtered.length}`);

    return NextResponse.json({ data: filtered });
  } catch (error) {
    console.error('Error fetching vals_segments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
