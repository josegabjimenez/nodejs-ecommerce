require('dotenv').config();
const { Client } = require('pg');

const connection = async () => {
  const client = new Client({
    host: process.env.HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  await client.connect();
  return client;
};

module.exports = connection;
