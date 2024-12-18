const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

// Elasticsearch configuration from environment variables
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';

/**
 * Displays usage instructions.
 */
function showUsage() {
    console.log(`
Usage: node ./utils/upload-single-triples-index.js <index_name>

Description:
    Uploads a single Elasticsearch index with data and mappings.
    The index name must match the data and mapping filenames.

Parameters:
    <index_name>    Name of the Elasticsearch index to create/upload.
                    The script expects the following files:
                      - json-output/brands_triples/<index_name>.json
                      - json-output/mappings/<index_name>_mapping.json

Example:
    node ./utils/upload-single-index.js brands_triples
    `);
    process.exit(1);
}

/**
 * Reads and parses a JSON file.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Object} - Parsed JSON content.
 */
function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`❌ Error reading or parsing JSON file at ${filePath}:`, error.message);
        process.exit(1);
    }
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
        };

        let body = {};

        if (mappings) {
            body = mappings; // Correct assignment without nesting
            console.log(`📝 Creating index "${indexName}" with mappings...`);
        } else {
            console.log(`📝 Creating index "${indexName}" without mappings...`);
        }

        // Check if index already exists
        try {
            await axios.head(url, config);
            console.log(`ℹ️  Index "${indexName}" already exists. Skipping creation.`);
            return;
        } catch (headError) {
            if (headError.response && headError.response.status === 404) {
                // Index does not exist, proceed to create
                await axios.put(url, body, config);
                console.log(`✅ Index "${indexName}" created successfully.`);
            } else {
                throw headError;
            }
        }
    } catch (error) {
        console.error(`❌ Failed to create index "${indexName}":`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        process.exit(1);
    }
}

/**
 * Uploads data to Elasticsearch using the Bulk API.
 * @param {string} indexName - Name of the index.
 * @param {Array} data - Array of documents to upload.
 */
async function uploadData(indexName, data) {
    try {
        console.log(`📤 Uploading data to index "${indexName}"...`);

        // Prepare bulk request body
        const bulkBody = data.flatMap(doc => {
            const action = { index: { _index: indexName, _id: doc.subject } };
            return [action, doc];
        });

        // Convert to NDJSON format
        const ndjson = bulkBody.map(line => JSON.stringify(line)).join('\n') + '\n';

        const url = `${ELASTICSEARCH_URL}/_bulk`;
        const config = {
            headers: {
                'Content-Type': 'application/x-ndjson',
            },
        };

        // Send bulk request
        const response = await axios.post(url, ndjson, config);

        if (response.data.errors) {
            console.error(`⚠️  Errors occurred while uploading data to "${indexName}":`);
            response.data.items.forEach((item, idx) => {
                if (item.index && item.index.error) {
                    console.error(` - Document ${idx + 1}:`, JSON.stringify(item.index.error, null, 2));
                }
            });
        } else {
            console.log(`✅ Successfully uploaded data to index "${indexName}".`);
        }
    } catch (error) {
        console.error(`❌ Failed to upload data to index "${indexName}":`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        process.exit(1);
    }
}

/**
 * Reads and parses JSON files from a directory.
 * @param {string} dirPath - Path to the directory containing JSON files.
 * @returns {Array} - Array of documents to index.
 */
function readJSONFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    console.log(`Reading files from: ${dirPath}`);
    const data = [];

    files.forEach((file) => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            let parsedContent;
            try {
                parsedContent = JSON.parse(content);
            } catch (error) {
                console.error(`❌ Failed to parse JSON in file "${file}": ${error.message}`);
                return; // Skip this file
            }

            if (parsedContent && parsedContent.subject && Array.isArray(parsedContent.triples)) {
                // Filter out triples with null or undefined objects
                const validTriples = parsedContent.triples.filter(triple => triple.object !== null && triple.object !== undefined);
                if (validTriples.length > 0) {
                    // Assign back the valid triples
                    parsedContent.triples = validTriples.map(triple => ({
                        predicate: triple.predicate,
                        object: triple.object,
                        citation: triple.citation
                    }));
                    // Push the entire document, including flat fields
                    data.push(parsedContent);
                } else {
                    console.warn(`⚠️  No valid triples found in file "${file}". Skipping.`);
                }
            } else {
                console.warn(`⚠️  Invalid structure in file "${file}". Expected "subject" and "triples". Skipping.`);
            }
        }
    });

    return data;
}


/**
 * Main function to upload a single index.
 */
async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        showUsage();
    }

    const indexName = args[0];

    // Define paths relative to project root
    const dataDirPath = path.join(process.cwd(), 'json-output', 'brands_triples'); // Directory containing the triple files
    const mappingFilePath = path.join(process.cwd(), 'json-output', 'mappings', `${indexName}_mapping.json`);

    // Read data from JSON files
    const data = readJSONFiles(dataDirPath);

    if (!Array.isArray(data) || data.length === 0) {
        console.error('❌ No data found to upload.');
        process.exit(1);
    }

    // Read mappings if exists
    let mappings = null;
    if (fs.existsSync(mappingFilePath)) {
        mappings = readJSONFile(mappingFilePath);
    } else {
        console.warn(`⚠️  Mapping file not found at path: ${mappingFilePath}. Proceeding without mappings.`);
    }

    // Create index with mappings (if any)
    await createIndex(indexName, mappings);

    // Upload data
    await uploadData(indexName, data);

    console.log(`🎉 Upload process for index "${indexName}" completed successfully.`);
    process.exit(0);
}

// Include createIndex function from earlier
// (If you have it in a separate module, you can import it. Otherwise, ensure it's included here.)

main();
