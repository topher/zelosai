const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

// Elasticsearch configuration from environment variables
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME;
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;

/**
 * Reads and parses a JSON file.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Object|Array} - Parsed JSON content.
 */
function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`❌ Error reading or parsing JSON file at ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Reads and aggregates data from a directory containing multiple JSON files.
 * @param {string} dirPath - Path to the directory containing JSON files.
 * @returns {Array} - Array of parsed documents.
 */
function readJSONFilesFromDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    console.log(`📂 Reading files from directory: ${dirPath}`);
    const data = [];

    files.forEach((file) => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dirPath, file);
            const fileData = readJSONFile(filePath);
            if (fileData) {
                // If the JSON file contains an array of documents
                if (Array.isArray(fileData)) {
                    data.push(...fileData);
                } else {
                    // Single document
                    data.push(fileData);
                }
            }
        }
    });

    return data;
}

/**
 * Creates an Elasticsearch index with optional mappings.
 * @param {string} indexName - Name of the index.
 * @param {Object} [mappings=null] - Optional mappings object.
 */
async function createIndex(indexName, mappings = null) {
    try {
        const url = `${ELASTICSEARCH_URL}/${indexName}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: ELASTICSEARCH_USERNAME && ELASTICSEARCH_PASSWORD ? {
                username: ELASTICSEARCH_USERNAME,
                password: ELASTICSEARCH_PASSWORD
            } : undefined
        };

        let body = mappings || {};

        // Check if index already exists
        try {
            await axios.head(url, config);
            console.log(`ℹ️  Index "${indexName}" already exists. Skipping creation.`);
            return;
        } catch (headError) {
            if (headError.response && headError.response.status === 404) {
                await axios.put(url, body, config);
                console.log(`✅ Index "${indexName}" created successfully.`);
            } else {
                throw headError;
            }
        }
    } catch (error) {
        console.error(`❌ Failed to create index "${indexName}":`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
}

/**
 * Deletes an Elasticsearch index if it exists.
 * @param {string} indexName - Name of the index to delete.
 */
async function deleteIndexIfExists(indexName) {
    try {
        const url = `${ELASTICSEARCH_URL}/${indexName}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: ELASTICSEARCH_USERNAME && ELASTICSEARCH_PASSWORD ? {
                username: ELASTICSEARCH_USERNAME,
                password: ELASTICSEARCH_PASSWORD
            } : undefined
        };

        // Check if the index exists
        try {
            await axios.head(url, config);
            // If it exists, delete it
            await axios.delete(url, config);
            console.log(`🗑️  Index "${indexName}" deleted.`);
        } catch (headError) {
            if (headError.response && headError.response.status === 404) {
                console.log(`ℹ️  Index "${indexName}" does not exist. No need to delete.`);
            } else {
                throw headError;
            }
        }
    } catch (error) {
        console.error(`❌ Failed to delete index "${indexName}":`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
}

/**
 * Uploads data to Elasticsearch using the Bulk API.
 * @param {string} indexName - Name of the index.
 * @param {Array} data - Array of documents to upload.
 */
async function uploadData(indexName, data) {
    try {
        console.log(`📤 Uploading ${data.length} documents to index "${indexName}"...`);

        // 🔄 Determine the ID field
        const idField = 'id'; // Change this if your ID field has a different name

        const bulkBody = data.flatMap(doc => {
            // Ensure that only triples are uploaded to 'triples' index
            if (indexName.toLowerCase() === 'triples' && doc.resourceType !== 'Triple') {
                console.warn(`⚠️  Document with id "${doc.id}" is not a Triple. Skipping document.`);
                return []; // Skip non-triples
            }

            // Extract simple ID from subject URI if necessary
            if (!doc[idField] && doc.subject) {
                const subjectUriParts = doc.subject.split('/');
                doc.id = subjectUriParts[subjectUriParts.length - 1]; // Use the last part as the ID
                // Store RDF URI separately
                doc.rdf_uri = doc.subject;
            }

            const docId = doc[idField] || doc.subject || doc.id;
            if (!docId) {
                console.warn(`⚠️  Document missing ID field. Skipping document:`, doc);
                return []; // Skip documents without an ID
            }

            return [{ index: { _index: indexName, _id: docId } }, doc];
        });

        if (bulkBody.length === 0) {
            console.warn(`⚠️  No valid documents to upload for index "${indexName}".`);
            return;
        }

        // Convert to NDJSON format
        const ndjson = bulkBody.map(line => JSON.stringify(line)).join('\n') + '\n';

        // Send bulk request
        const response = await axios.post(`${ELASTICSEARCH_URL}/_bulk`, ndjson, {
            headers: {
                'Content-Type': 'application/x-ndjson',
            },
            auth: ELASTICSEARCH_USERNAME && ELASTICSEARCH_PASSWORD ? {
                username: ELASTICSEARCH_USERNAME,
                password: ELASTICSEARCH_PASSWORD
            } : undefined
        });

        if (response.data.errors) {
            console.error(`⚠️  Errors occurred while uploading data to "${indexName}":`);
            response.data.items.forEach((item, idx) => {
                if (item.index && item.index.error) {
                    console.error(` - Document ${idx + 1}:`, JSON.stringify(item.index.error, null, 2));
                }
            });
        } else {
            console.log(`✅ Successfully uploaded ${data.length} documents to index "${indexName}".`);
        }
    } catch (error) {
        console.error(`❌ Failed to upload data to index "${indexName}":`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
}

/**
 * Main function to perform bulk import from both general and resources directories.
 */
async function bulkImport() {
    try {
        const baseJsonDir = path.join(__dirname, '../json-output');
        const resourcesDir = path.join(baseJsonDir, 'resources');

        // Define directories to process: general json-output and resources
        const directoriesToProcess = [
            { path: baseJsonDir, isResource: false },
            { path: resourcesDir, isResource: true }
        ];

        for (const dir of directoriesToProcess) {
            if (fs.existsSync(dir.path) && fs.statSync(dir.path).isDirectory()) {
                const files = fs.readdirSync(dir.path).filter(file => file.endsWith('.json'));

                for (const file of files) {
                    const indexName = path.basename(file, '.json');
                    const filePath = path.join(dir.path, file);
                    const mappingFilePath = path.join(baseJsonDir, 'mappings', `${indexName}_mapping.json`);

                    let mappings = null;
                    if (fs.existsSync(mappingFilePath)) {
                        mappings = readJSONFile(mappingFilePath);
                    } else {
                        console.log(`⚠️  Mapping file not found for index "${indexName}". Proceeding without mappings.`);
                    }

                    // Delete the existing index if it exists
                    await deleteIndexIfExists(indexName);

                    // Create the index (with or without mappings)
                    await createIndex(indexName, mappings);

                    // Read data
                    let data = readJSONFile(filePath);

                    if (Array.isArray(data)) {
                        // Upload the data
                        await uploadData(indexName, data);
                    } else if (typeof data === 'object') {
                        // Upload the single document
                        await uploadData(indexName, [data]);
                    } else {
                        console.error(`❌ Invalid data format in file "${file}". Expected an array of documents or a single document.`);
                    }
                }
            } else {
                console.log(`ℹ️  Directory not found or not a directory: ${dir.path}. Skipping.`);
            }
        }

        console.log('🎉 Bulk import completed.');
    } catch (err) {
        console.error('❌ Failed to perform bulk import:', err);
    }
}

bulkImport();
