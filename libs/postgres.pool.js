const { config } = require('../config');
const { Pool } = require('pg');

let options = {};

if (config.isProd) {
  options = {
    connectionString: config.dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options = {
    connectionString: URI,
  };
}

const pool = new Pool(options);

module.exports = pool;
