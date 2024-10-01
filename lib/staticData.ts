import { promises as fs } from 'fs';
import path from 'path';

export type StaticEntity = {
  id: string;
  name: string;
  [key: string]: any;
};

let cache: { [key: string]: StaticEntity[] } = {};

export async function fetchStaticData(entity: string): Promise<StaticEntity[]> {
  if (cache[entity]) {
    console.log(`Cache hit for entity: ${entity}`);
    return cache[entity];
  }

  const filePath = path.join(process.cwd(), 'public', 'preset_data', `${entity}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed: any = JSON.parse(data);
    
    // Ensure the parsed data is an array
    if (!Array.isArray(parsed)) {
      console.error(`Parsed data for entity "${entity}" is not an array.`);
      return [];
    }
    
    const staticEntities: StaticEntity[] = parsed;
    cache[entity] = staticEntities;
    console.log(`Fetched and cached data for entity: ${entity}`);
    return staticEntities;
  } catch (error) {
    console.error(`Error reading static data for ${entity}:`, error);
    return [];
  }
}

export function filterData(
  data: StaticEntity[],
  ids?: string[],
  query?: string,
  limit: number = 10
): StaticEntity[] {
  console.log(`Filtering data. Initial count: ${data.length}`);

  let filtered = data;

  if (ids && ids.length > 0) {
    const idSet = new Set(ids);
    filtered = filtered.filter(item => idSet.has(item.id));
    console.log(`After filtering by IDs (${ids.join(', ')}): ${filtered.length}`);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(item => {
      const itemName = typeof item.name === 'string' ? item.name.toLowerCase() : '';
      return itemName.includes(lowerQuery);
    });
    console.log(`After filtering by query ("${query}"): ${filtered.length}`);
  }

  // Ensure 'filtered' is an array before slicing
  if (!Array.isArray(filtered)) {
    console.error('Filtered data is not an array:', filtered);
    return [];
  }

  // If limit is 0 or negative, return all items
  if (limit > 0) {
    const sliced = filtered.slice(0, limit);
    console.log(`After slicing to limit (${limit}): ${sliced.length}`);
    return sliced;
  } else {
    console.log(`No limit applied. Returning all items: ${filtered.length}`);
    return filtered;
  }
}
