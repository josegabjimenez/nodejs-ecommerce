const express = require('express');
const router = express.Router();
const response = require('./response');
const faker = require('faker');

router.get('/', (req, res) => {
  const productsData = [];
  for (let i = 0; i < 5; i++) {
    productsData.push({
      id: faker.hacker.phrase(),
      productName: faker.commerce.productName(),
      productDescription: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    });
  }
  response.success(req, res, 'Products were retrieved', 200, productsData);
});

module.exports = router;
