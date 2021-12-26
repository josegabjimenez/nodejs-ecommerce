const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const response = require('./response');

const service = new ProductsService();

router.get('/', async (req, res) => {
  const query = req.query;
  console.log(query);
  const products = await service.find(query);
  response.success(req, res, 'Products were retrieved.', 200, products);
});

router.post('/', async (req, res) => {
  const body = req.body;
  try {
    const newProduct = await service.create(body);
    response.success(req, res, 'Product was created.', 201, newProduct);
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  console.log(id);
  try {
    const updatedProduct = await service.update(id, body);
    response.success(req, res ,"Product was updated", 200, updatedProduct);
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Eliminated")
  try {
    const eliminatedProduct = await service.delete(id);
    response.success(req, res, "Product was succesfully eliminated.", 200, eliminatedProduct);
  } catch (err) {
    response.error(req, res, err.message, err.status, err.internal);
  }
})

module.exports = router;
