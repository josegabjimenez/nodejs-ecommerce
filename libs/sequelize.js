const chalk = require('chalk');
const { config } = require('../config');
const { Sequelize } = require('sequelize');

const options = {
  dialect: 'postgres',
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  options.logging = console.log;
}

const sequelize = new Sequelize(config.dbUrl, options);

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
