const { config } = require('../config');
const { Client } = require('pg');

const connection = async () => {
  const client = new Client({
    host: config.dbHost,
    port: 5432,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
  });

  await client.connect();
  return client;
};

module.exports = connection;
