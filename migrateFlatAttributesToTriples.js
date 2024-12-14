"use strict";
// migrateFlatAttributesToTriples.ts
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var uuid_1 = require("uuid");
// Define the resource schema properties (common to all resources)
var resourceSchemaProperties = [
    'id',
    'accountId',
    'resourceType',
    'ownerId',
    'createdAt',
    'updatedAt',
    'tags',
    'visibility',
    'linkedResources',
    'subjectId',
    // Add other common properties if any
];
// Properties to exclude from being converted into triples
var excludedProperties = [
    'subject',
    'predicate',
    'object',
    'citation',
    'profile_id',
    'rdf_uri',
    // Add other properties to exclude if necessary
];
// ResourceType enum
var ResourceType;
(function (ResourceType) {
    ResourceType["Triple"] = "Triple";
    ResourceType["ScalarString"] = "ScalarString";
    ResourceType["ScalarInt"] = "ScalarInt";
    ResourceType["ScalarFloat"] = "ScalarFloat";
    ResourceType["ScalarBoolean"] = "ScalarBoolean";
    ResourceType["ScalarDate"] = "ScalarDate";
    // Add other resource types as needed
})(ResourceType || (ResourceType = {}));
// Function to convert string to snake_case
function toSnakeCase(str) {
    return str
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/([A-Z])/g, '_$1') // Add underscore before capital letters
        .replace(/__+/g, '_') // Replace multiple underscores with a single one
        .toLowerCase()
        .replace(/^_/, ''); // Remove leading underscore
}
// Helper function to check if a value is a valid date
function isValidDate(value) {
    var date = new Date(value);
    return !isNaN(date.getTime());
}
// Get current date-time for createdAt and updatedAt
function getCurrentDateTime() {
    return new Date().toISOString();
}
// Directories
var inputDir = path.join(__dirname, 'json-output', 'resources'); // Updated input directory
var outputDir = path.join(__dirname, 'output');
// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
// Output files
var specializedResourceTriplesFile = path.join(outputDir, 'specialized_resource_triples.json');
var specializedResourcePredicatesFile = path.join(outputDir, 'specialized_resource_predicates.json');
// Initialize outputs
var allTriples = [];
var allPredicates = {};
// Read the resource JSON files in inputDir
var files = fs.readdirSync(inputDir).filter(function (file) { return file.endsWith('.json'); });
for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    var inputFile = path.join(inputDir, file);
    var resourceName = path.basename(file, '.json');
    var outputFile = path.join(outputDir, "".concat(resourceName, ".json"));
    console.log("Processing ".concat(file, "..."));
    // Read the input JSON file
    var data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    // Check if data is an array
    if (!Array.isArray(data)) {
        console.warn("Data in ".concat(file, " is not an array. Skipping."));
        continue;
    }
    var outputData = [];
    var _loop_1 = function (record) {
        var cleanRecord = {};
        var recordTriples = [];
        // Get the resourceType for applicableSubjectResourceTypes
        var subjectResourceType = record.resourceType;
        // Initialize linkedResources if not present
        if (!cleanRecord.linkedResources) {
            cleanRecord.linkedResources = {};
        }
        // Copy over schema-defined properties
        for (var _b = 0, resourceSchemaProperties_1 = resourceSchemaProperties; _b < resourceSchemaProperties_1.length; _b++) {
            var key = resourceSchemaProperties_1[_b];
            if (record.hasOwnProperty(key)) {
                cleanRecord[key] = record[key];
            }
        }
        var _loop_2 = function (key) {
            if (!resourceSchemaProperties.includes(key) &&
                !excludedProperties.includes(key)) {
                // Property not in schema and not excluded, convert to triple
                var subjectId_1 = record.id;
                var predicateLabel_1 = key;
                var object = record[key];
                // Generate a predicate id in snake_case
                var predicateId_1 = toSnakeCase(key);
                // Determine object type and map to applicableObjectResourceTypes
                var objectType = void 0;
                var applicableObjectResourceTypes = [];
                if (Array.isArray(object)) {
                    // If object is an array, process each element separately
                    object.forEach(function (item) {
                        createTriple(subjectId_1, subjectResourceType, predicateId_1, predicateLabel_1, item, record, cleanRecord);
                    });
                    return "continue";
                }
                else {
                    // Single value
                    createTriple(subjectId_1, subjectResourceType, predicateId_1, predicateLabel_1, object, record, cleanRecord);
                }
            }
        };
        // Process properties not in the schema and not excluded
        for (var key in record) {
            _loop_2(key);
        }
        outputData.push(cleanRecord);
    };
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var record = data_1[_a];
        _loop_1(record);
    }
}
// Write all triples to output file
fs.writeFileSync(specializedResourceTriplesFile, JSON.stringify(allTriples, null, 2));
// Write predicates mapping to output file
var predicatesArray = Object.values(allPredicates);
fs.writeFileSync(specializedResourcePredicatesFile, JSON.stringify(predicatesArray, null, 2));
console.log('Processing complete.');
// Function to create a triple and update necessary structures
function createTriple(subjectId, subjectResourceType, predicateId, predicateLabel, object, record, cleanRecord) {
    var objectType = typeof object;
    var applicableObjectResourceTypes = [];
    if (objectType === 'string') {
        applicableObjectResourceTypes = [ResourceType.ScalarString];
    }
    else if (objectType === 'number') {
        if (Number.isInteger(object)) {
            applicableObjectResourceTypes = [ResourceType.ScalarInt];
        }
        else {
            applicableObjectResourceTypes = [ResourceType.ScalarFloat];
        }
    }
    else if (objectType === 'boolean') {
        applicableObjectResourceTypes = [ResourceType.ScalarBoolean];
    }
    else if (isValidDate(object)) {
        objectType = 'date';
        applicableObjectResourceTypes = [ResourceType.ScalarDate];
    }
    else {
        // For other types, default to string scalar
        objectType = 'string';
        applicableObjectResourceTypes = [ResourceType.ScalarString];
    }
    // Add to predicates mapping
    if (!allPredicates[predicateId]) {
        var predicate = {
            id: predicateId,
            label: predicateLabel,
            applicableSubjectResourceTypes: [subjectResourceType],
            applicableObjectResourceTypes: applicableObjectResourceTypes,
            // Other fields can be added as needed
        };
        allPredicates[predicateId] = predicate;
    }
    else {
        // If predicate already exists, update applicableSubjectResourceTypes and applicableObjectResourceTypes
        var existingPredicate = allPredicates[predicateId];
        // Add subjectResourceType if not already present
        if (!existingPredicate.applicableSubjectResourceTypes.includes(subjectResourceType)) {
            existingPredicate.applicableSubjectResourceTypes.push(subjectResourceType);
        }
        // Add applicableObjectResourceTypes if not already present
        for (var _i = 0, applicableObjectResourceTypes_1 = applicableObjectResourceTypes; _i < applicableObjectResourceTypes_1.length; _i++) {
            var ort = applicableObjectResourceTypes_1[_i];
            if (!existingPredicate.applicableObjectResourceTypes.includes(ort)) {
                existingPredicate.applicableObjectResourceTypes.push(ort);
            }
        }
    }
    // Create triple with prefixed UUID
    var tripleId = "triple_".concat((0, uuid_1.v4)());
    // Construct rdf_uri
    var rdfUri = "zelos.ai/knowledge/Triple/".concat(tripleId);
    var currentDateTime = getCurrentDateTime();
    var triple = {
        id: tripleId,
        subject: subjectId, // Use 'subject' instead of 'subjectId'
        predicate: predicateId,
        object: object,
        resourceType: ResourceType.Triple,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
        visibility: 'public',
        rdf_uri: rdfUri,
        // Add other properties if necessary
    };
    allTriples.push(triple);
    // Link triple back to the resource's linkedResources
    if (!cleanRecord.linkedResources[predicateId]) {
        cleanRecord.linkedResources[predicateId] = [];
    }
    cleanRecord.linkedResources[predicateId].push(tripleId);
}
