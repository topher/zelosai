const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Elasticsearch endpoint
const ELASTICSEARCH_URL = 'http://localhost:9200';

// Directory containing JSON files
const jsonDir = path.join(__dirname, 'json-output');

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

        // Prepare bulk request body
        const bulkBody = jsonData.flatMap(doc => [{ index: { _index: indexName } }, doc]);

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

// Read all JSON files in the directory and upload them
fs.readdir(jsonDir, (err, files) => {
    if (err) {
        console.error('Failed to read JSON directory:', err);
        return;
    }

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const indexName = path.basename(file, '.json');
            const filePath = path.join(jsonDir, file);
            uploadFileToElasticsearch(indexName, filePath);
        }
    });
});
