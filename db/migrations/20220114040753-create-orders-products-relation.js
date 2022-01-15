'use strict';

const {
  ORDERS_PRODUCTS_TABLE,
  OrderProductSchema,
} = require('../models/orders-products.model');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  },
};
