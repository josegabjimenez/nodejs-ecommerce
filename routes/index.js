const express = require('express');
const products = require('./products.routes');
const users = require('./users.routes');
const categories = require('./categories.routes');
const customers = require('./customers.routes');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', products);
  router.use('/users', users);
  router.use('/categories', categories);
  router.use('/customers', customers);
};

module.exports = routerApi;
