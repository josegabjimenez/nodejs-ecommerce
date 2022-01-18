const boom = require('@hapi/boom');
const { Customer, User, Order, OrderProduct } = require('../db/models');

class CustomersService {
  constructor() {}

  async find() {
    const customers = await Customer.findAll({
      include: ['user'],
    });
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
    const newCustomer = await Customer.create(data, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    await customer.update(data);
    return customer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const user = await User.findOne({
      where: { id: customer.userId },
    });
    await OrderProduct.destroy({
      where: { '$order.customer.id$': id },
    });
    await Order.destroy({
      where: { '$customer.id$': id },
    });
    await customer.destroy();
    await user.destroy();
    return customer;
  }
}

module.exports = CustomersService;
