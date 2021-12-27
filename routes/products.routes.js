const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const response = require('./response');

const service = new ProductsService();

router.get('/', async (req, res, next) => {
  const query = req.query;
  try {
    const products = await service.find(query);
    response.success(req, res, 'Products were retrieved.', 200, products);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    const newProduct = await service.create(body);
    response.success(req, res, 'Product was created.', 201, newProduct);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedProduct = await service.update(id, body);
    response.success(req, res, 'Product was updated', 200, updatedProduct);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
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
});

module.exports = router;
