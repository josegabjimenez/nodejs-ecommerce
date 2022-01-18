const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');
const OrdersService = require('../services/orders.service');
const UsersService = require('../services/users.service');

// Services
const service = new OrdersService();
const userService = new UsersService();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      response.success(req, res, 'User orders were retrieved', 200, orders);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/my-info',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const userInfo = await userService.findOne(user.sub);
      response.success(req, res, 'User info was retrieved', 200, userInfo);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
