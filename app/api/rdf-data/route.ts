// Filename: app/api/rdf-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import loadRDFData from '../../utils/loadRDFData';

export async function GET(req: NextRequest) {
    try {
        const store = await loadRDFData('sample_data.ttl');
        // console.log('RDF Data Store:', store);

        return new NextResponse(JSON.stringify(store), {
            status: 200
        });
    } catch (error) {
        console.error('Error in API route:', error);

        return new NextResponse(JSON.stringify({ error: 'Failed to load RDF data' }), {
            status: 500
        });
    }
}
