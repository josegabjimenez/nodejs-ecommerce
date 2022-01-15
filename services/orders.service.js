const boom = require('@hapi/boom');
const { Order, Customer, OrderProduct, Product } = require('../db/models');

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
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
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

  async addItem(data) {
    const order = await Order.findByPk(data.orderId);
    const product = await Product.findByPk(data.productId);
    if (!order) throw boom.notFound('Order not found');
    if (!product) throw boom.notFound('Product not found');
    const newItem = await OrderProduct.create(data);
    return newItem;
  }

  async update(id, data) {
    const order = await this.findOne(id);
    await order.update(data);
    return order;
  }
}

module.exports = OrdersService;
