const products = require('./products');

const routerApi = (app) => {
  app.use('/api/products', products);
};

module.exports = routerApi;
