const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { Product, Category } = require('../db/models');

class ProductsService {
  constructor() {}

  async find(query) {
    const { limit, offset, price, price_min, price_max } = query;
    const options = {
      include: ['category'],
      where: {},
    };

    limit && (options.limit = limit);
    offset && (options.offset = offset);
    price_min &&
      (options.where.price = { [Op.gte]: price_min, ...options.where.price });
    price_max &&
      (options.where.price = { [Op.lte]: price_max, ...options.where.price });
    price && (options.where.price = price);

    const products = await Product.findAll(options);
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
    return product;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return product;
  }
}

module.exports = ProductsService;
