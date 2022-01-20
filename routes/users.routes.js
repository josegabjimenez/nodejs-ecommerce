// Imports
const express = require('express');
const router = express.Router();
const response = require('./response');
const UsersService = require('../services/users.service');

// Middleware
const { checkRoles } = require('../middlewares/auth.handler');
const validator = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/users.schema');

// Service
const service = new UsersService();

// Validator

router.get('/', checkRoles('admin'), async (req, res, next) => {
  const query = req.query;
  try {
    const users = await service.find(query);
    response.success(req, res, 'Users were retrieved.', 200, users);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:userId',
  checkRoles('admin'),
  validator(getUserSchema, 'params'),
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await service.findOne(userId);
      response.success(req, res, 'User was retrieved.', 200, user);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  checkRoles('admin'),
  validator(createUserSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newUser = await service.create(data);
      response.success(req, res, 'User created successfully.', 201, newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:userId',
  checkRoles('admin'),
  validator(getUserSchema, 'params'),
  validator(updateUserSchema, 'body'),
  async (req, res, next) => {
    const { userId } = req.params;
    const data = req.body;
    try {
      const updatedUser = await service.update(userId, data);
      response.success(
        req,
        res,
        'User updated successfully.',
        200,
        updatedUser
      );
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:userId',
  checkRoles('admin'),
  validator(getUserSchema, 'params'),
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const deletedUser = await service.delete(userId);
      response.success(req, res, 'User deleted successfully', 200, deletedUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
