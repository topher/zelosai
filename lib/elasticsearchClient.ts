// lib/elasticsearchClient.ts

import { Client } from '@elastic/elasticsearch';

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME || 'elastic';
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD || 'changeme';

const client = new Client({
  node: ELASTICSEARCH_NODE,
  auth: {
    username: ELASTICSEARCH_USERNAME,
    password: ELASTICSEARCH_PASSWORD,
  },
  // Optional: SSL/TLS settings
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export default client;
