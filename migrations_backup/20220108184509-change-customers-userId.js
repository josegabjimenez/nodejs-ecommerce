'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customers.model');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  // down: async (queryInterface) => {
  //   await queryInterface.dropTable(CUSTOMER_TABLE);
  // },
};
