'use strict';

const { USER_TABLE, UserSchema } = require('../models/users.model');
const {
  CATEGORY_TABLE,
  CategorySchema,
} = require('../models/categories.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/products.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customers.model');
const { ORDER_TABLE, OrderSchema } = require('../models/orders.model');
const {
  ORDERS_PRODUCTS_TABLE,
  OrderProductSchema,
} = require('../models/orders-products.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  },
};
