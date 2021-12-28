const Joi = require('joi');

const id = Joi.string().uuid();
const productName = Joi.string().min(3).max(30);
const productDescription = Joi.string().min(10).max(150);
const price = Joi.number().min(0).strict();

const createProductSchema = Joi.object({
  productName: productName.required(),
  productDescription,
  price: price.required(),
});

const updateProductSchema = Joi.object({
  productName,
  productDescription,
  price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
};
