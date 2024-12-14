// migrateFlatAttributesToTriples.ts

import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Define the resource schema properties (common to all resources)
const resourceSchemaProperties = [
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
const excludedProperties = [
  'subject',
  'predicate',
  'object',
  'citation',
  'profile_id',
  'rdf_uri',
  // Add other properties to exclude if necessary
];

// ResourceType enum
enum ResourceType {
  Triple = 'Triple',
  ScalarString = 'ScalarString',
  ScalarInt = 'ScalarInt',
  ScalarFloat = 'ScalarFloat',
  ScalarBoolean = 'ScalarBoolean',
  ScalarDate = 'ScalarDate',
  // Add other resource types as needed
}

// Predicate interface
interface Predicate {
  id: string;
  label: string;
  description?: string;
  applicableSubjectResourceTypes: ResourceType[];
  applicableObjectResourceTypes: ResourceType[];
  // Other fields if necessary
}

// Type for objectType including 'date'
type ObjectType = 'string' | 'number' | 'boolean' | 'date' | 'object' | 'undefined' | 'bigint' | 'function' |'symbol' | 'resource';

// Function to convert string to snake_case
function toSnakeCase(str: string): string {
  return str
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/([A-Z])/g, '_$1') // Add underscore before capital letters
    .replace(/__+/g, '_') // Replace multiple underscores with a single one
    .toLowerCase()
    .replace(/^_/, ''); // Remove leading underscore
}

// Helper function to check if a value is a valid date
function isValidDate(value: any): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

// Get current date-time for createdAt and updatedAt
function getCurrentDateTime(): string {
  return new Date().toISOString();
}

// Directories
const inputDir = path.join(__dirname, 'json-output', 'resources'); // Updated input directory
const outputDir = path.join(__dirname, 'output');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Output files
const specializedResourceTriplesFile = path.join(outputDir, 'specialized_resource_triples.json');
const specializedResourcePredicatesFile = path.join(outputDir, 'specialized_resource_predicates.json');

// Initialize outputs
let allTriples: any[] = [];
let allPredicates: { [predicateId: string]: Predicate } = {};

// Read the resource JSON files in inputDir
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.json'));

for (const file of files) {
  const inputFile = path.join(inputDir, file);
  const resourceName = path.basename(file, '.json');
  const outputFile = path.join(outputDir, `${resourceName}.json`);

  console.log(`Processing ${file}...`);

  // Read the input JSON file
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.warn(`Data in ${file} is not an array. Skipping.`);
    continue;
  }

  const outputData: any[] = [];

  for (const record of data) {
    const cleanRecord: any = {};
    const recordTriples: any[] = [];

    // Get the resourceType for applicableSubjectResourceTypes
    const subjectResourceType: ResourceType = record.resourceType;

    // Initialize linkedResources if not present
    if (!cleanRecord.linkedResources) {
      cleanRecord.linkedResources = {};
    }

    // Copy over schema-defined properties
    for (const key of resourceSchemaProperties) {
      if (record.hasOwnProperty(key)) {
        cleanRecord[key] = record[key];
      }
    }

    // Process properties not in the schema and not excluded
    for (const key in record) {
      if (
        !resourceSchemaProperties.includes(key) &&
        !excludedProperties.includes(key)
      ) {
        // Property not in schema and not excluded, convert to triple
        const subjectId = record.id;
        const predicateLabel = key;
        const object = record[key];

        // Generate a predicate id in snake_case
        const predicateId = toSnakeCase(key);

        // Determine object type and map to applicableObjectResourceTypes
        let objectType: ObjectType;
        let applicableObjectResourceTypes: ResourceType[] = [];

        if (Array.isArray(object)) {
          // If object is an array, process each element separately
          object.forEach(item => {
            createTriple(
              subjectId,
              subjectResourceType,
              predicateId,
              predicateLabel,
              item,
              record,
              cleanRecord
            );
          });
          continue; // Skip to next property
        } else {
          // Single value
          createTriple(
            subjectId,
            subjectResourceType,
            predicateId,
            predicateLabel,
            object,
            record,
            cleanRecord
          );
        }
      }
    }

    outputData.push(cleanRecord);
  }
}

// Write all triples to output file
fs.writeFileSync(specializedResourceTriplesFile, JSON.stringify(allTriples, null, 2));

// Write predicates mapping to output file
const predicatesArray = Object.values(allPredicates);

fs.writeFileSync(specializedResourcePredicatesFile, JSON.stringify(predicatesArray, null, 2));

console.log('Processing complete.');

// Function to create a triple and update necessary structures
function createTriple(
  subjectId: string,
  subjectResourceType: ResourceType,
  predicateId: string,
  predicateLabel: string,
  object: any,
  record: any,
  cleanRecord: any
) {
  let objectType: ObjectType = typeof object;
  let applicableObjectResourceTypes: ResourceType[] = [];

  if (objectType === 'string') {
    applicableObjectResourceTypes = [ResourceType.ScalarString];
  } else if (objectType === 'number') {
    if (Number.isInteger(object)) {
      applicableObjectResourceTypes = [ResourceType.ScalarInt];
    } else {
      applicableObjectResourceTypes = [ResourceType.ScalarFloat];
    }
  } else if (objectType === 'boolean') {
    applicableObjectResourceTypes = [ResourceType.ScalarBoolean];
  } else if (isValidDate(object)) {
    objectType = 'date';
    applicableObjectResourceTypes = [ResourceType.ScalarDate];
  } else {
    // For other types, default to string scalar
    objectType = 'string';
    applicableObjectResourceTypes = [ResourceType.ScalarString];
  }

  // Add to predicates mapping
  if (!allPredicates[predicateId]) {
    const predicate: Predicate = {
      id: predicateId,
      label: predicateLabel,
      applicableSubjectResourceTypes: [subjectResourceType],
      applicableObjectResourceTypes: applicableObjectResourceTypes,
      // Other fields can be added as needed
    };
    allPredicates[predicateId] = predicate;
  } else {
    // If predicate already exists, update applicableSubjectResourceTypes and applicableObjectResourceTypes
    const existingPredicate = allPredicates[predicateId];

    // Add subjectResourceType if not already present
    if (!existingPredicate.applicableSubjectResourceTypes.includes(subjectResourceType)) {
      existingPredicate.applicableSubjectResourceTypes.push(subjectResourceType);
    }

    // Add applicableObjectResourceTypes if not already present
    for (const ort of applicableObjectResourceTypes) {
      if (!existingPredicate.applicableObjectResourceTypes.includes(ort)) {
        existingPredicate.applicableObjectResourceTypes.push(ort);
      }
    }
  }

  // Create triple with prefixed UUID
  const tripleId = `triple_${uuidv4()}`;

  // Construct rdf_uri
  const rdfUri = `zelos.ai/knowledge/Triple/${tripleId}`;

  const currentDateTime = getCurrentDateTime();

  const triple = {
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
