const Joi = require('joi');

const productId = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(10).max(150);
const price = Joi.number().min(0);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(0);

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer().min(1);
const price_max = Joi.number().integer().min(1);

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

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.greater(Joi.ref('price_min')),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
