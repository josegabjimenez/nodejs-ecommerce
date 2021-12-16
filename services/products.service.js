const faker = require('faker');

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
      });
    }
  }

  find(query) {
    if (query.id) {
      return this.products.find((product) => product.id === query.id);
    }
    return this.products;
  }

  create({ productName, productDescription, price }) {
    if (!productName) {
      throw {
        message: 'The product name is necessary.',
        status: 404,
        internal: null,
      };
    }
    if (!price) {
      throw {
        message: 'The price is necessary.',
        status: 404,
        internal: null,
      };
    }
    const newProduct = {
      id: faker.datatype.uuid(),
      productName,
      productDescription,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}

module.exports = ProductsService;
