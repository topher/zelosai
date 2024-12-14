// Assuming you're using Node.js

const fs = require('fs');
const path = require('path');

// Path to your JSON data file
const dataFilePath = path.join(__dirname, './json-output/resources/triples.json');

// Read the data file
let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Function to recursively flatten nested objects into triples
function flattenTriples(data) {
  const flattenedData = [];

  data.forEach(triple => {
    if (typeof triple.object === 'object' && triple.object !== null) {
      // Generate unique IDs for new triples if necessary
      const newTriples = flattenObject(triple.object, triple.subject, triple.predicate, triple);
      flattenedData.push(...newTriples);
    } else {
      // 'object' is already a primitive value; keep the triple as is
      flattenedData.push(triple);
    }
  });

  return flattenedData;
}

function flattenObject(obj, subject, parentPredicate, parentTriple) {
  const triples = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const predicate = parentPredicate ? `${parentPredicate}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          // Handle arrays by creating a triple for each element
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              // Recursively flatten nested objects in arrays
              triples.push(...flattenObject(item, subject, `${predicate}[${index}]`, parentTriple));
            } else {
              triples.push(createTriple(subject, `${predicate}[${index}]`, item, parentTriple));
            }
          });
        } else {
          // Recursively flatten nested objects
          triples.push(...flattenObject(value, subject, predicate, parentTriple));
        }
      } else {
        // Base case: value is a primitive
        triples.push(createTriple(subject, predicate, value, parentTriple));
      }
    }
  }

  return triples;
}

function createTriple(subject, predicate, object, parentTriple) {
  return {
    id: generateId(), // Replace with your ID generation logic
    accountId: parentTriple.accountId,
    ownerId: parentTriple.ownerId,
    resourceType: parentTriple.resourceType,
    createdAt: parentTriple.createdAt,
    updatedAt: parentTriple.updatedAt,
    visibility: parentTriple.visibility,
    rdf_uri: parentTriple.rdf_uri,
    subject: subject,
    predicate: predicate,
    object: object.toString(),
  };
}

function generateId() {
  // Implement your ID generation logic here (e.g., UUID)
  return 'triple_' + Math.random().toString(36).substr(2, 9);
}

// Helper function to generate unique triple IDs
function generateTripleId() {
  return 'triple_' + generateUUID();
}

// Function to generate a UUID (version 4)
function generateUUID() {
  // Source: https://stackoverflow.com/a/2117523/288906
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Process the data
let flattenedData = flattenTriples(data);

// Write the flattened data to a new file
const outputFilePath = path.join(__dirname, 'flattened_triples.json');
fs.writeFileSync(outputFilePath, JSON.stringify(flattenedData, null, 2), 'utf8');

console.log(`Flattened data has been written to ${outputFilePath}`);
