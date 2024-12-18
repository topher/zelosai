// 'use client'
// import React, { useEffect, useRef } from 'react';
// import cytoscape from 'cytoscape';
// import { readFileSync } from 'fs';

// const GraphVisualizer: React.FC = () => {
//   const cyRef = useRef<cytoscape.Core>(null);

// //   useEffect(() => {
// //     const cy = cytoscape({
// //       container: cyRef.current,
// //       elements: [],
// //       style: [
// //         // Define styles for nodes and edges here
// //         {
// //           selector: 'node',
// //           style: {
// //             shape: 'circle',
// //             color: '#666',
// //             label: 'data(id)',
// //           },
// //         },
// //         {
// //           selector: 'edge',
// //           style: {
// //             width: 2,
// //             lineColor: '#ccc',
// //           },
// //         },
// //       ],
// //     });

// //     // Read data from JSON file
// //     const data = JSON.parse(readFileSync('Q362185_graph_2hops.json', 'utf-8'));

// //     // Process data and create nodes and edges
// //     const nodes = data.map(d => ({
// //       data: { id: d.entity1Label || d.entity2 },
// //     }));
// //     const edges = data.map(d => ({
// //       data: { source: d.entity1Label || d.entity2, target: d.entity2Label || d.entity1 },
// //     }));

// //     // Add nodes and edges to the graph
// //     cy.add(nodes);
// //     cy.add(edges);

// //     // Perform any additional layout adjustments (optional)
// //     cy.layout({ name: 'preset' }); // Simple preset layout

// //     // Cleanup function (optional)
// //     return () => {
// //       cy.destroy();
// //     };
// //   }, []);

//   return <div><p>Key lewds</p></div>;
// //   return <div ref={cyRef} style={{ width: '100%', height: '400px' }} />;/
// };

// export default GraphVisualizer;
