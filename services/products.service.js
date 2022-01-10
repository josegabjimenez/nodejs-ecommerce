const boom = require('@hapi/boom');
const { Product, Category } = require('../db/models');

class ProductsService {
  constructor() {}

  async find() {
    const products = await Product.findAll({
      include: ['category'],
    });
    return products;
  }

  async findOne(id) {
    const product = await Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async create(data) {
    const category = await Category.findByPk(data.categoryId);
    if (!category) {
      throw boom.badRequest(
        `The category id "${data.categoryId}" does not exist.`
      );
    }
    const newProduct = await Product.create(data);
    return newProduct;
  }

  async update(id, data) {
    const product = await this.findOne(id);
    await product.update(data);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return product;
  }
}

module.exports = ProductsService;
