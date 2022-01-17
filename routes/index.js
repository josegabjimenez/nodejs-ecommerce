const express = require('express');
const passport = require('passport');
const products = require('./products.routes');
const users = require('./users.routes');
const categories = require('./categories.routes');
const customers = require('./customers.routes');
const orders = require('./orders.routes');
const auth = require('./auth.routes');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', products);
  router.use('/users', users);
  router.use(
    '/categories',
    passport.authenticate('jwt', { session: false }),
    categories
  );
  router.use('/customers', customers);
  router.use('/orders', orders);
  router.use('/auth', auth);
};

module.exports = routerApi;
