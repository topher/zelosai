const fs = require('fs');
const { readFile, writeFile } = fs 
const GEXF = require('gexf'); // Include the gexf-js library

// Replace with the actual path to your JSON file
const dataPath = './app/(dashboard)/(routes)/knowledge-bank/Q362185_graph2h.json';

// Function to read JSON data
function readData(path) {
  return new Promise((resolve, reject) => {
     readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Function to create and write GEXF file
function createGexf(data, filePath) {
  const gexf = new GEXF();
  const graph = gexf.addGraph("directed"); // Adjust for directed/undirected

  // Process data to build nodes and edges
  const nodes = data.results.bindings.map(d => ({
    id: d.entity1.value,
    label: d.entity1Label.value
  }));

  const links = data.results.bindings.map(d => ({
    source: d.entity1.value,
    target: d.entity2.value
  }));

  // Add nodes with IDs and labels
  nodes.forEach(node => {
    const gexfNode = graph.addNode(node.id);
    gexfNode.setAttribute("label", node.label);
    // Add more attributes if needed (e.g., size, color)
  });

  // Add edges with source and target IDs
  links.forEach(link => {
    graph.addEdge(link.source, link.target);
    // Add edge attributes if needed
  });

  // Convert GEXF object to a string
  const gexfString = gexf.toString();

  // Write GEXF string to a file
  writeFile(filePath, gexfString, (err) => {
    if (err) {
      console.error("Error writing GEXF file:", err);
    } else {
      console.log("GEXF file created successfully:", filePath);
    }
  });
}

// Read data and create GEXF file
readData(dataPath)
  .then(data => createGexf(data, './app/(dashboard)/(routes)/knowledge-bank/Q362185_graph2h.gexf'))
  .catch(err => console.error("Error reading data:", err));
