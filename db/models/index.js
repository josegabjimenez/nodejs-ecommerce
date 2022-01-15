const { User } = require('./users.model');
const { Product } = require('./products.model');
const { Customer } = require('./customers.model');
const { Category } = require('./categories.model');
const { Order } = require('./orders.model');
const { OrderProduct } = require('./orders-products.model');

module.exports = {
  User,
  Product,
  Customer,
  Category,
  Order,
  OrderProduct,
};
