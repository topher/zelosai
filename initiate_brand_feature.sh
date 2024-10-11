#!/bin/bash

# =============================================================================
# Script: write_api_routes.sh
# Description: Automatically populates empty route.ts files for specified
#              Next.js API routes with boilerplate code.
# =============================================================================

# List of entities for which to generate route.ts files
entities=(
  "marketing_channels"
  "markets"
  "industries"
  "vals_segments"
  "languages"
  "nil_activities"
)

# Directory where API routes are located
api_base_dir="./app/api"

# Function to display script usage
usage() {
  echo "Usage: $0"
  echo "This script populates empty route.ts files for specified API entities."
  echo "Ensure that the route.ts files exist and are empty before running."
  exit 1
}

# Check if the API base directory exists
if [[ ! -d "$api_base_dir" ]]; then
  echo "Error: API base directory '$api_base_dir' does not exist."
  exit 1
fi

# Iterate over each entity
for entity in "${entities[@]}"; do
  # Define the path to the route.ts file for the current entity
  route_file="${api_base_dir}/${entity}/route.ts"

  # Check if the route.ts file exists
  if [[ -f "$route_file" ]]; then
    # Check if the file is empty
    if [[ ! -s "$route_file" ]]; then
      echo "Populating route.ts for entity: ${entity}"

      # Write the boilerplate code into the route.ts file
      cat <<EOF > "$route_file"
import { NextResponse } from 'next/server';
import { fetchStaticData, filterData } from '../../../lib/staticData';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids')?.split(',');
  const query = url.searchParams.get('query') || '';
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);

  try {
    const data = await fetchStaticData('${entity}');
    const filtered = filterData(data, ids, query, limit);

    return NextResponse.json({ data: filtered });
  } catch (error) {
    console.error('Error fetching ${entity}:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
EOF

      echo "✅ route.ts for '${entity}' has been populated successfully."
    else
      echo "ℹ️  Skipping '${entity}': route.ts is not empty."
    fi
  else
    echo "⚠️  Skipping '${entity}': route.ts does not exist at '${route_file}'."
  fi
done

echo "🎉 API route population completed."
