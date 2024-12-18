// utils/wait-for-elasticsearch.js
const axios = require('axios');
require('dotenv').config();

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const username = process.env.ELASTIC_USERNAME || 'elastic';
const password = process.env.ELASTIC_PASSWORD || 'changeme';

const waitForElasticsearch = async () => {
    const url = `${ELASTICSEARCH_URL}/_cluster/health`;
    const maxRetries = 10;
    const delay = 3000; // 3 seconds

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await axios.get(url, {
                auth: { username, password }
            });
            if (response.data && response.data.status) {
                console.log('Elasticsearch is up and running.');
                return;
            }
        } catch (error) {
            console.log(`Waiting for Elasticsearch... (${i + 1}/${maxRetries})`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    console.error('Elasticsearch did not become ready in time.');
    process.exit(1);
};

waitForElasticsearch();
