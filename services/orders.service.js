const boom = require('@hapi/boom');
const { Order, Customer } = require('../db/models');

class OrdersService {
  constructor() {}

  async find() {
    const orders = await Order.findAll({
      include: ['customer'],
    });
    return orders;
  }

  async findOne(id) {
    const order = await Order.findByPk(id, {
      include: {
        association: 'customer',
        include: ['user'],
      },
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async create(data) {
    const customer = await Customer.findByPk(data.customerId);
    if (!customer) {
      throw boom.notFound(`Customer id "${data.customerId}" not found`);
    }
    const newOrder = await Order.create(data, {
      include: {
        association: 'customer',
        include: ['user'],
      },
    });
    return newOrder;
  }

  async update(id, data) {
    const order = await this.findOne(id);
    await order.update(data);
    return order;
  }
}

module.exports = OrdersService;
