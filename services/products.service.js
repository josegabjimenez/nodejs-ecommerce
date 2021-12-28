const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 5; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        productDescription: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async find(query) {
    if (query.id) {
      let product = this.products.find((product) => product.id === query.id);
      if (!product) {
        throw boom.notFound('Product not found');
      }
      if (product.isBlocked) {
        throw boom.unauthorized('The product is blocked');
      }
      return product;
    }
    return this.products;
  }

  async create({ productName, productDescription, price }) {
    const newProduct = {
      id: faker.datatype.uuid(),
      productName,
      productDescription,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, body) {
    let index = this.products.findIndex((product) => product.id == id);
    if (index === -1) {
      throw boom.notFound("There's no product to update");
    }
    if (Object.entries(body).length === 0) {
      throw boom.badRequest("There's no fields to update");
    }
    let product = this.products[index];
    this.products[index] = {
      ...product,
      ...body,
    };
    return this.products[index];
  }

  async delete(id) {
    let index = this.products.findIndex((product) => product.id == id);
    if (index === -1) {
      throw boom.notFound("Product with id '" + id + "' doesn't exist");
    }
    let productEliminated = this.products[index];
    if (index > -1) {
      this.products.splice(index, 1);
    }
    return productEliminated;
  }
}

module.exports = ProductsService;
