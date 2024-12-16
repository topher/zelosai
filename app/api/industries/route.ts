import { NextResponse } from 'next/server';
import { fetchStaticData, filterData } from '../../../lib/staticData';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids')?.split(',');
  const query = url.searchParams.get('query') || '';
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);

  try {
    const data = await fetchStaticData('industries');
    const filtered = filterData(data, ids, query, limit);

    return NextResponse.json({ data: filtered });
  } catch (error) {
    console.error('Error fetching industries:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
