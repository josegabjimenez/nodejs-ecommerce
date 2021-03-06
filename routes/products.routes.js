const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');
const ProductsService = require('../services/products.service');

// Products service
const service = new ProductsService();

// Middleware
const { checkRoles } = require('../middlewares/auth.handler');
const validator = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/products.schema'); // Schemas

router.get(
  '/',
  validator(queryProductSchema, 'query'),
  async (req, res, next) => {
    const query = req.query;
    try {
      const products = await service.find(query);
      response.success(req, res, 'Products were retrieved.', 200, products);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:productId',
  validator(getProductSchema, 'params'),
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await service.findOne(productId);
      response.success(req, res, 'Product was retrieved.', 200, product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validator(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await service.create(body);
      response.success(req, res, 'Product was created.', 201, newProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validator(getProductSchema, 'params'),
  validator(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { productId } = req.params;
    const body = req.body;
    try {
      const updatedProduct = await service.update(productId, body);
      response.success(req, res, 'Product was updated', 200, updatedProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validator(getProductSchema, 'params'),
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      const eliminatedProduct = await service.delete(productId);
      response.success(
        req,
        res,
        'Product was succesfully eliminated.',
        200,
        eliminatedProduct
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
