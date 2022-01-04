const chalk = require('chalk');
const { config } = require('../config');
const { Sequelize } = require('sequelize');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.magenta('DB Connected successfully'));
  } catch (err) {
    console.error(chalk.red(err));
  }
};

testConnection();

module.exports = sequelize;
