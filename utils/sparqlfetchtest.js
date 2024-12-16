const rdf = require('rdflib');

// Create an RDF store
const store = rdf.graph();

// Load RDF data from a file
const rdfData = `
  @prefix ex: <http://example.org/> .
  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

  ex:subject1 ex:predicate ex:object1 .
  ex:subject2 ex:predicate ex:object2 .
  ex:subject3 rdf:type ex:Type .
`;

const contentType = 'text/turtle'; // or 'application/rdf+xml' for RDF/XML
const baseUrl = 'http://example.org/base'; // Provide a base URL if needed

rdf.parse(rdfData, store, baseUrl, contentType);

// Define and execute a SPARQL query
const sparqlQuery = `
  SELECT ?subject ?object
  WHERE {
    ?subject <http://example.org/predicate> ?object .
  }
`;

const onresult = function (result) {
  console.log("count")
  console.log(result['?subject'].value);
  console.log(result['?object'].value);

  // result.forEach((result) => {
  //   console.log(`Subject: ${result}`);
  //   console.log(`Object: ${result}`);
  // });
};

const onDone = function () {};

const query = rdf.SPARQLToQuery(sparqlQuery, false, store);

store.query(query, onresult, undefined, onDone);

// // Print query results
// results.forEach((result) => {
//   console.log(`Subject: ${result.subject.value}`);
//   console.log(`Object: ${result.object.value}`);
// });
