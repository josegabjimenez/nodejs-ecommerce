const boom = require('@hapi/boom');
const { Category } = require('../db/models');

class CategoriesService {
  constructor() {}

  async find() {
    const categories = await Category.findAll();
    return categories;
  }

  async findOne(id) {
    const categories = await Category.findByPk(id, {
      include: ['products'],
    });
    if (!categories) {
      throw boom.notFound('Category not found');
    }
    return categories;
  }

  async create(data) {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async update(id, data) {
    const category = await this.findOne(id);
    await category.update(data);
    return category;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return category;
  }
}

module.exports = CategoriesService;
