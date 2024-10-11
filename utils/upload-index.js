// utils/upload-index.js

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

// Elasticsearch configuration from environment variables
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME;
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;

/**
 * Displays usage instructions.
 */
function showUsage() {
    console.log(`
Usage: node ./utils/upload-index.js <index_name> [--folder] [--limit <number>]

Description:
    Uploads data to an Elasticsearch index with optional mappings.
    Supports both a single JSON file containing multiple documents and a directory of multiple JSON files, each representing a single document.

Parameters:
    <index_name>    Name of the Elasticsearch index to create/upload.
                    The script expects the following files based on input type:
                      - If --folder is not used:
                          - json-output/<index_name>.json
                      - If --folder is used:
                          - json-output/<index_name>/ (directory containing multiple JSON files)
                    - Optional mapping file:
                          - json-output/mappings/<index_name>_mapping.json

    --folder        (Optional) Indicates that the input path is a directory containing multiple JSON files.
    
    --limit <num>   (Optional) Number of documents to process. Defaults to 10 if not specified.

Examples:
    # Upload from a single JSON file with multiple documents
    node ./utils/upload-index.js athletes_triples

    # Upload from a directory containing multiple JSON files
    node ./utils/upload-index.js athletes_triples --folder

    # Upload with a specific limit
    node ./utils/upload-index.js athletes_triples --folder --limit 20
    `);
    process.exit(1);
}

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
        process.exit(1);
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

        let body = {};

        if (mappings) {
            body = mappings; // Use the entire mapping file content as-is
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
        console.log(`📤 Uploading ${data.length} documents to index "${indexName}"...`);

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
            auth: ELASTICSEARCH_USERNAME && ELASTICSEARCH_PASSWORD ? {
                username: ELASTICSEARCH_USERNAME,
                password: ELASTICSEARCH_PASSWORD
            } : undefined
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
            console.log(`✅ Successfully uploaded ${data.length} documents to index "${indexName}".`);
        }
    } catch (error) {
        console.error(`❌ Failed to upload data to index "${indexName}":`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        process.exit(1);
    }
}

/**
 * Converts specified fields into arrays while leaving others as strings.
 * Only 'hobbies', 'occupation', 'family', and 'languages_spoken' are converted to arrays.
 * @param {Object} doc - The original document.
 * @returns {Object} - The transformed document with selective field parsing.
 */
function transformDocument(doc) {
    const fieldsToParse = ['hobbies', 'occupation', 'family', 'languages_spoken'];
    const transformedDoc = { ...doc };

    fieldsToParse.forEach(field => {
        if (typeof transformedDoc[field] === 'string') {
            const { itemsList } = processCommasAndCitations(transformedDoc[field]);
            transformedDoc[field] = itemsList;
        } else if (Array.isArray(transformedDoc[field])) {
            transformedDoc[field] = transformedDoc[field].map(item => {
                if (typeof item === 'string') {
                    const { itemsList } = processCommasAndCitations(item);
                    return itemsList;
                }
                return item;
            }).flat();
        }
    });

    return transformedDoc;
}

/**
 * Processes a comma-separated field, extracts citations, and returns an array of items.
 * @param {string} value - The field value to process.
 * @returns {Object} - Contains itemsList and citation.
 */
function processCommasAndCitations(value) {
    if (!value) {
        return { itemsList: [], citation: null };
    }
    const { itemsList } = processCommasAndCitationsHelper(value);
    return { itemsList, citation: null };
}

/**
 * Helper function to split by commas and handle citations if needed.
 * @param {string} text - The text to process.
 * @returns {Object} - Contains itemsList and citation.
 */
function processCommasAndCitationsHelper(text) {
    // Assuming no citations for simplicity
    const items = text.split(/[\n,]+/).map(item => item.trim().replace(/\.$/, '')).filter(item => item);
    return { itemsList: items, citation: null };
}

/**
 * Main function to upload data to Elasticsearch.
 */
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1 || args.length > 3) {
        showUsage();
    }

    const indexName = args[0];
    let isFolder = false;
    let limit = 10; // Default limit

    // Parse additional arguments
    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--folder') {
            isFolder = true;
        } else if (args[i] === '--limit') {
            if (i + 1 < args.length) {
                limit = parseInt(args[i + 1], 10);
                if (isNaN(limit) || limit <= 0) {
                    console.error('❌ Invalid limit value. It must be a positive integer.');
                    process.exit(1);
                }
                i++; // Skip next argument as it's the limit value
            } else {
                console.error('❌ --limit flag requires a number.');
                showUsage();
            }
        } else {
            console.error(`❌ Unknown argument: ${args[i]}`);
            showUsage();
        }
    }

    // Define file paths based on index name and input type
    const dataFilePath = path.join(process.cwd(), 'json-output', `${indexName}.json`);
    const dataDirPath = path.join(process.cwd(), 'json-output', `${indexName}`);
    const mappingFilePath = path.join(process.cwd(), 'json-output', 'mappings', `${indexName}_mapping.json`);

    // Read mappings if exists
    let mappings = null;
    if (fs.existsSync(mappingFilePath)) {
        mappings = readJSONFile(mappingFilePath);
    } else {
        console.warn(`⚠️  Mapping file not found at path: ${mappingFilePath}. Proceeding without mappings.`);
    }

    // Create index with mappings (if any)
    await createIndex(indexName, mappings);

    let data = [];

    if (isFolder) {
        // Input path should be a directory
        if (!fs.existsSync(dataDirPath) || !fs.statSync(dataDirPath).isDirectory()) {
            console.error(`❌ Data directory not found at path: ${dataDirPath}`);
            process.exit(1);
        }

        data = readJSONFilesFromDirectory(dataDirPath);
    } else {
        // Input path should be a file
        if (!fs.existsSync(dataFilePath) || !fs.statSync(dataFilePath).isFile()) {
            console.error(`❌ Data file not found at path: ${dataFilePath}`);
            process.exit(1);
        }

        console.log(`📄 Reading data from file: ${dataFilePath}`);
        const fileData = readJSONFile(dataFilePath);

        if (Array.isArray(fileData)) {
            data = fileData.slice(0, limit);
        } else if (typeof fileData === 'object') {
            data = [fileData];
        } else {
            console.error('❌ Invalid JSON structure. Expected an object or an array of objects.');
            process.exit(1);
        }
    }

    // Apply limit
    if (data.length > limit) {
        data = data.slice(0, limit);
    }

    if (data.length === 0) {
        console.error('❌ No valid data found to upload.');
        process.exit(1);
    }

    // Transform documents
    data = data.map(doc => transformDocument(doc));

    // Upload data
    await uploadData(indexName, data);

    console.log(`🎉 Upload process for index "${indexName}" completed successfully.`);
    process.exit(0);
}

// Execute the main function
main();
