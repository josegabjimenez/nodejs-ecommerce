const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const response = require('./response');

const service = new ProductsService();

router.get('/', (req, res) => {
  const query = req.query;
  console.log(query);
  const products = service.find(query);
  response.success(req, res, 'Products were retrieved.', 200, products);
});

router.post('/', (req, res) => {
  const body = req.body;
  try {
    const newProduct = service.create(body);
    response.success(req, res, 'Product was created.', 201, newProduct);
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
});

module.exports = router;
