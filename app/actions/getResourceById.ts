const neo4j = require('neo4j-driver');

// Initialize the driver
const driver = neo4j.driver(
  'neo4j://127.0.0.1:7687', 
  neo4j.auth.basic('neo4j', 'seiristudio')
);

export default async function getResourceById(id: string) {
  // Create a session using the driver instance
  const session = driver.session({ database: 'neo4j' }); // specify the database if needed

  try {
    const uri = `http://zelos.ai/knowledge/athlete/${id}`; // Use the ID to construct the URI

    const result = await session.run(
      `MATCH (s:Resource)-[r]->(o:Resource)
       WHERE s.uri = $uri
       OPTIONAL MATCH (o)-[:HAS_CITATION]->(c:Resource)
       RETURN s.uri AS subject, type(r) AS predicate, o.name AS object, c.name AS citation`,
      { uri }
    );

    console.log(result,"right", uri)

    const triples = result.records.map((record: { get: (arg0: string) => any; }) => ({
      subject: record.get('subject'),
      predicate: record.get('predicate'),
      object: record.get('object'),
      citation: record.get('citation')
    }));

    if (triples.length === 0) {
      console.log("Resource not found", id);
      return null;
    }

    // console.log("Resource triples:", triples);

    return { id, triples };
  } catch (error) {
    console.error("Error retrieving resource by ID:", error);
    throw error;
  } finally {
    // Close the session
    await session.close();
  }
}
