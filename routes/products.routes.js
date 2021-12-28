const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const response = require('./response');

// Products service
const service = new ProductsService();

// Validator
const validator = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} = require('../schemas/products.schema'); // Schemas

router.get('/', async (req, res, next) => {
  const query = req.query;
  try {
    const products = await service.find(query);
    response.success(req, res, 'Products were retrieved.', 200, products);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validator(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.find({ id });
      response.success(req, res, 'Product was retrieved.', 200, product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
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
  '/:id',
  validator(getProductSchema, 'params'),
  validator(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const updatedProduct = await service.update(id, body);
      response.success(req, res, 'Product was updated', 200, updatedProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  validator(deleteProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const eliminatedProduct = await service.delete(id);
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
