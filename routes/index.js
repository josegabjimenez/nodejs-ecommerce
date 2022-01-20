const express = require('express');
const passport = require('passport');
const products = require('./products.routes');
const users = require('./users.routes');
const categories = require('./categories.routes');
const customers = require('./customers.routes');
const orders = require('./orders.routes');
const auth = require('./auth.routes');
const profile = require('./profile.routes');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', products);
  router.use('/users', passport.authenticate('jwt', { session: false }), users);
  router.use('/categories', categories);
  router.use('/customers', customers);
  router.use(
    '/orders',
    passport.authenticate('jwt', { session: false }),
    orders
  );
  router.use('/profile', profile);
  app.use('/auth', auth);
};

module.exports = routerApi;
