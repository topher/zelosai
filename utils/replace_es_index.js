const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Elasticsearch endpoint
const ELASTICSEARCH_URL = 'http://localhost:9200';

// Directory containing JSON files
const jsonDir = path.join('json-output');

// Function to delete an Elasticsearch index
async function deleteIndex(indexName) {
    try {
        await axios.delete(`${ELASTICSEARCH_URL}/${indexName}`);
        console.log(`Index ${indexName} deleted.`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(`Index ${indexName} does not exist, no need to delete.`);
        } else {
            console.error(`Error deleting index ${indexName}:`, error.message);
        }
    }
}

// Function to create an Elasticsearch index with or without mapping
async function createIndex(indexName, mappingFilePath) {
    try {
        let mappingJson = {};
        if (mappingFilePath && fs.existsSync(mappingFilePath)) {
            const mappingData = fs.readFileSync(mappingFilePath, 'utf8');
            mappingJson = JSON.parse(mappingData);
        }
        
        // Create the index (with or without mapping)
        await axios.put(`${ELASTICSEARCH_URL}/${indexName}`, mappingJson);
        console.log(`Index ${indexName} created${mappingFilePath ? ' with mapping' : ''}.`);
    } catch (error) {
        console.error(`Failed to create index ${indexName}:`, error.message);
    }
}

// Function to upload JSON data to Elasticsearch
async function uploadFileToElasticsearch(indexName, filePath) {
    try {
        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');
        
        // Parse JSON data
        const jsonData = JSON.parse(data);
        
        if (!Array.isArray(jsonData)) {
            throw new Error('JSON data is not an array');
        }

        // Determine if _id should be set to userId
        const setIdFromUserId = indexName === 'user_selected_facets';

        // Prepare bulk request body
        const bulkBody = jsonData.flatMap(doc => {
            let _id = undefined;

            if (setIdFromUserId) {
                if (!doc.userId) {
                    throw new Error(`Document is missing userId: ${JSON.stringify(doc)}`);
                }
                _id = doc.userId;
            } else {
                // For other indices, use doc.id if exists, else let Elasticsearch auto-generate
                if (doc.id) {
                    _id = doc.id;
                }
            }

            const action = { index: { _index: indexName } };
            if (_id) {
                action.index._id = _id;
            }

            return [action, doc];
        });

        // Convert bulk body to NDJSON format
        const ndjson = bulkBody.map(line => JSON.stringify(line)).join('\n') + '\n';

        // Send bulk request to Elasticsearch
        const response = await axios.post(`${ELASTICSEARCH_URL}/_bulk`, ndjson, {
            headers: { 'Content-Type': 'application/x-ndjson' }
        });

        if (response.data.errors) {
            console.error(`Errors occurred while indexing data to ${indexName}:`, response.data.items);
        } else {
            console.log(`Successfully uploaded data to index ${indexName}`);
        }
    } catch (error) {
        console.error(`Failed to upload ${filePath} to index ${indexName}:`, error.message);
    }
}

// Function to replace an existing Elasticsearch index
async function replaceIndex(indexName) {
    const filePath = path.join(jsonDir, `${indexName}.json`);
    const mappingFilePath = path.join(jsonDir, 'mappings', `${indexName}_mapping.json`);

    // Check if the JSON file exists
    if (!fs.existsSync(filePath)) {
        console.error(`JSON file for index ${indexName} does not exist at path ${filePath}`);
        return;
    }

    // Delete the existing index if it exists
    await deleteIndex(indexName);

    // Create the index (with or without mapping)
    await createIndex(indexName, fs.existsSync(mappingFilePath) ? mappingFilePath : null);

    // Upload the new data to Elasticsearch
    await uploadFileToElasticsearch(indexName, filePath);
}

// Get the index name from the command-line arguments
const indexName = process.argv[2];

if (!indexName) {
    console.error('Please provide an index name as an argument.');
    process.exit(1);
}

// Replace the specified index
replaceIndex(indexName);
