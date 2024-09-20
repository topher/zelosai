// utils/scripts/import-data.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

// Elasticsearch endpoint
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';

// Directory containing JSON files
const jsonDir = path.join(__dirname, '../json-output');

// Function to upload JSON data to Elasticsearch
async function uploadFileToElasticsearch(indexName, filePath, mappingFilePath = null) {
    try {
        // If a mapping file is provided, set up the index with mappings
        if (mappingFilePath && fs.existsSync(mappingFilePath)) {
            const mappingData = fs.readFileSync(mappingFilePath, 'utf8');
            const mappingJson = JSON.parse(mappingData);

            // Create the index with mapping
            await axios.put(`${ELASTICSEARCH_URL}/${indexName}`, mappingJson, {
                auth: {
                    username: process.env.ELASTIC_USERNAME,
                    password: process.env.ELASTIC_PASSWORD
                }
            });
            console.log(`Index ${indexName} created with mapping.`);
        } else {
            // Create the index without mapping
            await axios.put(`${ELASTICSEARCH_URL}/${indexName}`, {}, {
                auth: {
                    username: process.env.ELASTIC_USERNAME,
                    password: process.env.ELASTIC_PASSWORD
                }
            });
            console.log(`Index ${indexName} created without mapping.`);
        }

        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');

        // Parse JSON data
        const jsonData = JSON.parse(data);

        if (!Array.isArray(jsonData)) {
            throw new Error('JSON data is not an array');
        }

        // Prepare bulk request body
        const bulkBody = jsonData.flatMap(doc => [{ index: { _index: indexName, _id: doc.id || undefined } }, doc]);

        // Convert bulk body to NDJSON format
        const ndjson = bulkBody.map(line => JSON.stringify(line)).join('\n') + '\n';

        // Send bulk request to Elasticsearch
        const response = await axios.post(`${ELASTICSEARCH_URL}/_bulk`, ndjson, {
            headers: { 'Content-Type': 'application/x-ndjson' },
            auth: {
                username: process.env.ELASTIC_USERNAME,
                password: process.env.ELASTIC_PASSWORD
            }
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

// Read all JSON files in the directory and upload them
async function bulkImport() {
    try {
        const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));

        for (const file of files) {
            const indexName = path.basename(file, '.json');
            const filePath = path.join(jsonDir, file);
            const mappingFilePath = path.join(jsonDir, 'mappings', `${indexName}_mapping.json`);
            await uploadFileToElasticsearch(indexName, filePath, mappingFilePath);
        }

        console.log('Bulk import completed.');
        process.exit(0);
    } catch (err) {
        console.error('Failed to perform bulk import:', err);
        process.exit(1);
    }
}

bulkImport();
