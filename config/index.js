require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  dbHost: process.env.POSTGRES_HOST,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  dbPort: process.env.POSTGRES_PORT,
  dbMySqlUser: process.env.MYSQL_USER,
  dbMySqlPassword: process.env.MYSQL_PASSWORD,
  dbMySqlName: process.env.MYSQL_DB,
  dbMySqlPort: process.env.MYSQL_PORT,
};

module.exports = {
  config,
};
