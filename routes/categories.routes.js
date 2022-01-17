const express = require('express');
const router = express.Router();
const response = require('./response');
const passport = require('passport');
const CategoriesService = require('../services/categories.service');
const validator = require('../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/categories.schema');

// Service
const service = new CategoriesService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    response.success(req, res, 'Categories were retrieved', 200, categories);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:categoryId',
  validator(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { categoryId } = req.params;
    try {
      const category = await service.findOne(categoryId);
      response.success(req, res, 'Category was retrieved', 200, category);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  // passport.authenticate('jwt', { session: false }),
  validator(createCategorySchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const newCategory = await service.create(data);
      response.success(req, res, 'Category was created', 201, newCategory);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:categoryId',
  validator(getCategorySchema, 'params'),
  validator(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const { categoryId } = req.params;
    const data = req.body;
    try {
      const updatedCategory = await service.update(categoryId, data);
      response.success(
        req,
        res,
        'Category updated successfully.',
        200,
        updatedCategory
      );
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:categoryId',
  validator(getCategorySchema, 'params'),
  async (req, res, next) => {
    const { categoryId } = req.params;
    try {
      const deletedCategory = await service.delete(categoryId);
      response.success(req, res, 'Category was created', 200, deletedCategory);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
