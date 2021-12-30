const Joi = require('joi');

const categoryId = Joi.number().min(0);
const name = Joi.string().min(1).max(30);

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name.required(),
});

const getCategorySchema = Joi.object({
  categoryId: categoryId.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
