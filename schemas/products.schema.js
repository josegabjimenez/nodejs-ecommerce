const Joi = require('joi');

const productId = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(10).max(150);
const price = Joi.number().min(0).strict();
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(0);

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  image,
  categoryId,
});

const getProductSchema = Joi.object({
  productId: productId.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
