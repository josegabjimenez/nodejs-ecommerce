const Joi = require('joi');

const categoryId = Joi.number().integer().min(0);
const name = Joi.string().min(1).max(30);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name,
  image,
});

const getCategorySchema = Joi.object({
  categoryId: categoryId.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
