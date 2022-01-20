const express = require('express');
const router = express.Router();
const response = require('./response');
const OrdersService = require('../services/orders.service');

// Middleware
const { checkRoles } = require('../middlewares/auth.handler');
const validator = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/orders.schema');

// Service
const service = new OrdersService();

router.get('/', checkRoles('admin'), async (req, res, next) => {
  try {
    const orders = await service.find();
    response.success(req, res, 'Orders successfully retrieved', 200, orders);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:orderId',
  checkRoles('admin'),
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
    const user = req.user;
    const data = req.body;
    try {
      const finalData = { userId: user.sub, ...data };
      const newOrder = await service.create(finalData);
      response.success(req, res, 'Order was created', 201, newOrder);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/add-item',
  validator(addItemSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newItem = await service.addItem(data);
      response.success(req, res, 'Item was successfully added', 201, newItem);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:orderId',
  checkRoles('admin'),
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

router.delete(
  '/:orderId',
  checkRoles('admin'),
  validator(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await service.delete(orderId);
      response.success(
        req,
        res,
        'Order deleted successfully.',
        200,
        deletedOrder
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
