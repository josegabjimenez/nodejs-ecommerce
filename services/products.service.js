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

  async find(query) {
    if (query.id) {
      return this.products.find((product) => product.id === query.id);
    }
    return this.products;
  }

  async create({ productName, productDescription, price }) {
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

  async update(id, body){
    if(!id){
      throw {
        message: "There's no id",
        status: 404,
        internal: null,
      }
    }
    if(Object.entries(body).length === 0){
      throw {
        message: "There's no fields to update",
        status: 404,
        internal: null,
      }
    }
    let index = this.products.findIndex(product => product.id == id);
    let product = this.products[index];
    this.products[index] = {
      ...product,
      ...body
    }
    return this.products[index];
  }

  async delete(id){
    if(!id){
      throw {
        message: "There's no id",
        status: 404,
        internal: null,
      }
    }
    let index = this.products.findIndex(product => product.id == id);
    let productEliminated = this.products[index];
    if(index > -1){
      this.products.splice(index,1);
    }
    return productEliminated;
  }
}

module.exports = ProductsService;
