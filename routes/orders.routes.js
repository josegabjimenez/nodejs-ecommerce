const express = require('express');
const router = express.Router();
const response = require('./response');
const OrdersService = require('../services/orders.service');
const validator = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('../schemas/orders.schema');

// Service
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    response.success(req, res, 'Orders successfully retrieved', 200, orders);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:orderId',
  validator(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { orderId } = req.params;
    try {
      const order = await service.findOne(orderId);
      response.success(req, res, 'Order successfully retrieved', 200, order);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validator(createOrderSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newOrder = await service.create(data);
      response.success(req, res, 'Order was created', 201, newOrder);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:orderId',
  validator(getOrderSchema, 'params'),
  validator(updateOrderSchema, 'body'),
  async (req, res, next) => {
    const { orderId } = req.params;
    const data = req.body;
    try {
      const updatedOrder = await service.update(orderId, data);
      response.success(
        req,
        res,
        'Order updated successfully.',
        200,
        updatedOrder
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
