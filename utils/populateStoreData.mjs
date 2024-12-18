// scripts/populateStoreData.mjs

import fs from 'fs';
import path from 'path';
import { Client } from '@elastic/elasticsearch';

// Initialize Elasticsearch client
const esClient = new Client({ node: 'http://localhost:9200' });

// Path to the mapping file
const mappingFilePath = path.join(process.cwd(), 'json-output', 'mappings', 'storedata_mapping.json');

// Directory containing JSON resource files
const dataDirectory = path.join(process.cwd(), 'json-output', 'resources');

// Define resource mapping (for reference; already handled in the mapping file)
const resourceMapping = {
  contracts: 'ContractModel',
  user_defined_model_categories: 'UserDefinedModelCategory',
  workflows: 'Workflow',
  complete_trained_models: 'AIModel',
  connectors: 'DataConnector',
  info_assets: 'InfoAsset',
  topics: 'Topic',
  goals: 'Goal',
  issues: 'StrategicIssue',
  use_cases: 'UseCase',
  agents: 'Agent',
  business_model_cards: 'BusinessModelCard',
  brand_model_cards: 'BrandModelCard'
  // Add other mappings as needed
};

// Function to check if an index exists
async function indexExists(index) {
  try {
    return await esClient.indices.exists({ index });
  } catch (error) {
    console.error(`❌ Error checking if index "${index}" exists:`, error);
    throw error;
  }
}

// Function to create the index with mappings
async function createIndex(index, mapping) {
  try {
    await esClient.indices.create({
      index,
      body: mapping
    });
    console.log(`✅ Created index "${index}" with provided mappings.`);
  } catch (error) {
    console.error(`❌ Error creating index "${index}":`, error.meta?.body || error);
    throw error;
  }
}

// Function to delete an existing index
async function deleteIndex(index) {
  try {
    await esClient.indices.delete({ index });
    console.log(`🗑️  Deleted existing index "${index}".`);
  } catch (error) {
    console.error(`❌ Error deleting index "${index}":`, error.meta?.body || error);
    throw error;
  }
}

// Function to load and parse the mapping file
function loadMapping(filePath) {
  try {
    const mapping = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return mapping;
  } catch (error) {
    console.error(`❌ Failed to load or parse mapping file "${filePath}":`, error.message);
    throw error;
  }
}

// Function to populate storedata
async function populateStoreData() {
  const indexName = 'storedata';
  
  try {
    // Check if index exists
    const exists = await indexExists(indexName);
    
    if (exists.body) {
      console.log(`🟡 Index "${indexName}" already exists. Deleting it for fresh setup.`);
      await deleteIndex(indexName);
    }
    
    // Load mapping
    const mapping = loadMapping(mappingFilePath);
    
    // Create index with mapping
    await createIndex(indexName, mapping);
    
    const files = fs.readdirSync(dataDirectory);
    
    for (const file of files) {
      // Only process JSON files
      if (path.extname(file) !== '.json') {
        console.warn(`⚠️  Skipping non-JSON file: ${file}`);
        continue;
      }
    
      const resourceName = path.basename(file, '.json'); // e.g., 'contracts'
      const resourceType = resourceMapping[resourceName];
    
      if (!resourceType) {
        console.warn(`⚠️  No resourceType mapping found for "${resourceName}", skipping...`);
        continue;
      }
    
      const filePath = path.join(dataDirectory, file);
      let data;
      try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (parseError) {
        console.error(`❌ Failed to parse JSON in file "${file}":`, parseError.message);
        continue; // Skip this file
      }
    
      // Ensure data is an array
      const documents = Array.isArray(data) ? data : [data];
    
      for (const doc of documents) {
        const resourceId = doc.id || doc.resourceId || `resource_${Date.now()}`;
    
        // Add resourceType and other necessary fields
        const storeDataDoc = {
          resourceId,
          orgId: doc.orgId || null, // Assign orgId if available
          resourceType,
          data: doc,
          createdAt: doc.createdAt || new Date().toISOString(),
          updatedAt: doc.updatedAt || new Date().toISOString(),
        };
    
        try {
          // Index the document into storedata
          await esClient.index({
            index: indexName,
            id: resourceId,
            body: storeDataDoc,
          });
    
          console.log(`✅ Indexed resourceId: "${resourceId}" as "${resourceType}"`);
        } catch (indexError) {
          console.error(`❌ Failed to index resourceId: "${resourceId}"`, indexError.meta?.body || indexError);
        }
      }
    
      console.log(`✅ Completed indexing for file "${file}" as "${resourceType}"`);
    }
    
    // Refresh the index to make all operations searchable immediately
    await esClient.indices.refresh({ index: indexName });
    console.log('🎉 All data has been indexed into "storedata" and the index has been refreshed.');
  } catch (error) {
    console.error('❌ Error populating storedata:', error);
  } finally {
    // Properly close the Elasticsearch client
    await esClient.close();
  }
}

// Execute the script
populateStoreData();
