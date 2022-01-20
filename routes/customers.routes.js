// Imports
const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');
const CustomersService = require('../services/customers.service');

// Middleware
const { checkRoles } = require('../middlewares/auth.handler');
const validator = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customers.schema');

// Service
const service = new CustomersService();

// Validator

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    const query = req.query;
    try {
      const customers = await service.find(query);
      response.success(req, res, 'Customers were retrieved.', 200, customers);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:customerId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validator(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const { customerId } = req.params;
    try {
      const customer = await service.findOne(customerId);
      response.success(req, res, 'Customer was retrieved.', 200, customer);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validator(createCustomerSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newCustomer = await service.create(data);
      response.success(
        req,
        res,
        'Customer created successfully.',
        201,
        newCustomer
      );
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:customerId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validator(getCustomerSchema, 'params'),
  validator(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    const { customerId } = req.params;
    const data = req.body;
    try {
      const updatedCustomer = await service.update(customerId, data);
      response.success(
        req,
        res,
        'Customer updated successfully.',
        200,
        updatedCustomer
      );
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:customerId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validator(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const { customerId } = req.params;
    try {
      const deletedCustomer = await service.delete(customerId);
      response.success(
        req,
        res,
        'Customer deleted successfully',
        200,
        deletedCustomer
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
