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

  async findByUser(userId) {
    const orders = await Order.findAll({
      where: { '$customer.user.id$': userId },
      include: {
        association: 'customer',
        include: ['user'],
      },
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
    const customer = await Customer.findOne({
      where: { userId: data.userId },
    });

    if (!customer) throw boom.notFound(`This account does not have a customer`);

    const finalData = {
      customerId: customer.id,
      ...data,
    };

    const newOrder = await Order.create(finalData, {
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

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return order;
  }
}

module.exports = OrdersService;
