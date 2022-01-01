require('dotenv').config();

const config = {
  port: process.env.PORT || 3001,
  dbHost: process.env.POSTGRES_HOST,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  dbPort: process.env.POSTGRES_PORT,
};

module.exports = {
  config,
};