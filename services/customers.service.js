const boom = require('@hapi/boom');
const { Customer } = require('../db/models');

class CustomersService {
  constructor() {}

  async find() {
    const customers = await Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await Customer.create(data);
    return newCustomer;
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    await customer.update(data);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return customer;
  }
}

module.exports = CustomersService;
