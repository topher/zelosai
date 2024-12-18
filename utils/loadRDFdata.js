// Filename: utils/loadRDFData.js
import * as $rdf from 'rdflib';
import fs from 'fs';
import path from 'path';

const loadRDFData = async (fileName) => {

  // Define your namespaces somewhere accessible
  const RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
  const DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');

  try {
    const absoluteFilePath = path.resolve(process.cwd(), 'public', fileName);
    const data = fs.readFileSync(absoluteFilePath, 'utf8');

    const store = $rdf.graph();
    const fileUri = `http://localhost:3000/${fileName}`;
    console.log("weeee!!!!");

    await new Promise((resolve, reject) => {
      $rdf.parse(data, store, fileUri, 'text/turtle', (err) => {
        if (err) {
          console.error('Error parsing RDF data:', err);
          reject(err);
        } else {
          console.log("1st promise!");
          resolve();
        }
      });
    });

    // Define and execute a SPARQL query
    const sparqlQuery = `
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    
    SELECT ?subject ?predicate ?object
    WHERE {
      ?subject ?predicate ?object .
      FILTER (?subject = <http://zelos.ai/knowledge/athlete/1321381>)
      FILTER (?predicate != rdf:value && ?predicate != dc:source)
    }
    `;

    let triples = [];

    const onresult = function (result) {
      let subject = result['?subject'].value;
      let predicate = result['?predicate'].value;
      let object;
      let source;
    
      if (result['?object'].termType === 'BlankNode') {
        // Do not try to create a NamedNode with a blank node identifier
        // Instead, query inside the blank node to extract the necessary information
        const blankNodeId = result['?object'].value;
        // Retrieve the rdf:value associated with the blank node
        const blankNodeValue = store.any($rdf.blankNode(blankNodeId), RDF('value'));
        object = blankNodeValue ? blankNodeValue.value : null;
        // Retrieve the source if available
        const blankNodeSource = store.any($rdf.blankNode(blankNodeId), DC('source'));
        source = blankNodeSource ? blankNodeSource.value : null;
      } else {
        // For named nodes or other term types, use the value directly
        object = result['?object'].value;
        source = result['?source'] ? result['?source'].value : null;
      }
    
      triples.push({
        subject: subject,
        predicate: predicate,
        object: object,
        source: source,
      });
    };

    const onDone = function () {};

    const query = $rdf.SPARQLToQuery(sparqlQuery, false, store);

    await new Promise((resolve, reject) => {
      store.query(query, onresult, undefined, () => resolve(triples), (err) => reject(err));
    });

    return triples;

  } catch (error) {
    console.error('Error in loadRDFData:', error);
    throw error;
  }
};

export default loadRDFData;
